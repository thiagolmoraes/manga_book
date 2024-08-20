document.addEventListener('DOMContentLoaded', () => {
    // Carrega a lista de mangás do localStorage ao carregar a página
    const storedMangas = JSON.parse(localStorage.getItem('mangas')) || [];
    
    if (storedMangas.length === 0) {
        displayNoMangasMessage();
    } else {
        storedMangas.forEach((manga, index) => {
            addMangaToDOM(manga, index);
        });
    }

    // Adiciona o event listener ao botão de adicionar mangá
    document.querySelector('.add-manga-btn').addEventListener('click', addManga);
});

// Função para exibir a mensagem de "Nenhum mangá adicionado"
function displayNoMangasMessage() {
    const mangaList = document.querySelector('.manga-list');
    const message = document.createElement('p');
    message.classList.add('no-manga-message');
    message.textContent = "Nenhum mangá adicionado.";
    mangaList.appendChild(message);
}

// Função para remover a mensagem de "Nenhum mangá adicionado" quando um novo mangá for adicionado
function removeNoMangasMessage() {
    const message = document.querySelector('.no-manga-message');
    if (message) {
        message.remove();
    }
}

// Função para adicionar um novo mangá
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
        };

        const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
        mangas.push(manga);
        localStorage.setItem('mangas', JSON.stringify(mangas));

        // Adicionar ao DOM
        removeNoMangasMessage(); // Remove a mensagem de "Nenhum mangá adicionado"
        addMangaToDOM(manga, mangas.length - 1);
    }
}

// Função para adicionar o mangá ao DOM
function addMangaToDOM(manga, index) {
    const mangaList = document.querySelector('.manga-list');

    const mangaCard = document.createElement('div');
    mangaCard.classList.add('manga-card');
    mangaCard.setAttribute('data-id', index); // Atribui um identificador único

    mangaCard.innerHTML = `
        <div class="manga-info">
            <h3>${manga.title}</h3>
            <p class="chapter-info">Capítulo: ${manga.chapter}</p>
        </div>
        <button class="read-btn">Lido</button>
    `;

    // Adiciona o event listener ao botão "Lido"
    mangaCard.querySelector('.read-btn').addEventListener('click', () => {
        markAsRead(index);
    });

    mangaList.appendChild(mangaCard);
}

// Função para incrementar o capítulo e atualizar o localStorage e o DOM
function markAsRead(index) {
    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    const manga = mangas[index];

    if (manga) {
        // Incrementa o capítulo
        manga.chapter += 1;

        // Atualiza o localStorage
        localStorage.setItem('mangas', JSON.stringify(mangas));

        // Atualiza o DOM
        const mangaCard = document.querySelector(`.manga-card[data-id="${index}"]`);
        mangaCard.querySelector('.chapter-info').textContent = `Capítulo: ${manga.chapter}`;
    }
}
