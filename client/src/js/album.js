'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper();

function display(albums) {
    const container = document.getElementById('albums-container');
    container.innerHTML = '';

    albums.forEach((album) => {
        const div = document.createElement('div');
        div.className = 'album';
        div.dataset.id = album.id;

        api.getUser(album.userId).then((user) => {
            div.innerHTML = `
                <h2>${album.title}</h2>
                <p>User: ${user.name}</p>
                <div>
                    <button class="edit-album" data-id="${album.id}">Edit</button>
                    <button class="delete-album" data-id="${album.id}">Delete</button>
                </div>
            `;
            container.appendChild(div);

            div.querySelector('.edit-album').addEventListener('click', handleEdit);
            div.querySelector('.delete-album').addEventListener('click', handleDelete);
        });
    });
}


async function handleEdit(event) {
    const albumId = event.target.getAttribute('data-id');

    try {
        const album = await api.getAlbum(albumId);

        const form = document.getElementById('album-form');
        form.dataset.editId = albumId;
        form.querySelector('#title').value = album.title || '';

        const userIdSelect = form.querySelector('#userIdSelect');
        const userOption = userIdSelect.querySelector(`option[value="${album.userId}"]`);
        if (userOption) {
            userOption.selected = true;
        }

        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching album data for editing:', error);
    }
}

let idToDelete = null;

function handleDelete(event) {
    idToDelete = event.target.getAttribute('data-id');
    const deleteModal = new bootstrap.Modal('#deleteModal');
    deleteModal.show();
}


async function confirmDelete() {
    if (idToDelete) {
        try {
            await api.deleteAlbum(idToDelete);
            const albums = await api.getAlbums();

            const closeModal = document.getElementById('closeModalBtn');
            if (closeModal) {
                closeModal.click();
            }

            display(albums);
        } catch (error) {
            console.error('Error deleting album:', error);
        } finally {
            idToDelete = null;
        }
    }
}

// Eventos iniciais
document.getElementById('confirmDelete').addEventListener('click', confirmDelete);

// Função para adicionar ou atualizar um album
async function handleAddOrUpdate(event) {
    event.preventDefault();

    const form = event.target;
    const albumId = form.dataset.editId || null; // Verifica se é uma edição
    const formData = new FormData(form);

    const userIdSelect = form.querySelector('#userIdSelect');
    const selectedOption = userIdSelect.options[userIdSelect.selectedIndex];

    const data = {
        title: formData.get('title'),
        userId: selectedOption.value
    };

    try {
        if (albumId) {
            // Atualizar album existente
            await api.updateAlbum(albumId, data);
            delete form.dataset.editId; // Remove o ID após a edição
        } else {
            // Criar novo album
            await api.createAlbum(data);
        }

        const albums = await api.getAlbums();
        display(albums);
        form.reset(); // Limpa o formulário após enviar
    } catch (error) {
        console.error('Error adding or updating album:', error);
    }
}
// Eventos iniciais
document.getElementById('album-form').addEventListener('submit', handleAddOrUpdate);

async function usersSelect(users) {
  const usersSelect = document.getElementById('userIdSelect');

  users.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    usersSelect.appendChild(option);
  });
}

// Chamada inicial para carregar os usuários
(async function initialize() {
    try {
        const albums = await api.getAlbums();
        display(albums);

        const users = await api.getUsers();
        usersSelect(users);
    } catch (error) {
        console.error('Error fetching albums or users:', error);

        const container = document.getElementById('album-container');
        container.innerHTML = '<p>Failed to load users. Please try again later.</p>';
    }
})();

