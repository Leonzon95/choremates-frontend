class Chore {
    static all = [];

    constructor({name, id, houseId}) {
        this.name = name;
        this.id = id;
        this.houseId = houseId;
        Chore.all.push(this);
    }
    
}