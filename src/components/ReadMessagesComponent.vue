<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold text-center mb-8">Messages</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="message in messages" :key="message.datetime" class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-lg font-semibold mb-2">{{ message.name }}</div>
          <div class="text-gray-700 mb-4">{{ message.datetime }}</div>
          <p class="text-gray-800">{{ message.message }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const messages = ref([]);
  
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/messages');
      if (response.ok) {
        messages.value = await response.json();
      } else {
        console.error('Error fetching messages.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  onMounted(() => {
    fetchMessages();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  </style>
  