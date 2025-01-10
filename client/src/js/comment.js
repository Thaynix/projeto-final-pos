'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper();

function display(comments) {
    const container = document.getElementById('comments-container').querySelector('tbody');
    container.innerHTML = ''; // Limpa o container antes de renderizar

    comments.forEach((comment) => {
        const tr = document.createElement('tr');
        tr.className = 'comment';
        tr.dataset.id = comment.id;

        api.getPost(comment.postId).then((post) => {
            tr.innerHTML = `
                <td>${comment.name}</td> 
                <td>(${comment.email})</td>
                <td>${post.title}</td>
                <td>${comment.body}</td>
                <div class="d-flex justify-content-start gap-2 mt-2">
                    <button class="btn btn-primary edit-comment" data-id="${comment.id}">Edit</button>
                    <button class="btn btn-danger delete-comment" data-id="${comment.id}">Delete</button>
                </div>
            `;
            container.appendChild(tr);

            // Adiciona os eventos após o elemento ser adicionado ao DOM
            tr.querySelector('.edit-comment').addEventListener('click', handleEdit);
            tr.querySelector('.delete-comment').addEventListener('click', handleDelete);
        });
    });
}


// Função para lidar com a edição de usuários
async function handleEdit(event) {
    const commentId = event.target.getAttribute('data-id');

    try {
        const comment = await api.getComment(commentId);

        const form = document.getElementById('comment-form');
        form.dataset.editId = commentId;
        form.querySelector('#name').value = comment.name || '';
        form.querySelector('#email').value = comment.email || '';
        form.querySelector('#body').value = comment.body || '';

        const postIdSelect = form.querySelector('#postIdSelect');
        const postOption = postIdSelect.querySelector(`option[value="${comment.postId}"]`);
        if (postOption) {
            postOption.selected = true;
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
            await api.deleteComment(idToDelete);
            const comments = await api.getComments();

            const closeModal = document.getElementById('closeModalBtn');
            if (closeModal) {
                closeModal.click();
            }

            display(comments);
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
    const commentId = form.dataset.editId || null;
    const formData = new FormData(form);

    const postIdSelect = form.querySelector('#postIdSelect');
    const selectedOption = postIdSelect.options[postIdSelect.selectedIndex];

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        body: formData.get('body'),
        postId: selectedOption.value
    };

    try {
        if (commentId) {
            await api.updateComment(commentId, data);
            delete form.dataset.editId;
        } else {
            await api.createComment(data);
        }

        const comment = await api.getComments();
        display(comment);
        form.reset();
    } catch (error) {
        console.error('Error adding or updating post:', error);
    }
}
// Eventos iniciais
document.getElementById('comment-form').addEventListener('submit', handleAddOrUpdate);

async function postSelect(posts) {
  const postSelect = document.getElementById('postIdSelect');

  posts.forEach((post) => {
    const option = document.createElement('option');
    option.value = post.id;
    option.textContent = post.title;
    postSelect.appendChild(option);
  });
}

// Chamada inicial para carregar os usuários
(async function initialize() {
    try {
        const comments= await api.getComments();
        display(comments);

        const posts = await api.getPosts();
        postSelect(posts);
    } catch (error) {
        console.error('Error fetching posts or users:', error);

        const container = document.getElementById('post-container');
        container.innerHTML = '<p>Failed to load users. Please try again later.</p>';
    }
})();

