document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.return-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('exportBtn').addEventListener('click', exportLocalStorage);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importLocalStorage);

    loadMangaList();
});

function importLocalStorage(event) {
    const file = event.target.files[0];

    if (!file) {
        alert('Por favor, selecione um arquivo para importar.');
        return;
    }

    if (file.type !== 'application/json') {
        alert('Por favor, selecione um arquivo JSON.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (Array.isArray(data) && data.length > 0) {
                localStorage.setItem('mangas', JSON.stringify(data));
                loadMangaList();
                alert('Importação realizada com sucesso!');
            } else {
                alert('O arquivo não contém dados válidos de mangás.');
            }

        } catch (err) {
            alert('Erro ao processar o arquivo. Certifique-se de que o arquivo é um JSON válido.');
        }
    };

    reader.readAsText(file);
}

function loadMangaList() {
    const mangaList = document.getElementById('mangaList');
    mangaList.innerHTML = '';

    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    if (mangas.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum mangá cadastrado';
        mangaList.appendChild(li);
        return;
    }

    mangas.forEach((manga, index) => {
        const li = document.createElement('li');
        li.textContent = manga.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.addEventListener('click', () => deleteManga(index));
        li.appendChild(deleteBtn);

        mangaList.appendChild(li);
    });
}

function deleteManga(index) {
    const mangas = JSON.parse(localStorage.getItem('mangas')) || [];
    mangas.splice(index, 1);
    localStorage.setItem('mangas', JSON.stringify(mangas));
    loadMangaList();
}

function exportLocalStorage() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manga_list_backup.json';
    a.click();
}