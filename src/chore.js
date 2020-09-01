class Chore {
    static all = [];

    constructor({name, id, difficulty, houseId, houseMemberId, day}) {
        this.name = name;
        this.id = id;
        this.difficulty = difficulty;
        this.houseId = houseId;
        this.houseMemberId = houseMemberId;
        this.day = day;
        Chore.all.push(this);
    }

    get house() {
        return House.all.find(el => el.id == this.houseId);
    }

    get houseMember() {
        return HouseMember.all.find(el => el.id == this.houseMemberId);
    }

    attachToDom = () => {
        let ul = document.getElementById("chore-list");
        let li = document.createElement("li")
        li.setAttribute("id", `outer-unassg-chore-${this.id}`);
        li.innerHTML = `<div class="card" style="width: 18rem;"><div id="unassg-error-${this.id}"></div><div class="card-body" id="chore-card-${this.id}"><h6 class="card-title"><div>${this.name}</div><br> <div>Difficulty: ${this.difficulty}</div></h6><button type="button" class="assign btn btn-primary btn-sm">Assign</button>
        <button type="button" class="edit btn btn-secondary btn-sm">Edit</button>
        <button type="button" class="delete btn btn-danger btn-sm">Delete</button><div class="assign-form"></div>
        </div></div><br>`;
        ul.appendChild(li)
        let editBttn = document.querySelector(`#chore-card-${this.id} .edit`);
        let deleteBttn = document.querySelector(`#chore-card-${this.id} .delete`);
        let assignBttn = document.querySelector(`#chore-card-${this.id} .assign`);
        editBttn.addEventListener("click", this.editUnassgChoreForm);
        deleteBttn.addEventListener("click", (e) => {
            const choreAdapter = new ChoreAdapter(this.houseId);
            choreAdapter.deleteChore(this.id);
        });
        assignBttn.addEventListener("click", this.assignChoreForm);
    }

    attachAssgToDom = () => {
        this.attachToTableCell(this.day, this.houseMemberId, this.name);
        let outerDiv = document.getElementById("assg-chore-list");
        let choreDiv = document.createElement("div")
        choreDiv.setAttribute("id", `outer-assg-chore-${this.id}`);
        choreDiv.innerHTML = `<div class="card" style="width: 18rem;">
        <div class="card-body" id="chore-card-${this.id}">
        <div id="assg-chore-error-${this.id}"></div>
        <h6 class="card-title">
        <div id="assg-name-field-${this.id}">${this.name}</div>
        <br>
        <div id="assg-member-field-${this.id}">Member: ${this.houseMember.name}</div>
        <div id="assg-difficulty-field-${this.id}">Difficulty: ${this.difficulty}</div> 
        <div id="assg-day-field-${this.id}">Every ${this.day}</div> 
        </h6>
        <button type="button" class="edit btn btn-secondary btn-sm">Edit</button>
        <button type="button" class="delete btn btn-danger btn-sm">Delete</button>
        </div></div><br>`;
        outerDiv.appendChild(choreDiv);
        let editBttn = document.querySelector(`#outer-assg-chore-${this.id} .edit`);
        let deleteBttn = document.querySelector(`#outer-assg-chore-${this.id} .delete`);
        editBttn.addEventListener("click", this.editAssgChoreForm);
        
        deleteBttn.addEventListener("click", () =>{
            const choreAdapter = new ChoreAdapter(this.houseId);
            choreAdapter.deleteChore(this.id, true)
        });
    }

    editUnassgChoreForm = (e) => {
        let divTitle = e.target.parentElement.firstElementChild.firstElementChild;
        let divDiff = e.target.parentElement.firstElementChild.lastElementChild;
        if (e.target.innerText === "Edit"){
            e.target.innerText = "Save";
            divTitle.innerHTML = `<input type="text" value="${this.name}" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">`
            divDiff.innerHTML = `<select id="input-chore-difficulty" class="form-control">
            <option selected>${this.difficulty}</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            </select>`;
        } else {
            const choreAdapter = new ChoreAdapter(this.houseId)
            choreAdapter.patchUnassgChore(this.id, e.target)
        }
      
    }

    updateUnassgChore(obj) {
        let errorDiv = document.getElementById(`unassg-error-${this.id}`);
        errorDiv.innerHTML =``;
        this.name = obj.name;
        this.difficulty = obj.difficulty;
        let div = document.getElementById(`chore-card-${this.id}`).querySelector("h6");
        div.firstChild.innerHTML = this.name;
        div.lastChild.innerHTML = `Difficulty: ${this.difficulty}`;
        let button = document.querySelector(`#chore-card-${this.id} .edit`);
        button.innerText = `Edit`
    }

    deleteUnassgChoreFromDom() {
        let container = document.getElementById(`outer-unassg-chore-${this.id}`);
        container.parentElement.removeChild(container);
    }

    assignChoreForm = (e) => {
        let div = e.target.parentElement.querySelector(".assign-form");
        if (e.target.innerText === "Assign") {
            e.target.innerText = "Close";
            let houseMembers = this.house.members;
            div.innerHTML = `<br><div id="chore-assign-error-${this.id}"></div>
            <select id="chore-assign-${this.id}" class="form-control">
            <option selected>Select Member</option>
            </select><br>
            <select id="chore-assign-${this.id}-day" class="form-control">
            <option selected>Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
            </select>
            <br><button type="button" class="btn btn-primary" id="chore-assign-button-${this.id}">Assign</button>
            `
            let dropDown = document.getElementById(`chore-assign-${this.id}`);
            let button = document.getElementById(`chore-assign-button-${this.id}`);
            houseMembers.forEach(el => {
                dropDown.innerHTML += `<option value="${el.id}">${el.name}</option>`
            });
            button.addEventListener("click", this.assignCheckpoint);
        } else {
            e.target.innerText = "Assign";
            div.innerHTML =``;
        }
    }

    assignCheckpoint = (e) => {
        let houseMemberId = document.getElementById(`chore-assign-${this.id}`).value;
        let day = document.getElementById(`chore-assign-${this.id}-day`).value;
        if(houseMemberId === "Select Member" || day === "Select Day") {
            let div = document.getElementById(`chore-assign-error-${this.id}`);
            div.innerHTML = `<div class="alert alert-danger" role="alert">Must select a member and day</div>`
        } else {
            const choreAdapter = new ChoreAdapter(this.houseId);
            let attr = {day, houseMemberId, name: this.name, difficulty: this.difficulty};
            choreAdapter.patchAssgChore(this.id, attr)
        }
    }

    editAssgChoreForm = (e) => {
        let nameDiv = document.getElementById(`assg-name-field-${this.id}`);
        let memberDiv = document.getElementById(`assg-member-field-${this.id}`);
        let diffDiv = document.getElementById(`assg-difficulty-field-${this.id}`);
        let dayDiv = document.getElementById(`assg-day-field-${this.id}`);
        let bttnText = e.target.innerText;
        
        if (bttnText === "Edit") {
            e.target.innerText = "Save";
            nameDiv.innerHTML = `<input type="text" value="${this.name}" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">`;
            memberDiv.innerHTML = `<select id="assg-chore-assign-${this.id}" class="form-control"><option selected value="${this.houseMember.id}">${this.houseMember.name}</option></select><br>`;
            diffDiv.innerHTML = `<select id="input-chore-difficulty" class="form-control">
            <option selected>${this.difficulty}</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            </select><br>`;
            dayDiv.innerHTML = `<select id="assg-chore-assign-${this.id}-day" class="form-control">
            <option selected>${this.day}</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
            </select>`
            let houseMembers = this.house.members;
            let memberDropDown = document.getElementById(`assg-chore-assign-${this.id}`);
            houseMembers.forEach(el => {
                memberDropDown.innerHTML += `<option value="${el.id}">${el.name}</option>`
            });
        } else {
            if (nameDiv.firstChild.value.trim() === "") {
                let errorDiv = document.getElementById(`assg-chore-error-${this.id}`);
                errorDiv.innerHTML = `<div class="alert alert-danger" role="alert">Name can't be empty</div>`
            } else {
                let day = dayDiv.firstChild.value;
                let houseMemberId = memberDiv.firstChild.value;
                let name = nameDiv.firstChild.value.trim();
                let difficulty =diffDiv.firstChild.value;             
                const choreAdapter = new ChoreAdapter(this.houseId);
                let attr = {day, houseMemberId, name, difficulty};
                choreAdapter.patchAssgChore(this.id, attr, true);
                e.target.innerText = "Edit"
                this.updateTableCell(day, houseMemberId, name);
            }
        }
    }

    deleteAssgChore() {
        this.deleteTableCell();
        let card = document.getElementById(`outer-assg-chore-${this.id}`);
        card.remove();
    }

    updateTableCell = (newDay, newMemId, newName) => {
        this.deleteTableCell();
        this.attachToTableCell(newDay, newMemId, newName);
    }

    deleteTableCell = () => {
        let oldDiv = document.getElementById(`table-cell-${this.id}`);
        oldDiv.remove();
    }

    attachToTableCell = (day, houseMemberId, name) => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let dayId
        for (let i = 0; i < days.length; i++){ 
            if (day === days[i]) dayId = i;
        }
        let tableCell = document.getElementById(`member-${houseMemberId}-day-${dayId}`);
        if(this.difficulty === "Easy") {
            tableCell.innerHTML +=`<div class="text-success text-center" id="table-cell-${this.id}">${name}</div>`
        } else if (this.difficulty === "Medium") {
            tableCell.innerHTML +=`<div class="text-warning text-center" id="table-cell-${this.id}">${name}</div>`
        } else {
            tableCell.innerHTML +=`<div class="text-danger" id="table-cell-${this.id}">${name}</div>`
        }
    }

    updateAssgChore(obj, isOld) { 
        this.name = obj.name;
        this.difficulty = obj.difficulty;
        this.houseMemberId = obj.house_member_id;
        this.day = obj.day;
        if (!isOld){
            let el = document.getElementById(`outer-unassg-chore-${this.id}`);
            if (!!el) el.parentElement.removeChild(el);
            this.attachAssgToDom();
        } else {
            let nameDiv = document.getElementById(`assg-name-field-${this.id}`);
            let memberDiv = document.getElementById(`assg-member-field-${this.id}`);
            let diffDiv = document.getElementById(`assg-difficulty-field-${this.id}`);
            let dayDiv = document.getElementById(`assg-day-field-${this.id}`);
            nameDiv.innerHTML = this.name;
            memberDiv.innerHTML = `Member: ${this.houseMember.name}`;
            diffDiv.innerHTML = `Difficulty: ${this.difficulty}`;
            dayDiv.innerHTML = `Every ${this.day}`;
        }
        
    }
}
