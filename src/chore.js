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
        ul.innerHTML += `<li>${this.name} Difficulty: ${this.difficulty}</li>`
    }

}