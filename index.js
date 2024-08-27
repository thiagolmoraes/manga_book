document.addEventListener('DOMContentLoaded', () => {
    const storedMangas = JSON.parse(localStorage.getItem('mangas')) || [];
    
    if (storedMangas.length === 0) {
        displayNoMangasMessage();
    } else {
        storedMangas.forEach((manga, index) => {
            addMangaToDOM(manga, index);
        });
    }

    document.querySelector('.add-manga-btn').addEventListener('click', addManga);
});

function displayNoMangasMessage() {
    const mangaList = document.querySelector('.manga-list');
    const message = document.createElement('p');
    message.classList.add('no-manga-message');
    message.textContent = "Nenhum mangá adicionado.";
    mangaList.appendChild(message);
}

function removeNoMangasMessage() {
    const message = document.querySelector('.no-manga-message');
    if (message) {
        message.remove();
    }
}


function formataData(){
    const data = new Date();
    return data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()
 }

function addManga() {
    const title = prompt("Digite o título do mangá:");
    const chapter = prompt("Digite o capítulo atual:");

    if (chapter === null || isNaN(chapter) || chapter.trim() === '') {
        alert("O capítulo deve ser um número.");
        return;
    }

    if (title && chapter) {
        const manga = {
            title: title,
            chapter: parseInt(chapter, 10),
            LastReadDate: formataData()            
        };

        const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
        mangas.push(manga);
        localStorage.setItem('mangas', JSON.stringify(mangas));

        removeNoMangasMessage(); 
        addMangaToDOM(manga, mangas.length - 1);
    }
}

function addMangaToDOM(manga, index) {
    const mangaList = document.querySelector('.manga-list');

    const mangaCard = document.createElement('div');
    mangaCard.classList.add('manga-card');
    mangaCard.setAttribute('data-id', index); 

    mangaCard.innerHTML = `
        <div class="manga-info">
            <h3>${manga.title}</h3>
            <p class="chapter-info">Capítulo: ${manga.chapter}</p>
            <p class="date-info" style="display: ${manga.lastReadDate ? 'block' : 'none'};">Lido em: ${manga.lastReadDate || ''}</p>
        </div>
        <button class="read-btn">Lido</button>
    `;

    mangaCard.querySelector('.read-btn').addEventListener('click', () => {
        markAsRead(index);
    });

    mangaList.appendChild(mangaCard);
}function markAsRead(index) {
    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    const manga = mangas[index];

    if (manga) {
        manga.chapter += 1;
        manga.lastReadDate = formataData();

        localStorage.setItem('mangas', JSON.stringify(mangas));

        const mangaCard = document.querySelector(`.manga-card[data-id="${index}"]`);
        mangaCard.querySelector('.chapter-info').textContent = `Capítulo: ${manga.chapter}`;
        
        const dateInfo = mangaCard.querySelector('.date-info');
        dateInfo.textContent = `Lido em: ${manga.lastReadDate}`;
        dateInfo.style.display = 'block';
    }
}