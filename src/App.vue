<template lang="pug">
.container
  .row
    .col.m6.s12
      FilesList(@file-selected="imageChanged" @file-cleared="imageChanged")
    .col.m6.s12
      ViewModeSettings
    .col.s12
      ImageView(v-if="selectedImage" :src="selectedImage")
</template>

<script>
import FilesList from "@/components/FilesList.vue";
import ViewModeSettings from "@/components/ViewModeSettings.vue";
import ImageView from "@/components/ImageView.vue";

import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  name: "App",
  components: {
    FilesList,
    ViewModeSettings,
    ImageView
  },
  setup() {
    const store = useStore();

    onMounted(() => store.dispatch("fetchSelectedViewType"));

    const selectedImage = ref(null);
    const imageChanged = file => {
      if (file) {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = () => (selectedImage.value = fr.result);
      } else {
        selectedImage.value = null;
      }
    };

    return {
      selectedImage,
      imageChanged
    };
  }
};
</script>

<style lang="sass">
#app
  margin-top: 50px
</style>
