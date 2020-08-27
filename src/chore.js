class Chore {
    static all = [];

    constructor({name, id, difficulty, houseId}) {
        this.name = name;
        this.id = id;
        this.difficulty = difficulty;
        this.houseId = houseId;
        Chore.all.push(this);
    }

    get house() {
        return House.all.find(el => el.id === this.houseId)
    }

    attachToDom = () => {
        let ul = document.getElementById("chore-list");
        let li = document.createElement("li")
        li.setAttribute("id", `outer-chore-${this.id}`);
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

    deleteChoreFromDom() {
        let container = document.getElementById(`outer-chore-${this.id}`);
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
                dropDown.innerHTML += `<option>${el.name}</option>`
            });
            button.addEventListener("click", this.assignCheckpoint);

        } else {
            e.target.innerText = "Assign";
            div.innerHTML =``;
        }
    }

    assignCheckpoint = (e) => {
        console.log(this)
        let houseMember = document.getElementById(`chore-assign-${this.id}`).value;
        let day = document.getElementById(`chore-assign-${this.id}`).value;
        if(houseMember === "Select Member" || day === "Select Day") {
            let div = document.getElementById(`chore-assign-error-${this.id}`);
            div.innerHTML = `<div class="alert alert-danger" role="alert">Must select a member and day</div>`
        } else {
            const choreAdapter = new ChoreAdapter(this.houseId);
            
        }
    }
}
