<template>
  <div class="row q-mb-sm">
    <q-input
      clearable
      outlined
      :value="name"
      label="Task name"
      class="col"
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      autofocus
      @input="$emit('update:name',$event)"
      v-select-all
    />
  </div>
</template>
<script>
import { selectAll } from "src/directives/directive-select-all";
export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>