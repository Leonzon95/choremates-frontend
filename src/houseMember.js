class HouseMember {
    static all = [];

    constructor({name, id, houseId}) {
        this.name = name;
        this.id = id;
        this.houseId = houseId;
        HouseMember.all.push(this);
    }

    attachToDom = () => {
        let tr = document.querySelector(".house-body table thead tr");
        let bodyTr = document.querySelectorAll(".house-body table tbody tr");
        let ul = document.getElementById("house-member-list")
        tr.innerHTML += `<th scope="col">${this.name} </th>`;
        let counter = 0;
        bodyTr.forEach(el => {
            el.innerHTML += `<td id="member-${this.id}-day-${counter}" class="text-center"></td>`
            counter++
        });
        ul.innerHTML += `<li class="list-group-item" id="member-li-${this.id}">${this.name}</li>`
    }
}