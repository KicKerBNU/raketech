<template>
        <div class="bg-gray-50 min-h-screen p-4" v-if="character" >
            <div class="max-w-3xl mx-auto">
            <!-- Character name and image -->
            <div class="flex items-center mb-4">
                <img class="h-20 w-20 rounded-full mr-4" :src="character.image" :alt="character.name" />
                <h1 class="text-4xl font-bold">{{ character.name }}</h1>
            </div>

            <!-- Character species, status, and type -->
            <div class="flex flex-wrap items-center mb-8">
                <div class="px-4 py-2 bg-gray-200 rounded-lg mr-4 mb-4">{{ character.species }}</div>
                <div class="px-4 py-2 bg-gray-200 rounded-lg mr-4 mb-4">{{ character.status }}</div>
                <div class="px-4 py-2 bg-gray-200 rounded-lg mb-4" v-if="character.type">{{ character.type }}</div>
            </div>

            <!-- List of episodes -->
            <div class="bg-white shadow-md rounded-lg p-4">
                <h2 class="text-xl font-bold mb-4">List of episodes</h2>
                <ul class="list-disc pl-4">
                    <li v-for="episode in character.episode" :key="episode">{{ episode }}</li>
                </ul>
            </div>
            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Character } from '@/components/types';
export default defineComponent({
    name: 'CharacterDetail',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const character = ref<Character>();
        const getCharacter = async () => {
            const apiUrl = `https://rickandmortyapi.com/api/character/${props.id}`;
            const response = await fetch(apiUrl);
            const data: Character = await response.json() as Character;
            character.value = data;
        };
        getCharacter();
        return {
            character,
        };
    },
    
});

</script>

<style lang="scss" scoped>

</style>