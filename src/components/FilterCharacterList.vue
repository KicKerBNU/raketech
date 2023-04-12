<template>
  <div class="p-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="w-full md:w-auto">
        <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
        <input v-model="name" type="text" id="name" name="name" class="border border-gray-300 rounded-md px-4 py-2 w-full">
      </div>
      <div class="w-full md:w-auto">
        <label for="status" class="block text-gray-700 font-bold mb-2">Status</label>
        <select v-model="status" id="status" name="status" class="border border-gray-300 rounded-md px-4 py-2 w-full">
          <option value="">Select Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div class="w-full md:w-auto">
        <label for="species" class="block text-gray-700 font-bold mb-2">Species</label>
        <input v-model="species" type="text" id="species" name="species" class="border border-gray-300 rounded-md px-4 py-2 w-full">
      </div>
      <div class="w-full md:w-auto">
        <label for="type" class="block text-gray-700 font-bold mb-2">Type</label>
        <input v-model="type" type="text" id="type" name="type" class="border border-gray-300 rounded-md px-4 py-2 w-full" >
      </div>
      <div class="w-full md:w-auto">
        <label for="gender" class="block text-gray-700 font-bold mb-2">Gender</label>
        <select v-model="gender" id="gender" name="gender" class="border border-gray-300 rounded-md px-4 py-2 w-full">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { ref } from 'vue'

interface Filters {
  name: string
  status: string
  species: string
  type: string
  gender: string
}

export default defineComponent({
    emits: ['filtersChanged'],
    setup(_, { emit }) {
        const name = ref<string>('')
        const status = ref<string>('')
        const species = ref<string>('')
        const type = ref<string>('')
        const gender = ref<string>('')

        const filters: Filters = {
            name: name.value,
            status: status.value,
            species: species.value,
            type: type.value,
            gender: gender.value
        }
        // wow this is a good example why we should use watchEffect
        watchEffect(() => {
          const filters = {
            name: name.value,
            status: status.value,
            species: species.value,
            type: type.value,
            gender: gender.value
          };
          emit('filtersChanged', filters);
        });

        return {
        name,
        status,
        species,
        type,
        gender
        }
    }
});

</script>

<style lang="scss" scoped>

</style>