class Chore {
    static all = [];

    constructor({name, id, difficulty, houseId}) {
        this.name = name;
        this.id = id;
        this.difficulty = difficulty;
        this.houseId = houseId;
        Chore.all.push(this);
    }

    attachToDom = () => {
        let ul = document.getElementById("chore-list");
        let li = document.createElement("li")
        li.innerHTML = `<div class="card" style="width: 18rem;"><div class="card-body" id="chore-card-${this.id}"><h6 class="card-title"><div>${this.name}</div><br> <div>Difficulty: ${this.difficulty}</div></h6><button type="button" class="btn btn-primary btn-sm">Assign</button>
        <button type="button" class="edit btn btn-secondary btn-sm">Edit</button>
        <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div></div><br>`;
        ul.appendChild(li)
        let editBttn = document.querySelector(`#chore-card-${this.id} .edit`) ;
        editBttn.addEventListener("click", this.editUnassgChore);
    }

    editUnassgChore = (e) => {
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
            choreAdapter.patchUnassgChore(this.id, e.target, this.houseId)
        }
      
    }

    updateUnassgChore(obj) {
        this.name = obj.name;
        this.difficulty = obj.difficulty;
        let div = document.getElementById(`chore-card-${this.id}`).querySelector("h6");
        div.firstChild.innerHTML = this.name;
        div.lastChild.innerHTML = `Difficulty: ${this.difficulty}`;
    }



}
