<script>
export default {
    props: {
        fetchedData: Boolean,
    },
};
</script>

<template>
    <tr v-if="fetchedData == false">
        <td>
            <div class="py-3 px-8">
                <img class="h-8 w-8" src="../../assets/gif/1488.gif" alt="">
            </div>
        </td>
    </tr>
</template>