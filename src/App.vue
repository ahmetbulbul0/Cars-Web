<script>

import LoadingSpinner from "./views/components/LoadingSpinner.vue";

export default {
    data() {
        return {
            loaded: false
        };
    },
    beforeCreate() {
        this.loaded = false;
    },
    mounted() {
        this.loaded = true;
    },
    components: {
        LoadingSpinner
    },
};

</script>

<template>
  <LoadingSpinner :loaded="loaded" />
  <router-view></router-view>
</template>