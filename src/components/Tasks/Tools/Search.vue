<template>
  <q-input v-model="searchField" label="Search" class="col">
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("tasks", ["setSearch"])
  },
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  }
};
</script>