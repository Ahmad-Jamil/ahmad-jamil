<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
      <div class="max-w-6xl mx-auto space-y-16">
        <!-- Header Section -->
        <div class="text-center mb-16 space-y-4">
          <h1 class="text-4xl md:text-6xl font-black">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Get In Touch
            </span>
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            I am open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free
            to reach out!
          </p>
        </div>
  
        <!-- Contact Details Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <!-- Phone Number Card -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div class="relative p-6 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10 flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-gray-300 font-medium">+357 99 142840</span>
            </div>
          </div>
  
          <!-- Email Card -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div class="relative p-6 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10 flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:tzamil1991@gmail.com" 
                 class="text-gray-300 font-medium hover:text-blue-400 transition-colors">
                tzamil1991@gmail.com
              </a>
            </div>
          </div>
        </div>
  
        <!-- Message Form Section -->
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div class="relative p-8 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10">
            <h2 class="text-2xl font-bold mb-6 text-center text-white">
              Leave A Message
            </h2>
            <p v-if="successMessage" class="text-sm text-center text-green-400"> {{ successMessage }}</p>
            <p v-if="errorMessage" class="text-sm text-center text-red-400"> {{ errorMessage }}</p>
            <form class="space-y-6">
              <!-- Name Input -->
              <div class="space-y-2">
                <label for="senderName" class="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  v-model="senderName"
                  id="senderName"
                  type="text"
                  placeholder="Your Name"
                  class="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                  required
                />
              </div>
  
              <!-- Message Textarea -->
              <div class="space-y-2">
                <label for="message" class="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  v-model="message"
                  id="message"
                  placeholder="Your Message"
                  rows="6"
                  maxlength="300"
                  class="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200 resize-none"
                  required
                ></textarea>
                <div class="flex justify-end">
                  <span class="text-sm text-gray-500">
                    {{ message.length }}/300 characters
                  </span>
                </div>
              </div>
  
              <!-- Submit Button -->
              <button
                @click.prevent="sendMessage"
                class="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import { ref } from 'vue';
import { API_ENDPOINTS } from '@/config/api';

const senderName = ref('');
const message = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const sendMessage = async () => {
    const newMessage = {
        name: senderName.value,
        message: message.value,
        datetime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    try {
        const response = await fetch(API_ENDPOINTS.MESSAGES,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });
        if (response.ok) {
            senderName.value = ''
            message.value = ''
            successMessage.value = 'Thanks You! I will respond to your message as soon as possible.'
            errorMessage.value = ''
        } else {
            errorMessage.value = 'Oops! Something went wrong, please try again.'
            successMessage.value = ''
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.message === 'Failed to fetch' || error.code === 'ERR_NETWORK' || error.name === 'TypeError') {
            errorMessage.value = 'Cannot connect to server. Please check your connection or contact support.'
        } else {
            errorMessage.value = 'Oops! Something went wrong, please try again.'
        }
        successMessage.value = ''
    }
};
</script>
