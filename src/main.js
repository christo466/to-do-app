import { createApp } from 'vue'; 
import App from  './App.vue';
import Home from './home.vue'; // Import Home component
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/analytics'; 
import { createRouter, createWebHistory } from 'vue-router'; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7x2rXzRaxt5eWbg-gPwM-LDY7Z6MOyRg",
  authDomain: "firstproject-803f4.firebaseapp.com",
  projectId: "firstproject-803f4",
  databaseURL:"https://firstproject-803f4-default-rtdb.firebaseio.com/",
  storageBucket: "firstproject-803f4.appspot.com",
  messagingSenderId: "4274714254",
  appId: "1:4274714254:web:1e0ab1afca1d0ba969fbdf",
  measurementId: "G-NC36X6YMSZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const routes = [
  { path: '/', component: Home },
  { path: '/app', component: App }, // Add this line
  
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const vueApp = createApp(Home); // Mount App component instead of Home
vueApp.use(router);
vueApp.mount('#app');