<template>
  <AppDrawer />

  <!-- Page Header -->
  <v-row
    class="page-header"
    style="display: flex; align-items: center; justify-content: flex-start;"
  >
    <v-col cols="1">
      <v-img
        src="../../src/assets/images/back.png"
        alt="back"
        @click="goBack"
        style="height: 24px; cursor: pointer;"
      />
    </v-col>
    <v-col>
      <span class="page-heading"> Add New Invoice </span>
    </v-col>
  </v-row>

  <!-- Progress Bar -->
  <v-row>
    <v-col cols="12">
      <span>Progress bar</span>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-typography class="header-title">Transaction Details</v-typography>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="table-container">
      <v-simple-table class="transaction-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Discount (in Rs.)</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <v-text-field
                v-model="item.product"
                label="Enter Product"
                outlined
                dense
                class="input-field"
              />
            </td>
            <td>
              <v-text-field
                v-model.number="item.rate"
                label="Enter Rate"
                outlined
                dense
                type="number"
                class="input-field"
              />
            </td>
            <td>
              <v-text-field
                v-model.number="item.quantity"
                label="Enter Quantity"
                outlined
                dense
                type="number"
                class="input-field"
              />
            </td>
            <td>
              <v-text-field
                v-model.number="item.discount"
                label="Enter Discount"
                outlined
                dense
                type="number"
                class="input-field"
              />
            </td>
            <td>{{ calculateTotal(item) }}</td>
            <td>
              <v-btn icon color="red" class="custom-remove-btn" @click="removeItem(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>

  <v-row align="center" justify="space-between">
    <!-- Add Button -->
    <v-col cols="4" class="text-left">
      <v-btn icon color="primary" @click="addItem" class="add-btn">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>

    <!-- Grand Total and Navigation Buttons -->
    <v-col cols="4" class="text-center total-container">
      <!-- Grand Total -->
      <div class="total-grand">
        <span><strong>Total</strong></span>
        <span class="divider">|</span>
        <span>Rs. {{ grandTotal }}</span>
      </div>

      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <v-btn class="back-button" @click="goBack">Back</v-btn>
        <v-btn class="next-button" @click="goNext">Next</v-btn>
      </div>
    </v-col>

    <!-- Empty Spacer -->
    <v-col cols="4"></v-col>
  </v-row>
</template>

<script>
import AppDrawer from './AppDrawer.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    AppDrawer,
  },
  data() {
    return {
      items: [
        {
          product: "",
          rate: '',
          quantity: '',
          discount: '',
        },
      ],
    };
  },
  computed: {
    grandTotal() {
      return this.items.reduce((sum, item) => {
        return sum + this.calculateTotal(item);
      }, 0);
    },
  },
  mounted(){
    const savedData = JSON.parse(localStorage.getItem('transactiondata')) || [];
    this.items = savedData.length ? savedData : this.items;
  },
  methods: {
    calculateTotal(item) {
      const { rate, quantity, discount } = item;
      return rate * quantity - discount;
    },
    addItem() {
      if(this.validateFields()===false) return;  // validation for adding empty rows
      this.items.push({
        product: "",
        rate: 0,
        quantity: 0,
        discount: 0,
      });
    },
    removeItem(index) {
      if (this.items.length < 2) {
        console.log('cannot remove', this.items.length);
        toast.warn('At least one Row is Mandatory!', { autoClose: 3500 });
        return;
      }
      this.items.splice(index, 1);
    },
    validateFields() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (!item.product) {
          toast.error('Product cannot be empty!', { autoClose: 3500 });
          return false;
        }
        if (!item.rate) {
          toast.error('Rate cannot be empty!', { autoClose: 3500 });
          return false;
        }
        if (!item.quantity) {
          toast.error('Quantity cannot be empty!', { autoClose: 3500 });
          return false;
        }
        if (!item.discount) {
          toast.error('Discount cannot be empty!', { autoClose: 3500 });
          return false;
        }
      }
      return true;
    },
    goBack() {
      this.$router.go(-1);
    },
    goNext() {
      const transactiondata = this.items;
      localStorage.setItem('transactiondata', JSON.stringify(transactiondata));
      if (this.validateFields()===true) {
        this.$store.dispatch('addTransactionData', this.items);
        this.$router.push({ name: "preview" });
      }
    },
  },
};
</script>


<style scoped>
.table-container{
  padding: 20px;
}

.header-title {
  font-weight: bold;
  font-size: 24px;
  padding: 10px;
  color: #2f80ed;
  text-align: center;
  margin-bottom: 20px;
}

.transaction-table {
  width: 100%;
  background-color: #f9fbff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.transaction-table th {
  background-color: #fbe6cf;
  color: #333333;
  border:1px solid #C0C0C0;
  text-align: left;
  padding: 10px;
}

.transaction-table td {
  padding: 10px;
  border:1px solid #C0C0C0;
}

.input-field {
  width: 200px;
  height: 34px;
  display: inline-block;
}

.add-btn {
  margin-left: 20px;
}

.total {
  text-align: right;
  font-size: 20px;
  color: #333333;
  font-weight: bold;
}

.action-buttons {
  text-align: right;
  margin-top: 20px;
}

.action-buttons v-btn {
  margin: 0 10px;
}

.page-heading {
  font-weight: 600;
  font-size: 18px;
}

.page-header {
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.total-grand {
  max-width: 300px;
  max-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5; 
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 50px;
  margin-top: 65px;
}

.total-grand span {
  margin: 0 10px;
}

.divider {
  color: #000;
  font-weight: bold; 
}

.next-button {
  width: 124px; 
  height: 56px; 
  border-radius: 30px; 
  margin-right: 250px; 
  background-color: #2F80ED; 
  color: white; 
  justify-content: center;
  align-items: center;
  text-transform: none; 
  font-size: 16px;
}
.back-button {
  width: 124px; 
  height: 56px; 
  border-radius: 30px; 
  border : 1px solid #2F80ED;
  margin-right: 30px; 
  background-color: #ffffff; 
  color: #2F80ED; 
  justify-content: center;
  align-items: center; 
  font-size: 16px;
}
.total-container {
  position: absolute;
  left: 60%;
}

.navigation-buttons {
  margin-top: 10px;
}

.back-button,
.next-button {
  margin: 5px;
}
.custom-remove-btn {
  background-color: rgb(221, 211, 211) !important;
  border: 2px solid red;
  border-radius: 50%; 
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none; 
}

.custom-remove-btn:hover {
  background-color: #ffe6e6;
}
</style>