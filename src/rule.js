class Rule {
    constructor({description, id, houseId}) {
        this.description = description;
        this.id = id;
        this.houseId = houseId;
    }

    attachToDom() {
        let ol = document.querySelector(".house-rules ol")
        ol.innerHTML += `<li>${this.description}</li>`
    }
}