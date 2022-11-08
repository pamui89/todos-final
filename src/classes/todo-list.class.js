import { Todo } from "./todo.class";

export class TodoList {

    constructor() {

        this.cargarLocalStorage ();
        this.contarPendientes();
        // this.todos = [];
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
        this.contarPendientes();
    }

    eliminarTodo(id){

        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLocalStorage();
        this.contarPendientes();

    }

    marcarCompletado (id) {

        for (const todo of this.todos) {
            // console.log(id, todo.id);

            if (todo.id == id) {            
            //Hay que poner 2 iguales, porque si ponemos 3, se iguala valor y tipo de dato
            // En este caso, uno es INT, pero el otro es string
            // if (1667817572931 === 1667817572931) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.contarPendientes();
                break;

            }
        }

    }

    eliminarCompletados() {
        
        //Como es un boolean, ya entiende true y false con la exclamación
        this.todos = this.todos.filter(todo => !todo.completado) 
        this.guardarLocalStorage();
        this.contarPendientes();
    }

    guardarLocalStorage () {

        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargarLocalStorage () {

        const objTodo = localStorage.getItem('todo');

        this.todos = (objTodo) 
            ? JSON.parse (objTodo) 
            : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj));
        this.contarPendientes();
    }

    contarPendientes () {

        const arrayPendientes = this.todos.filter(todo => !todo.completado);
        const pendientes = arrayPendientes.length;
        var footer = document.querySelectorAll('strong');
        footer[0].innerHTML = pendientes;

    }

}
