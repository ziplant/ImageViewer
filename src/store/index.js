import { createStore } from "vuex";

export default createStore({
  state: {
    viewTypes: [
      {
        type: "fill",
        label: "Вписывание целиком"
      },
      {
        type: "y-fill",
        label: "Вписывание по вертикали"
      },
      {
        type: "x-fill",
        label: "Вписывание по горизонтали"
      },
      {
        type: "one-to-one",
        label: "Один к одному"
      }
    ],
    selectedType: {}
  },
  mutations: {
    setViewType(state, type) {
      state.selectedType = type;
      localStorage.setItem("viewType", JSON.stringify(type));
    }
  },
  actions: {
    fetchSelectedViewType(
      { commit, getters },
      type = JSON.parse(localStorage.getItem("viewType"))
    ) {
      commit("setViewType", type ?? getters.getViewTypes[0]);
    }
  },
  getters: {
    getSelectedtViewType({ selectedType }) {
      return selectedType;
    },
    getViewTypes({ viewTypes }) {
      return viewTypes;
    }
  }
});
