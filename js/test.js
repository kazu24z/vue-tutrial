var vm = new Vue({
  el: '#event-handling',
  data: {
    message: ''
  },
  methods: {
    warn: function (message) {
      // ネイティブイベントを参照しています
      alert(message)
    }
  }
})