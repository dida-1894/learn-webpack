<template lang="html">
  <div :class="[todo.complete ? 'complete' : '', 'item']">
    <input
    class="mycheck"
    :id='"mycheck" + todo.id'
    type="checkbox"
    v-model="todo.complete">
    <label class="mychecked" :for='"mycheck" + todo.id'></label>
    <label class="content" :for='"mycheck" + todo.id'>{{todo.content}}</label>
    <button
    @click = 'deleteTodo()'
    type="button">X</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: {
        id:0,
        complete: true,
        content: 'this is a todo thing'
      }
    }
  },
  methods: {
    deleteTodo: function() {
      let id = this.todo.id
      // console.log(id)
      this.$emit('del', id)
    }
  }
}
</script>

<style lang="stylus">
  .item
    padding: 20px 10px
    font-size: 16px
    color: #696969
    font-weight: 400
    position: relative
  .mycheck{
    display: none;
  }
  input[type="checkbox"]:checked + label::after{
    content: "\2714";
  }
  .mychecked {
    background-color: white;
    border-radius: 50%;
    border:1px solid #d3d3d3;
    width:20px;
    height:20px;
    margin-left: 10px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
  }
  .item .content{
    line-height: 20px;
    margin-left: 5px;
  }
  .item button{
    position: absolute;
    right: 10px;
    border: 0px;
    background-color: #fff;
    font-weight: 800;
    color: #aaa;
  }
  .complete{
    text-decoration:line-through;
    color: #ddd;
  }
</style>
