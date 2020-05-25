// selectors
//index.html -> blockchain_client
window.onload = function(){
const menuDiv = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".nav-btn");
const copyBtns = document.getElementsByClassName("copy-btn");
const textAreaKeis = document.getElementsByClassName("txt-area-key");
const walletBtn = document.querySelector(".wallet-btn");
//make_transaction.html -> blockchain_client
const tranForm = document.querySelector("#tran-form");
const senderPubKey = document.querySelector(".pub-key-f-tra");
const senderPriKey = document.querySelector(".pri-key-f-tra");
const rcvrPubKey = document.querySelector(".rcvr-pub-key-f-trac");
const amtToSend = document.querySelector(".amt-f-trac");
const tranBtn = document.querySelector("tran-form-btn");
// console.log(tranForm);

// Event Listener
//index.html -> blockchain_client
menuIcon.addEventListener('click', displayMenu);
copyBtns[0].addEventListener('click', copyTextToClipboard);
copyBtns[1].addEventListener('click', copyTextToClipboard);
walletBtn.addEventListener('click', genKeyAjax);
//make_transaction.html -> blockchain_client
tranForm.addEventListener('submit', tranAjax);
// tranBtn.addEventListener('click', tranAjax);



// Functions

// to display nav items in small screen
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


// NAV-BAR when navicons are shown and windows are maximized nav items should be nav-menu
window.onresize = () => {
    if (window.innerWidth > 768) {
        // console.log(window.innerWidth)
        menuDiv.className = "nav-menu"
    }
}


// to copy public-private key from blockchain_client -> index.html
function copyTextToClipboard(event) {
    // console.log(event.target.getAttribute("id"));
    targetId = event.target;
    if (targetId.getAttribute("id") === "public-copy-btn") {
        textAreaKeis[0].focus();
        textAreaKeis[0].select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                copyBtns[0].innerText = "Copied";
            }
        } catch (err) {
            alert("Oops, copy button didn't work, Please copy manually");
        } finally {
            targetId.setAttribute("id", "public-copied-btn")
        }
    } else {
        textAreaKeis[1].focus();
        textAreaKeis[1].select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                copyBtns[1].innerText = "Copied";

            }
        } catch (err) {
            alert("Oops, copy button didn't work, Please copy manually");
        } finally {
            targetId.setAttribute("id", "private-copied-btn")
        }
    }
}

// to generate key
function genKeyAjax(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status === 200) {
            jsonResponse = JSON.parse(this.response)
            textAreaKeis[0].innerHTML = jsonResponse["public_key"]
            textAreaKeis[1].innerHTML = jsonResponse["private_key"]
            alert("IMPORTANT\n1. Save both keyies as they are not recoverable\n2. Never Share PRIVATE key with anybody.");
        } else {
            alert("An error occured");
        }
    }

    xhr.open("GET", "/wallet/new", true);
    xhr.send();
}

// make transaction
function tranAjax(e) {
    e.preventDefault();

    const xrh = new XMLHttpRequest();

    xrh.onload = function () {
        if (this.status === 200) {
            console.log('form has been submitted!')

        } else {
            console.error();
            alert("An error occured");
        }
    }

    xrh.open("POST", "/generate/transaction", true);
    // to send POST request
    xrh.setRequestHeader("Content-type", "application/json");

    var data = JSON.stringify({
        'sender_public_key': senderPubKey.value,
        'sender_private_key': senderPriKey.value,
        'recipient_public_key': rcvrPubKey.value,
        'amount': amtToSend.value
    });
    xrh.send(data);
}
}