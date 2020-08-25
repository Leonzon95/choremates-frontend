class House {
    static all = [];

    constructor({name, id}) {
        this.name = name;
        this.id = id;
        House.all.push(this);
    }

    

    viewHouse() {
        seconDiv.innerHTML = `<h3>${unslug(this.name)}</h3><div class="row buttons"></div>
        <div class="row house-rules"></div>
        <div class="row house-body"><ul></ul></div>`
        newHouseMemberForm(this.id);
        newHouseRuleForm();
        newHouseChoreForm();
        
    }
}