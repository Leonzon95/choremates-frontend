class House {
    constructor({name, id}) {
        this.name = name;
        this.id = id;
    }

    viewHouse() {
        
        seconDiv.innerHTML = `<h3>${this.name} House</h3>
        <button class="btn btn-info">Add House Member</button>`

    }
}