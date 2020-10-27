<template>
  <Item
    :class="['iteration-container', { marked }]"
    @click="handleSelectIteration"
  >
    <div class="iteration-data">
      <div class="date">
        {{ iteration.start_date }} -{{ iteration.end_date }}
      </div>
      <div class="name">
        {{ iteration.name }}
      </div>
      <div class="stories">
        Stories: {{ iteration.stats.num_stories_unstarted }}
      </div>
    </div>
    <div class="iteration-meta-data">
      {{ iteration.status }}
    </div>
  </Item>
</template>
<script lang="ts">
import { IIteration } from '@/iterations/types/iteration'
import { Component, Prop, Vue } from 'vue-property-decorator'
import Item from '@/components/Item.vue'

@Component({
  components: {
    Item,
  },
})
export default class Iteration extends Vue {
  @Prop() iteration: IIteration
  @Prop() marked: boolean

  handleSelectIteration() {
    this.$emit('select', this.iteration.id)
  }
}
</script>
<style lang="scss" scoped>
.iteration-container {
  cursor: pointer;
  .date {
    font-weight: 400;
    color: #888;
    font-size: 10px;
    padding-bottom: 4px;
  }
  .name {
    size: 14px;
    font-weight: 600;
    padding-bottom: 4px;
  }
  .stories {
    font-size: 10px;
    color: #e88f40;
  }
  .iteration-meta-data {
    font-size: 14px;
    text-transform: capitalize;
  }
  &:hover {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
  }
  &.marked {
    border: solid 2px $te-primary;
  }
}
</style>
