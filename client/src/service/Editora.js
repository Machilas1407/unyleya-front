import api from './index.js';

export default {
    getAll() {
        return api.get('/editoras')
    },

    getOne(EditoraId) {
        return api.get(`/editoras/${EditoraId}`)
    },

    getEditoraChart() {
        return api.get('/editora-livro')
    },
    
    updateOne(EditoraId, objEditora) {
        return api.put(`/editoras/${EditoraId}`, objEditora)
    },

    createOne(objEditora){
        return api.post('/editoras', objEditora)
    },

    deleteOne(EditoraId) {
        return api.delete(`/editoras/${EditoraId}`)
    },

};