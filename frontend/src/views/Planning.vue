<template>
  <div class="planning-container">
    <div v-if="!player" class="connect-container">
      <h1>Your name</h1>
      <input v-model="name" class="name-input" />
      <button @click="enterSession">Enter grooming session</button>
    </div>
    <div v-else>
      <div class="story-container" v-if="activeStory">
        <h2 class="title">{{ activeStory.name }}</h2>
      </div>
      <h2 v-else>No story left to estimate</h2>
      <div class="players-container">
        <div
          v-for="otherPlayer of otherPlayers"
          :key="otherPlayer.name"
          :class="['player', { done: !!otherPlayer.estimate }]"
        >
          {{ otherPlayer.name }}
        </div>
      </div>
      <div class="player-container">
        <h2>Player: {{ player.name }}</h2>
        <div class="card-container">
          <Card
            v-for="number in planningScale"
            :key="number"
            @click.native="handleClick(number)"
          >
            {{ number }}
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import { namespace as planningNamespace } from '@/store/planning/planning.store'
import { State, Action } from 'vuex-class'
import { IStory } from '@/iterations/types/story'
import {
  actionLoadStories,
  actionSetPlayerFromName,
  actionSetEstimate,
  actionSetPlayers,
} from '../store/planning/planning.actions'
import { IPlayer } from '../planning/types/player'
import io from 'socket.io-client'

@Component({
  components: {
    Card,
  },
})
export default class Planning extends Vue {
  @State('stories', { namespace: planningNamespace }) stories!: IStory[]
  @State('player', { namespace: planningNamespace }) player!: IPlayer
  @State('players', { namespace: planningNamespace }) players!: IPlayer[]
  @State('activeStory', { namespace: planningNamespace }) activeStory!: IStory
  @State('estimatedStories', { namespace: planningNamespace })
  estimatedStories!: IStory[]

  @Action(actionLoadStories, { namespace: planningNamespace })
  actionLoadStories: any
  @Action(actionSetPlayerFromName, { namespace: planningNamespace })
  actionSetPlayerFromName: any
  @Action(actionSetEstimate, { namespace: planningNamespace })
  actionSetEstimate: any
  @Action(actionSetPlayers, { namespace: planningNamespace })
  actionSetPlayers: any

  planningScale = [1, 2, 4, 8]
  name = ''
  sessionId = ''
  iterationId = ''
  socket = io('http://localhost:3001')

  get otherPlayers(): IPlayer[] {
    if (!this.players.length) {
      return []
    }
    return this.players.filter(
      (player: IPlayer) => player.name !== this.player.name
    )
  }

  handleClick(estimate: number) {
    console.log(estimate,this.sessionId );
    this.actionSetEstimate({ estimate, sessionId: this.sessionId })
  }

  enterSession() {
    this.actionSetPlayerFromName(this.name)
    this.socket.emit(
      'join',
      JSON.stringify({ userName: this.name, sessionId: this.sessionId })
    )
  }

  async mounted() {
    this.sessionId = this.$route.params['sessionId']
    this.iterationId = this.$route.params['iterationId']
    await this.actionLoadStories(this.iterationId)

    this.socket.on('UserConnected', (data: any) => {
      if (data.error) {
        return console.error(data.error)
      }
      const players = data.session.users.map((user: any) => {
        const vote = data.session.votes.find((vote: any) => vote.user === user)
        return {
          name: user.userName,
          estimate: vote ? vote.estimate : 0,
        }
      })
      this.actionSetPlayers(players)
    })
  }
}
</script>
<style lang="scss" scoped>
.planning-container {
  height: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  .players-container {
    position: absolute;
    left: 0;
    .player {
      height: 60px;
      width: 60px;
      margin-top: -20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $te-white;
      box-shadow: $te-box-shadow-light;
      padding: 1rem;
      border-radius: 50%;
      background-color: $te-secondary;
      border: solid 1px $te-secondary-dark;
      transition: all 0.4s ease-in;
      font-weight: 600;
      &.done {
        background-color: $te-primary;
        border-color: $te-primary-dark;
        color: $te-white;
      }
    }
  }
  .player-container {
    background: #eaeaea;
    padding: 1rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    width: 700px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid lightgray;
  }
  .card-container {
    display: flex;
    width: 100%;
  }
  .connect-container {
    text-align: center;
    left: 50%;
    top: 20%;
    position: absolute;
    transform: translate(-50%, -50%);

    .name-input {
      display: block;
      margin: 1rem 0;
    }
  }
}
</style>
