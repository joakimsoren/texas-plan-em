<template>
  <div class="demo">
    <div class="initiate-meeting">
      <template v-if="!session">
        <div class="iteration-container">
          <h2 class="iteration-title">Choose a sprint</h2>
          <ul class="iteration-list">
            <li
              v-for="iteration of iterations"
              :key="iteration.name"
              class="iteration-list-item"
              :class="{ selected: selectedIteration === iteration }"
              @click="selectIteration(iteration)"
            >
              {{ iteration.name }}
            </li>
          </ul>
        </div>
        <button @click="createSession">
          Create new grooming session
        </button>
      </template>
      <template v-else>
        <p>Give this link to your mates</p>
        <p>
          <b>{{ session.id }}</b>
        </p>
        <button @click="goToLink(session.id)">
          Go to link
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import {
  actionLoadIterations,
  actionCreateSession,
} from '../store/overview/overview.actions'
import { namespace as overviewNamespace } from '@/store/overview/overview.store'
import { IIteration } from '../iterations/types/iteration'
import { ISession } from '../../../backend/src/session/types/session.type'

@Component
export default class Overview extends Vue {
  @Action(actionLoadIterations, { namespace: overviewNamespace })
  actionLoadIterations: any
  @Action(actionCreateSession, { namespace: overviewNamespace })
  actionCreateSession: any

  @State('iterations', { namespace: overviewNamespace })
  iterations!: IIteration[]
  @State('session', { namespace: overviewNamespace }) session!: ISession

  link = ''
  selectedIteration: IIteration = null;

  createSession() {
    this.actionCreateSession(this.selectedIteration.id)
  }

  selectIteration(iteration: IIteration) {
    this.selectedIteration = iteration
  }

  goToLink() {
    this.$router.push(`/planning/${this.session.id}/${this.session.iteration}`)
  }

  async mounted() {
    await this.actionLoadIterations()
  }
}
</script>
<style scoped lang="scss">
.demo {
  .initiate-meeting {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
    align-items: center;
    border-radius: 5px;
    background-color: white;
    box-shadow: $te-box-shadow-light;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.iteration-container {
  width: 100%;

  .iteration-title {
    padding-left: 1rem;
  }
  .iteration-list {
    max-height: 300px;
    overflow: scroll;
    width: 100%;
    padding: 0;
    overflow: visible;
    .iteration-list-item {
      padding: 1rem;
      width: 100%;
      box-sizing: border-box;
      list-style-type: none;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      &.selected {
        background: #f1f1f1;
        border-color: #bebebe;
      }
      &:hover {
        background: #eaeaea;
        cursor: pointer;
      }
    }
  }
}
</style>
