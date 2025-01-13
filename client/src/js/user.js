'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper();

function display(users) {
    const container = document.getElementById('users-container').querySelector('tbody');
    container.innerHTML = '';

    users.forEach((user) => {
        const tr = document.createElement('tr');
        tr.className = 'user';

        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.company_name}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
            <td class="text-center d-flex justify-content-center gap-2">
                <button class="edit-user btn btn-primary" data-id="${user.id}">Edit</button>
                <button class="delete-user btn btn-danger" data-id="${user.id}">Delete</button>
            </td>
        `;

        container.appendChild(tr);
    });

    // Adiciona eventos aos botões
    document.querySelectorAll('.edit-user').forEach((button) => {
        button.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete-user').forEach((button) => {
        button.addEventListener('click', handleDelete);
    });
}

// Função para lidar com a edição de usuários
async function handleEdit(event) {
    const userId = event.target.getAttribute('data-id');

    try {
        const user = await api.getUser(userId);

        const form = document.getElementById('user-form');
        form.dataset.editId = userId;
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

        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching user data for editing:', error);
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
            await api.deleteUser(idToDelete);
            const users = await api.getUsers();

            const closeModal = document.getElementById('closeModalBtn');
            if (closeModal) {
                closeModal.click();
            }

            display(users);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        } finally {
            idToDelete = null;
        }
    }
}

document.getElementById('confirmDelete').addEventListener('click', confirmDelete);

async function handleAddOrUpdate(event) {
    event.preventDefault();

    const form = event.target;
    const userId = form.dataset.editId || null;
    const formData = new FormData(form);

    const data = {
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
            await api.updateUser(userId, data);
            delete form.dataset.editId;
        } else {
            await api.createUser(data);
        }

        const users = await api.getUsers();
        display(users);
        form.reset();
    } catch (error) {
        console.error('Error adding or updating user:', error);
    }
}

document.getElementById('user-form').addEventListener('submit', handleAddOrUpdate);


(async function initialize() {
    try {
        const users = await api.getUsers();
        display(users);
    } catch (error) {
        console.error('Error fetching users:', error);

        const usersContainer = document.getElementById('users-container');
        usersContainer.innerHTML = '<p>Failed to load users. Please try again later.</p>';
    }
})();
