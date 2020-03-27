<template>
  <q-input
    v-select-all
    v-model="searchField"
    :options="options"
    @keyup.esc="searchField=''"
    label="Search"
    class="col"
  >
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
import { selectAll } from "src/directives/directive-select-all";

export default {
  props: ["options"],
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
  },
  directives: {
    selectAll
  }
};
</script>