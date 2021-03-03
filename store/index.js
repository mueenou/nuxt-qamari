export const getters = {}

export const state = () => ({
  title: 'The Hira Mount ',
  langChange: false,
  lang: 'fr',
  reciterLang: 'Français',
  reciter: 'Youssouf Leclerc',
  search: '',
})

export const mutations = {
  CHANGE_LANG(state, language) {
    if (language === 'en') {
      state.lang = 'en'
      state.reciterLang = 'Anglais'
      state.reciter = 'Ibrahim Walk'
      state.langChange = true
    } else {
      state.lang = 'fr'
      state.reciterLang = 'Français'
      state.reciter = 'Youssouf Leclerc'
      state.langChange = false
    }
  },
  SET_SEARCH(state, search) {
    state.search = search
  },
}

export const actions = {
  async fetchVerses({ state }, search) {
    try {
      const res = await this.$axios.$get(
        'http://api.alquran.cloud/v1/search/' + search + '/all/' + state.lang
      )
      return res.data
    } catch (error) {
      console.log("can't find any response", error)
    }
  },
}
