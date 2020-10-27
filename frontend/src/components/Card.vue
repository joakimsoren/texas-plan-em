<template>
  <div class="card">
    <div class="number"><slot /></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import WebSocket from 'ws'

@Component
export default class Card extends Vue {
  @Prop() value!: number
}
</script>
<style lang="scss" scoped>
.card {
  width: 171px;
  height: 264px;
  background: white;
  position: relative;
  border-radius: 6px;
  background: white;
   box-shadow: 0px 0.5px 2.5px rgba(0, 0, 0, 0.25);
  &:hover {
    background: #DBDBDB;
    transition: 0.3s background;
    cursor: pointer;
  }
  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 70px;
    font-weight: bold;
    user-select: none;
    color: #FFA400;
  }
}
</style>
