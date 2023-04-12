<template>
  <section>
    <FilterCharacterList @filtersChanged="onFiltersChanged"  />
    <div class="p-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 bg-gray-700">
      <div v-for="character in displayedCharacters" :key="character.id">
        <div>
          <a href="#" class="group">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img :src="character.image" :alt="character.name" class="h-full w-full object-cover object-center group-hover:opacity-75">
            </div>
            <p class="text-white">{{ character.id }}</p>
            <h3 class="mt-4 text-sm text-white">{{ character.name }}</h3>
            <p class="mt-1 text-lg font-medium text-white">{{ character.species }}</p>
          </a>
        </div>
      </div>
    </div>
    <div class="border border-gray-300 rounded-md flex justify-between items-center py-4 px-6">
      <p class="text-gray-600">Showing from {{ startIndex+1 }} to {{ endIndex }} characters</p>
      <div class="ml-6">
        <button @click="previousPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:pointer-events-none" :disabled="!startIndex">
          Previous Page
        </button>
        <span class="mx-2"></span>
        <button @click="nextPage"
         class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Next Page
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';
import type { Ref } from 'vue';
import FilterCharacterList from './FilterCharacterList.vue';
import type { Filters } from '@/components/types';

interface Character {
  id: number
  name: string
  species: string
  status: string
  image: string
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export default defineComponent({
    name: 'CharacterList',
    components: {
      FilterCharacterList,
    },
    setup() {
    const characters: Ref<Character[]> = ref([])
    const startIndex = ref<number>(0)
    const endIndex = ref<number>(12)
    const page = ref<number>(1)
    const totalPages = ref<number>(0)

    const getCharacters = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character/?page=' + page.value);
      const data: ApiResponse = await response.json() as ApiResponse;
      for (let i = 0; i < data.results.length; i++) {
        characters.value.push(data.results[i]);
      }
      totalPages.value = data.info.pages;
      updateDisplayedCharacters();
    }
    getCharacters();

    const previousPage = () => {
      startIndex.value -= 12
      endIndex.value -= 12
      if(startIndex.value < 0){
        startIndex.value = 0
        endIndex.value = 12
      }
      updateDisplayedCharacters();
    }

    const nextPage = () => {
      startIndex.value += 12
      endIndex.value += 12
      updateDisplayedCharacters();
      if(endIndex.value > characters.value.length){
        page.value++;
        getCharacters();
      }
    }

    const displayedCharacters = ref<Character[]>([])
    const updateDisplayedCharacters = () => {
      if(startIndex.value === 0) {
        displayedCharacters.value = characters.value.slice(0, 12)
        return
      }
      displayedCharacters.value = characters.value.slice(startIndex.value, endIndex.value)
    }

    const onFiltersChanged = (filters: Filters) => {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          searchParams.append(key, value);
        }
      }
      console.log(searchParams.toString());
      // Make API request using filters and update `characters` ref
      getCharacters();
    }

    return {
      page,
      characters,
      startIndex,
      endIndex,
      displayedCharacters,
      totalPages,
      previousPage,
      nextPage,
      onFiltersChanged
    }
  }
});


</script>

<style lang="scss" scoped>

</style>