<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-6 font-['Space_Grotesk'] text-white">
    <div class="max-w-6xl mx-auto">
      
      <!-- Authentication Interface -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-[70vh]">
        <div class="w-full max-w-md p-12 bg-[#131313] border border-white/5 rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <!-- Security Accent -->
          <div class="absolute top-0 left-0 w-full h-1 bg-[#00FF9C] opacity-50"></div>
          
          <div class="text-center mb-10 space-y-4">
            <div class="inline-flex items-center justify-center h-16 w-16 bg-[#0e0e0e] border border-white/5 rounded-sm mb-4 group-hover:border-[#00FF9C]/40 transition-colors">
              <Icon icon="ph:shield-check-duotone" class="text-3xl text-[#00FF9C]" />
            </div>
            <h3 class="text-3xl font-black text-white uppercase italic tracking-tighter">System Access</h3>
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Encrypted Login Required</p>
          </div>

          <form @submit.prevent="authenticateUser" class="space-y-8">
            <div class="space-y-2">
              <label for="username" class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Identity / Username</label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                placeholder="UID-0000"
                class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-white focus:border-[#00FF9C]/50 focus:ring-1 focus:ring-[#00FF9C]/20 outline-none transition-all placeholder:text-gray-800"
              />
            </div>
            <div class="space-y-2">
              <label for="password" class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Access Key / Password</label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                placeholder="••••••••"
                class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-white focus:border-[#00FF9C]/50 focus:ring-1 focus:ring-[#00FF9C]/20 outline-none transition-all placeholder:text-gray-800"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="w-full py-5 bg-[#00FF9C] text-black font-black uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-[#05e68d] hover:shadow-[0_0_30px_rgba(0,255,156,0.3)] transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Authorize Access
              </button>
            </div>
          </form>
          
          <p v-if="authError" class="text-[#FF4D4D] text-[10px] font-black text-center mt-8 uppercase tracking-widest animate-pulse">
            Error: {{ authError }}
          </p>
        </div>
      </div>

      <!-- Secure Messages Dashboard -->
      <div v-if="isAuthenticated" class="space-y-24">
        <header class="text-center space-y-6">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.4em]">
            Terminal Admin
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
            Incoming <br/>
            <span class="text-[#00FF9C]">Data Logs.</span>
          </h1>
          <p class="text-2xl text-gray-400 max-w-2xl mx-auto font-medium tracking-tight">
            Managing secure communication modules and external visitor inquiries.
          </p>
        </header>

        <div class="space-y-8 max-w-4xl mx-auto">
          <div class="flex items-center justify-between px-6 pb-4 border-b border-white/5">
             <span class="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">Active Transmissions / {{ messages.length }}</span>
             <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em]">Level 5 Access Verified</span>
          </div>

          <div
            v-for="message in messages"
            :key="message.datetime"
            class="group relative p-10 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/30 transition-all duration-700 overflow-hidden"
          >
            <!-- Hover Glow -->
            <div class="absolute -inset-1 bg-[#00FF9C] opacity-0 group-hover:opacity-[0.02] blur-xl transition-opacity duration-1000"></div>

            <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div class="flex items-center gap-6">
                 <div class="h-12 w-12 bg-[#0e0e0e] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#00FF9C]/40 transition-colors">
                    <Icon icon="ph:terminal-window-duotone" class="text-xl text-white/40 group-hover:text-[#00FF9C]" />
                 </div>
                 <div>
                    <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Source ID</p>
                    <h2 class="text-2xl font-black text-white italic tracking-tighter group-hover:text-[#00FF9C] transition-colors">{{ message.name }}</h2>
                 </div>
              </div>
              <div class="px-4 py-2 bg-[#0e0e0e] border border-white/5 rounded-full">
                <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">{{ message.datetime }}</span>
              </div>
            </div>

            <div class="relative z-10 p-8 bg-[#0e0e0e] border border-white/5 rounded-sm">
               <div class="absolute top-4 left-4 text-[#00FF9C]/10 font-black text-6xl pointer-events-none select-none">“</div>
               <p class="text-gray-400 text-lg leading-relaxed font-medium tracking-tight italic">
                {{ message.message }}
              </p>
            </div>
            
            <div class="relative z-10 mt-8 flex justify-end gap-6">
               <button class="text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-[#00FF9C] transition-colors">Archive Log</button>
               <button class="text-[10px] font-black text-[#00FF9C] uppercase tracking-widest hover:underline underline-offset-4">Flag Protocol</button>
            </div>
          </div>
        </div>
        
        <div class="text-center py-12">
           <p class="text-[10px] font-black text-gray-700 uppercase tracking-[0.8em]">End of Transmission Logs</p>
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