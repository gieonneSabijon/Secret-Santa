function savePerson(){
    const name = document.querySelector('.nameInput');
    const email = document.querySelector('.emailInput');
    console.log(name.value);



    name.value = "";
    email.value = "";
    toggleDialog('close');
}


function toggleDialog(toggle) {
    var dialog = document.getElementsByClassName('editWrapper')[0];

    if (dialog) {
        if (toggle === "open") {
            dialog.showModal();
        } else if (toggle === "close") {
            dialog.close();
        }
    } else {
        console.error("Dialog element not found.");
    }
}

