<template>
  <div class="new-player-container">
    <h2>Enter your name</h2>
    <input
      :value="name"
      :class="['input-name', { completed: !!name }]"
      @blur="handleSetName($event.target.value)"
    />
    <button :disabled="!name" @click="handleJoinGrooming">
      Join grooming session
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { actionSetName } from '@/store/overview/overview.actions'
import { namespace as overviewNamespace } from '@/store/overview/overview.store'
import { Action, State } from 'vuex-class'

@Component
export default class NewPlayer extends Vue {
  @State('name', { namespace: overviewNamespace }) name: string

  @Action(actionSetName, { namespace: overviewNamespace }) actionSetName: any

  sessionId = ''
  iterationId = ''

  handleSetName(name: string) {
    this.actionSetName(name)
  }

  handleJoinGrooming() {
    this.$router.push(
      `/planning/${this.sessionId}/${this.iterationId}/${this.name}`
    )
  }

  mounted() {
    this.sessionId = this.$route.params['sessionId']
    this.iterationId = this.$route.params['iterationId']
  }
}
</script>
<style scoped lang="scss">
.new-player-container {
  margin: auto;
  max-width: 700px;
  .input-name {
    box-shadow: 0px 0.5px 2.5px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    border: none;
    width: 100%;
    height: 50px;
    padding: 8px 16px;
    border: solid 2px white;
    &.completed {
      border: solid 2px $te-primary;
    }
    &:focus {
      outline: none;
    }
  }
}
</style>
