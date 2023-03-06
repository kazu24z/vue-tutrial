<template>
  <div
    id="app"
    class="#"
  >
    <h1>ToDoアプリ</h1>
    <!-- @子側のemitキーワード="親側のメソッド" -->
    <todo-form @add-todo="addTodo"/>
    <todo-table 
      @edit-todo="editTodo"
      @save-todo="saveTodo"
      @delete-todo="deleteTodo" 
      v-bind:todos="todos"
    />
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoTable from './components/TodoTable.vue'

export default {
  name: "app",
  components: {
    TodoForm,
    TodoTable
  },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    addTodo: function(todo) {
      if (!todo.title || !todo.date) {
        return  
      }
      this.todos.push({
        id: this.todos.length === 0? 0: this.todos.slice(-1)[0].id +1 ,
        title: todo.title,
        date: todo.date,
        isDone: false,
        isEditing: false
      })
      todo.title = ''
      todo.date = ''
    },
    editTodo: function(item) {
      console.log(item)
    },
    saveTodo: function(item) {
      this.todos[item.id] = item
      //this.todos.splice(item.id, 1, item)
      console.log(this.todos[item.id])

    },
    deleteTodo: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
      console.log(this.todos)
    }
  }
} 
</script>
