function savePerson(){
    const name = document.querySelector('.nameInput');
    const email = document.querySelector('.emailInput');
    if (!name.value || !email.value) {
        alert('Please enter both name and email.');
        return;
    }

    var data = {
        name: name.value,
        email: email.value
    };

    postPersonInfo(data)



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

function postPersonInfo(data){
    fetch('/endpoint', {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            // network failure, request prevented
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }
    
    
            return Promise.reject(new Error(response.statusText));
        })
        .catch(error => {
            // common error
            return null;
        });
    
}
