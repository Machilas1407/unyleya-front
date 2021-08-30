import api from './index.js';

export default {
    getAll() {
        return api.get('/livros')
    },

    getOne(LivroId) {
        return api.get(`/livros/${LivroId}`)
    },

    updateOne(LivroId, objLivro) {
        return api.put(`/livros/${LivroId}`, objLivro)
    },

    createOne(objLivro){
        return api.post('/livros', objLivro)
    },

    deleteOne(LivroId) {
        return api.delete(`/livros/${LivroId}`)
    },

};