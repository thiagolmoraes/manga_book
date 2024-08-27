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
    document.querySelector('.edit-manga-btn').addEventListener('click', () => {
        if (selectedManga !== null) {
            editManga();
        } else {
            alert('Por favor, selecione um mangá para editar');
        }
    });
    
});

let isSelectionMode = false;
let selectedManga = null;

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

function formataData() {
    const data = new Date();
    return data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear();
}

function addManga() {
    const title = prompt("Digite o título do mangá:");
    const chapter = prompt("Digite o capítulo atual:");
    const url = prompt("Digite a URL do mangá:");

    if (chapter === null || isNaN(chapter) || chapter.trim() === '') {
        alert("O capítulo deve ser um número.");
        return;
    }

    if (url === null || url.trim() === '') {
        alert("A URL não pode estar vazia.");
        return;
    }

    if (title == null || title.trim() === '') {
        alert("O título não pode estar vazio.");
        return;
    }

    const manga = {
        title: title,
        chapter: parseInt(chapter, 10),
        lastReadDate: '',
        url:url || ''
    };

    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    mangas.push(manga);
    localStorage.setItem('mangas', JSON.stringify(mangas));

    removeNoMangasMessage(); 
    addMangaToDOM(manga, mangas.length - 1);
   
}

function addMangaToDOM(manga, index) {
    const mangaList = document.querySelector('.manga-list');

    const mangaCard = document.createElement('div');
    mangaCard.classList.add('manga-card');
    mangaCard.setAttribute('data-id', index); 


    mangaCard.innerHTML = `
        <div class="manga-info">
            <h3>${manga.url ? `<a href="${manga.url}" target="_blank">${manga.title}</a>` : manga.title}</h3>
            <p class="chapter-info">Capítulo: ${manga.chapter}</p>
            <p class="date-info" style="display: ${manga.lastReadDate ? 'block' : 'none'};">Lido em: ${manga.lastReadDate || ''}</p>
        </div>
        <button class="read-btn">Lido</button>
    `;

    mangaCard.querySelector('.read-btn').addEventListener('click', () => {
        markAsRead(index);
    });

    mangaCard.addEventListener('click', () => {
        document.querySelectorAll('.manga-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        mangaCard.classList.add('selected');
        selectedManga = index;
    });

    mangaList.appendChild(mangaCard);
}

function markAsRead(index) {
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

function editManga() {
    if (selectedManga !== null) {
        const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
        const manga = mangas[selectedManga];

        const newTitle = prompt("Digite o novo título do mangá:", manga.title);
        const newChapter = prompt("Digite o novo capítulo atual:", manga.chapter);
        const url = prompt("Digite a nova URL do mangá:", manga.url);

        if (newTitle && newChapter && !isNaN(newChapter)) {
            manga.title = newTitle;
            manga.chapter = parseInt(newChapter, 10);
            manga.url = url;

            localStorage.setItem('mangas', JSON.stringify(mangas));

            const mangaList = document.querySelector('.manga-list');
            mangaList.innerHTML = '';
            mangas.forEach((manga, index) => {
                addMangaToDOM(manga, index);
            });

            selectedManga = null;
            isSelectionMode = false;
            document.querySelectorAll('.manga-card').forEach(card => {
                card.classList.remove('selected');
            });
        } else {
            alert("Entrada inválida. O mangá não foi editado.");
        }
    } else {
        alert('Por favor, selecione um mangá para editar');
    }
}
