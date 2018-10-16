<template lang="html">
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="middle">
      <span
      :class="['state', state === filter ? 'active' : '']"
      v-for="state in states"
      @click = 'toggleFilter(state)'
      :key="state">
          {{state}}
      </span>
    </span>
    <span @click='clearAllComplete' class="right">clearAllComplete</span>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type:Array,
      require: true
    }
  },
  data() {
    return {
      states: ['all', 'active', 'complete'],
      filter: 'all'
    }
  },
  computed: {
    unFinishedTodoLength() {
      return this.todos.filter(todo => !todo.complete).length
    }
  },
  methods: {
    clearAllComplete: function(){
      this.$emit('clearAllComplete')
    },
    toggleFilter(state){
      this.filter = state
      this.$emit('toggal', state)
    }
  }
}
</script>

<style lang="stylus">
.helper{
  color: #aaa;
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  cursor: pointer;
  /* justify-content: center; */
}
.left{
  display: flex;
  flex: 1;
}
.middle{
  display: flex;
  flex: 2;
}
.middle span{
  text-align: center;
  flex: 1;
}
.right{
  text-align: right;
  flex: 1;
  color: #F08080;
}
.active {
  color: #287;
  font-weight: 800;
}
</style>
