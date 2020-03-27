<template>
<!-- map options and emit value are fixing what is shown on front end and what is sent to store -->
  <q-select standout v-model="sortField" :options="options" map-options emit-value label="Sort by" class="col q-ml-sm" />
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      options: [
        {
          label: "Name",
          value: "name"
        },
        {
          label: "Date",
          value: "dueDate"
        }
      ]
    };
  },
  methods: {
    ...mapActions("tasks", ["setSort"])
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortField: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSort(value);
      }
    }
  },

};
</script>
<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>