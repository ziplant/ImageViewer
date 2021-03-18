<template lang="pug">
.file-select
  label.btn Выбрать изображения
    input(
      ref="selectedFiles"
      type="file" 
      name="files" 
      accept="image/*"
      webkitdirectory
      directory
      @change="updateFiles($event.target.files)" 
      multiple 
    )

  .file-select_list
    ul.collection(v-if="files.length")
      li.collection-item(
        v-for="(item, idx) in files" 
        :key="idx"
        @click="selectFile(item)"
        :class="[{active: item == selectedFile}]"
      )
        |{{idx + 1}}. {{item.name}}
  
  .secondary-content Выбрано изображений: {{files.length}}

</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup(_, { emit }) {
    const files = reactive([]);
    const selectedFile = ref(null);
    const selectFile = file => {
      selectedFile.value = file;
      emit("file-selected", file);
    };

    const updateFiles = data => {
      files.splice(
        0,
        files.length,
        ...Array.from(data).filter(el => el.type.includes("image/"))
      );
      selectFile(files[0]);
    };

    return {
      files,
      selectedFile,
      selectFile,
      updateFiles
    };
  }
};
</script>

<style lang="sass">
.file-select
  label
    display: block
  input
    display: none
  &_list
    height: 220px
    overflow-y: auto
    margin-top: 4px
    ul
      margin: 0
    li
      cursor: pointer
</style>
