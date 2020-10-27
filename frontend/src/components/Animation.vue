<template>
  <div v-if="!!jsonLoader" ref="lavContainer" class="lottie-container"></div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import lottie from 'lottie-web'

@Component
export default class Animation extends Vue {
  @Prop() name!: string
  @Prop({ default: true }) loop: boolean
  @Prop({ default: true }) autoplay: boolean

  get jsonLoader(): string {
    let jsonData = ''
    try {
      jsonData = require(`@/assets/lottie/${this.name}.json`)
    } catch (e) {
      console.error(e)
    }
    return jsonData
  }

  mounted() {
    const animationContainer: HTMLInputElement = this.$refs.lavContainer as HTMLInputElement;
    const lottieAnimation: any = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: this.loop,
      autoplay: this.autoplay,
      animationData: this.jsonLoader,
    });
    this.$emit('created', lottieAnimation);
  }
}
</script>
<style lang="scss" scoped>
.lottie-container {
  overflow: hidden;
  margin: 0 auto;
}
</style>
