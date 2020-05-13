// selector
const menuDiv = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".nav-btn");

// Event Listener
menuIcon.addEventListener('click', displayMenu);

// Functions
function displayMenu(event){
    // console.log(menuDiv.classList[0]);
    switch(menuDiv.classList[0]){
        case "toggle-menu":
            menuDiv.className="nav-menu";
            break
        case "nav-menu":
            menuDiv.className="toggle-menu";
            break
    }
}