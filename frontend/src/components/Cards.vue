<template>
  <div>
    <div class="card-container">
      <img src="@/assets/1.png" @click.native="handleClick(1)"/>
      <img src="@/assets/2.png" @click.native="handleClick(2)"/>
      <img src="@/assets/4.png" @click.native="handleClick(4)"/>
      <img src="@/assets/8.png" @click.native="handleClick(8)"/>
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
      filter: grayscale(80%);
      &:hover {
        cursor:pointer;
        filter: grayscale(0%);
      }
    }
    img:not(:last-of-type) {
      margin-right: 24px;
    }
  }
</style>
