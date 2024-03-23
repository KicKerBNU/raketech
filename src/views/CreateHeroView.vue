<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Add Your Own Hero</h1>
    <form @submit.prevent="addHero">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">Name:</label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter hero name"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="gender">Gender:</label>
        <div class="flex items-center">
          <input
            v-model="gender"
            class="mr-2 leading-tight"
            type="radio"
            name="gender"
            value="Male"
          />
          <label class="text-gray-700 font-bold" for="gender_male"> Male </label>
        </div>
        <div class="flex items-center">
          <input
            v-model="gender"
            class="mr-2 leading-tight"
            type="radio"
            name="gender"
            value="Female"
          />
          <label class="text-gray-700 font-bold" for="gender_female"> Female </label>
        </div>
        <div class="flex items-center">
          <input
            v-model="gender"
            class="mr-2 leading-tight"
            type="radio"
            name="gender"
            value="Genderless"
          />
          <label class="text-gray-700 font-bold" for="gender_genderless"> Genderless </label>
        </div>
        <div class="flex items-center">
          <input
            v-model="gender"
            class="mr-2 leading-tight"
            type="radio"
            name="gender"
            value="Unknow"
          />
          <label class="text-gray-700 font-bold" for="gender_unknow"> Unknown </label>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="image_url">Image URL:</label>
        <input
          v-model="imageUrl"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image_url"
          type="text"
          placeholder="Enter hero image URL"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Hero
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useStore } from '../stores/store'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateHeroView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = ref('')
    const gender = ref('male')
    const imageUrl = ref('')

    const addHero = () => {
      store.addHero({
        id: Date.now(),
        name: name.value,
        gender: gender.value,
        imageUrl: imageUrl.value
      })
      // Direct the client to the home page using vue-router
      router.push('/')
    }

    return {
      name,
      gender,
      imageUrl,
      addHero
    }
  }
})
</script>

<style scoped></style>
