<template>
  <div class="players-container">
    <label>Participants:</label>
      <div
      :class="['player']"
    >
      <div class="thumb" :style="`background: ${randomColor()}`">{{getInitials(player.name)}}</div>{{ player.name }} (Me)
    </div>
    <div
      v-for="otherPlayer of otherPlayers"
      :key="otherPlayer.name"
      :class="['player', { done: !!otherPlayer.estimate }]"
    >
      <div class="thumb" :key="otherPlayer.name" :style="`background: ${randomColor()}`">{{getInitials(otherPlayer.name)}}</div>{{ otherPlayer.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { IPlayer } from '../planning/types/player'

@Component
export default class Story extends Vue {
  @Prop() otherPlayers: IPlayer[]
  @Prop() player: IPlayer


  randomColor() { 
    const colors = [
      '#C0A0F1',
      '#447D8F',
      '#F1A0C2',
      '#4183D7',
      '#F1A5A0',
      '#1E976B',
    ];
    return colors[Math.floor(Math.random() * colors.length)]; 
  }

  getInitials(name: string) {
    if (!name) {
      return '';
    }
    return name.substring(0,2);
  }
}
</script>

<style lang="scss">
  .players-container {
    width: 400px;
    margin-right: 24px;
    .player {
      width: 100%;
      transition: all 0.4s ease-in;
      margin: 14px 0;
      display: flex;
      align-items: center;

      .thumb {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        background: grey;
        margin-right: 30px;
        text-transform: uppercase;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
      &.done {
        background-color: $te-primary;
        border-color: $te-primary-dark;
        color: $te-white;
      }
    }
  }
</style>