document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.return-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const editMangaForm = document.getElementById('edit-manga-form');
    editMangaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        editManga();
    });

    loadMangaData();
});

function loadMangaData() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = parseInt(urlParams.get('id'), 10);

    if (!isNaN(mangaId)) {
        const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
        
        const manga = mangas[mangaId]; 

        if (manga) {
            document.getElementById('title').value = manga.title;
            document.getElementById('chapters').value = manga.chapter;
            document.getElementById('url').value = manga.url;
            document.getElementById('status').value = manga.status;
        }
    }
}


function editManga() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');
    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];

    if (!isNaN(mangaId) && mangas[mangaId]) {
        mangas[mangaId] = {
            id: mangaId,
            title: document.getElementById('title').value,
            chapter: parseInt(document.getElementById('chapters').value, 10),
            url: document.getElementById('url').value,
            status: document.getElementById('status').value
        };

        localStorage.setItem('mangas', JSON.stringify(mangas));
        window.location.href = 'index.html';
    }
}