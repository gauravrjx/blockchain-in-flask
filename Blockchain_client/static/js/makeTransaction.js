console.log(12345678);

window.onload = function(){
    //Selectors
    const tranForm = document.querySelector("#tran-form");
    // const tranForm = document.getElementsByTagName("form");
    const senderPubKey = document.querySelector(".pub-key-f-tra");
    const senderPriKey = document.querySelector(".pri-key-f-tra");
    const recipientPubKey = document.querySelector(".rcvr-pub-key-f-trac");
    const amtToSend = document.querySelector(".amt-f-trac");
    // const tranBtn = document.querySelector("tran-form-btn");

    // Event Listeners
    //make_transaction.html -> blockchain_client
    tranForm.addEventListener('submit', tranAjax);
    // tranBtn.addEventListener('click', tranAjax);

    // Functions


    // make transaction
    function tranAjax(e) {
        e.preventDefault();

        const xrh = new XMLHttpRequest();

        xrh.onload = function () {
            if (this.status === 200) {
                alert('success');
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
            'recipient_public_key': recipientPubKey.value,
            'amount': amtToSend.value
        });
        xrh.send(data);
    }
}
