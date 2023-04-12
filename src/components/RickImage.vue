<template>
<section>
    <div>
        <div class="relative w-full h-1/2 bg-gray-100 dark:bg-gray-800">
            <div>
                <img src="../assets/wallpaper-rick-morty.png" alt="Your Image Description Here" class="w-full h-full object-cover">
            </div>
            <div class="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <h2 class="text-4xl text-white">Rick and Morty</h2>
            </div>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'RickImage',
});

</script>

<style lang="scss" scoped>

</style>