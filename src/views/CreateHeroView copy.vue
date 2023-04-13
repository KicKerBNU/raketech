<template>
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">Add Your Own Hero</h1>
      <form @submit.prevent="addHero">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">Name:</label>
          <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter hero name">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="gender">Gender:</label>
          <div class="flex items-center">
            <input v-model="gender" class="mr-2 leading-tight" type="radio" name="gender" value="male">
            <label class="text-gray-700 font-bold" for="gender_male">
              Male
            </label>
          </div>
          <div class="flex items-center">
            <input v-model="gender" class="mr-2 leading-tight" type="radio" name="gender" value="female">
            <label class="text-gray-700 font-bold" for="gender_female">
              Female
            </label>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="image_url">Image URL:</label>
          <input v-model="imageUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image_url" type="text" placeholder="Enter hero image URL">
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Hero
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type{ Hero } from '@/components/types';
  
  export default defineComponent({
    name: 'CreateHeroView',
    setup() {
      const name = ref('');
      const gender = ref('male');
      const imageUrl = ref('');
  
      const addHero = () => {
        const hero: Hero = {
          name: name.value,
          gender: gender.value,
          imageUrl: imageUrl.value,
        };
        // TODO: send hero object to backend API or store it locally
        console.log(hero);
        // clear form fields
        name.value = '';
        gender.value = 'male';
        imageUrl.value = '';
      };
  
      return {
        name,
        gender,
        imageUrl,
        addHero,
      };
    },
  });
  </script>
  
  <style scoped>
  </style>