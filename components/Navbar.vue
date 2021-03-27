<template>
  <header
    class="dark:bg-gray-800 bg-white border-b dark:border-gray-700 lg:h-16 sm:flex sm:justify-between sm:px-4 sm:py-3"
  >
    <div class="flex justify-between items-center px-4 py-3 sm:p-0">
      <nuxt-link
        class="flex items-center justify-between font-kaushan-script text-sm text-yellow-600 tracking-widest font-bold p-2 rounded shadow-medium"
        :to="localePath('/')"
        ><span class="text-4xl mr-2 bg-gray-700 rounded-full object-fit">
          <img src="../static/img/logo.png" width="40px" alt="logo" /> </span
        >{{ $store.state.title }}</nuxt-link
      >
      <div class="relative ml-2">
        <button
          class="relative shadow-inner w-5 h-5 rounded-full z-10 block font-semibold bg-white focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <div :class="`toggle__dot_${$store.state.lang} w-5 h-5`"></div>
        </button>
        <div
          v-if="dropdownOpen"
          class="fixed inset-0 h-full w-full z-10"
          @click="dropdownOpen = false"
        ></div>

        <div
          v-if="dropdownOpen"
          class="lang-dropdown border border-yellow-500 dark:border-gray-700 absolute mt-2 py-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-xl z-20"
        >
          <a
            href="#"
            class="flex justify-between block px-10 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white dark:text-gray-900"
            @click="changeLang('fr')"
          >
            <div
              class="toggle__dot_fr w-4 h-4 bg-gray-400 rounded-full shadow-inner"
            ></div>
            Français
          </a>
          <a
            href="#"
            class="flex justify-between block px-10 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white dark:text-gray-900"
            @click="changeLang('en')"
          >
            <div
              class="toggle__dot_en w-4 h-4 bg-gray-400 rounded-full shadow-inner"
            ></div>
            Anglais
          </a>
        </div>
      </div>
      <theme-changer-button />
      <div class="sm:hidden">
        <button
          type="button"
          class="block focus:outline-none"
          @click="isOpen = !isOpen"
        >
          <svg
            class="h-6 w-6 text-yellow-500 hover:text-yellow-600"
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
        class="flex items-center justify-between block px-2 py-1 mt-1 mx-1 rounded text-yellow-600 font-thin bg-white hover:bg-gray-300 sm:mt-0 bg-gray-200 dark:bg-gray-700 dark-hover:bg-gray-600"
        :to="localePath('/')"
        @click.native="isOpen = false"
        ><span
          class="material-icons text-yellow-500 text-lg bg-gray-600 dark:bg-gray-800 rounded-full p-1 mr-2"
        >
          search </span
        >{{ $t('navbar.findWord') }}</nuxt-link
      >
      <nuxt-link
        :to="localePath('/names')"
        class="flex items-center justify-between block px-2 py-1 mt-1 mx-1 rounded text-yellow-600 font-thin bg-white dark:bg-gray-700 hover:bg-gray-300 sm:mt-0 bg-gray-200 dark-hover:bg-gray-600"
        @click.native="isOpen = false"
        ><span
          class="material-icons text-yellow-500 text-lg bg-gray-600 dark:bg-gray-800 rounded-full p-1 mr-2"
        >
          auto_awesome </span
        >{{ $t('navbar.godNames') }}</nuxt-link
      >
    </div>
  </header>
</template>

<script>
import ThemeChangerButton from './ThemeChangerButton.vue'
export default {
  components: { ThemeChangerButton },
  data() {
    return {
      isOpen: false,
      dropdownOpen: false,
    }
  },
  methods: {
    changeLang(language) {
      this.dropdownOpen = false
      switch (language) {
        case 'en':
          this.$router.push({ path: '/en' })
          this.$store.commit('CHANGE_LANG', language)
          break

        case 'fr':
          this.$router.push({ path: '/' })
          this.$store.commit('CHANGE_LANG', 'fr')
      }
    },
  },
}
</script>

<style scoped>
.lang-dropdown {
  left: -80px;
}

.toggle__dot_fr {
  background-image: url('../assets/fr.png');
  background-size: 100%;
}

.toggle__dot_en {
  background-image: url('../assets/uk.png');
  background-size: 100%;
}

.title {
  font-size: 1.5rem;
  letter-spacing: 0;
}
</style>
