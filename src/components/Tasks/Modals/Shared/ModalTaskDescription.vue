<template>
  <div class="row q-mb-sm">
    <q-input
      clearable
      outlined
      :value="description"
      label="Task description"
      class="col"
      type="textarea"
      :rules="[val => !!val || 'Field is required']"
      @input="$emit('update:description',$event)"
    />
  </div>
</template>
<script>
export default {
  props: ["description"]
};
</script>