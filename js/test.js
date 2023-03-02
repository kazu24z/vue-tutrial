var vm = new Vue({
  el: '#event-handling1',
  data: {
    message: ''
  },
  methods: {
    showMessage: function() {
      this.message = "ボタン押したな!!!!（怒）"
    }
  }
})