import axios from '../utils/axios'

export default class Todo {
    async index() {
        const {data} = await axios.get('/todos')
        // utilizando desestruturação para pegar apenas o data da resposta de chamada da API
        // o restante do endereço ta configurado no arquivo axios.js
        return data
    }
    async store({title, done}) {
        // desestruturação no parametro
        const {data} = await axios.post('/todos', {title, done})
        return data
    }
    async update({id, title, done}) {
        // desestruturação no parametro
        const {data} = await axios.put(`/todos/${id}`, {title, done})
        return data
    }
    async delete({id}) {
        // desestruturação no parametro
        await axios.delete(`/todos/${id}`)
    }
}