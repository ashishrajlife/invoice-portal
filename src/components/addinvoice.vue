<template>
  <AppDrawer />

  <v-row class="page-header" style="display: flex; align-items: center; justify-content: flex-start;">
    <v-col cols="1"> <v-img src="../../src/assets/images/back.png" alt="back" @click="goBack" style="height: 24px; cursor: pointer;" /> </v-col>
    <v-col>
      <span class="page-heading"> Add New Invoice </span> 
    </v-col>
  </v-row>

    <v-form style="padding: 30px;">
      <v-row>
        <v-col cols="12">
          <v-typography class="text-h5 " style="color: #2F80ED;">Company Details</v-typography>
        </v-col>
        <v-col cols="8">
          <span class="text-page">Company Name</span>
          <v-text-field label="Enter Name" v-model="companyname" class="input-custom-form" :class="{'error-border': !isValid.companyname}" />
          <div v-if="!isValid.companyname" class="error-message">Company Name is required.</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <span class="text-page"> Mobile No. </span>
          <v-text-field label="Enter Mobile No" v-model="companymobilenumber" :class="{'error-border': !isValid.companymobilenumber}" />
          <div v-if="!isValid.companymobilenumber" class="error-message">Mobile number should be 10 digits.</div>
        </v-col>

        <v-col cols="4">
          <span class="text-page"> Email </span>
          <v-text-field label="Email" v-model="companyemail" :class="{'error-border': !isValid.companyemail}" />
          <div v-if="!isValid.companyemail" class="error-message">Email is required.</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <span class="text-page"> GSTIN </span>
          <v-text-field label="GST Number" v-model="gstnumber" :class="{'error-border': !isValid.gstnumber}" />
          <div v-if="!isValid.gstnumber" class="error-message">GSTIN is required.</div>
        </v-col>

        <v-col cols="12">
          <span class="text-page"> Company Address </span>
          <v-text-field label="Company Address" v-model="companyaddress" :class="{'error-border': !isValid.companyaddress}" />
          <div v-if="!isValid.companyaddress" class="error-message">Company address is required.</div>
        </v-col>
      </v-row>
   

    <v-row>
      <v-col cols="12">
        <v-typography class="text-h5" style="color: #2F80ED;">Invoice to details</v-typography>
      </v-col>

      <v-col cols="4">
    <span class="text-page"> Date </span>
    <input type="datetime-local" v-model="paymentDate" class="custom-date-input" :class="{'error-border': !isValid.paymentDate}" />
    <div v-if="!isValid.paymentDate" class="error-message">Date is required.</div>
  </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <span class="text-page"> Name </span>
        <v-text-field label="Name" v-model="name" outlined :class="{'error-border': !isValid.name}" />
        <div v-if="!isValid.name" class="error-message">Name is required.</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <span class="text-page"> Mobile No </span>
        <v-text-field label="mobile number" v-model="mobilenumber" :class="{'error-border': !isValid.mobilenumber}"/>
        <div v-if="!isValid.mobilenumber" class="error-message">Mobile number is required.</div>
      </v-col>

      <v-col cols="4">
        <span class="text-page"> Email Id </span>
        <v-text-field label="email" v-model="email" outlined :class="{'error-border': !isValid.email}" />
        <div v-if="!isValid.email" class="error-message">Email is required.</div>
      </v-col>

    </v-row>

    <v-row>

      <v-col cols="4">
        <span class="text-page"> Pincode </span>
        <v-text-field label="Pin code" v-model="pincode" outlined :class="{'error-border': !isValid.pincode}" />
        <div v-if="!isValid.pincode" class="error-message">Pincode is required.</div>
      </v-col>

      <v-col cols="4">
        <span class="text-page"> City </span>
        <v-text-field label="City" v-model="city" outlined />
      </v-col>

      <v-col cols="4">
        <span class="text-page"> State </span>
        <v-text-field label="state" v-model="state" outlined />
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-page"> Address </span>
        <v-text-field label="Address" v-model="address" outlined/>
      </v-col>
    </v-row>

  <v-row justify="end" style="padding: 20px;">
    <v-col cols="auto">
      <v-btn class="next-button" @click="NextPage">Next</v-btn>
    </v-col>
  </v-row>
</v-form>

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
      dialog: false,
      paymentDate: null,  
      companyname: '',
      companymobilenumber: '',
      mobilenumber: '',
      companyemail: '',
      email: '',
      gstnumber: '',
      companyaddress: '',
      name: '',
      pincode: '',
      city: '',
      state: '',
      address: '',
      isValid: {
        companyname: true,
        companymobilenumber: true,
        companyemail: true,
        gstnumber: true,
        companyaddress: true,
        paymentDate: true,
        name: true,
        mobilenumber: true,
        email: true,
        pincode: true,
      }
    };
  },
  mounted(){
  const savedData = JSON.parse(localStorage.getItem('invoiceData')) || {};
  this.companyname = savedData.companyname || '';
  this.companymobilenumber = savedData.companymobilenumber || '';
  this.companyemail = savedData.companyemail || '';
  this.gstnumber = savedData.gstnumber || '';
  this.companyaddress = savedData.companyaddress || '';
  this.paymentDate = savedData.paymentDate || '';
  this.name = savedData.name || '';
  this.mobilenumber = savedData.mobilenumber || '';
  this.email = savedData.email || '';
  this.pincode = savedData.pincode || '';
  this.city = savedData.city || '';
  this.state = savedData.state || '';
  this.address = savedData.address || '';
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    NextPage() {
  // Reset all validations to remove borders
  this.isValid = {
    companyname: true,
    companymobilenumber: true,
    companyemail: true,
    gstnumber: true,
    companyaddress: true,
    paymentDate: true,
    name: true,
    mobilenumber: true,
    email: true,
    pincode: true,
  };

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //email validation regec
  const noSpecialCharRegex = /^[a-zA-Z0-9\s]+$/; // special character regex

  // Company Name Validation
  if (this.companyname === '' || !noSpecialCharRegex.test(this.companyname)) {
    this.isValid.companyname = false;
    isValid = false;
  }

  // Company Mobile Number Validation
  if (!/^\d{10}$/.test(this.companymobilenumber)|| !noSpecialCharRegex.test(this.name)) {
    this.isValid.companymobilenumber = false;
    isValid = false;
  }

  // Company Email Validation
  if (!this.companyemail || !emailRegex.test(this.companyemail)) {
    this.isValid.companyemail = false;
    isValid = false;
  }

  // GST Number Validation
  if (this.gstnumber === '') {
    this.isValid.gstnumber = false;
    isValid = false;
  }

  // Payment Date Validation
  if (this.paymentDate === '') {
    this.isValid.paymentDate = false;
    isValid = false;
  }

  // Name Validation
  if (this.name === '' || !noSpecialCharRegex.test(this.name)) {
    this.isValid.name = false;
    isValid = false;
  }

  // Mobile Number Validation
  if (this.mobilenumber === '' || !noSpecialCharRegex.test(this.pincode)) {
    this.isValid.mobilenumber = false;
    isValid = false;
  }

  // Pincode Validation
  if (this.pincode === '' || !noSpecialCharRegex.test(this.pincode)) {
    this.isValid.pincode = false;
    isValid = false;
  }

  // Email Validation
  if (this.email === '' || !emailRegex.test(this.email)) {
    this.isValid.email = false;
    isValid = false;
  }

  // If all fields are valid
  if (isValid) {
    const invoiceData = {
      companyname: this.companyname,
      companymobilenumber: this.companymobilenumber,
      mobilenumber: this.mobilenumber,
      companyemail: this.companyemail,
      email: this.email,
      gstnumber: this.gstnumber,
      companyaddress: this.companyaddress,
      paymentDate: this.paymentDate,
      name: this.name,
      pincode: this.pincode,
      city: this.city,
      state: this.state,
    };
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    this.$store.dispatch('addInvoiceData', invoiceData);
    this.$router.push({ name: 'transactiondetail' });
  }
},
  }
};
</script>


<style scoped>
.add-invoice-container {
  padding: 20px;
  background-color: #f9fbff;
}
.custom-date-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}
.custom-date-input:focus {
  border-color: #2F80ED;
}
.error-border {
  border: 2px solid red;
  height: 57px;
}

.page-heading {
  font-weight: 600;
}

.page-header {
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.heading-company-details {
  color: #2F80ED;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.text-page {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 900;
  font-style: italic;
  line-height: 16px;
  text-align: left;
  text-decoration-skip-ink: none;
  text-underline-position: from-font;
}

.next-button {
  width: 124px;
  height: 56px;
  border-radius: 30px;
  margin-right: 30px;
  background-color: #2F80ED;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: none;
  font-size: 16px;
}


</style>
