<template>
  <button class="ml-5 w-8 h-8 rounded-full focus:outline-none" @click="toggle">
    <span
      :class="[
        this.$colorMode.value === 'dark' ? 'text-gray-200' : 'text-gray-600',
      ]"
      class="duration-300 material-icons leading-8"
    >
      light_mode
    </span>
  </button>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value === 'light' ? 'dark' : 'light'
    },
  },
}
</script>

<style scoped></style>
