// ローカルストレージの設定
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    // 使用するデータ
    todos: [],
    options: [
      {value: -1, lablel: 'すべて'},
      {value: 0, lablel: '作業中'},
      {value: 1, lablel: '完了'},
    ],
    // 現在のoptionsの値、初期値-1
    current: -1
  },
  methods: {
    // 使用するメソッド
    // フォームから送られたデータをtodosに格納
    doAdd: function(event, value) {
      // refで名前をつけた要素を参照
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      // {新しいID, コメント, 作業状態}というオブジェクトを現在のtodosリストへpush
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      // フォーム要素を空にする
      comment.value = ''
    },

    // 状態変更の処理
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },

    // 削除の処理
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },
  // インスタンス生成時に処理をする「ライフサイクルメソッド」
  created() {
    // インスタンス生成時に自動的にfetch()する
    this.todos = todoStorage.fetch()
  },

  computed: {
    computedTodos: function() {
      // データ currentが-1なら「すべて」,それ以外ならcurrentとstateが一致するものだけに絞り込み
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }
  }
})