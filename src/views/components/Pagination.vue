<script>
export default {
    props: {
        baseLink: String,
        pagination: Object
    }
};
</script>

<template>
    <div class="w-full flex justify-center items-center mt-4">
        <div class="flex justify-center items-center bg-gray-100">
            <RouterLink :to="{ name: baseLink, params: { page: pagination.previousPreviousPage } }"
                class="text-sm text-gray-800 px-4 py-2 hover:bg-gray-300" v-if="pagination.previousPreviousPage"> {{
                    pagination.previousPreviousPage }}</RouterLink>
            <RouterLink :to="{ name: baseLink, params: { page: pagination.previousPage } }"
                class="text-sm text-gray-800 px-4 py-2 hover:bg-gray-300" v-if="pagination.previousPage"> {{
                    pagination.previousPage }}</RouterLink>
            <RouterLink :to="{ name: baseLink, params: { page: pagination.nowPage } }"
                class="text-sm text-gray-800 px-4 py-2 hover:bg-gray-300 bg-gray-200">{{ pagination.nowPage }}
            </RouterLink>
            <RouterLink :to="{ name: baseLink, params: { page: pagination.nextPage } }"
                class="text-sm text-gray-800 px-4 py-2 hover:bg-gray-300" v-if="pagination.nextPage"> {{
                    pagination.nextPage }}</RouterLink>
            <RouterLink :to="{ name: baseLink, params: { page: pagination.nextNextPage } }"
                class="text-sm text-gray-800 px-4 py-2 hover:bg-gray-300" v-if="pagination.nextNextPage"> {{
                    pagination.nextNextPage }}</RouterLink>
        </div>
    </div>
</template>