class HouseMember {
    static all = [];

    constructor({name, id, houseId}) {
        this.name = name;
        this.id = id;
        this.houseId = houseId;
        HouseMember.all.push(this);
    }

    get chores() {
        return Chore.all.filter(el => el.houseMemberId == this.id);
    }

    attachToDom = () => {
        let tr = document.querySelector(".house-body table thead tr");
        let bodyTr = document.querySelectorAll(".house-body table tbody tr");
        let ul = document.getElementById("house-member-list")
        tr.innerHTML += `<th scope="col" id="member-name-table-cell-${this.id}">${this.name} </th>`;
        let counter = 0;
        bodyTr.forEach(el => {
            el.innerHTML += `<td id="member-${this.id}-day-${counter}" class="text-center"></td>`
            counter++
        });

        let li = document.createElement("li");
        li.setAttribute("id", `member-li-${this.id}`);
        li.classList.add("list-group-item");
    
        li.innerHTML += `<div class="row"><div class="col-6 col-sm-4" id="member-${this.id}-name-field">${this.name}</div>
        <div class="col-6 col-sm-4"><button  class="button edit-btn-member">Edit</button>
        <button  class="button delete-btn-member">Delete</button></div>
        <div id="error-edit-member-${this.id}" class="col"></div></div>`;
        ul.appendChild(li);
        let editBttn = document.querySelector(`#member-li-${this.id} .edit-btn-member`);
        let deleteBttn = document.querySelector(`#member-li-${this.id} .delete-btn-member`);
        editBttn.addEventListener("click", this.editMember);
        deleteBttn.addEventListener("click", this.deleteMember)
    }

    editMember = (e) => {
        let nameDiv = document.getElementById(`member-${this.id}-name-field`);
        if (e.target.innerHTML === "Edit") {
            e.target.innerHTML = "Save";
            nameDiv.innerHTML =`<input type="text" value="${this.name}" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">`
        } else {
            let input = nameDiv.firstChild.value;
            let errorDiv = document.getElementById(`error-edit-member-${this.id}`);
            if (input.trim() === ""){
                errorDiv.innerHTML = `<div class="alert alert-danger" role="alert">Not valid</div>`;
            } else {
                let tableCell = document.getElementById(`member-name-table-cell-${this.id}`)
                e.target.innerHTML = "Edit";
                errorDiv.innerHTML =``
                const memberAdapter = new HouseMemberAdapter(this.houseId);
                memberAdapter.patchMember(this.id, input);
                this.name = input;
                nameDiv.innerHTML =`${this.name}`;
                tableCell.innerText = `${this.name}`;
            }
        }
    }

    deleteMember = (e) => {
        const memberAdapter = new HouseMemberAdapter;
        memberAdapter.deleteMember(this.id);
        let li = document.getElementById(`member-li-${this.id}`);
        let tableHead = document.getElementById(`member-name-table-cell-${this.id}`);
        memberAdapter.deleteMember(this.id);
        li.remove();
        tableHead.remove();
        for (let i = 0; i < 7; i++) {
            let cell = document.getElementById(`member-${this.id}-day-${i}`)
            cell.remove();
        }
        for (const chore of this.chores) {
            chore.day = null;
            chore.houseMemberId = null;
            let card = document.getElementById(`outer-assg-chore-${chore.id}`);
            card.parentElement.removeChild(card);
            chore.attachToDom();
        }
        this.houseId = null;
    }
}