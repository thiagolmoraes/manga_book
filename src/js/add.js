document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.return-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const addMangaForm = document.getElementById('add-manga-form');
    addMangaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addManga();
    });
});


function formataData() {
    const data = new Date();
    return data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear();
}

function addManga() {
    const titleInput = document.getElementById('title');
    const chapterInput = document.getElementById('chapters');
    const urlInput = document.getElementById('url');
    const statusInput = document.getElementById('status');
    

    const title = titleInput.value;
    const chapter = chapterInput.value;
    const url = urlInput.value; 
    const status = statusInput.value;
    const manga = {
        title,
        chapter: parseInt(chapter, 10),
        url,
        status,
    };

    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    mangas.push(manga);
    localStorage.setItem('mangas', JSON.stringify(mangas));
    window.location.href = 'index.html';
}
