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

document.addEventListener("DOMContentLoaded", indexHomeButtons);