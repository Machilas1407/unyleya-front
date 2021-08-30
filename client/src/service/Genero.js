import api from './index.js';

export default {
    getAll() {
        return api.get('/generos')
    },

    getOne(GeneroId) {
        return api.get(`/generos/${GeneroId}`)
    },

    getGeneroChart() {
        return api.get('/genero-livro')
    },
    
    updateOne(GeneroId, objGenero) {
        return api.put(`/generos/${GeneroId}`, objGenero)
    },

    createOne(objGenero){
        return api.post('/generos', objGenero)
    },

    deleteOne(GeneroId) {
        return api.delete(`/generos/${GeneroId}`)
    },

};