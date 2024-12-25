<template>
    <v-container class="add-invoice-container" fluid>
      <!-- AppDrawer Component -->
      <AppDrawer />
  
      <div style="height: 50px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <v-img src="../../src/assets/images/back.png" alt="yy" @click="goBack"/>
        <div class="page-heading"> Invoice List</div>
    </div>
  
      <navbar/>
      <!-- Stepper -->
     
    </v-container>
  </template>
  
  <script>
  import AppDrawer from "@/components/AppDrawer";
  
  export default {
    name: 'AddInvoice',
    components: {
      AppDrawer,
    },
    data() {
      return {

      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
     
    },
  };
  </script>
  
  <style scoped>
  .add-invoice-container {
    padding: 20px;
    background-color: #f9fbff;
  }
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
  .page-heading{
  padding-left: 20px;
  font-weight: 600;
  padding-top: 5px;
}
  </style>
