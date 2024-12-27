<template>
  <AppDrawer />

  <v-row class="page-header" style="display: flex; align-items: center; justify-content: flex-start;">
   <v-col cols="1"> <v-img  src="../../src/assets/images/back.png" alt="back" @click="goBack" style="height: 24px; cursor: pointer;" /> </v-col>
    <v-col>
     <span class="page-heading"> Add New Invoice </span> 
     </v-col>
  </v-row>

  <v-row>
    <v-col col="12">
      <span>Progress bar</span>
    </v-col>
  </v-row>

  <div style="padding: 20px;">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-typography class="text-h5 heading-company-detals">Company Details</v-typography>
        </v-col>
        <v-col cols="8">
          <span class="text-page">Company Name</span>
          <v-text-field label="Enter Name" v-model="companyName" :class="{'error-border': !isvalid}" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
         <span class="text-page"> Mobile No. </span>
          <v-text-field label="Enter Mobile No" v-model="companymobilenumber" />
        </v-col>

        <v-col cols="4">
          <span class="text-page"> Email </span>
          <v-text-field label="Email" v-model="companyemail" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <span class="text-page">  GSTIN </span>
          <v-text-field label="GST Number" v-model="gstnumber" />
        </v-col>

        <v-col cols="12">
          <span class="text-page">  Company Address </span>
          <v-text-field label="Company Address" v-model="companyaddress" />
        </v-col>

      </v-row>

    </v-form>

    <v-row style="padding: 20px;">
      <v-col cols="12">
        <v-typography class="text-h5" style="color: #2F80ED;">Invoice to details</v-typography>
      </v-col>

      <v-col cols="4">
        <span class="text-page">  Date </span>
     <v-text-field v-model="paymentDate" label="Select Date" readonly @click="dialog = true"></v-text-field>
    <v-dialog v-model="dialog" persistent max-width="290px">
      <v-date-picker v-model="paymentDate" @click="dialog = false"></v-date-picker>
    </v-dialog>
  </v-col>


    </v-row>


    <v-row>
      <v-col cols="8">
        <span class="text-page">  Name </span>
        <v-text-field label="Name" v-model="name" outlined />
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="4">
        <span class="text-page">  Mobile No </span>
        <v-text-field label="mobile number" v-model="mobilenumber"/>
      </v-col>


      <v-col cols="4">
        <span class="text-page">  Email Id </span>
        <v-text-field label="email" v-model="email" outlined />
      </v-col>

    </v-row>

    <v-row>

      <v-col cols="4">
        <span class="text-page"> Pincode </span>
        <v-text-field label="Pin code" v-model="pincode" outlined/>
      </v-col>


      <v-col cols="4">
        <span class="text-page"> City </span>
        <v-text-field label="City" v-model="city" outlined />
      </v-col>


      <v-col cols="4">
        <span class="text-page">  State </span>
        <v-text-field label="state" v-model="state" outlined />
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-page">  Address </span>
        <v-text-field label="Address" v-model="address" outlined />
      </v-col>
    </v-row>
  </div>

  <v-row justify="end" style="padding: 20px;">
  <v-col cols="auto">
    <v-btn class="next-button" @click="NextPage">Next</v-btn>
  </v-col>
</v-row>


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
      selectedDate: null,
      dialog: false,
      paymentDate: null,  // Initialize paymentDate to null, or set a default date if needed
      companyName: '',
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
      isvalid:true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    NextPage() {
      console.log('next')
      if (this.companyName === '') {
        this.isvalid = false;
        console.log('Company name is empty');
        return;
      }
      // data to store 
      const invoiceData = {
        companyName: this.companyName,
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
        address: this.address,
      };

      this.$store.dispatch('addInvoiceData', invoiceData);
      this.invoiceData = '';

      console.log(invoiceData)

      //if validation ok then
      this.$router.push({ name: 'transactiondetail' })
    },
  }
};
</script>

<style scoped>
.add-invoice-container {
  padding: 20px;
  background-color: #f9fbff;
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
.heading-company-detals{
  color: #2F80ED;
}
.text-page{
  font-family: 'Roboto', sans-serif;
font-size: 12px;
font-style: italic;
font-weight: 900;
line-height: 16px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
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
