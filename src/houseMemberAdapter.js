class HouseMemberAdapter {
    constructor(houseId) {
        this.houseId = houseId;
        this.baseUrl = `http://localhost:3000/houses/${houseId}/house_members`
    }

    //create
    createMember = (e) => {
        e.preventDefault();
        let name = document.querySelector("#new-house-member-form #name").value;
        document.getElementById("new-house-member-form").reset();
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
            .then(this.handleCreateJson)
    }

    handleCreateJson(json) {
        let div = document.getElementById("error-member-show");
        if(!json.error) {
            div.innerHTML = ``;
            let attr = {...json.data.attributes, houseId: json.data.relationships.house.data.id};
            let newMember = new HouseMember(attr)
            newMember.attachToDom();
        } else {
            div.innerHTML = `<div class="alert alert-danger" role="alert">${json.error}</div>`
        }
    }
}