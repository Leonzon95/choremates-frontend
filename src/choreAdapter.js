class ChoreAdapter {
    constructor(houseId) {
        this.baseUrl = `http://localhost:3000/houses/${houseId}/chores`;
    }

    //create
    createChore = (e) => {
        e.preventDefault();
        let name = document.querySelector("#new-house-chore-form #name").value;
        let difficulty = document.getElementById("input-chore-difficulty").value;
        if (difficulty === "Select Difficulty") difficulty = null;
    
        document.getElementById("new-house-chore-form").reset();
        let obj = { name, difficulty }
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
        let div = document.getElementById("error-chore-show");
        if (!json.error) {
            div.innerHTML = ``
            let attr = {...json.data.attributes, houseId: json.data.relationships.house.data.id};
            let newChore = new Chore(attr);
            newChore.attachToDom();
        } else {
            div.innerHTML = `<div class="alert alert-danger" role="alert">${json.error}</div>`
        }
    }

    //update
    patchUnassgChore = (choreId, target, houseId) => {
        let name = target.parentElement.firstElementChild.firstElementChild.firstElementChild.value;
        let difficulty = target.parentElement.firstElementChild.lastElementChild.firstElementChild.value;
        let obj = { name, difficulty };
        let config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(obj)
        }
        fetch(`http://localhost:3000/houses/${houseId}/chores/${choreId}`, config)
            .then(resp => resp.json())
            .then((json) => {
                
                let chore = Chore.all.find(el => el.id == choreId)
                chore.updateUnassgChore(json.data.attributes)
                
            })
        
    }
}