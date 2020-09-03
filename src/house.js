class House {
    static all = [];

    constructor({name, id}) {
        this.name = name;
        this.id = id;
        House.all.push(this);
    }

    get members() {
        return HouseMember.all.filter(el => el.houseId == this.id);
    }

    

    viewHouse() {
        seconDiv.innerHTML = `<h2>${unslug(this.name)}</h2><div class="row buttons"></div>
        <div class="row house-rules">
            <div class="col-sm-6 row-cards">
                <h4 class="">House Members:</h4>
                <ul class="list-group" id="house-member-list"></ul>
            </div>
            <div class="col-sm-6 row-cards">
                <div class="card">
                    <div class="card-body">
                    <h4 class="card-title" >Rules:</h4>
                    <ol id="house-rules-list"></ol>
                    </div>
                </div>
            </div>
        </div>
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
        <div id="assg-chore-list" class="row no-style-dsp"></div>
        </div>
        <div class="col-md-4 ml-auto" ><div id="add-chore-bttn"></div><br>
        <ul id="chore-list" class="no-style-dsp"><h4>Unassigned Chores:</h4></ul>
        </div>
        </div>`
        webSocketConnection(this.id);
        newHouseMemberForm(this.id);
        newHouseRuleForm(this.id);
        newHouseChoreForm(this.id);
    }
}