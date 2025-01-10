'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper();

function display(posts) {
    const container = document.getElementById('posts-container').querySelector('tbody');
    container.innerHTML = ''; // Limpa o container antes de renderizar

    posts.forEach((post) => {
        const tr = document.createElement('tr');
        tr.className = 'post';
        tr.dataset.id = post.id;

        api.getUser (post.userId).then((user) => {
            tr.innerHTML = `
                <td>${user.name}</td>
                <td class="text-center"><h5>${post.title}</h5></td>
                <td class="text-center">${post.body}</td>
                <td class="text-center d-flex justify-content-center gap-2">
                    <button class="edit-post btn btn-primary" data-id="${post.id}">Edit</button>
                    <button class="delete-post btn btn-danger" data-id="${post.id}">Delete</button>
                </td>
            `;
            container.appendChild(tr);

            // Adiciona os eventos após o elemento ser adicionado ao DOM
            tr.querySelector('.edit-post').addEventListener('click', handleEdit);
            tr.querySelector('.delete-post').addEventListener('click', handleDelete);
        });
    });
}


// Função para lidar com a edição de usuários
async function handleEdit(event) {
    const postId = event.target.getAttribute('data-id');

    try {
        const post = await api.getPost(postId);
        console.log(post);

        const form = document.getElementById('post-form');
        form.dataset.editId = postId;
        form.querySelector('#title').value = post.title || '';
        form.querySelector('#body').value = post.body || '';

        const userIdSelect = form.querySelector('#userIdSelect');
        const userOption = userIdSelect.querySelector(`option[value="${post.userId}"]`);
        if (userOption) {
            userOption.selected = true;
        }

        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching post data for editing:', error);
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
            await api.deletePost(idToDelete);
            const posts = await api.getPosts();

            const closeModal = document.getElementById('closeModalBtn');
            if (closeModal) {
                closeModal.click();
            }

            display(posts);
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            idToDelete = null;
        }
    }
}

// Eventos iniciais
document.getElementById('confirmDelete').addEventListener('click', confirmDelete);

// Função para adicionar ou atualizar um post
async function handleAddOrUpdate(event) {
    event.preventDefault();

    const form = event.target;
    const postId = form.dataset.editId || null; // Verifica se é uma edição
    const formData = new FormData(form);

    const userIdSelect = form.querySelector('#userIdSelect');
    const selectedOption = userIdSelect.options[userIdSelect.selectedIndex];

    const data = {
        title: formData.get('title'),
        body: formData.get('body'),
        userId: selectedOption.value
    };

    try {
        if (postId) {
            // Atualizar post existente
            await api.updatePost(postId, data);
            delete form.dataset.editId; // Remove o ID após a edição
        } else {
            // Criar novo post
            await api.createPost(data);
        }

        const posts = await api.getPosts();
        display(posts);
        form.reset(); // Limpa o formulário após enviar
    } catch (error) {
        console.error('Error adding or updating post:', error);
    }
}
// Eventos iniciais
document.getElementById('post-form').addEventListener('submit', handleAddOrUpdate);

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
        const posts = await api.getPosts();
        display(posts);

        const users = await api.getUsers();
        usersSelect(users);
    } catch (error) {
        console.error('Error fetching posts or users:', error);

        const container = document.getElementById('post-container');
        container.innerHTML = '<p>Failed to load users. Please try again later.</p>';
    }
})();

