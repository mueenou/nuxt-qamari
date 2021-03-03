<template>
  <header
    class="bg-gray-900 shadow-md sm:flex sm:justify-between sm:px-4 sm:py-3"
  >
    <div class="flex justify-between items-center px-4 py-3 sm:p-0">
      <nuxt-link
        class="font-kaushan-script text-xl text-black tracking-widest font-bold p-2 rounded shadow-medium bg-green-600"
        :to="localePath('/')"
        >{{ $store.state.title }}</nuxt-link
      >
      <div class="sm:hidden">
        <button
          type="button"
          class="block focus:outline-none"
          @click="isOpen = !isOpen"
        >
          <svg
            class="h-6 w-6 text-gray-500 hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
            <path
              v-if="isOpen"
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="px-2 pt-2 pb-4 sm:flex sm:p-0 sm:items-center sm:px-2"
    >
      <nuxt-link
        class="block px-4 py-1 mt-1 mx-1 rounded bg-green-600 text-black font-semibold hover:bg-green-200 sm:mt-0"
        :to="localePath('/')"
        >{{ $t('navbar.findWord') }}</nuxt-link
      >
      <nuxt-link
        :to="localePath('/names')"
        class="block px-4 py-1 mt-1 mx-1 rounded bg-green-600 text-black font-semibold hover:bg-green-200 sm:mt-0"
        >{{ $t('navbar.godNames') }}</nuxt-link
      >
      <label
        for="toogleA"
        class="flex mx-auto items-center cursor-pointer mt-1"
      >
        <div class="mr-3 text-green-600 font-medium">FR</div>
        <div class="relative">
          <input
            id="toogleA"
            type="checkbox"
            class="hidden"
            @change="changeLang()"
          />
          <div
            class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
          ></div>
          <div
            class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
          ></div>
        </div>
        <div class="ml-3 text-green-600 font-medium">EN</div>
      </label>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    changeLang() {
      if (!this.$store.state.langChange) {
        this.$router.push({ path: '/en' })
        this.$store.commit('CHANGE_LANG', 'en')
      } else {
        this.$router.push({ path: '/' })
        this.$store.commit('CHANGE_LANG', 'fr')
      }
    },
  },
}
</script>

<style scoped>
.toggle__dot {
  top: -0.25rem;
  left: -0.25rem;
  transition: all 0.3s ease-in-out;
  background-image: url('../assets/fr.png');
  background-size: 100%;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
  background-image: url('../assets/uk.png');
  background-size: 100%;
}

.title {
  font-size: 1.5rem;
  letter-spacing: 0;
}
</style>
