class Rule {
    constructor({description, id, houseId}) {
        this.description = description;
        this.id = id;
        this.houseId = houseId;
    }

    attachToDom() {
        let ol = document.querySelector("#house-rules-list")
        ol.innerHTML += `<h6><li>${this.description}</li></h6>`
    }
}