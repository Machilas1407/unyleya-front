import api from './index.js';

export default {
    getAll() {
        return api.get('/autores')
    },

    getOne(AutorId) {
        return api.get(`/autores/${AutorId}`)
    },

    getAutorChart() {
        return api.get('/autor-livro')
    },
    
    updateOne(AutorId, objAutor) {
        return api.put(`/autores/${AutorId}`, objAutor)
    },

    createOne(objAutor){
        return api.post('/autores', objAutor)
    },

    deleteOne(AutorId) {
        return api.delete(`/autores/${AutorId}`)
    },

};