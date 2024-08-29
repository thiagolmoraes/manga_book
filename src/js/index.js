document.addEventListener('DOMContentLoaded', () => {
    const storedMangas = JSON.parse(localStorage.getItem('mangas')) || [];
    
    if (storedMangas.length === 0) {
        displayNoMangasMessage();
    } else {
        storedMangas.forEach((manga, index) => {
            loadMangaList(manga, index);

            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', filterMangas);

            initTabs();
            
        });

    }
    
    document.querySelector('.add-manga-btn').addEventListener('click', function(){
        window.location.href = 'add.html';
    });

    document.querySelector('.conf-manga-btn').addEventListener('click', function(){
        window.location.href = 'config.html';
    });



});


function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterMangasByTag(tab.dataset.tag);
    });
  });
}

function filterMangasByTag(tag) {
  const mangaCards = document.querySelectorAll('.manga-card');
  mangaCards.forEach(card => {
    if (tag === 'all' || card.dataset.status === tag) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}


function filterMangas() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const mangaCards = document.querySelectorAll('.manga-card');

    mangaCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

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

function formatStatus(status) {
    switch(status) {
        case 'pretendo':
            return 'Pretendo Ler';
        case 'lendo':
            return 'Lendo';
        case 'concluido':
            return 'Concluído';
        case 'dropado':
            return 'Dropado';
        case 'hiato':
            return 'Hiato';
        case 'cansei':
            return 'Cansei';
        default:
            return '';
    }
}


function loadMangaList(manga, index) {
    const mangaList = document.querySelector('.manga-list');

    const mangaCard = document.createElement('div');
    mangaCard.classList.add('manga-card');
    mangaCard.setAttribute('data-id', index); 

    mangaCard.setAttribute('data-status', manga.status);


    const tagHtml = manga.status ? `<span class="tags ${manga.status}">${formatStatus(manga.status)}</span>` : '';


    mangaCard.innerHTML = `
        <div class="manga-info">
            <h3>${manga.url ? `<a href="${manga.url}" target="_blank">${manga.title}</a>` : manga.title}</h3>
            <p class="chapter-info">Capítulo: ${manga.chapter}</p>
            <p class="date-info" style="display: ${manga.lastReadDate ? 'block' : 'none'};">Lido em: ${manga.lastReadDate || ''}</p>
            <p class="info" style="display: ${manga.info ? 'block' : 'none'};">${manga.info || ''}</p>

            ${tagHtml}
        </div>
        <div class="manga-actions">
            <button class="read-btn" title="Marcar como lido">
                <i class="fa-regular fa-bookmark"></i>
            </button>
            <button class="next-btn" title="Próximo capítulo">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button class="edit-manga-btn">
                <i class="fa-solid fa-pencil"></i> 
            </button>
        </div>
    `;

    mangaCard.querySelector('.read-btn').addEventListener('click', () => {
        markAsRead(index);
    });

    mangaCard.querySelector('.next-btn').addEventListener('click', () => {
        nextChapter(index);
    });

    mangaCard.querySelector('.edit-manga-btn').addEventListener('click', () => {
            window.location.href = `edit.html?id=${index}`;
    });

    mangaList.appendChild(mangaCard);
}

function nextChapter(index) {
    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    const manga = mangas[index];

    if (manga) {
        manga.chapter += 1;
        manga.lastReadDate = "";
        manga.info = "Capitulo novo";
      
        localStorage.setItem('mangas', JSON.stringify(mangas));
      
        const mangaCard = document.querySelector(`.manga-card[data-id="${index}"]`);
      
        mangaCard.querySelector('.chapter-info').textContent = `Capítulo: ${manga.chapter}`;
      
        const readBtn = mangaCard.querySelector('.read-btn i');
        readBtn.classList.remove('fa-solid');
        readBtn.classList.add('fa-regular');
        
        const dateInfo = mangaCard.querySelector('.date-info');
        dateInfo.textContent = '';
        dateInfo.style.display = 'none';

        const infoElement = mangaCard.querySelector('.info');
        infoElement.textContent = manga.info;
        infoElement.style.display = 'block';

  

    }
}

function markAsRead(index) {
    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    const manga = mangas[index];

    if (manga) {
        // manga.chapter += 1;
        manga.info = "";
        manga.lastReadDate = formataData();

        localStorage.setItem('mangas', JSON.stringify(mangas));

        const mangaCard = document.querySelector(`.manga-card[data-id="${index}"]`);
        // mangaCard.querySelector('.chapter-info').textContent = `Capítulo: ${manga.chapter}`;
        
        const readBtn = mangaCard.querySelector('.read-btn i');
        readBtn.classList.remove('fa-regular');
        readBtn.classList.add('fa-solid');

        const dateInfo = mangaCard.querySelector('.date-info');
        dateInfo.textContent = `Lido em: ${manga.lastReadDate}`;
        dateInfo.style.display = 'block';

        const infoElement = mangaCard.querySelector('.info');
        infoElement.textContent = "";
        infoElement.style.display = 'none';
    }
}

