class HouseAdapter {
    constructor() {
        this.baseUrl = "http://localhost:3000/houses";
    }

    //create
    createHouse = (e) => {
        e.preventDefault();
        let name = slug(document.getElementById("name").value);
        let obj = { name }
        let config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(obj)
        }
        fetch(this.baseUrl, config)
            .then(resp => resp.json())
            .then(this.handleFindCreateJson);
    }

    //find
    findHouse = (e) => {
        e.preventDefault();
        let name = slug(document.getElementById("name").value);
        let house = House.all.find( house => name === house.name);
        if (house) {
            house.viewHouse();
        } else {
            fetch(`${this.baseUrl}/${name}`)
                .then(resp => resp.json())
                .then(this.handleFindCreateJson);
        }
    }

    handleFindCreateJson(json) {
        if(!json.error) {
            let newHouse = new House(json.data.attributes);
            let houseId = newHouse.id;
            newHouse.viewHouse();
            if (!!json.included)renderHouseMembers(json.included, houseId)
        } else {
            let div = document.querySelector(".form-error");
            div.innerHTML = `<div class="alert alert-danger" role="alert">${json.error}</div>`
        }
    }
    
}



function slug(name) {
    return name.split(" ").join("-");
}

function unslug(name) {
    return name.split("-").join(" ");
}