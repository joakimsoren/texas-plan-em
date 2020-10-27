<template>
  <div>
    <div class="card-container">
      <img src="@/assets/1.png" :class="{ active: finishedEstimate === 1}" @click="handleClick(1)"/>
      <img src="@/assets/2.png" :class="{ active: finishedEstimate === 2}" @click="handleClick(2)"/>
      <img src="@/assets/4.png" :class="{ active: finishedEstimate === 4 }" @click="handleClick(4)"/>
      <img src="@/assets/8.png" :class="{ active: finishedEstimate === 8 }" @click="handleClick(8)"/>
    </div>
  </div>
  <!-- <Card
    v-for="number in planningScale"
    :key="number"
    @click.native="handleClick(number)"
  >
    {{ number }}
  </Card> -->

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
  @Prop() finishedEstimate: boolean;
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
    img {
      height: 264px;
      transition: transform 1s;
      filter: grayscale(80%);
      &:hover {
        cursor:pointer;
        filter: grayscale(0%);
        transform: scale(1.1);
      }
      &.active {
        transform: scale(2) translateY(-50%) rotateY(720deg);
        filter: grayscale(0%);
        z-index: 2000;
      }
    }
    img:not(:last-of-type) {
      margin-right: 24px;
    }
  }
</style>
