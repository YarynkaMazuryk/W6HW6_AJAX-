let index = 1;
const wrapper = document.getElementById('wrapper');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
function sendRequest(indexPage) {
    axios.get(`https://rickandmortyapi.com/api/character/?page=${indexPage}`)
        .then(response => {
                    response.data.results.forEach(addCharacters);
        })
        .catch(err => {
            console.log(err);
        });
}
function addCharacters(character) {
    const imgElem = document.createElement('img');
    imgElem.src = character.image;
    const blockELem = document.createElement('div');
    const infoContainer = document.createElement('div');
    blockELem.classList.add("styleContainer");
    infoContainer.classList.add("styleInfo");
    wrapper.appendChild(blockELem);
    blockELem.appendChild(imgElem);
    blockELem.appendChild(infoContainer);
    addInfo(character,infoContainer);
    
}
function addInfo(character,container) {
    let infoArray = [];
    for (key in character) {
        infoArray.push(`<p>${character[key]}</p>`);
    }
    let clippedInfoArray = infoArray.slice(1, 4);
    var html = container.innerHTML
    for (let i = 0; i < clippedInfoArray.length; i++) {
        html = html + clippedInfoArray[i];
    }
    container.innerHTML = html;
}
function clearContainer() {
    const divElements = document.getElementsByClassName('styleContainer');
    const length = divElements.length;
    for (let i = 0; i < length; i++) {
        divElements[0].remove();
    }
}
nextButton.addEventListener('click', () => {
    clearContainer();
    if (index > 0) {
        index++;
        sendRequest(index);
    }
    else {
        sendRequest(index);
    }
});
prevButton.addEventListener('click', () => {
    clearContainer();
    if (index > 1) {
        index--;
        sendRequest(index);
    }
    else {
        sendRequest(index);
    }
});
sendRequest(index);
