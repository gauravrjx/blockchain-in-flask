//STARTS: index.html -> blockchain_client 
window.onload = function(){
    //selectors
    const menuDiv = document.querySelector(".nav-menu");
    const menuIcon = document.querySelector(".nav-btn");
    
    // Event Listeners
    menuIcon.addEventListener('click', displayMenu);
 
    // PART-I to display nav items in small screen
    function displayMenu(event) {
        // console.log(menuDiv.classList[0]);
        switch (menuDiv.classList[0]) {
            case "toggle-menu":
                menuDiv.className = "nav-menu";
                break
            case "nav-menu":
                menuDiv.className = "toggle-menu";
                break
        }
    }

    // PART-II NAV-BAR when navicons are shown and windows are maximized nav items should be nav-menu
    window.onresize = () => {
        if (window.innerWidth > 768) {
            // console.log(window.innerWidth)
            menuDiv.className = "nav-menu"
        }
    }  
}

