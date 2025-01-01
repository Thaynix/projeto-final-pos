'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper('http://localhost:8000/');

// Função para exibir os usuários no DOM
function displayUsers(users) {
    const usersContainer = document.getElementById('users-container');
    usersContainer.innerHTML = ''; // Limpa o container antes de renderizar

    users.forEach((user) => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';

        userDiv.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company_name}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <button class="edit-user" data-id="${user.id}">Edit</button>
            <button class="delete-user" data-id="${user.id}">Delete</button>
        `;

        usersContainer.appendChild(userDiv);
    });

    // Adiciona eventos aos botões
    document.querySelectorAll('.edit-user').forEach((button) => {
        button.addEventListener('click', handleEditUser);
    });

    document.querySelectorAll('.delete-user').forEach((button) => {
        button.addEventListener('click', handleDeleteUser);
    });
}

// Função para lidar com a edição de usuários
async function handleEditUser(event) {
    const userId = event.target.getAttribute('data-id');

    try {
        // Obtenha os dados do usuário
        const user = await api.getUser(userId);

        // Preencha o formulário com os dados do usuário
        const form = document.getElementById('user-form');
        form.dataset.editId = userId; // Armazena o ID no formulário para edição
        form.querySelector('#name').value = user.name || '';
        form.querySelector('#username').value = user.username || '';
        form.querySelector('#email').value = user.email || '';
        form.querySelector('#address-street').value = user.address_street || '';
        form.querySelector('#address-suite').value = user.address_suite || '';
        form.querySelector('#address-city').value = user.address_city || '';
        form.querySelector('#address-zip-code').value = user.address_zip_code || '';
        form.querySelector('#address-geo-lat').value = user.address_geo_lat || '';
        form.querySelector('#address-geo-lng').value = user.address_geo_lng || '';
        form.querySelector('#phone').value = user.phone || '';
        form.querySelector('#website').value = user.website || '';
        form.querySelector('#company-name').value = user.company_name || '';
        form.querySelector('#company-catch-phrase').value = user.company_catch_phrase || '';
        form.querySelector('#company-bs').value = user.company_bs || '';

        // Desloque a visualização para o formulário
        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching user data for editing:', error);
    }
}

let userIdToDelete = null; // Variável global para armazenar o ID do usuário a ser excluído

// Função para lidar com a exclusão de usuários
function handleDeleteUser(event) {
    userIdToDelete = event.target.getAttribute('data-id'); // Salva o ID do usuário a ser excluído
    const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    deleteUserModal.show(); // Exibe o modal de confirmação
}

// Função para confirmar a exclusão
async function confirmDeleteUser() {
    if (userIdToDelete) {
        try {
            await api.deleteUser(userIdToDelete); // Chama a API para excluir o usuário
            console.log('User deleted successfully!');
            const users = await api.getUsers();
            displayUsers(users);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        } finally {
            userIdToDelete = null; // Reseta o ID após a exclusão
        }
    }
}

// Eventos iniciais
document.getElementById('confirmDeleteUser').addEventListener('click', confirmDeleteUser);

// Função para adicionar ou atualizar um usuário
async function handleAddOrUpdateUser(event) {
    event.preventDefault();

    const form = event.target;
    const userId = form.dataset.editId || null; // Verifica se é uma edição
    const formData = new FormData(form);

    const userData = {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        address_street: formData.get('address_street'),
        address_city: formData.get('address_city'),
        address_suite: formData.get('address_suite'),
        address_zip_code: formData.get('address_zip_code'),
        address_geo_lat: formData.get('address_geo_lat'),
        address_geo_lng: formData.get('address_geo_lng'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        company_name: formData.get('company_name'),
        company_catch_phrase: formData.get('company_catch_phrase'),
        company_bs: formData.get('company_bs'),
    };

    try {
        if (userId) {
            // Atualizar usuário existente
            await api.updateUser(userId, userData);
            delete form.dataset.editId; // Remove o ID após a edição
        } else {
            // Criar novo usuário
            await api.createUser(userData);
        }

        const users = await api.getUsers();
        displayUsers(users);
        form.reset(); // Limpa o formulário após enviar
    } catch (error) {
        console.error('Error adding or updating user:', error);
    }
}

// Eventos iniciais
document.getElementById('user-form').addEventListener('submit', handleAddOrUpdateUser);

// Chamada inicial para carregar os usuários
(async function initialize() {
    try {
        const users = await api.getUsers();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);

        const usersContainer = document.getElementById('users-container');
        usersContainer.innerHTML = '<p>Failed to load users. Please try again later.</p>';
    }
})();
