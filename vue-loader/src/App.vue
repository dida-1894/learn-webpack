<template>
  <div class="todos">
    <vue-header :title='title'></vue-header>
    <div class="main">
      <input
      type="text"
      placeholder="输入代办事项"
      v-on:keyup.enter='addTodo($event)'/>
      <item
        v-for = 'todo in filterTodos'
        :key = 'todo.id'
        @del = 'deleteTodo'
        :todo="todo" />
      <vue-tabs
        @clearAllComplete = 'clearAllComplete'
        @toggal = 'toggleFilter'
        :todos='todos'></vue-tabs>
    </div>
    <vue-footer></vue-footer>
  </div>
</template>

<script>
import VueHeader from './components/VueHeader.vue'
import VueFooter from './components/VueFooter.vue'
import Item from './components/Item.vue'
import VueTabs from './components/Tabs.vue'
let id = 0
export default {
  components: {
    VueHeader,
    VueFooter,
    Item,
    VueTabs
  },
  data(){
    return {
      title: "To do List",
      filter: "all",
      todos: []
    }
  },
  computed: {
    filterTodos(){
      if (this.filter == 'all') {
        return this.todos
      }
      const complete = this.filter === 'complete'
      return this.todos.filter(todo => complete === todo.complete)
    }
  },
  methods: {
    addTodo: function(e){
      console.log(e)
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim() + id,
        complete: false
      })
      e.target.value =  ''
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter(state){
      this.filter = state
    },
    clearAllComplete(){
      this.todos = this.todos.filter(todo => !todo.complete)
    }
  }
}
</script>

<style lang='stylus'>
  .todos{
    width: 100%;
    height: 100%;
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .main{
    width: 80%;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 auto;
  }
  .main input {
    width: 100%;
    height: 50px;
    color: #aaa;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    padding: 5px 10px;
    border: 0px;
  }
</style>
