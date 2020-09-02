const mainDiv = document.getElementById("main-container");
const hiddenDiv = document.getElementById('hide-index');
const seconDiv = document.getElementById("secondary-container");
const houseAdapter = new HouseAdapter


function indexHomeButtons() {
    const newHouse = document.getElementById("new-house");
    const findHouse = document.getElementById("find-house");
    newHouse.addEventListener("click", newHouseForm);
    findHouse.addEventListener("click", findHouseForm);
}

function hideIndex() {
    hiddenDiv.hidden = true;
}

function unhideIndex() {
    seconDiv.innerHTML = null;
    hiddenDiv.hidden = false;
}

function addBackButton() {
    const button = document.createElement("button");
    button.className = "btn btn-secondary back-button";
    button.innerText = "Go back"
    button.addEventListener("click", () => {
        button.remove();
        unhideIndex();
    });
    seconDiv.appendChild(button);
}

function newHouseForm() {
    hideIndex()
    seconDiv.innerHTML += `<h3>New House</h3><div class="form-error"></div>
    <form action="POST" id="new-house-form">
    <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
    <input type="submit" class="btn btn-info" value="Create House">
    </div>
    </form>`;
    let form = document.getElementById("new-house-form");
    addBackButton();
    form.addEventListener("submit", houseAdapter.createHouse)
}

function findHouseForm() {
    hideIndex();
    seconDiv.innerHTML += `<h3>Find House</h3><div class="form-error"></div>
    <form action="POST" id="find-house-form">
    <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
    <input type="submit" class="btn btn-info" value="Find House">
    </div>
    </form>`;
    let form = document.getElementById("find-house-form");
    addBackButton();
    form.addEventListener("submit", houseAdapter.findHouse);
}

function newHouseMemberForm(houseId) {
    const memberAdapter = new HouseMemberAdapter(houseId)
    let div = document.createElement("div");
    div.className = "col-sm-6";
    div.innerHTML += `<button class="btn btn-info" id="new-house-member-button">Add House Member</button>
    <div id="error-member-show"></div>
    <form action="POST" id="new-house-member-form" class="d-none">
    <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
    <input type="submit" class="btn btn-info btn-sm" value="Add Member">
    </div>
    </form>`;
    let bttnRowDiv = document.querySelector(".buttons")
    bttnRowDiv.appendChild(div)
    let form = document.getElementById("new-house-member-form");
    let button = document.getElementById("new-house-member-button")
    button.addEventListener("click", () => {
        form.classList.toggle("d-none");
        if (button.innerText === "Add House Member"){
            button.innerText = "Close";
        } else {
            document.getElementById("error-member-show").innerHTML = ``;
            button.innerText = "Add House Member";
        }
    })
    form.addEventListener("submit", memberAdapter.createMember)
}

function newHouseRuleForm(houseId) {
    const ruleAdapter = new RuleAdapter(houseId)
    let div = document.createElement("div");
    div.className = "col-sm-6";
    div.innerHTML = `<button class="btn btn-info" id="new-house-rule-button">Add House Rule</button>
    <div id="error-rule-show"></div>
    <form action="POST" id="new-house-rule-form" class="d-none">
    <div class="form-group">
    <label for="name">Rule:</label>
    <input type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
    <input type="submit" class="btn btn-info btn-sm" value="Add Rule">
    </div>
    </form>`;
    let bttnRowDiv = document.querySelector(".buttons");
    bttnRowDiv.appendChild(div);
    let button = document.getElementById("new-house-rule-button");
    let form = document.getElementById("new-house-rule-form");
    button.addEventListener("click", () => {
        form.classList.toggle("d-none");
        if (button.innerText === "Add House Rule"){
            button.innerText = "Close";
        } else {
            document.getElementById("error-rule-show").innerHTML = ``;
            button.innerText = "Add House Rule";
        }
    })
    form.addEventListener("submit", ruleAdapter.createRule)
}

function newHouseChoreForm(houseId) {
    const choreAdapter = new ChoreAdapter(houseId)
    let div = document.createElement("div");
    div.innerHTML = `<button class="btn btn-info" id="new-house-chore-button">Add House Chore</button> <div id="error-chore-show"></div>
    <form action="POST" id="new-house-chore-form" class="d-none">
    <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
    <label for="input-chore-difficulty">Difficulty:</label>
    <select id="input-chore-difficulty" class="form-control">
        <option selected>Select Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
    </div>
    <div class="form-group">
    <input type="submit" class="btn btn-info btn-sm" value="Add Chore">
    </div>
    </form>`;
    let bttnRowDiv = document.querySelector("#add-chore-bttn");
    bttnRowDiv.appendChild(div);
    let button = document.getElementById("new-house-chore-button");
    let form = document.getElementById("new-house-chore-form");
    button.addEventListener("click", () => {
        form.classList.toggle("d-none");
        if (button.innerText === "Add House Chore"){
            button.innerText = "Close";
        } else {
            document.getElementById("error-chore-show").innerHTML = ``;
            button.innerText = "Add House Chore";
        }
    })
    form.addEventListener("submit", choreAdapter.createChore);
}

function renderHouseMembers(array, houseId) {
    array.forEach(el => {
        if (el.type === "house_member") {
            let member = new HouseMember({...el.attributes, houseId: houseId});
            member.attachToDom();
        }
    });
}

function renderHouseRules(array, houseId) {
    array.forEach(el =>{
        if (el.type === "rule") {
            let rule = new Rule({...el.attributes, houseId: houseId})
            rule.attachToDom();
        }
    })
}

function renderHouseChores(array, houseId) {
    array.forEach(el => {
        if (el.type === "chore") {
            let chore = new Chore({...el.attributes, houseId: houseId, houseMemberId: el.attributes.house_member_id})
            if (!!chore.houseMemberId && !!chore.day){
                chore.attachAssgToDom();
            } else {
                chore.attachToDom();
            }
            
        }
    });
}


document.addEventListener("DOMContentLoaded", indexHomeButtons);