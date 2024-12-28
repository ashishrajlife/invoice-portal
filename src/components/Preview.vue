<template>
  <AppDrawer />

  <v-row
    class="page-header"
    style="display: flex; align-items: center; justify-content: flex-start;"
  >
    <v-col cols="1">
      <v-img src="../../src/assets/images/back.png" alt="back" @click="goBack" style="height: 24px; cursor: pointer;" />
    </v-col>
    <v-col>
      <span class="page-heading"> Add New Invoice </span>
    </v-col>
  </v-row>


  <div style="padding: 25px;">
    <v-row justify="space-between" align="center" class="mb-4">

      <v-col cols="6">
        <h2 class="text-h6 company-name-style">{{ invoiceData.companyName }}</h2>
      </v-col>

      <v-col cols="6" md="6" class="text-right">
        <!-- -->
        <div>Mobile: <strong>{{ invoiceData.companymobilenumber }}</strong></div>
        <div>Email: <strong>{{ invoiceData.companyemail }}</strong></div>
        <div>GSTIN: <strong>{{ invoiceData.gstnumber }}</strong></div>
      </v-col>
    </v-row>


    <v-row align="center" class="invoice-header">
  <v-col cols="10">
    <h2 class="invoice-title">Invoice</h2>
  </v-col>

  <v-col class="invoice-number" cols="2" align="end">
    <div>#3456789</div>
  </v-col>
</v-row>

    <v-row>
      <v-col>
        <h2>Invoice To:</h2> 
      </v-col>

      <v-col class="invoice-number">
        <div>Date: <strong>{{ invoiceData.paymentDate }}</strong></div> 
      </v-col>

    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <div>Name: <strong>{{ invoiceData.name }}</strong></div>
        <div>Mobile: <strong>{{ invoiceData.mobilenumber }}</strong></div>
        <div>Email: <strong>{{ invoiceData.email }}</strong></div>
        <div>Address: <strong>{{ invoiceData.address }}</strong></div>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
       
        
      </v-col>
    </v-row>

    <v-row class="product-list">
      <v-col cols="12" class="mb-2">
        <div class="d-flex justify-space-between font-weight-bold heading-data-table">
          <span>Product</span>
          <span>Rate</span>
          <span>Quantity</span>
          <span>Discount</span>
          <span>Total</span>
        </div>
      </v-col>

      <v-col cols="12" class="mb-2" v-for="(item, index) in transactionData" :key="index" style="padding: 0px 35px 0px;">
        <div class="d-flex justify-space-between">
          <span>{{ item.product }}</span>
          <span>{{ item.rate }}</span>
          <span>{{ item.quantity }}</span>
          <span>{{ item.discount }}</span>
          <span>{{ calculateTotal(item) }}</span>
        </div>
      </v-col>

    </v-row>

    <v-row justify="end" class="mt-4">
  <v-col cols="12" class="mb-2 text-right total-grand">
    <div class="font-weight-bold">Total 
      <span class="divider">|</span>
      Rs. {{ grandTotal }}
    </div>
  </v-col>
</v-row>


<v-row justify="end" class="mt-4">
  <v-col cols="auto" class="text-right">
    <v-btn class="back-button" @click="goBack">Back</v-btn>
    <v-btn class="next-button" @click="saveInvoice">Done</v-btn>
  </v-col>
</v-row>

  </div>
</template>

<script>
import AppDrawer from './AppDrawer.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  name: 'PreView',
  components: {
    AppDrawer,
  },
  computed: {
    invoiceData() {
      return JSON.parse(JSON.stringify(this.$store.getters.getInvoiceData)) || {};
    },
    transactionData() {
      return JSON.parse(JSON.stringify(this.$store.getters.getTransactionData)) || [];
    },
    grandTotal() {
      return this.transactionData.reduce((sum, item) => sum + this.calculateTotal(item), 0);
    }
  },
  methods: {
    calculateTotal(item) {
      return item.rate * item.quantity - item.discount;
    },
    saveInvoice() {
      console.log('save invoice')
      toast.info('Saving Invoice Please Wait ..!', { autoClose: false });
    //to save invoice and transaction data
    this.$store.dispatch('saveInvoice', {
      invoiceData: this.invoiceData,
      transactionData: this.transactionData
    })
    .then(() => {
      localStorage.clear();
      this.$router.push('dashboard'); //Redirect to the dashboard
    })
    .catch(error => {
      console.error('Failed to save invoice:', error);
      alert('Failed to save invoice.');
    });
  },

    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
.page-heading {
  font-weight: 600;
  font-size: 18px;
}

.page-header {
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.invoice-header {
  background-color: #f7f9fc; 
  border-bottom: 1px solid #e0e0e0;
}

.invoice-title {
  color: #28a745; 
  font-weight: bold;
  margin: 0;
}
.heading-data-table{
  border: 1px solid black;
    padding: 10px 15px;
    background-color: antiquewhite;
}
.invoice-number {
  color: #333; 
  font-weight: 500; 
  text-align: right; 
}
.company-name-style{
font-size: 32px;
font-weight: 700;
line-height: 26px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#424242;
}
.total-grand {
  max-width: 659px;
    max-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.divider {
  color: #000;
  font-weight: bold; 
}
.next-button {
  width: 124px; 
  height: 56px; 
  border-radius: 30px; 
  background-color: #2F80ED; 
  color: white; 
  font-size: 16px;
  margin-left: 20px; /* Slight margin between the buttons */
}

.back-button {
  width: 124px; 
  height: 56px; 
  border-radius: 30px; 
  border: 1px solid #2F80ED;
  background-color: #ffffff; 
  color: #2F80ED; 
  font-size: 16px;
}

</style>
