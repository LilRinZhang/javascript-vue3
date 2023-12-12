<template>
  <v-app>
    <v-system-bar color="blue-darken-3" class="grey--text text--darken-4 d-flex justify-space-between" height="30">
      <div>Customer Management System</div>
    </v-system-bar>
    <v-navigation-drawer expand-on-hover rail permanent v-bind:width="150" color="white--text text--darken-4"
      image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
      <v-list dense nav color="white">
        <v-list-item style="color:white;min-height: 44px" title="2023" subtitle="BaseYear"
          prepend-icon="mdi-calendar-blank-outline">
        </v-list-item>

        <v-divider style="color:white;margin-bottom: 2px"></v-divider>

        <v-list-item link to="/" style="color:white;" prepend-icon="mdi-account-multiple" title="Top">
        </v-list-item>

        <v-list-item link to="/search" style="color:white" prepend-icon="mdi-account-search" title="Search">
        </v-list-item>

        <v-list-item link to="/add" style="color:white" prepend-icon="mdi-account-plus" title="Add">
        </v-list-item>

        <v-list-item link to="/update" style="color:white" prepend-icon="mdi-account-reactivate" title="Update">
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list dense nav color="white">
          <v-list-item style="color:white" prepend-icon="mdi-arrow-up-bold" title="MoveTop" @click="smoothToTop">
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { inject } from 'vue';
// smoothScroll
const smoothScroll = inject('smoothScroll')
const smoothToTop = () => {
  smoothScroll({
    scrollTo: 0
  })
}
</script>
