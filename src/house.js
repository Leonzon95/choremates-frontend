class House {
    static all = [];

    constructor({name, id}) {
        this.name = name;
        this.id = id;
        House.all.push(this);
    }

    viewHouse() {
        seconDiv.innerHTML = `<h3>${unslug(this.name)}</h3>
        <button class="btn btn-info new-house-member">Add House Member</button>
        <button class="btn btn-info new-house-rule">Add House Rule</button>
        <div class="add-house-member-form"><form action=""</div>`;
        let newMemberButton = document.querySelector(".new-house-member");
        
    }
}