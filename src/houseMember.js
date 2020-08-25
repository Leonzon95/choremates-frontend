class HouseMember {
    static all = [];

    constructor({name, id, houseId}) {
        this.name = name;
        this.id = id;
        this.houseId = houseId;
        HouseMember.all.push(this);
    }

    attachToDom = () => {
        let ul = document.querySelector(".house-body ul");
        ul.innerHTML += `<li>${this.name}</li>`;
    }
}