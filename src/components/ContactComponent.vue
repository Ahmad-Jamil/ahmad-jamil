<template>
  <main class="bg-white min-h-screen pt-12 pb-24 px-6 animate-fade-in-up">
    <div class="max-w-6xl mx-auto space-y-24">

      <!-- Header Section -->
      <section class="text-center space-y-6">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide">
          Communication
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
          Get In <span class="text-indigo-600">Touch</span>
        </h1>
        <p class="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Open to discussing engineering leadership, cloud architecture, or backend opportunities.
        </p>
      </section>

      <!-- Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        <!-- Info Sidebar -->
        <div class="lg:col-span-4 space-y-12">
          <div class="p-10 bg-gray-50 border border-transparent rounded-[40px] space-y-8 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50/50 transition duration-500 group">
            <h3 class="text-2xl font-black text-gray-900 mb-8 tracking-tight">Direct Channels</h3>

            <div class="space-y-10">
              <!-- Phone -->
              <div class="flex items-center space-x-6">
                <div class="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-indigo-600 transition duration-500">
                  <Icon icon="ph:phone-duotone" class="h-7 w-7 text-indigo-600 group-hover:text-white transition" />
                </div>
                <div>
                  <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Call Me</p>
                  <p class="text-gray-900 font-bold text-lg">+357 99 142840</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-center space-x-6">
                <div class="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-indigo-600 transition duration-500">
                  <Icon icon="ph:paper-plane-tilt-duotone" class="h-7 w-7 text-indigo-600 group-hover:text-white transition" />
                </div>
                <div>
                  <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Me</p>
                  <a href="mailto:tzamil1991@gmail.com" class="text-gray-900 font-bold text-lg hover:text-indigo-600 transition">
                    tzamil1991@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Form -->
        <div class="lg:col-span-8">
          <div class="p-10 md:p-16 bg-white border border-gray-100 rounded-[48px] shadow-2xl shadow-indigo-100/30">
            <h2 class="text-3xl font-black mb-10 text-gray-900">Send a Brief</h2>

            <transition name="fade">
              <div v-if="successMessage" class="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-emerald-700 font-bold flex items-center gap-4 animate-fade-in-up">
                <Icon icon="ph:check-circle-fill" class="text-2xl shrink-0" />
                {{ successMessage }}
              </div>
            </transition>

            <transition name="fade">
              <div v-if="errorMessage" class="mb-8 p-6 bg-rose-50 border border-rose-100 rounded-3xl text-rose-700 font-bold flex items-center gap-4 animate-fade-in-up">
                <Icon icon="ph:warning-circle-fill" class="text-2xl shrink-0" />
                {{ errorMessage }}
              </div>
            </transition>

            <form class="space-y-10">
              <!-- Name -->
              <div class="space-y-3">
                <label for="senderName" class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                <input
                  v-model="senderName"
                  id="senderName"
                  type="text"
                  placeholder="Full Name"
                  class="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-2xl text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all duration-300"
                  required
                />
              </div>

              <!-- Message -->
              <div class="space-y-3">
                <label for="message" class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  v-model="message"
                  id="message"
                  placeholder="How can I help you today?"
                  rows="6"
                  maxlength="300"
                  class="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-2xl text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all duration-300 resize-none"
                  required
                ></textarea>
                <div class="flex justify-end pr-1">
                  <span class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{{ message.length }}/300</span>
                </div>
              </div>

              <!-- Submit -->
              <button
                @click.prevent="sendMessage"
                class="group w-full bg-indigo-600 text-white py-6 px-10 rounded-2xl font-black text-lg hover:bg-gray-900 focus:ring-8 focus:ring-indigo-50 transition-all duration-500 flex items-center justify-center space-x-4 shadow-xl shadow-indigo-100"
              >
                <span>Dispatch Message</span>
                <Icon icon="ph:paper-plane-right-fill" class="h-6 w-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  </main>
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
    datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
  };

  try {
    const response = await fetch(API_ENDPOINTS.MESSAGES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      senderName.value = '';
      message.value = '';
      successMessage.value = 'Thank you! I will respond to your message as soon as possible.';
      errorMessage.value = '';
    } else {
      errorMessage.value = 'Oops! Something went wrong, please try again.';
      successMessage.value = '';
    }
  } catch (error) {
    console.error(error);
    errorMessage.value =
      error.message === 'Failed to fetch' || error.code === 'ERR_NETWORK' || error.name === 'TypeError'
        ? 'Cannot connect to server. Please check your connection or contact support.'
        : 'Oops! Something went wrong, please try again.';
    successMessage.value = '';
  }
};
</script>