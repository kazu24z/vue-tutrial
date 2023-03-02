var vm = new Vue({
  el: '#event-handling1',
  data: {
    message: ''
  },
  methods: {
    showMessage: function(message) {
      alert(message)
    }
  }
})