<template>
  <div>
    <div class="openbio-websdk-video-container">
      <video ref="video" :srcObject="stream"></video>
      <canvas ref="canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
    </div>
    <button @click="takepicture">Tirar foto</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stream: null,
      canvasHeight: 0,
      canvasWidth: 0,
    }
  },
  async mounted() {
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      await this.updateStream(stream)
      if (this.$refs.video) {
        await this.$refs.video.play()
      }
    }
    this.updateProps()
  },
  emits: ['onTakePicture'],
  methods: {
    clearphoto() {
      const { canvas } = this.$refs
      const context = canvas.getContext('2d')
      context.fillStyle = '#AAA'
      context.fillRect(0, 0, 0, 0)

      this.$emit('onTakePicture', canvas.toDataURL('image/png'))
    },
    takepicture() {
      const { canvas, video } = this.$refs
      const { canvasWidth, canvasHeight } = this.$data
      const context = canvas.getContext('2d')
      context.drawImage(
        video,
        0,
        0,
        canvasWidth,
        canvasHeight,
        0,
        0,
        canvasWidth,
        canvasHeight
      )

      this.$emit('onTakePicture', canvas.toDataURL('image/png'))
    },
    async updateStream(stream) {
      this.$data.stream = stream
    },
    updateProps() {
      this.$data.canvasHeight = this.$refs.video?.videoHeight
      this.$data.canvasWidth = this.$refs.video?.videoWidth
    },
  },
}
</script>
