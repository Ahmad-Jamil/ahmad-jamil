<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto">

      <!-- Authentication Modal -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-lg transition duration-300">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h3>
          <form @submit.prevent="authenticateUser" class="space-y-4">
            <div>
              <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                placeholder="Enter username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
            </div>
            <div>
              <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                placeholder="Enter password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </div>
          </form>
          <p v-if="authError" class="text-red-500 text-center mt-4">{{ authError }}</p>
        </div>
      </div>

      <!-- Messages Section -->
      <div v-if="isAuthenticated" class="space-y-12">
        <section class="text-center mb-12 space-y-4">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Admin Messages</h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            View and manage messages securely sent by your website visitors.
          </p>
        </section>

        <div class="space-y-6">
          <div
            v-for="message in messages"
            :key="message.datetime"
            class="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300"
          >
            <div class="flex justify-between items-start mb-2">
              <h2 class="text-lg font-semibold text-gray-900">{{ message.name }}</h2>
              <span class="text-sm text-gray-500">{{ message.datetime }}</span>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ message.message }}</p>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { API_ENDPOINTS } from '@/config/api';

const credentials = ref({ username: '', password: '' });
const authError = ref('');
const isAuthenticated = ref(false);
const messages = ref([]);

const authenticateUser = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials.value),
    });

    if (!response.ok) {
      authError.value = response.status === 401 ? 'Invalid username or password.' : 'Authentication failed.';
      return;
    }

    isAuthenticated.value = true;
    authError.value = '';
    await fetchMessages();
  } catch (error) {
    console.error(error);
    authError.value = 'Cannot connect to server. Please check your connection or contact support.';
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.MESSAGES);
    if (response.ok) {
      messages.value = await response.json();
    } else {
      authError.value = 'Failed to fetch messages.';
    }
  } catch (error) {
    console.error(error);
    authError.value = 'Cannot connect to server.';
    isAuthenticated.value = false;
  }
};
</script>