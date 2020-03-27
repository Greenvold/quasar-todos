<template>
  <q-banner inline-actions class="text-white text-center list-header" :class="bgcolor">
    <span class="text-bold text-subtitle-1">
      <slot />
    </span>
  </q-banner>
</template>
<script>
export default {
  props: ["bgcolor"]
};
</script>
<style scoped>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>