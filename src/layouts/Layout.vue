<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Hamburger button -->
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />-->
        <q-toolbar-title class="absolute-center">Awsome Todo</q-toolbar-title>
        <q-btn
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
          flat
          :to="{ name: 'auth' }"
          v-if="!loggedIn"
        />
        <q-btn
          icon-right="exit_to_app"
          label="Logout"
          class="absolute-right"
          flat
          v-else
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          v-for="link in essentialLinks"
          :to="{ name: link.link }"
          :key="link.title"
          :icon="link.icon"
          :label="link.title"
        />
      </q-tabs>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
      :width="250"
      :breakpoint="767"
    >
      <q-list dark>
        <q-item-label header class="white">Navigation</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="text-grey-2"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Todo",
          icon: "list",
          link: "home"
        },
        {
          title: "Settings",
          caption: "",
          icon: "settings",
          link: "settings"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    logout() {
      this.logoutUser();
    }
  }
};
</script>
<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
.q-drawer {
  .q-router-link--exact-active {
    color: #fff !important;
    background-color: $secondary;
  }
}
.white {
  color: $white !important;
}
</style>
