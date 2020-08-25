class House {
    static all = [];

    constructor({name, id}) {
        this.name = name;
        this.id = id;
        House.all.push(this);
    }

    viewHouse() {
        seconDiv.innerHTML = `<h3>${unslug(this.name)}</h3><div class="row buttons"></div>`
        newHouseMemberForm();
        newHouseRuleForm();
       `<button class="btn btn-info new-house-rule">Add House Rule</button>
        <button class="btn btn-info new-house-rule">Add Chore</button>`;
        let newMemberButton = document.querySelector(".new-house-member");
    }
}