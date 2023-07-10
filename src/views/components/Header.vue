<script>

export default {
    data() {
        return {
            title: null,
        };
    },
    mounted() {
        switch (this.$route.name) {
            case "Home":
                this.title = "Home"
                break;
            case "Cars":
                this.title = "Cars"
                break;
                case "NewCar":
                this.title = "New Car"
                break;
            case "CarDetail":
                this.title = "Car Detail"
                break;
            case "CarBrands":
                this.title = "Car Brands"
                break;
                case "CarBrandDetail":
                this.title = "Car Brand Detail"
                break;
            case "CarTypes":
                this.title = "Car Types"
                break;
            case "CarTypeDetail":
                this.title = "Car Type Detail"
                break;
            default:
                break;
        }
    },
}

</script>

<template>
    <div class="w-full flex justify-between bg-gray-800 items-center rounded-md py-4 px-8">
        <div class="text-2xl font-bold text-white">{{ title }}</div>
        <div class="flex justify-center gap-2 items-center">

            <RouterLink class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{ 'text-white bg-gray-900': this.$route.name === 'Home', 'text-gray-300 hover:bg-gray-700 hover:text-white': this.$route.name !== 'Home' }"
                :to="{ name: 'Home' }">Home</RouterLink>

            <RouterLink class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{ 'text-white bg-gray-900': this.$route.name === 'Cars', 'text-gray-300 hover:bg-gray-700 hover:text-white': this.$route.name !== 'Cars' }"
                :to="{ name: 'Cars' }">Cars</RouterLink>
            <RouterLink class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{ 'text-white bg-gray-900': this.$route.name === 'CarBrands', 'text-gray-300 hover:bg-gray-700 hover:text-white': this.$route.name !== 'CarBrands' }"
                :to="{ name: 'CarBrands' }">Car Brands</RouterLink>
            <RouterLink class="rounded-md px-3 py-2 text-sm font-medium"
                :class="{ 'text-white bg-gray-900': this.$route.name === 'CarTypes', 'text-gray-300 hover:bg-gray-700 hover:text-white': this.$route.name !== 'CarTypes' }"
                :to="{ name: 'CarTypes' }">Car Types</RouterLink>
        </div>
    </div>
</template>