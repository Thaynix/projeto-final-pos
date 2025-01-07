'use strict';

import { ApiWrapper } from './wrapper.js';

const api = new ApiWrapper();

function display(todos) {
    const container = document.getElementById('todos-container');
    container.innerHTML = '';

    todos.forEach((todo) => {
        const div = document.createElement('div');
        div.className = 'todo';
        div.dataset.id = todo.id;

        let statusEl;
        if (todo.completed) {
          statusEl = `<span class="badge text-bg-success">Completed</span>`
        } else {
          statusEl = `<span class="badge text-bg-danger">Not Completed</span>`
        }

        api.getUser(todo.userId).then((user) => {
            div.innerHTML = `
                <h2>${todo.title}</h2>
                <p>User: ${user.name}</p>`
                + statusEl +
                `
                <div>
                    <button class="edit-todo" data-id="${todo.id}">Edit</button>
                    <button class="delete-todo" data-id="${todo.id}">Delete</button>
                </div>
            `;
            container.appendChild(div);

            div.querySelector('.edit-todo').addEventListener('click', handleEdit);
            div.querySelector('.delete-todo').addEventListener('click', handleDelete);
        });
    });
}


// Função para lidar com a edição de usuários
async function handleEdit(event) {
    const todoId = event.target.getAttribute('data-id');

    try {
        const todo = await api.getTodo(todoId);

        const form = document.getElementById('todo-form');
        form.dataset.editId = todoId;
        form.querySelector('#title').value = todo.title || '';
        form.querySelector('#completed').checked = todo.completed;

        const userIdSelect = form.querySelector('#userIdSelect');
        const userOption = userIdSelect.querySelector(`option[value="${todo.userId}"]`);
        if (userOption) {
            userOption.selected = true;
        }

        form.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching todo data for editing:', error);
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
            await api.deleteTodo(idToDelete);
            const todos = await api.getTodos();

            const closeModal = document.getElementById('closeModalBtn');
            if (closeModal) {
                closeModal.click();
            }

            display(todos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        } finally {
            idToDelete = null;
        }
    }
}

// Eventos iniciais
document.getElementById('confirmDelete').addEventListener('click', confirmDelete);

// Função para adicionar ou atualizar um todo
async function handleAddOrUpdate(event) {
    event.preventDefault();

    const form = event.target;
    const todoId = form.dataset.editId || null; // Verifica se é uma edição
    const formData = new FormData(form);

    const userIdSelect = form.querySelector('#userIdSelect');
    const selectedOption = userIdSelect.options[userIdSelect.selectedIndex];

    const data = {
        title: formData.get('title'),
        completed: formData.get('completed') === 'on',
        userId: selectedOption.value
    };

    try {
        if (todoId) {
            // Atualizar todo existente
            await api.updateTodo(todoId, data);
            delete form.dataset.editId; // Remove o ID após a edição
        } else {
            // Criar novo todo
            await api.createTodo(data);
        }

        const todos = await api.getTodos();
        display(todos);
        form.reset(); // Limpa o formulário após enviar
    } catch (error) {
        console.error('Error adding or updating todo:', error);
    }
}
// Eventos iniciais
document.getElementById('todo-form').addEventListener('submit', handleAddOrUpdate);

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
        const todos = await api.getTodos();
        display(todos);

        const users = await api.getUsers();
        usersSelect(users);
    } catch (error) {
        console.error('Error fetching todos or users:', error);

        const container = document.getElementById('todo-container');
        container.innerHTML = '<p>Failed to load users. Please try again later.</p>';
    }
})();

