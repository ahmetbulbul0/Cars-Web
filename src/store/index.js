import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      createdMessage: null,
      deletedMessage: null
    };
  },
  mutations: {
    setCarCreatedMessage(state) {
      state.createdMessage = "Created New Car, Here Created Car Details";
    },
    setCarDeletedMessage(state, carName) {
      state.deletedMessage = `Deleted "${carName}" Named Car`;
    },
    setCarBrandCreatedMessage(state) {
      state.createdMessage = "Created New Car Brand, Here Created Car Brand Details";
    },
    setCarBrandDeletedMessage(state, carBrandName) {
      state.deletedMessage = `Deleted "${carBrandName}" Named Car Brand`;
    },
    setCarTypeCreatedMessage(state) {
      state.createdMessage = "Created New Car Type, Here Created Car Type Details";
    },
    setCarTypeDeletedMessage(state, carTypeName) {
      state.deletedMessage = `Deleted "${carTypeName}" Named Car Type`;
    },
  },
});

export default store;
