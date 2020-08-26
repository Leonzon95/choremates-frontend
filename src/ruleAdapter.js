class RuleAdapter {
    constructor(houseId) {
        this.baseUrl = `http://localhost:3000/houses/${houseId}/rules`
    }

    //create
    createRule = (e) => {
        e.preventDefault();
        let description = document.querySelector("#new-house-rule-form #name").value;
        document.getElementById("new-house-rule-form").reset();
        let obj = { description }
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
        let div = document.getElementById("error-rule-show")
        if (!json.error) {
            let attr = {...json.data.attributes, houseId: json.data.relationships.house.data.id}
            let newRule = new Rule(attr)
            newRule.attachToDom();
        } else {
            div.innerHTML = `<div class="alert alert-danger" role="alert">${json.error}</div>`
        }
    }
}