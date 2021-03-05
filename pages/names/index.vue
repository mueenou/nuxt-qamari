<template>
  <div class="mt-5">
    <h1 class="mb-5 text-lg text-center">{{ $t('namesTitle') }}</h1>
    <div
      class="names-container text-center flex flex-wrap px-16 justify-evenly overflow-hidden"
    >
      <figure
        v-for="(name, index) in allNames"
        :key="index"
        class="bg-white border-yellow-500 border-gray-200 border flex flex-col justify-center lg:w-3/12 rounded-xl p-2 h-36 md:mx-1 lg:mx-2 my-2 w-10/12 xs:w-5/12 sm:w-5/12 sm:flex-wrap"
      >
        <blockquote class="text-xl font-bold">{{ name.name }}</blockquote>
        <blockquote class="font-bold">{{ name.transliteration }}</blockquote>
        <blockquote class="text-sm">{{ name.en.meaning }}</blockquote>
        <blockquote class="text-sm font-bold">{{ name.number }}</blockquote>
      </figure>
    </div>
  </div>
</template>

<script>
import names from '../../data/names.json'
export default {
  name: 'Names',
  data() {
    return {
      allNames: names,
    }
  },
}
</script>

<style scoped></style>
