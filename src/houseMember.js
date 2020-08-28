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
        let li = document.createElement("li");
        li.setAttribute("id", `member-li-${this.id}`);
        li.classList.add("list-group-item");
        li.innerHTML += `<section id="member-${this.id}-name-field">${this.name}</ section>
        <button  class="button edit-btn-member">Edit</button>
        <button  class="button delete-btn-member">Delete</button>`;
        ul.appendChild(li);
        let editBttn = document.querySelector(`#member-li-${this.id} .edit-btn-member`);
        let deleteBttn = document.querySelector(`#member-li-${this.id} .delete-btn-member`);
        editBttn.addEventListener("click", this.editMemberField);
    }

    editMemberField = (e) => {
        let nameDiv = document.getElementById(`member-${this.id}-name-field`);
        if (e.target.innerHTML === "Edit") {
            e.target.innerHTML = "Save";
            nameDiv.innerHTML =`<input type="text" value="${this.name}" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">`
        }
    }
}