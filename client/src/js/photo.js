'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper();

function display(photos) {
    const container = document.getElementById('photos-container');
    container.innerHTML = '';

    photos.forEach((photo) => {
        const div = document.createElement('div');
        div.className = 'photo';
        div.dataset.id = photo.id;

        api.getAlbum(photo.albumId).then((album) => {
            div.innerHTML = `
                <h2>${photo.title}</h2>
                <p>Album: ${album.title}</p>
                <img src="${photo.url}" alt="${photo.title}">
                <div>
                    <button class="edit-photo" data-id="${photo.id}">Edit</button>
                    <button class="delete-photo" data-id="${photo.id}">Delete</button>
                </div>
            `;
            container.appendChild(div);

            div.querySelector('.edit-photo').addEventListener('click', handleEdit);
            div.querySelector('.delete-photo').addEventListener('click', handleDelete);
        });
    });
}


async function handleEdit(event) {
    const photoId = event.target.getAttribute('data-id');

    try {
        const photo = await api.getPhoto(photoId);

        const form = document.getElementById('photo-form');
        form.dataset.editId = photoId;
        form.querySelector('#title').value = photo.title || '';
        form.querySelector('#url').value = photo.url || '';
        form.querySelector('#thumbnailUrl').value = photo.thumbnailUrl || '';

        const albumIdSelect = form.querySelector('#albumIdSelect');
        const albumOption = albumIdSelect.querySelector(`option[value="${photo.albumId}"]`);
        if (albumOption) {
            albumOption.selected = true;
        }

        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching photo data for editing:', error);
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
            await api.deletePhoto(idToDelete);
            const photos = await api.getPhotos();

            const closeModal = document.getElementById('closeModalBtn');
            if (closeModal) {
                closeModal.click();
            }

            display(photos);
        } catch (error) {
            console.error('Error deleting photo:', error);
        } finally {
            idToDelete = null;
        }
    }
}

document.getElementById('confirmDelete').addEventListener('click', confirmDelete);

async function handleAddOrUpdate(event) {
    event.preventDefault();
    console.log(event.target);
    const form = event.target;
    const photoId = form.dataset.editId || null;
    const formData = new FormData(form);

    const albumIdSelect = form.querySelector('#albumIdSelect');
    const selectedOption = albumIdSelect.options[albumIdSelect.selectedIndex];

    console.log(formData.get('title'), formData.get('url'), formData.get('thumbnailUrl'), selectedOption.value);
    const data = {
        title: formData.get('title'),
        url: formData.get('url'),
        thumbnailUrl: formData.get('thumbnailUrl'),
        albumId: selectedOption.value
    };

    try {
        if (photoId) {
            await api.updatePhoto(photoId, data);
            delete form.dataset.editId;
        } else {
            await api.createPhoto(data);
        }

        const photos = await api.getPhotos();
        display(photos);
        form.reset();
    } catch (error) {
        console.error('Error adding or updating photo:', error);
    }
}
// Eventos iniciais
document.getElementById('photo-form').addEventListener('submit', handleAddOrUpdate);

async function albumsSelect(albums) {
  const albumsSelect = document.getElementById('albumIdSelect');

  albums.forEach((album) => {
    const option = document.createElement('option');
    option.value = album.id;
    option.textContent = album.title;
    albumsSelect.appendChild(option);
  });
}

// Chamada inicial para carregar os usuários
(async function initialize() {
    try {
        const photos = await api.getPhotos();
        display(photos);

        const albums = await api.getAlbums();
        albumsSelect(albums);
    } catch (error) {
        console.error('Error fetching photos or albums:', error);

        const container = document.getElementById('photo-container');
        container.innerHTML = '<p>Failed to load albums. Please try again later.</p>';
    }
})();

