import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      createdMessage: null,
    };
  },
  mutations: {
    setCarCreatedMessage(state) {
      state.createdMessage = "Created New Car, Here Created Car Details";
    },
  },
});

export default store;
