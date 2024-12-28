<template>

<v-row class="page-header"
    style="display: flex; align-items: center; justify-content: flex-start;"
  >
    <v-col cols="1">
      <v-img
        src="../../src/assets/images/back.png"
        alt="back"
        @click="goback"
        style="height: 24px; cursor: pointer;"
      />
    </v-col>
    <v-col>
      <span class="page-heading"> Add New Invoice </span>
    </v-col>
  </v-row>

    <div class="error-container">
      <v-img src="../../src/assets/images/image-error.jpg" alt="Error" class="error-image" />
      <p class="error-text">OOPS: Devloper wasn't confirm about the functionality of this Button.</p>
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditInvoice',
  methods:{
    goback(){
        this.$router.go(-1)
    }
  }  
};
  </script>
  
  <style scoped>
  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    text-align: center;
  }
  .page-heading {
  font-weight: 600;
  font-size: 18px;
}
.page-header {
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
  .error-image {
    width: 150px; /* Adjust size as needed */
    height: auto;
    margin-bottom: 20px;
  }
  
  .error-text {
    font-size: 18px;
    color: #ff0000;
  }
  </style>
  