<template>
<div class="card-container">
  <Card
    v-for="number in planningScale"
    :key="number"
    @click.native="handleClick(number)"
  >
    {{ number }}
  </Card>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Card from './Card.vue';

@Component({
  components: {
    Card,
  }
})
export default class Cards extends Vue {
  planningScale = [1, 2, 4, 8];

  handleClick(value) {
    this.$emit('estimate', value);
  }
}
</script>
<style lang="scss" scoped>
  .card-container {
     width: 755px;
    margin-top: 70px;
    display: flex;
    width: 100%;
    div:not(:last-of-type) {
      margin-right: 24px;
    }
  }
</style>
