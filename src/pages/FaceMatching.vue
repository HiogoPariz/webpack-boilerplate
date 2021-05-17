<template>
  <div class="openbio-websdk-facematching">
    <camera @onTakePicture="updatePhoto" />
    <img :src="photo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: '',
    }
  },
  methods: {
    updatePhoto(photo) {
      if (this.successCallback) {
        this.successCallback(photo)
      }
    },
  },
}
</script>
