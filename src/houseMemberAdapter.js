class HouseMemberAdapter {
    constructor(houseId) {
        this.houseId = houseId;
        this.baseUrl = `http://localhost:3000/houses/${houseId}/house_members`
    }

    //create
    createMember = (e) => {
        e.preventDefault();
        let name = document.querySelector("#new-house-member-form #name").value;
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
        
        if(!json.error) {
            let attr = {...json.data.attributes, houseId: json.data.relationships.house.data.id}
            let newMember = new HouseMember(attr)
            newMember.attachToDom();
        }
    }
}