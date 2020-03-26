<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    No tasks todo today!
    <template v-slot:action>
      <q-btn flat color="primary" label="Add task" @click="$root.$emit('showAddTask')" />
    </template>
  </q-banner>
</template>
<script>
export default {};
</script>