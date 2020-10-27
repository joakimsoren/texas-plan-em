<template>
  <div class="planning-container">
    <div v-if="!player" class="connect-container">
      <h1>Your name</h1>
      <input v-model="name" class="name-input" />
      <button @click="enterSession">Enter grooming session</button>
    </div>
    <div class="estimate-container" v-else>
      <Players :otherPlayers="otherPlayers" :player="player" />
      <div>
        <h1>Grooming Poker</h1>
        <Story v-if="activeStory" :story="activeStory" />
        <h2 v-else>No story left to estimate</h2>
        <Cards v-if="activeStory" @estimate="handleEstimate" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Cards from '@/components/Cards.vue'
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
import Story from '@/components/Story.vue';
import Players from '@/components/Players.vue';

@Component({
  components: {
    Cards,
    Story,
    Players
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

  handleEstimate(estimate: number) {
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
  position: relative;
  padding: 64px;

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
.estimate-container {
  display: flex;
}
</style>
<style lang="scss">
 label {
        font-size: 12px;
        text-transform: uppercase;
        display: block;
        color: #888;
      }
</style>
