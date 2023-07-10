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
    setCarBrandCreatedMessage(state) {
      state.createdMessage = "Created New Car Brand, Here Created Car Brand Details";
    },
    setCarTypeCreatedMessage(state) {
      state.createdMessage = "Created New Car Type, Here Created Car Type Details";
    },
  },
});

export default store;
