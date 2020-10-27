<template>
  <div class="item" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Item extends Vue {
  handleClick() {
    this.$emit('click')
  }
}
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  border-radius: 6px;
  padding: 8px 16px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 16px 0;
  align-items: center;
  border: solid 2px white;
  transition: all 0.2s ease-in-out;
}
</style>
