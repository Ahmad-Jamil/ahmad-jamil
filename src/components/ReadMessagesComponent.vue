<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-screen">
        <!-- Authentication Modal -->
        <div class="relative w-full max-w-md p-8 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10">
          <!-- Decorative Background -->
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25"></div>
          <div class="relative z-10 text-center">
            <h3 class="text-2xl font-bold text-white mb-6">Admin Login</h3>
            <form @submit.prevent="authenticateUser">
              <div class="mb-6">
                <label for="username" class="block text-gray-400 font-medium mb-2">Username</label>
                <input
                  id="username"
                  v-model="credentials.username"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                />
              </div>
              <div class="mb-6">
                <label for="password" class="block text-gray-400 font-medium mb-2">Password</label>
                <input
                  id="password"
                  v-model="credentials.password"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600"
                >
                  Login
                </button>
              </div>
            </form>
            <p v-if="authError" class="text-red-500 text-center mt-4">{{ authError }}</p>
          </div>
        </div>
      </div>

      <!-- Messages Section -->
      <div v-if="isAuthenticated">
        <div class="text-center mb-16 space-y-4">
          <h1 class="text-4xl md:text-6xl font-black">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Admin Messages
            </span>
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            View and manage messages securely sent by your website visitors.
          </p>
        </div>
        <div class="space-y-12">
          <div
            v-for="message in messages"
            :key="message.datetime"
            class="relative group"
          >
            <!-- Decorative Elements -->
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <!-- Card Content -->
            <div class="relative p-8 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-bold text-white">{{ message.name }}</h2>
                  <span class="text-sm text-gray-400">{{ message.datetime }}</span>
                </div>
                <p class="text-gray-300 leading-relaxed">{{ message.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
      if (response.status === 401) {
        authError.value = 'Invalid username or password.';
      } else {
        throw new Error('Authentication failed');
      }
      return;
    }

    isAuthenticated.value = true;
    authError.value = '';
    await fetchMessages();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error.message === 'Failed to fetch' || error.code === 'ERR_NETWORK' || error.name === 'TypeError') {
      authError.value = 'Cannot connect to server. Please check your connection or contact support.';
    } else {
      authError.value = 'Invalid username or password.';
    }
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.MESSAGES);
    if (response.ok) {
      messages.value = await response.json();
    } else {
      console.error('Error fetching messages.');
      authError.value = 'Failed to fetch messages. Please try again.';
    }
  } catch (error) {
    console.error('Error:', error);
    authError.value = 'Cannot connect to server. Please check your connection or contact support.';
    isAuthenticated.value = false;
  }
};

onMounted(() => {
  // Wait for login
});
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.relative .blur {
  filter: blur(10px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(20px);
}

.text-transparent {
  background-clip: text;
  color: transparent;
}
</style>
