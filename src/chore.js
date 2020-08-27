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
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let dayId
        for (let i = 0; i < days.length; i++){ 
            if (this.day === days[i]) dayId = i;
        }
        let tableCell = document.getElementById(`member-${this.houseMember.id}-day-${dayId}`);
        if(this.difficulty === "Easy") {
            tableCell.innerHTML =`<div class="text-success text-center">${this.name}</div>`
        } else if (this.difficulty === "Medium") {
            tableCell.innerHTML =`<div class="text-warning text-center">${this.name}</div>`
        } else {
            tableCell.innerHTML =`<div class="text-danger">${this.name}</div>`
        }
        let outerDiv = document.getElementById("assg-chore-list");
        let choreDiv = document.createElement("div")
        choreDiv.setAttribute("id", `outer-assg-chore-${this.id}`);
        choreDiv.innerHTML = `<div class="card" style="width: 18rem;"><div id="assg-error-${this.id}"></div><div class="card-body" id="chore-card-${this.id}"><h6 class="card-title"><div>${this.name}</div><br> <div>Difficulty: ${this.difficulty}</div> <div>${this.day}</div><br><div>${this.houseMember.name}</div></h6><button type="button" class="assign btn btn-primary btn-sm">Assign</button>
        <button type="button" class="edit btn btn-secondary btn-sm">Edit</button>
        <button type="button" class="delete btn btn-danger btn-sm">Delete</button><div class="assign-form"></div>
        </div></div><br>`;
        outerDiv.appendChild(choreDiv)
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

    updateAssgChore(obj) { 
        let el = document.getElementById(`outer-unassg-chore-${this.id}`);
        if (!!el) el.parentElement.removeChild(el);
        this.name = obj.name;
        this.difficulty = obj.difficulty;
        this.houseMemberId = obj.house_member_id;
        this.day = obj.day;
        this.attachAssgToDom();
    }
}
