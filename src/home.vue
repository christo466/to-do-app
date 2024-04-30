<template>
  <div>
    <h1>User Information</h1>
     <div v-if="users">
      <div class="card-container">
      <div v-for="user in users" :key="user.username" class="card" >
        <div class="card-body">
          <h5 class="card-title">Username: {{ user.username }}</h5>
          <p class="card-text">Age: {{ user.age }}</p>
          <button class="my-button" @click="user.showModal = true">Update</button>
          <div v-if="user.showModal">
            <div>
              <h2>Update User</h2>
              <input type="text" class="form-input" v-model="user.username" placeholder="Enter username" />
              <input type="text" class="form-input" v-model="user.age" placeholder="Enter age" />
              <button class="my-button" @click="updateData(user.id, user); user.showModal = false">Save Update</button>
              <button class="my-button" @click="user.showModal = false">Close</button>
            </div>
          </div>
          <button class="my-button1" @click="deleteData(user.id)">Delete</button>
        </div>
      </div>
      </div>
     </div>
   
    <div v-else>Loading...</div>
  </div>
  <div>
    <!-- Your existing code... -->
    <button class="my-button2" @click="showApp = true">Add user</button>
    <app-modal v-if="showApp" @close="showApp = false">
      <h2>Add New User</h2>
      <input type="text" class="form-input" v-model="newUser.username" placeholder="Enter username" />
      <input type="text" class="form-input" v-model="newUser.age" placeholder="Enter age" />
      <button class="my-button" @click="pushData(); showApp = false">Add User</button>
    </app-modal>
  </div>
</template>

<script>
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import { remove } from "firebase/database";

export default {
  name: 'HomeView',
  
 
  data() {
    return {
      users: null,
      showApp: false,
      newUser: {
        username: '',
        age: '',
      },
    };
  },

  created() {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      if (users) { // Check if users is not null or undefined
        this.users = Object.keys(users).map(id => ({ ...users[id], id, showModal: false }));
      } else {
        this.users = [];
      }
    });
  },
  methods: {
    pushData() {
      const db = getDatabase();
      set(ref(db, "users/" + this.newUser.username), {
        username: this.newUser.username,
        age: this.newUser.age
      });
      this.newUser.username = '';
      this.newUser.age = '';
    },
    updateData(id, user) {
      const db = getDatabase();
      update(ref(db, "users/" + id), { username: user.username, age: user.age });
    },
    deleteData(id) {
    const db = getDatabase();
    remove(ref(db, "users/" + id));
  },
  },
};
</script>
<style scoped>
.card-container {
  display: flex; /* Display the children (cards) in a row */
  flex-wrap: wrap; /* Wrap the cards to the next line if there's not enough space */
  justify-content: space-between; /* Add space between the cards */
}

.card {
  flex: 0 0 calc(33.33% - 10px); /* Each card takes up one third of the container width, minus 10px for margin */
  margin: 5px; /* Add some margin around each card */
  /* ... rest of your card styles ... */
}
.form-input {
  margin-bottom: 10px; 
  
}
.my-button {
  background-color: green; /* Green background */
  color: white; /* White text */
  border: none; /* No border */
  padding: 10px 20px; /* Adjust this to decrease the size of the buttons */
  font-size: 14px; /* Padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  display: inline-block;
  margin: 4px 2px; /* Margin between buttons */
  cursor: pointer;
}
.my-button1 {
  background-color: blue; /* Green background */
  color: white; /* White text */
  border: none; /* No border */
  padding: 10px 20px; /* Adjust this to decrease the size of the buttons */
  font-size: 14px; /* Padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  display: inline-block;
  margin: 4px 2px; /* Margin between buttons */
  cursor: pointer;
}
.my-button2 {
  background-color: yellow; /* Green background */
  color: black; /* White text */
  border: none; /* No border */
  padding: 10px 20px; /* Adjust this to decrease the size of the buttons */
  font-size: 14px; /* Padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  display: inline-block;
  margin: 4px 2px; /* Margin between buttons */
  cursor: pointer;
}
.card {
  width: 18rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* This will add a shadow */
  transition: 0.3s; /* This will create a transition effect */
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); /* This will deepen the shadow when you hover over the card */
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 1.25rem;
  font-size: 1rem;
}
</style>