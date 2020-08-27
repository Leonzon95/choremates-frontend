class House {
    static all = [];

    constructor({name, id}) {
        this.name = name;
        this.id = id;
        House.all.push(this);
    }

    get members() {
        return HouseMember.all.filter(el => el.houseId === this.id);
    }

    

    viewHouse() {
        seconDiv.innerHTML = `<h3>${unslug(this.name)}</h3><div class="row buttons"></div>
        <div class="row house-rules"><ol></ol></div>
        <div class="row house-body">
        <div class="col">
        <table class="table table-bordered">
        <thead><tr><th>Day</th></tr></thead>
        <tbody>
        <tr><th scope="row">Mon</th></tr>
        <tr><th scope="row">Tues</th></tr>
        <tr><th scope="row">Wed</th></tr>
        <tr><th scope="row">Thurs</th></tr>
        <tr><th scope="row">Fri</th></tr>
        <tr><th scope="row">Sat</th></tr>
        <tr><th scope="row">Sun</th></tr>
        </tbody></table>
        <h4>Assigned Chores:</h4><br>
        <div id="assg-chore-list" class="row"></div>
        </div>
        <div class="col-md-4 ml-auto" ><ul id="chore-list"><h4>Unassigned Chores:</h4></ul>
        
        </div>
        </div>`
        newHouseMemberForm(this.id);
        newHouseRuleForm(this.id);
        newHouseChoreForm(this.id);
    }
}