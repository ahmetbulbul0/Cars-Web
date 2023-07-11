import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      createdMessage: null,
      updatedMessage: null,
      deletedMessage: null
    };
  },
  mutations: {
    setCarCreatedMessage(state) {
      state.createdMessage = "Created New Car, Here Created Car Details";
    },
    setCarUpdatedMessage(state) {
      state.updatedMessage = "Updated Car, Here Updated Car Details";
    },
    setCarDeletedMessage(state, carName) {
      state.deletedMessage = `Deleted "${carName}" Named Car`;
    },
    setCarBrandCreatedMessage(state) {
      state.createdMessage = "Created New Car Brand, Here Created Car Brand Details";
    },
    setCarBrandUpdatedMessage(state) {
      state.updatedMessage = "Updated Car Brand, Here Updated Car Brand Details";
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
