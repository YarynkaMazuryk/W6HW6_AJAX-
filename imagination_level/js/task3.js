const filmsContainer = document.querySelector('.filmsContainer');
const keyButton = document.querySelector('.key');
const searchButton = document.querySelector('.search');
const defaultFilm = 'war';
searchFilms(defaultFilm);
searchButton.addEventListener('click', function () {
    const currentGenre = keyButton.value;
    searchFilms(currentGenre);
});
function searchFilms(keyWord) {
    if (!(keyWord === '')) {
        fetch(`http://api.tvmaze.com/search/shows/?q=${keyWord}`)
            .then(response => response.json())
            .then(data => {
                if (!(data.length === 0)) {
                    let needData = [];
                    for (let i = 0; i < data.length; i++) {
                        needData.push(data[i].show);
                    }
                    deleteErroorBlock()
                    clearContainer();
                    addImg(needData);
                }
                else {
                    clearContainer();
                    error();
                }

            })
    }
    else {
        alert('Please enter the genre');
    }
}
function addImg(needInfo) {
    for (let i = 0; i < needInfo.length; i++) {
        if (!(needInfo[i].image === null)) {
            const posterImg = document.createElement('img');
            posterImg.src = needInfo[i].image.medium;
            const poster = document.createElement('div');
            const posterInfo = document.createElement('div');
            poster.classList.add('col-3', 'poster');
            filmsContainer.appendChild(poster);
            poster.appendChild(posterImg);
            poster.appendChild(posterInfo);
            addInfo(needInfo[i], posterInfo);
        }
    }
}
function addInfo(info, container) {
    let infoArray = [];
    for (let key in info) {
        if ((key === 'name')) {
            infoArray.push(`<p>${info[key]}</p>`);
        }
        if (key === 'summary') {
            if (!(info[key] === null)) {
                infoArray.push(info[key]);
            }
        }
    }
    var html = container.innerHTML
    for (let i = 0; i < infoArray.length; i++) {
        html = html + infoArray[i];
    }
    container.innerHTML = html;
}
function clearContainer() {
    const poster = document.getElementsByClassName('poster');
    const length = poster.length;
    for (let i = 0; i < poster.length; i++) {
        poster[0].remove();
    }
}

function error() {
    deleteErroorBlock();
    const error = document.createElement('p');
    filmsContainer.appendChild(error);
    error.classList.add('styleError');
    error.innerHTML = 'Film is not found, please enter other genre or movie title';
}
function deleteErroorBlock() {
    const currentErrors = document.getElementsByClassName('styleError');
    if (currentErrors.length) {
        for (let i = 0; i < currentErrors.length; i++) {
            currentErrors[i].remove();
        }
    }
}


