<template>
  <div id="main">
    <div class="p-3 pb-9">
      <div class="flex space-x-3 items-center">
        <input
          v-model="search"
          class="w-full rounded border border-yellow-500 p-2 focus:outline-none"
          type="text"
          :placeholder="$t('searchPlaceholder')"
          @keyup.enter="fetchVerses"
        />
        <button
          class="border rounded bg-white border-yellow-500 p-2 focus:outline-none font-thin hover:bg-gray-200"
          @click="fetchVerses"
        >
          <p class="font-thin text-sm">{{ $t('search') }}</p>
        </button>
      </div>
    </div>
    <div v-if="responses[0] == null" class="space-y-3 pl-7 pr-7 pb-7">
      <div class="text-center">
        <span class="text-red-600">{{ errorMessage }}</span>
      </div>
      <div class="bg-white p-6 border rounded-lg items-center">
        <p class="text-gray-600 text-center" v-html="$t('welcomeMessage')"></p>
      </div>
    </div>
    <div v-else class="space-y-3 text-center pl-7 pr-7 pb-7">
      <h1 v-if="count == 1">{{ $t('foundWordCount', { count: count }) }}</h1>
      <h1 v-else>{{ $t('foundWordsCount', { count: count }) }}</h1>
      <div
        v-for="(response, index) in responses"
        :key="index"
        class="bg-white p-6 border rounded-lg items-center"
      >
        <h1 class="text-xl font-medium text-gray-700 pb-3">
          Sourate {{ response.surah.number }} -
          {{ response.surah.englishName }} - {{ response.surah.name }}
        </h1>
        <h2>Verset {{ response.numberInSurah }}</h2>
        <blockquote
          class="font-dancing-script text-yellow-600 text-xl mt-2"
          v-html="highlightWords(response.text)"
        ></blockquote>
        <p class="pt-3 font-thin text-xs">
          {{ $t('translateBy') }}
          <span class="font-medium">{{ response.edition.englishName }}</span>
        </p>
        <button
          class="border rounded p-1 border-yellow-500 focus:outline-none font-thin hover:bg-gray-200 mt-2 mb-4"
          @click="
            getArabicVerse(response.surah.number, response.numberInSurah, index)
          "
        >
          {{ $t('showArabicVerse') }}
        </button>
        <blockquote
          v-if="showArabicVerse === index"
          class="text-2xl text-yellow-600 font-thin"
        >
          {{ thisVerse }}
          <p class="pt-3 font-thin text-xs text-black">
            Venant de
            <span class="font-medium">Quran.com API</span>
          </p>
        </blockquote>
        <div
          class="pt-5 flex justify-center flex-wrap sm:flex-wrap md:flex-wrap md:space-x-3"
        >
          <div class="pt-3">
            <audio controls preload="none" class="focus:outline-none">
              <source
                :src="getAudioUrl($store.state.lang, response.number)"
                type="audio/mpeg"
              />
            </audio>
            <p class="pt-1 font-thin text-xs">
              {{ $t('recitedByLang') }}
              <span class="font-medium">{{ $store.state.reciter }}</span>
            </p>
          </div>
          <div class="pt-3">
            <audio controls preload="none" class="focus:outline-none">
              <source
                :src="getAudioUrl('ar', response.number)"
                type="audio/mpeg"
              />
            </audio>
            <p class="pt-1 font-thin text-xs">
              {{ $t('recitedByArabic') }}
              <span class="font-medium">Alafasy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      responses: {},
      count: null,
      errorMessage: '',
      showArabicVerse: null,
      thisVerse: '',
    }
  },
  methods: {
    async fetchVerses() {
      this.responses = {}
      this.count = null
      try {
        await this.$store.commit('SET_SEARCH', this.search)
        const data = await this.$store.dispatch(
          'fetchVerses',
          this.search.toLowerCase()
        )
        this.errorMessage = ''
        this.responses = data.matches
        this.count = data.count
      } catch (error) {
        if (this.$store.state.lang === 'fr') {
          this.errorMessage = 'Ce mot est introuvable'
        }
        if (this.$store.state.lang === 'en') {
          this.errorMessage = 'Cannot find this word'
        }
      }
    },

    async getArabicVerse(surah, verse, index) {
      if (this.showArabicVerse === null || this.showArabicVerse !== index) {
        this.showArabicVerse = index
        try {
          const res = await this.$axios.$get(
            'https://api.quran.com/api/v4/quran/verses/imlaei?verse_key=' +
              surah +
              '%3A' +
              verse
          )
          this.thisVerse = res.verses[0].text_imlaei
        } catch (error) {
          console.log("can't find any response", error)
        }
      } else {
        this.showArabicVerse = null
      }
    },
    highlightWords(data) {
      const text = this.slugify(data.toLowerCase())
      const searchedWord = this.slugify(this.search.toLowerCase())
      const index = text.toLowerCase().indexOf(searchedWord)
      if (this.search.length > 0) {
        if (index >= 0) {
          return (
            data.substring(0, index) +
            "<span class='highlight bg-black text-yellow-400 px-1 rounded'>" +
            data.substring(index, index + searchedWord.length) +
            '</span>' +
            data.substring(index + this.search.length, text.length)
          )
        } else return data
      } else {
        return data
      }
    },
    // fonction permettant d'enlever tous les accents pour faciliter la recherche des mots dans les versets
    slugify(str) {
      const map = {
        '-': ' ',
        // eslint-disable-next-line no-dupe-keys
        '-': '_',
        a: 'á|à|ã|â|À|Á|Ã|Â',
        e: 'é|è|ê|É|È|Ê',
        i: 'í|ì|î|Í|Ì|Î',
        o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        c: 'ç|Ç',
        n: 'ñ|Ñ',
      }

      for (const pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern)
      }

      return str
    },
    getAudioUrl(lang, number) {
      if (lang === 'fr')
        return 'http://cdn.alquran.cloud/media/audio/ayah/fr.leclerc/' + number
      else if (lang === 'en')
        return 'http://cdn.alquran.cloud/media/audio/ayah/en.walk/' + number
      else
        return 'http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/' + number
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

.page-top-btn {
  right: 0;
  bottom: 10px;
}
</style>

<style>
.highlight {
  font-weight: bold;
}

.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}

.font-kaushan-script {
  font-family: 'Kaushan Script', cursive;
}
</style>
