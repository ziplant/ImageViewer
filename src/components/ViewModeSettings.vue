<template lang="pug">
.viewmode-settings
  p(v-for="item in viewTypes" :key="item.type")
    label
      input(
        name="viewtype"
        type="radio"
        :checked="selectedType.type == item.type"
        @change="selectType(item)"
      )
      span {{item.label}}

</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const viewTypes = computed(() => store.getters.getViewTypes);

    const selectedType = computed(() => store.getters.getSelectedtViewType);

    const selectType = type => {
      store.dispatch("fetchSelectedViewType", type);
    };

    return {
      viewTypes,
      selectedType,
      selectType
    };
  }
};
</script>

<style lang="sass"></style>
