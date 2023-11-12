function savePerson(){
    const name = document.querySelector('.nameInput');
    const email = document.querySelector('.emailInput');
    if (!name.value || !email.value) {
        alert('Please enter both name and email.');
        return;
    }

    const existingPersons = document.querySelectorAll('.existingPerson');
    for (const person of existingPersons) {
        const existingName = person.querySelector('.nameComponent');
        const existingEmail = person.querySelector('.emailComponent');

        if (existingName.textContent === "Name:" + name.value && existingEmail.textContent === "Email:" + email.value) {
            alert('This person already exists.');
            return;
        }
    }

    var data = {
        name: name.value,
        email: email.value
    };

    

    instantiatePerson(name.value, email.value);

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

function sendData(){

    const peopleNamesElements = document.querySelectorAll('.nameComponent');
    const peopleEmailsElements = document.querySelectorAll('.emailComponent');
    
    const peopleData = {};

    peopleNamesElements.forEach((nameElement, index) => {
        const name = nameElement.textContent;
        const emailElement = peopleEmailsElements[index];
        const email = emailElement.textContent;

        peopleData[name] = email;
    });


    fetch('/endpoint', {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(peopleData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Work with the response data
            console.log(data);
        })
        .catch(error => {
            // common error
            return null;
        });
    
}

function instantiatePerson(name, email) {
    var newPersonDiv = document.createElement('div');
    newPersonDiv.className = 'existingPerson';

    var nameParagraph = document.createElement('p');
    nameParagraph.className = 'nameComponent';
    nameParagraph.textContent = name;
    newPersonDiv.appendChild(nameParagraph);

    var dashParagraph = document.createElement('p');
    dashParagraph.textContent = '-';
    newPersonDiv.appendChild(dashParagraph);

    var emailParagraph = document.createElement('p');
    emailParagraph.className = 'emailComponent';
    emailParagraph.textContent = email;
    newPersonDiv.appendChild(emailParagraph);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'x';
    deleteButton.onclick = function () {
        deletePerson(this);
    };
    newPersonDiv.appendChild(deleteButton);

    const personList = document.querySelector('.personList');
    const lastElement = document.querySelector('.newPerson');
    personList.insertBefore(newPersonDiv, lastElement);
}

function deletePerson(button) {
    var parentElement = button.parentNode;

    if (parentElement) {
        parentElement.removeChild(button);
        parentElement.parentNode.removeChild(parentElement);
    }
}