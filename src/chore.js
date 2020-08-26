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
        ul.innerHTML += `<li><div class="card" style="width: 18rem;"><div class="card-body"><h6 class="card-title">${this.name}<br> Difficulty: ${this.difficulty}</h6><button type="button" class="btn btn-primary btn-sm">Assign</button>
        <button type="button" class="edit-unass-chore btn btn-secondary btn-sm">Edit</button>
        <button type="button" class="btn btn-danger btn-sm">Delete</button>
        </div></div></li><br>`

    }

}