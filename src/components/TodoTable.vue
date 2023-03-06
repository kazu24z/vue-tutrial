<template>
  <div id="todo-table">
    <table>
      <thead>
        <tr v-if="todos.length===0"></tr>
        <tr v-else>
          <th>Done</th>
          <th>ID</th>
          <th>Title</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="todos.length===0"><p>No Task</p></tr>
        <tr v-else v-for="item in todos" v-bind:key="item.id">
          <!-- チェックボックス -->
          <td><input type="checkbox" v-model="item.isDone"></td>
          <!-- ID -->
          <td>{{ item.id +1 }}</td>
          <!-- タスクタイトル -->
          <td v-bind:class="{done: item.isDone}">
            <div v-if="item.isEditing"><input ref="saveTitle" v-bind:value="item.title"></div>
            <div v-else>{{ item.title }}</div>
          </td>
          <!-- 期日 -->
          <td>{{ item.date }}</td>

          <!-- 編集 -->
          <td v-if="!item.isEditing">
            <button class="edit" v-on:click="handleEdit(item)">Edit</button>
          </td>
          <!-- 保存 -->
          <td v-else>
            <button class="save" v-on:click="handleSave(item)">Save</button>
          </td>
          <!-- 削除 -->
          <td v-if="!item.isEditing">
            <button class="delete" v-on:click="handleDelete(item)">Delete</button>
          </td>          
          <!-- 編集キャンセル -->
          <td v-else>
            <button class="cancel" v-on:click="handleCancel(item)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TodoTable',
  props: {
    todos: Array
  },
  data() {
    return {
    }
  },
  methods: {
      handleEdit: function(item) {
        this.todos[item.id].isEditing = true
      },
      handleSave: function(item) {
        item.title = this.$refs.saveTitle[item.id].value
        item.isEditing = false
        this.$emit("save-todo", item)
        
      },
      handleCancel: function(item) {
        this.todos[item.id].isEditing = false
      },
      handleDelete: function(item) {
        this.$emit("delete-todo", item)
      }
    }
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
.edit {
  background-color: green;
}
.save {
  background-color: blue;
}
.delete {
  background-color: red;
}
.cancel {
  background-color: orangered;
}
</style>
