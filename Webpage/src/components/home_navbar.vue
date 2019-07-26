<template>
  <nav>
    <v-toolbar flat app class="orange">
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="subheading text-uppercase">
        <span class="white--text">Find My IoT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="orange">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "attachment", text: "Documentation", route: "/console" },
        { icon: "dashboard", text: "Console", route: "/console" },
        { icon: "logout", text: "Log Out", route: "/" }
      ]
    };
  }
};
</script>
