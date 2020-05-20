// selector
    //index.html -> blockchain_client
const menuDiv = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".nav-btn");
const copyBtns = document.getElementsByClassName("copy-btn");
const textAreaKeis = document.getElementsByClassName("txt-area-key");


// Event Listener
    //index.html -> blockchain_client
menuIcon.addEventListener('click', displayMenu);
copyBtns[0].addEventListener('click', copyTextToClipboard);
copyBtns[1].addEventListener('click', copyTextToClipboard);


// Functions

// to display nav items in small screen
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


// NAV-BAR when navicons are shown and windows are maximized nav items should be nav-menu
window.onresize = () => {
    if(window.innerWidth > 768 ){
        // console.log(window.innerWidth)
        menuDiv.className="nav-menu"
    }
}


// to copy public-private key from blockchain_client -> index.html
function copyTextToClipboard(event){
    // console.log(event.target.getAttribute("id"));
    targetId = event.target;
    if(targetId.getAttribute("id") === "public-copy-btn"){
        textAreaKeis[0].focus();
        textAreaKeis[0].select();
    
        try {
        var successful = document.execCommand('copy');
            if(successful){
                copyBtns[0].innerText = "Copied";  
            }
        } catch (err) {
        alert("Oops, copy button didn't work, Please copy manually");
        }finally{
            targetId.setAttribute("id", "public-copied-btn")
        }
    }else{
        textAreaKeis[1].focus();
        textAreaKeis[1].select();
    
        try {
        var successful = document.execCommand('copy');
            if(successful){
                copyBtns[1].innerText = "Copied"; 

            }
        } catch (err) {
        alert("Oops, copy button didn't work, Please copy manually");
        }finally{
            targetId.setAttribute("id", "private-copied-btn")
        }
    }
}
