class HouseAdapter {
    constructor() {
        this.baseUrl = "http://localhost:3000/houses";
    }

    //create
    createHouse(e) {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let obj = { name }
        let config= {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(obj)
        }
        fetch(this.baseUrl, config)
            .then(resp => resp.json())
            .then(json => {
                seconDiv.innerHTML = null;
            })
    }
    
}