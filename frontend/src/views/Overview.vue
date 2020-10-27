<template>
  <div class="overview">
    <h1 class="title">Texas Plan'em</h1>
    <h2>Enter your name</h2>
    <input
      :value="name"
      :class="['input-name', { completed: !!name }]"
      @blur="handleSetName($event.target.value)"
    />
    <h2>Choose a sprint</h2>
    <div class="iteration-list">
      <Iteration
        v-for="iteration of iterations"
        :key="iteration.name"
        :iteration="iteration"
        :marked="isMarked(iteration)"
        @select="handleSetSelectedIterationId"
      >
        {{ iteration.name }}
      </Iteration>
    </div>
    <h2>Share Id</h2>
    <Item>
      <div class="share-id-data">
        {{ (session && session.id) || 'No id yet' }}
      </div>
      <div class="action-copy">
        Copy
      </div>
    </Item>
    <button
      :disabled="!name || !selectedIterationId"
      @click="handleCreateSession"
    >
      Start grooming session
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import {
  actionLoadIterations,
  actionCreateSession,
  actionSetName,
  actionSetSelectedIterationId,
} from '@/store/overview/overview.actions'
import { namespace as overviewNamespace } from '@/store/overview/overview.store'
import { IIteration } from '@/iterations/types/iteration'
import { ISession } from '../../../backend/src/session/types/session.type'
import Iteration from '@/components/Iteration.vue'
import Item from '@/components/Item.vue'

@Component({
  components: {
    Iteration,
    Item,
  },
})
export default class Overview extends Vue {
  @Action(actionLoadIterations, { namespace: overviewNamespace })
  actionLoadIterations: any
  @Action(actionCreateSession, { namespace: overviewNamespace })
  actionCreateSession: any
  @Action(actionSetName, { namespace: overviewNamespace })
  actionSetName: any
  @Action(actionSetSelectedIterationId, { namespace: overviewNamespace })
  actionSetSelectedIterationId: any

  @State('iterations', { namespace: overviewNamespace })
  iterations!: IIteration[]
  @State('session', { namespace: overviewNamespace }) session!: ISession
  @State('selectedIterationId', { namespace: overviewNamespace })
  selectedIterationId: number
  @State('name', { namespace: overviewNamespace }) name: string

  isMarked(iteration: IIteration): boolean {
    return iteration.id === this.selectedIterationId
  }

  handleCreateSession() {
    this.actionCreateSession()
  }

  @Watch('session')
  watchingSession(newSession: ISession) {
    if (!newSession || !newSession.id || !newSession.iteration) {
      return
    }
    this.$router.push(
      `/planning/${this.session.id}/${this.session.iteration}/${this.name}`
    )
  }

  handleSetName(name: string) {
    this.actionSetName(name)
  }

  handleSetSelectedIterationId(iterationId: string) {
    this.actionSetSelectedIterationId(iterationId)
  }

  async mounted() {
    await this.actionLoadIterations()
  }
}
</script>
<style scoped lang="scss">
.overview {
  margin: auto;
  max-width: 700px;
  .title {
    font-size: 48px;
    text-align: center;
  }
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

  h2 {
    font-size: 14px;
    font-weight: 400;
    margin: 16px 0;
    color: rgba(59, 59, 59, 1);
  }
  .iteration-container {
    width: 100%;
    .iteration-title {
      padding-left: 1rem;
    }
  }
}
</style>
