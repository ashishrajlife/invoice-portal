<template>
    <v-navigation-drawer app>
      <v-img style="width: 209px; height: 117px; gap: 0px; opacity: 0px;" src="../assets/images/Cnlogo.png" />
      <v-list>
        <v-list-item>
          <v-list-item-title>Team</v-list-item-title>
        </v-list-item>
        <v-list-item :class="{ 'active-item': activeSection === 'invoices' }" @click="updateSection('invoices')" >
          <v-list-item-title>Invoices</v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="text-center my-4 logout-user-button">
        <v-btn @click="logoutUser">Logout</v-btn>
      </div>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    name: "AppDrawer",
    props: {
      activeSection: {
        type: String,
        required: true,
      },
    },
    methods: {
      logoutUser() {
        console.log("User logged out");
        this.$store.dispatch("logout");
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style scoped>
  .logout-user-button {
    position: absolute;
    top: 75%;
    left: 5rem;
    border: 1px solid red;
    color: red;
    background-color: transparent;
    font-weight: bold;
  }
  .active-item {
    background-color: #2F80ED;
    color: white;
  }
  </style>
  