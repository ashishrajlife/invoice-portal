<template>
      <!-- AppDrawer Component -->
      <AppDrawer />
      <div class="page-header" style="display: flex; align-items: center; justify-content: flex-start;">
    <div class="page-heading">Invoice List</div>
    <v-img 
      src="../../src/assets/images/back.png" 
      alt="yy" 
      @click="goBack" 
      style="height: 24px;" />
  </div>
  
      <navbar/>

      <v-container>
        here progress bar
      </v-container>
      
      <div style="padding: 20px;">

        <v-form>
      <v-row>
        <v-col cols="12">
          <v-typography class="text-h5">Company Details</v-typography>
        </v-col>
        
         <v-col cols="10">
          <span>Company Name</span>
          <v-text-field
            label="Company Name"
            v-model="companyName"
            class="inputStyle"
            outlined
          />
        </v-col>

       </v-row>

       <v-row>
        <v-col cols="5">
          <span>Mobile Number</span>
          <v-text-field
            label="Company Name"
            v-model="companyName"
            class="inputStyle"
            outlined
          />
        </v-col>

        <v-col cols="5">
          <span>Email</span>
          <v-text-field
            label="Company Name"
            v-model="companyName"
            class="inputStyle"
            outlined
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="5">
          <span>GSTIN</span>
          <v-text-field
            label="Company Name"
            v-model="companyName"
            class="inputStyle"
            outlined
          />
        </v-col>
        
         <v-col cols="10">
          <span>Company Address</span>
          <v-text-field
            label="Company Name"
            v-model="companyName"
            class="inputStyle"
            outlined
          />
        </v-col>

       </v-row>
      
        </v-form>

  </div>


  <div style="padding: 20px;">

<v-form>
<v-row>
<v-col cols="12">
  <v-typography class="text-h5">Invoice to details</v-typography>
</v-col>

<v-col cols="10">
        <span>Payment Date</span>
     
    <span>Payment Date</span>
    <v-date-picker v-model="paymentDate" />
  </v-col>
   

</v-row>

<v-row>
<v-col cols="5">
  <span>Mobile Number</span>
  <v-text-field
    label="Company Name"
    v-model="companyName"
    class="inputStyle"
    outlined
  />
</v-col>

<v-col cols="5">
  <span>Email</span>
  <v-text-field
    label="Company Name"
    v-model="companyName"
    class="inputStyle"
    outlined
  />
</v-col>
</v-row>

<v-row>
<v-col cols="5">
  <span>GSTIN</span>
  <v-text-field
    label="Company Name"
    v-model="companyName"
    class="inputStyle"
    outlined
  />
</v-col>

 <v-col cols="10">
  <span>Company Address</span>
  <v-text-field
    label="Company Name"
    v-model="companyName"
    class="inputStyle"
    outlined
  />
</v-col>

</v-row>

</v-form>

</div>


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
        paymentDate: null,  // Initialize paymentDate to null, or set a default date if needed
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
     
    }
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
  padding-left: 3rem;
  font-weight: 600;
}
.page-header{
    height: 50px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.inputStyle{
        width: "100%";          
        height: "48px";
        padding: "16px 0px 0px 0px";
        gap: "16px";
        border-radius: "12px";   
        border: "1px solid #e0e0e0";
        opacity: "1"
    }
  </style>
