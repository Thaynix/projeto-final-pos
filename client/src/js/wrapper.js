'use strict';

export class ApiWrapper {
    constructor() {
        this.baseURL = "http://localhost:8000/";
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = { 'Content-Type': 'application/json' };
        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        try {
            return await response.json();
        } catch (error) {
            if (response.status === 204) {
                // No Content (resposta vazia)
                return null;
            }
            throw error;
        }
    }

    // Users
    getUsers() {
        return this.request('users/');
    }

    getUser(id) {
        return this.request(`users/${id}`);
    }

    createUser(data) {
        return this.request('users/', 'POST', data);
    }

    updateUser(id, data) {
        return this.request(`users/${id}/`, 'PUT', data);
    }

    deleteUser(id) {
        return this.request(`users/${id}/`, 'DELETE');
    }

    // User-related
    getUserPosts(userId) {
        return this.request(`users/${userId}/posts/`);
    }

    getUserComments(userId) {
        return this.request(`users/${userId}/comments/`);
    }

    getUserTodos(userId) {
        return this.request(`users/${userId}/todos/`);
    }

    getUserAlbums(userId) {
        return this.request(`users/${userId}/albums/`);
    }

    // Posts
    getPosts() {
        return this.request('posts/');
    }

    getPost(id) {
        return this.request(`posts/${id}/`);
    }

    createPost(data) {
        return this.request('posts/', 'POST', data);
    }

    updatePost(id, data) {
        return this.request(`posts/${id}/`, 'PUT', data);
    }

    deletePost(id) {
        return this.request(`posts/${id}/`, 'DELETE');
    }

    getPostComments(postId) {
        return this.request(`posts/${postId}/comments`);
    }

    // Albums
    getAlbums() {
        return this.request('albums/');
    }

    getAlbum(id) {
        return this.request(`albums/${id}/`);
    }

    createAlbum(data) {
        return this.request('albums/', 'POST', data);
    }

    updateAlbum(id, data) {
        return this.request(`albums/${id}/`, 'PUT', data);
    }

    deleteAlbum(id) {
        return this.request(`albums/${id}/`, 'DELETE');
    }

    getAlbumPhotos(albumId) {
        return this.request(`albums/${albumId}/photos/`);
    }

    // Comments
    getComments() {
        return this.request('comments/');
    }

    getComment(id) {
        return this.request(`comments/${id}/`);
    }

    createComment(data) {
        return this.request('comments/', 'POST', data);
    }

    updateComment(id, data) {
        return this.request(`comments/${id}/`, 'PUT', data);
    }

    deleteComment(id) {
        return this.request(`comments/${id}/`, 'DELETE');
    }

    // Todos
    getTodos() {
        return this.request('todos/');
    }

    getTodo(id) {
        return this.request(`todos/${id}/`);
    }

    createTodo(data) {
        return this.request('todos/', 'POST', data);
    }

    updateTodo(id, data) {
        return this.request(`todos/${id}/`, 'PUT', data);
    }

    deleteTodo(id) {
        return this.request(`todos/${id}/`, 'DELETE');
    }

    // Photos
    getPhotos() {
        return this.request('photos/');
    }

    getPhoto(id) {
        return this.request(`photos/${id}/`);
    }

    createPhoto(data) {
        return this.request('photos/', 'POST', data);
    }

    updatePhoto(id, data) {
        return this.request(`photos/${id}/`, 'PUT', data);
    }

    deletePhoto(id) {
        return this.request(`photos/${id}/`, 'DELETE');
    }
}
