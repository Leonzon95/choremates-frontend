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
    div.className = "col-6 col-md-4";
    div.innerHTML += `<button class="btn btn-info" id="new-house-member-button">Add House Member</button>
    <div id="error-show"></div>
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
            button.innerText = "Add House Member";
        }
    })
    form.addEventListener("submit", memberAdapter.createMember)
}

function newHouseRuleForm() {
    let div = document.createElement("div");
    div.className = "col-6 col-md-4";
    div.innerHTML = `<button class="btn btn-info" id="new-house-rule-button">Add House Rule</button>
    <form action="POST" id="new-house-rule-form" class="d-none">
    <div class="form-group">
    <label for="name">Name:</label>
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
            button.innerText = "Add House Rule";
        }
    })
}

function newHouseChoreForm() {
    let div = document.createElement("div");
    div.className = "col-6 col-md-4";
    div.innerHTML = `<button class="btn btn-info" id="new-house-chore-button">Add House Chore</button>
    <form action="POST" id="new-house-chore-form" class="d-none">
    <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
    <input type="submit" class="btn btn-info btn-sm" value="Add Chore">
    </div>
    </form>`;
    let bttnRowDiv = document.querySelector(".buttons");
    bttnRowDiv.appendChild(div);
    let button = document.getElementById("new-house-chore-button");
    let form = document.getElementById("new-house-chore-form");
    button.addEventListener("click", () => {
        form.classList.toggle("d-none");
        if (button.innerText === "Add House Chore"){
            button.innerText = "Close";
        } else {
            button.innerText = "Add House Chore";
        }
    })
}

function renderHouseMembers(array, houseId) {
    array.forEach(el => {
        let member = new HouseMember({...el.attributes, houseId: houseId});
        member.attachToDom();
    });
}

document.addEventListener("DOMContentLoaded", indexHomeButtons);