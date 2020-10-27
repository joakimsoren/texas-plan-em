<template>
 <div class="story-container">
    <label class="now-estimating">Now estimating:</label>
    <div class="story-card">
      <h2 class="title">{{ story.name }}</h2>
      <label class="id">#{{ story.id }}</label>
      <label class="description-label">Description:</label>
      <p class="description" v-html="description" />
    </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import WebSocket from 'ws'
import { IStory } from '../../../backend/src/iterations/types/story.type'
import MarkdownIt from 'markdown-it'
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card
  }
})
export default class Story extends Vue {
  @Prop() story!: IStory

    md = new MarkdownIt();


   get description() {
    return this.md.render(this.story.description);
  }
}
</script>
<style lang="scss" scoped>
  .story-container {
    width: 755px;
      text-align: left;
      
      .now-estimating {
        margin-bottom: 8px;
      }
    .story-card {
      background: white;
      padding: 16px 8px 16px 8px ;
      border-radius: 6px;
      box-shadow: 0px 0.5px 2.5px rgba(0, 0, 0, 0.25);
    .title {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }
     
      .id {
        margin-top: 8px;
        color: #C9A61C;
      }
      .description-label {
        margin-top: 16px;
      }
    }
  }
</style>
