<template>
  <v-container id="login-page" class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="login-card pa-5" outlined>
      <v-card-title class="justify-center">
        <v-img src="../assets/images/Cnlogo.png" alt="Company Logo" contain max-height="100" max-width="100" />
      </v-card-title>
      <v-card-subtitle class="text-center mb-4">
        <h2>Authentication</h2>
      </v-card-subtitle>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="email" label="Email" :rules="[rules.required, rules.email]" outlined dense placeholder="Enter your email" />
          <v-text-field  v-model="password" label="Password" :rules="[rules.required]" type="password" outlined dense placeholder="Enter your password" class="mt-4" />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="loginUser">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      rules: {
        required: value => !!value || 'This field is required',
        email: value => /.+@.+\..+/.test(value) || 'Enter a valid email address',
      },
    };
  },
  methods: {
    async loginUser() {
      console.log('in')
      if (!this.valid) {
        toast.error('Please fill out the form correctly', { autoClose: 3500 });
        return;
      }

      try {
        console.log('try')
        const response = await axios.get('https://project-data-cc03.onrender.com/users', {
          params: { email: this.email, password: this.password },
        });
        console.log(response,'resp')
        if (response.data.length > 0) {
          const userData = {
            authToken: response.data[0].authToken,
          };
          this.$store.dispatch('login', userData);
          this.$router.push('/dashboard');
        } else {
          toast.error('Invalid credentials', { autoClose: 3500 });
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('Something went wrong! Please try again.', { autoClose: 3500 });
      }
    },
  },
};
</script>

<style scoped>
#login-page {
  background-color: #f5f5f5;
}
.login-card {
  max-width: 400px;
  width: 100%;
}
</style>
