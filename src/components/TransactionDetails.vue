<template>
  <AppDrawer />
 
    <v-row>
      <v-col cols="12">
        <v-typography class="header-title">
          Transaction Details
        </v-typography>
      </v-col>
    </v-row>

    <!-- Transaction Table -->
    <v-row>
      <v-col cols="12">
        <v-simple-table class="transaction-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Discount (in Rs.)</th>
              <th>Total</th>
              <th>Action</th>
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
              <td>
                {{ calculateTotal(item) }}
              </td>
              <td>
                <v-btn icon color="red" @click="removeItem(index)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-btn
          icon
          color="primary"
          @click="addItem"
          class="add-btn"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Total Section -->
    <v-row class="total-section">
      <v-col cols="6" class="text-right">
        <strong>Total</strong>
        Rs. {{ grandTotal }}
        <v-btn outlined color="grey" @click="goBack">Back</v-btn>
      <v-btn color="primary" @click="goNext">Next</v-btn>
      </v-col>

    </v-row>

</template>

<script>
import AppDrawer from './AppDrawer.vue';
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
  methods: {
    calculateTotal(item) {
      const { rate, quantity, discount } = item;
      return rate * quantity - discount;
    },
    addItem() {
      this.items.push({
        product: "",
        rate: 0,
        quantity: 0,
        discount: 0,
      });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    goBack() {
      this.$router.go(-1);
    },
    goNext() {
      this.$store.dispatch('addTransactionData', this.items);
      this.$router.push({ name: "preview" });
    },
  },
};
</script>

<style scoped>
.v-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: auto;
}

.header-title {
  font-weight: bold;
  font-size: 24px;
  color: #2f80ed;
  text-align: center;
  margin-bottom: 20px;
}

.transaction-table {
  width: 1094px;
  height: 146px;
  background-color: #f9fbff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.transaction-table th {
  background-color: #2f80ed;
  color: white;
  text-align: left;
  padding: 10px;
}

.transaction-table td {
  padding: 10px;
}

.input-field {
  width: 257px;
  height: 34px;
  display: inline-block;
}

.total-section {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

.total-value {
  color: #2f80ed;
}

.action-buttons {
  margin-top: 20px;
}

.action-buttons v-btn {
  min-width: 100px;
}
</style>
