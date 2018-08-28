const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear');
const form = document.getElementById('myForm');
clearButton.addEventListener('click', clearContainer);
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value
    const age = document.getElementById('age-input').value
    searchUsers(username, age);
    form.reset();
});
function searchUsers(username, age) {
    if (!(username === '' || age === '')) {
        fetch(`http://localhost:3000/users?username=${username}&age=${age}`)
            .then(response => {
                response.json()
                    .then(function (data) {
                        if (!(data.length === 0)) {
                            getInfoAboutUser(data[0]);
                        }
                        else {
                            error();
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        alert('Please fill all Required Field');
    }
}
function getInfoAboutUser(data) {
    deleteErrorBlock();
    const divElement = document.createElement('div');
    divElement.classList.add('styleInfo');
    document.body.appendChild(divElement);
    let infoArray = [];
    for (let key in data) {
        infoArray.push(`<p><span>${key}</span><span>:</span>${data[key]}</p>`);
    }
    let clippedInfoArray = infoArray.slice(1, 6);
    let html = divElement.innerHTML
    for (let i = 0; i < clippedInfoArray.length; i++) {
        html = html + clippedInfoArray[i];
    }
    divElement.innerHTML = html;
}
function clearContainer() {
    const divElement = document.getElementsByClassName('styleInfo');
    for (let i = 0; i < divElement.length; i++) {
        divElement[i].remove();
    }
}
function error() {
    deleteErrorBlock();
    const error = document.createElement('p');
    document.body.appendChild(error);
    error.classList.add('styleError');
    error.innerHTML = 'Users not foud';
}
function deleteErrorBlock() {
    const currentErrors = document.getElementsByClassName('styleError');
    if (currentErrors.length) {
        for (let i = 0; i < currentErrors.length; i++) {
            currentErrors[i].remove();
        }
    }
}

