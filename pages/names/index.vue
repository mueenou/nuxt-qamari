<template>
  <div class="mt-5">
    <h1 class="mb-5 text-lg text-center">{{ $t('namesTitle') }}</h1>
    <div
      class="names-container text-center flex flex-wrap px-16 justify-evenly overflow-hidden"
    >
      <figure
        v-for="(name, index) in allNames"
        :key="index"
        class="bg-white border-yellow-500 border-gray-200 border flex flex-col justify-center lg:w-3/12 rounded-xl p-2 md:mx-1 lg:mx-2 my-2 w-10/12 xs:w-5/12 sm:w-5/12 sm:flex-wrap hover:border-yellow-800"
        @blur="showDescription = false"
        @click="showThisDescription(index)"
      >
        <blockquote class="text-xl font-bold">{{ name.name }}</blockquote>
        <blockquote class="font-bold">{{ name.transliteration }}</blockquote>
        <blockquote class="text-sm">{{ name.en.meaning }}</blockquote>
        <blockquote class="text-sm font-bold">{{ name.number }}</blockquote>
        <transition name="fadeHeight">
          <div v-if="showDescription === index">
            {{ name.fr.meaning }}
          </div>
        </transition>
        <div>
          <span
            v-if="showDescription === null"
            class="material-icons text-yellow-500"
          >
            expand_more
          </span>
          <span v-else class="material-icons text-yellow-500">
            expand_less
          </span>
        </div>
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
      showDescription: null,
      cardHovered: false,
    }
  },
  methods: {
    showThisDescription(index) {
      if (this.showDescription === null || this.showDescription !== index) {
        this.showDescription = index
      } else {
        this.showDescription = null
      }
    },
  },
}
</script>

<style scoped>
figure:hover {
  cursor: pointer;
}
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.2s ease;
  height: 50px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  height: 0px;
}
</style>
