<template>
  <div id="todo-form">
    <form v-on:submit.prevent="handleSubmit">
      <label>Todo</label>
      <input type="text" v-model="todo.title" placeholder="todo">
      <label>Date</label>
      <input type="date" v-model="todo.date" placeholder="date">
      <button type="submit">add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
    return {
      todo: {
        title: '',
        date: ''
      }
    }
  },
  methods: {
    handleSubmit : function() {
      this.$emit("add-todo", this.todo)
    }
  }
}
</script>
