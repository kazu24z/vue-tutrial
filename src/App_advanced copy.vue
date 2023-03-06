<template>
  <div
    id="app"
    class="#"
  >
    <h1>ToDoアプリ</h1>
    <todo-form></todo-form>
    <todo-table></todo-table>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoTable from './components/TodoTable.vue'

export default {
  components: {
    TodoForm,
    TodoTable
  },

}
</script>
