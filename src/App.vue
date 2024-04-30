<template>
  <div class="form-row">
    <input type="text" class="form-input" v-model="input1" placeholder="Enter your name" />
    <input type="text" class="form-input" v-model="input2" placeholder="Enter your age" />
    <button class="my-button" @click="pushData">Push Data</button>
     <!-- Add the "Update" button and the modal dialog here -->
     
   </div>
  
</template>

<script>
//import firebase from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";






export default {
  data() {
    return {
      input1: "",
      input2: "",
      showModal: false, // Add this line
      currentUser: {    // Add this line
        username: '',
        age: '',
      },
    };
  },
  methods: {
    pushData() {
      const db = getDatabase();
      set(ref(db, "users/" + this.input1), {
        username: this.input1,
        age:this.input2
      });
    },
    
  },
};
</script>
<style scoped>
.form-row {
  display: flex; /* Display the children in a row */
   /* Add space between the children */
  padding: 10px; /* Add some padding */
}
.form-input {
  margin-bottom: 10px; 
  margin-top: 20px;
}
.my-button {
  background-color: green; /* Green background */
  color: white; /* White text */
  border: none; /* No border */
  padding: 15px 32px; /* Padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px; /* Margin between buttons */
  cursor: pointer;
}
.form-row input {
  margin-right: 10px; /* Add some margin to the inputs */
}
</style>