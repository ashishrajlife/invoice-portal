<template>
  <AppDrawer />

  <div style="padding: 25px;">
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h1 class="text-h5">Invoice</h1>
        <div>#3456789</div>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <div>Date: <strong>{{ invoiceData.paymentDate }}</strong></div>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <h2 class="text-h6">INVOICE TO:</h2>
        <div>Name: <strong>{{ invoiceData.name }}</strong></div>
        <div>Mobile: <strong>{{ invoiceData.mobilenumber }}</strong></div>
        <div>Email: <strong>{{ invoiceData.email }}</strong></div>
        <div>Address: <strong>{{ invoiceData.address }}</strong></div>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <h2 class="text-h6">Company Name</h2>
        <div>Mobile: <strong>{{ invoiceData.companymobilenumber }}</strong></div>
        <div>Email: <strong>{{ invoiceData.companyemail }}</strong></div>
        <div>GSTIN: <strong>{{ invoiceData.gstnumber }}</strong></div>
      </v-col>
    </v-row>

    <v-row class="product-list">
      <v-col cols="12" class="mb-2">
        <div class="d-flex justify-space-between font-weight-bold">
          <span>Product</span>
          <span>Rate</span>
          <span>Quantity</span>
          <span>Discount</span>
          <span>Total</span>
        </div>
      </v-col>

      <v-col cols="12" class="mb-2" v-for="(item, index) in transactionData" :key="index">
        <div class="d-flex justify-space-between">
          <span>{{ item.product }}</span>
          <span>{{ item.rate }}</span>
          <span>{{ item.quantity }}</span>
          <span>{{ item.discount }}</span>
          <span>{{ calculateTotal(item) }}</span>
        </div>
      </v-col>

      <v-col cols="12" class="mb-2 text-right">
        <div class="font-weight-bold">Total: Rs. {{ grandTotal }}</div>
      </v-col>
    </v-row>

    <v-row justify="end" class="mt-4">
      <v-btn color="primary" class="mr-2" @click="goBack">Back</v-btn>
      <v-btn color="success" @click="saveInvoice">Done</v-btn>
    </v-row>
  </div>
</template>

<script>
import AppDrawer from './AppDrawer.vue';
export default {
  name: 'PreView',
  components: {
    AppDrawer,
  },
  computed: {
    invoiceData() {
      // Ensure you're properly accessing non-reactive data
      return JSON.parse(JSON.stringify(this.$store.getters.getInvoiceData)) || {}; // To unwrap the reactive object
    },
    transactionData() {
      // Ensure you're properly accessing non-reactive data
      return JSON.parse(JSON.stringify(this.$store.getters.getTransactionData)) || []; // To unwrap the reactive object
    },
    grandTotal() {
      return this.transactionData.reduce((sum, item) => sum + this.calculateTotal(item), 0);
    }
  },
  methods: {
    calculateTotal(item) {
      return item.rate * item.quantity - item.discount;
    },
    // saveInvoice() {
    //   // Log the invoice data to ensure it's correct
    //   console.log('Invoice Data:', this.invoiceData);
    //   console.log('Transaction Data:', this.transactionData);

    //   // If data is valid, save the invoice
    //   if (this.invoiceData && this.transactionData.length > 0) {
    //     this.$store.dispatch('saveInvoice', {
    //       invoiceData: this.invoiceData,
    //       transactionData: this.transactionData
    //     });
    //   } else {
    //     alert('Invalid data!');
    //   }
    // },

    saveInvoice() {
      console.log('save invoice')
    // Dispatch action to save invoice and transaction data
    this.$store.dispatch('saveInvoice', {
      invoiceData: this.invoiceData,
      transactionData: this.transactionData
    })
    .then(() => {
      // Redirect or handle after saving
      this.$router.push('dashboard'); // Redirect to the invoice list page
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
/* Your styles remain unchanged */
</style>
