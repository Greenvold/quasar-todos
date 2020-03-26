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
    />
  </div>
</template>
<script>
export default {
  props: ["name"]
};
</script>