<script lang="ts">
import RickImage from '../components/RickImage.vue';
import CharacterList from '../components/CharacterList.vue';
export default {
  name: 'HomeView',
  components: {
    RickImage,
    CharacterList,
  },
};
</script>

<template>
  <main>
    <RickImage />
    <CharacterList />
  </main>
</template>
