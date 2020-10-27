<template>
  <div class="planning-container">
    <div class="estimate-container">
      <div>
        <h1 class="title">Grooming Poker</h1>
        <Players
          v-if="players && player"
          :otherPlayers="otherPlayers"
          :player="player"
        />
      </div>
      <div>
        <Animation v-if="loading" key="1" class="loader" name="loader" />
        <Animation
          v-else-if="done"
          key="2"
          class="fireworks"
          name="fireworks"
        />
        <Story v-else-if="activeStory" :story="activeStory" />
        <h2 v-else>No story left to estimate</h2>
        <Cards
          v-if="activeStory"
          :finished-estimate="finishedEstimate"
          @estimate="handleEstimate"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import Cards from '@/components/Cards.vue'
import { namespace as planningNamespace } from '@/store/planning/planning.store'
import { State, Action } from 'vuex-class'
import { IStory } from '@/iterations/types/story'
import {
  actionLoadStories,
  actionSetPlayerFromName,
  actionSetEstimate,
  actionSetPlayers,
  actionSetStoryAsEstimated,
  actionDone,
} from '../store/planning/planning.actions'
import { IPlayer } from '../planning/types/player'
import io from 'socket.io-client'
import Story from '@/components/Story.vue'
import Players from '@/components/Players.vue'
import Animation from '@/components/Animation.vue'

@Component({
  components: {
    Cards,
    Story,
    Players,
    Animation,
  },
})
export default class Planning extends Vue {
  @State('stories', { namespace: planningNamespace }) stories!: IStory[]
  @State('player', { namespace: planningNamespace }) player!: IPlayer
  @State('players', { namespace: planningNamespace }) players!: IPlayer[]
  @State('activeStory', { namespace: planningNamespace }) activeStory!: IStory
  @State('loading', { namespace: planningNamespace }) loading!: IStory
  @State('estimatedStories', { namespace: planningNamespace })
  estimatedStories!: IStory[]
  @State('done', { namespace: planningNamespace })
  done: boolean

  @Action(actionLoadStories, { namespace: planningNamespace })
  actionLoadStories: any
  @Action(actionSetPlayerFromName, { namespace: planningNamespace })
  actionSetPlayerFromName: any
  @Action(actionSetEstimate, { namespace: planningNamespace })
  actionSetEstimate: any
  @Action(actionSetPlayers, { namespace: planningNamespace })
  actionSetPlayers: any
  @Action(actionSetStoryAsEstimated, { namespace: planningNamespace })
  actionSetStoryAsEstimated: any
  @Action(actionDone, { namespace: planningNamespace }) actionSetDone: any

  sessionId = ''
  iterationId = ''
  socket = io('http://localhost:3001')
  finishedEstimate = false

  get otherPlayers(): IPlayer[] {
    if (!this.players.length) {
      return []
    }
    return this.players.filter(
      (player: IPlayer) => player.name !== this.player.name
    )
  }

  animateCard(estimate) {
    this.finishedEstimate = estimate
    setTimeout(() => {
      this.finishedEstimate = null
    }, 2000)
  }

  handleEstimate(estimate: number) {
    this.actionSetEstimate({
      estimate,
      sessionId: this.sessionId,
      userName: this.player.name,
    })
  }

  handleEstimateComplete(estimate: number) {
    this.animateCard(estimate)
    setTimeout(() => this.actionSetStoryAsEstimated(), 2000)
  }

  enterSession(name: string) {
    this.actionSetPlayerFromName(name)
    this.socket.emit(
      'join',
      JSON.stringify({ userName: name, sessionId: this.sessionId })
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
    this.socket.on('estimationDone', (data: any) => {
      if (data.error) {
        return console.error(data.error)
      }
      this.handleEstimateComplete(data.estimate)
    })
    this.enterSession(this.$route.params['name'])
  }

  beforeDestroy() {
    this.socket.disconnect()
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
.title {
  margin: 0;
  margin-bottom: 36px;
}
.estimate-container {
  display: flex;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  width: 200px;
  height: 200px;
  /deep/ path {
    fill: none;
  }
}
.fireworks {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
}

.success-modal {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  .number {
    font-size: 200px;
    font-weight: bold;
    left: 50%;
    top: 40%;
    z-index: 1002;
    position: absolute;
    transform: translate(-50%, -50%);
  }
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
