<template>
  <div>
    <Navbar />
    <Nuxt class="px-2 lg:px-5 md:px-3 my-5" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: 'dark:bg-gray-800',
      },
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
