<template>
  <section>
    <FilterCharacterList @filtersChanged="onFiltersChanged"  />
    <!-- Todo Component Store Item -->
    <div v-if="storeHero" class="p-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 bg-gray-700">
        <div v-for="item in storeHero">
          <a href="#" class="group">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img :src="item.imageUrl" :alt="item.name" class="h-full w-full object-cover object-center group-hover:opacity-75">
              </div>
              <p class="text-white">{{ item.id }}</p>
              <h3 class="mt-4 text-sm text-white">{{ item.name }}</h3>
              <p class="mt-1 text-lg font-medium text-white">{{ item.gender }}</p>
          </a>
        </div>  
    </div>
    <!-- Todo Component Character Item -->
    <div class="p-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 bg-gray-700">
      <div v-for="character in displayedCharacters" :key="character.id">
        <div>
          <a href="#" class="group" @click="onCharacterClick(character)">
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
    <!-- Todo Component Pagination -->
    <div class="border border-gray-300 rounded-md flex justify-between items-center py-4 px-6">
      <p class="text-gray-600">Showing from {{ startIndex+1 }} to {{ endIndex }} characters</p>
      <div class="ml-6">
        <button @click="previousPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:pointer-events-none" :disabled="!startIndex">
          Previous Page
        </button>
        <span class="mx-2"></span>
        <button @click="nextPage"
         class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:pointer-events-none" :disabled="endIndex > characters.length">
          Next Page
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import FilterCharacterList from './FilterCharacterList.vue';
import type { Filters, Character, ApiResponse, Hero } from '@/components/types';
import { useRouter } from 'vue-router'
import type { Store } from 'pinia';
import { useStore } from '../stores/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'CharacterList',
    components: {
      FilterCharacterList,
    },
    setup() {
      const store = useStore();
      const storeHero = computed(() => store.heroes);
      const characters: Ref<Character[]> = ref([])
      const startIndex = ref<number>(0)
      const endIndex = ref<number>(12)
      const page = ref<number>(1)
      const totalPages = ref<number>(0)
      const queryParams = ref<string>('_')

      const getCharacters = async (filters: String) => {
        const apiUrl = `https://rickandmortyapi.com/api/character/?${filters}&page=${page.value}`;
        const response = await fetch(apiUrl);
        const data: ApiResponse = await response.json() as ApiResponse;
        if(startIndex.value){
          for (let i = 0; i < data.results.length; i++) {
            characters.value.push(data.results[i]);
          }
        }else{
          characters.value = data.results;
        }
        totalPages.value = data.info.pages;
        updateDisplayedCharacters();
      }

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
        if(endIndex.value > characters.value.length){
          page.value++;
          getCharacters(queryParams.value);
          return;
        }
        updateDisplayedCharacters();
      }

      const displayedCharacters = ref<Character[]>([])
      const updateDisplayedCharacters = () => {
        if(startIndex.value === 0) {
          displayedCharacters.value = characters.value.slice(0, 12)
          return
        }
        displayedCharacters.value = characters.value.slice(startIndex.value, endIndex.value)
      }
      const router = useRouter();
      const onCharacterClick = (character: Character) => {
        router.push({ name: 'character-detail', params: { id: character.id} })
      }
    
      const onFiltersChanged = (filters: Filters) => {
        const searchParams = new URLSearchParams();
        for (const key in filters) {
          const value = filters[key];
          if (value) {
            searchParams.append(key, value);
          }
        }
      
        if(searchParams.toString() === queryParams.value) return;
        queryParams.value = searchParams.toString();
        page.value = 1;
        startIndex.value = 0;
        endIndex.value = 12;
        
        getCharacters(searchParams.toString());
      }

      return {
        page,
        characters,
        startIndex,
        endIndex,
        displayedCharacters,
        totalPages,
        queryParams,
        storeHero,
        previousPage,
        nextPage,
        onFiltersChanged,
        onCharacterClick
      }
  }
});


</script>

<style lang="scss" scoped>

</style>