import Todos from './api/todos'
import './assets/css/main.css'
import { createApp } from 'vue'
import axios from './utils/axios'
console.log("Hello World")

// Biblioteca que simula uma API REST - Json Server
// Pasta -> fake_api -> npm init -y (Package.json) -> npm i json-server -D -> Arquivo (db.json) com um JSON de todos, com id, text e done -> mudando comando do package.json para rodar servidor local

// Conigurar front pra fazer chammdas nessa API, com AXIOS para fazer as requisições http

const apiTodos = new Todos()
const app = createApp({
    data() {
        return {
            todos: [], // lista de todo
            form: {
                title: "",
                done: false,
            },
            error: "",
        }
    },
    created() {
        this.returnTodos()
    },
    methods: {
        async returnTodos() {
            try {
                this.todos = await apiTodos.index()
            }
            catch(e) {
                console.warn('Erro ao buscar os dados')
                this.error = "Ops! Parece que houve um problema ao recuperar as tarefas"
            }
        },
        async createTodos() {
            try {
                const data = await apiTodos.store(
                    this.form
                )
                this.todos.push(data)
            } catch(e) {
                this.error = "Ops! Parece que houve um problema ao criar a tarefa"
                console.log(e)
            }
            
        },
        async toggleTodoStatus(todo) {
            try {
                const data = await apiTodos.update({
                    ...todo,
                    done: !todo.done,
                })
                const index = this.todos.findIndex((todo) => todo.id === data.id)
                this.todos[index] = data
            } catch(e) {
                this.error = `Ops! Parece que houve um problema ao alterar o status desta tarefa`
            }
           
        },
        async deleteTodo(id) {
            try {
                const data = await apiTodos.delete({id})
                const index = this.todos.findIndex((todo) => todo.id === id)
                this.todos.splice(index, 1)
            } catch(e) {
                this.error = "Ops! Parece que houve um problema ao excluir a tarefa"
            }
        },
        addTodo() {
            this.createTodos()
            this.form.title = "",
            this.form.done = false
        },
    }
})
app.mount("#app")