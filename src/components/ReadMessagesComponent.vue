<template>
  <div class="space-y-16">
      
      <!-- Authentication Interface -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-[70vh]">
        <div class="w-full max-w-md ui-card p-8 sm:p-10 relative overflow-hidden">
          <!-- Security Accent -->
          <div class="absolute top-0 left-0 w-full h-1 bg-app-brand/60"></div>
          
          <div class="text-center mb-10 space-y-4">
            <div class="inline-flex items-center justify-center h-16 w-16 bg-app-muted border border-app-border rounded-2xl mb-4">
              <Icon icon="ph:shield-check-duotone" class="text-3xl text-app-brand" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Admin access</h3>
            <p class="text-sm text-slate-600">Login to view messages.</p>
          </div>

          <form @submit.prevent="authenticateUser" class="space-y-8">
            <div class="space-y-2">
              <label for="username" class="ui-field-label">Username</label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                placeholder="UID-0000"
                class="ui-input"
              />
            </div>
            <div class="space-y-2">
              <label for="password" class="ui-field-label">Password</label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                placeholder="••••••••"
                class="ui-input"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="ui-btn-primary w-full"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <p v-if="authError" class="text-red-700 text-sm text-center mt-6">
            Error: {{ authError }}
          </p>
        </div>
      </div>

      <!-- Secure Messages Dashboard -->
      <div v-if="isAuthenticated" class="space-y-24">
        <header class="text-center space-y-6">
          <div class="ui-eyebrow mx-auto">
            Terminal Admin
          </div>
          <h1 class="ui-h1">
            Incoming <br/>
            <span class="text-app-brand">Messages.</span>
          </h1>
          <p class="ui-lead max-w-2xl mx-auto">
            Managing secure communication modules and external visitor inquiries.
          </p>
        </header>

        <div class="space-y-8 max-w-4xl mx-auto">
          <div class="flex items-center justify-between px-2 pb-4 border-b border-app-border">
             <span class="text-sm text-slate-600">Messages: {{ messages.length }}</span>
             <span class="text-sm text-app-brand font-medium">Authenticated</span>
          </div>

          <div
            v-for="message in messages"
            :key="message.datetime"
            class="ui-card ui-card-hover p-6 sm:p-8 overflow-hidden"
          >
            <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div class="flex items-center gap-6">
                 <div class="h-12 w-12 bg-app-muted border border-app-border flex items-center justify-center shrink-0 rounded-xl">
                    <Icon icon="ph:terminal-window-duotone" class="text-xl text-slate-500" />
                 </div>
                 <div>
                    <p class="text-xs text-slate-500">From</p>
                    <h2 class="text-lg font-semibold text-slate-900 tracking-tight">{{ message.name }}</h2>
                 </div>
              </div>
              <div class="px-3 py-1.5 bg-app-muted border border-app-border rounded-full">
                <span class="text-xs text-slate-600">{{ message.datetime }}</span>
              </div>
            </div>

            <div class="relative z-10 p-5 bg-app-muted border border-app-border rounded-xl">
               <p class="text-slate-700 leading-relaxed">
                {{ message.message }}
              </p>
            </div>
            
            <div class="relative z-10 mt-8 flex justify-end gap-6">
               <button class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Archive</button>
               <button class="text-sm font-medium text-app-brand hover:underline underline-offset-4">Flag</button>
            </div>
          </div>
        </div>
        
        <div class="text-center py-12">
           <p class="text-sm text-slate-500">End of messages</p>
        </div>
      </div>
  </div>
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