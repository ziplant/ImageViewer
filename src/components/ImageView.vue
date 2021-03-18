<template lang="pug">
.image-wrapper
  canvas.image-wrapper_image(
    ref="canvas"
    width="600"
    height="450"
  )
</template>

<script>
import { ref, toRefs, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    src: String
  },
  setup(props) {
    const store = useStore();
    const { src } = toRefs(props);

    const selectedType = computed(() => store.getters.getSelectedtViewType);

    const canvas = ref(null);
    const ctx = ref(null);

    onMounted(() => {
      ctx.value = canvas.value.getContext("2d");
      drawImage(src.value);
    });

    const drawImage = src => {
      const image = new Image();
      image.src = src;

      switch (selectedType.value.type) {
        case "fill":
          image.width = canvas.value.width;
          image.height = canvas.value.height;
          break;
        case "x-fill":
          image.height = image.height * (canvas.value.height / image.width);
          image.width = canvas.value.width;
          break;
        case "y-fill":
          image.width = image.width * (canvas.value.width / image.height);
          image.height = canvas.value.height;
          break;
        case "one-to-one":
          image.width = canvas.value.height;
          image.height = canvas.value.height;
          break;
      }
      console.log(image.complete);

      if (image.complete) {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
        ctx.value.drawImage(image, 0, 0, image.width, image.height);
      } else {
        image.onload = () => {
          ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
          ctx.value.drawImage(image, 0, 0, image.width, image.height);
        };
      }
    };

    watch([src, selectedType], () => {
      drawImage(src.value);
    });

    return {
      canvas
    };
  }
};
</script>

<style lang="sass">
.image-wrapper
  padding: 10px 0
  &_image
    width: 100%
</style>
