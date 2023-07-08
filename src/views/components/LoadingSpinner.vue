<script>
export default {
    props: {
        loaded: Boolean,
    },
};
</script>

<template>
    <div class="h-screen bg-white" v-if="loaded == false">
        <div class="flex justify-center items-center h-full">
            <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
        </div>
    </div>
</template>