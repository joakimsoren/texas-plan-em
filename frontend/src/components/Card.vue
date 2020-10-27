<template>
  <div class="card">
    <div class="number"><slot /></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import WebSocket from 'ws';

@Component
export default class Card extends Vue {
  @Prop() value!: number;
}
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  height: 200px;
  background: white;
  border: 0.1rem solid lightgray;
  margin: 1rem;
  position: relative;
  border-radius: 3px;
  &:hover {
    background: lightgray;
    transition: 0.3s background;
    cursor: pointer;
  }
  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: xx-large;
    user-select: none;
  }
}
</style>
