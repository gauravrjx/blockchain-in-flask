window.onload = function (){
    const copyBtns = document.getElementsByClassName("copy-btn");
    const textAreaKeis = document.getElementsByClassName("txt-area-key");
    const walletBtn = document.querySelector(".wallet-btn");

    copyBtns[0].addEventListener('click', copyTextToClipboard);
    copyBtns[1].addEventListener('click', copyTextToClipboard);
    walletBtn.addEventListener('click', genKeyAjax);


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
    //ENDS: index.html -> blockchain_client 

}