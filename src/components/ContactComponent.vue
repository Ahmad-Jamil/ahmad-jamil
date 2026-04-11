<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-6 font-['Space_Grotesk'] text-white">
    <div class="max-w-6xl mx-auto space-y-24">
      
      <!-- Header Section -->
      <section class="text-center space-y-10">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.4em]">
          Communication Interface
        </div>
        <h1 class="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none uppercase italic">
          Initiate <br/>
          <span class="text-[#00FF9C]">Contact.</span>
        </h1>
        <p class="text-2xl text-gray-400 max-w-2xl mx-auto font-medium tracking-tight">
          Open to discussing engineering leadership, cloud architecture, or high-performance backend opportunities.
        </p>
      </section>

      <!-- Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- Info Sidebar -->
        <aside class="lg:col-span-4 space-y-12">
          <div class="p-12 bg-[#131313] border border-white/5 rounded-sm space-y-12 hover:border-[#00FF9C]/30 transition-all duration-700 group">
            <h3 class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em] flex items-center gap-4">
              <span class="h-[1px] w-8 bg-[#00FF9C]"></span>
              Direct Channels
            </h3>
            
            <div class="space-y-12">
              <!-- Phone -->
              <div class="flex items-center gap-8 group/item">
                <div class="h-16 w-16 bg-[#0e0e0e] border border-white/5 flex items-center justify-center rounded-sm group-hover/item:border-[#00FF9C]/40 transition-colors">
                  <Icon icon="ph:phone-duotone" class="h-7 w-7 text-white/40 group-hover/item:text-[#00FF9C] transition-colors" />
                </div>
                <div>
                  <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Secure Line</p>
                  <p class="text-white font-black italic text-xl tracking-tighter">+357 99 142840</p>
                </div>
              </div>
              
              <!-- Email -->
              <div class="flex items-center gap-8 group/item">
                <div class="h-16 w-16 bg-[#0e0e0e] border border-white/5 flex items-center justify-center rounded-sm group-hover/item:border-[#00FF9C]/40 transition-colors">
                  <Icon icon="ph:paper-plane-tilt-duotone" class="h-7 w-7 text-white/40 group-hover/item:text-[#00FF9C] transition-colors" />
                </div>
                <div>
                  <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Digital Mail</p>
                  <a href="mailto:tzamil1991@gmail.com" class="text-white font-black italic text-xl tracking-tighter hover:text-[#00FF9C] transition-colors">
                    tzamil1991@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Message Form -->
        <div class="lg:col-span-8">
          <div class="p-12 md:p-16 bg-[#131313] border border-white/5 rounded-sm relative overflow-hidden">
            <!-- Security Accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-[#00FF9C] opacity-30"></div>
            
            <h2 class="text-3xl font-black mb-12 text-white uppercase italic tracking-tighter">Dispatch Inquiry</h2>
            
            <!-- Feedback Modules -->
            <transition name="fade">
              <div v-if="successMessage" class="mb-10 p-8 bg-[#00FF9C]/10 border border-[#00FF9C]/30 rounded-sm text-[#00FF9C] font-bold flex items-center gap-6 animate-pulse">
                <Icon icon="ph:check-circle-fill" class="text-3xl shrink-0" />
                <span class="text-sm uppercase tracking-widest">Protocol Success: {{ successMessage }}</span>
              </div>
            </transition>
            
            <transition name="fade">
              <div v-if="errorMessage" class="mb-10 p-8 bg-red-500/10 border border-red-500/30 rounded-sm text-red-500 font-bold flex items-center gap-6">
                <Icon icon="ph:warning-circle-fill" class="text-3xl shrink-0" />
                <span class="text-sm uppercase tracking-widest">System Error: {{ errorMessage }}</span>
              </div>
            </transition>

            <form class="space-y-12">
              <!-- Name -->
              <div class="space-y-4">
                <label for="senderName" class="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-1">Identity / Name</label>
                <input
                  v-model="senderName"
                  id="senderName"
                  type="text"
                  placeholder="SOURCE NAME"
                  class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-8 py-5 text-white font-bold italic tracking-tight focus:border-[#00FF9C]/50 focus:ring-1 focus:ring-[#00FF9C]/10 outline-none transition-all duration-500 placeholder:text-gray-800"
                  required
                />
              </div>

              <!-- Message -->
              <div class="space-y-4">
                <label for="message" class="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-1">Transmission / Brief</label>
                <textarea
                  v-model="message"
                  id="message"
                  placeholder="DESCRIBE PROJECT SCOPE OR INQUIRY"
                  rows="6"
                  maxlength="300"
                  class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-8 py-5 text-white font-bold italic tracking-tight focus:border-[#00FF9C]/50 focus:ring-1 focus:ring-[#00FF9C]/10 outline-none transition-all duration-500 resize-none placeholder:text-gray-800"
                  required
                ></textarea>
                <div class="flex justify-end pr-2">
                  <span class="text-[10px] font-black text-gray-700 uppercase tracking-widest">{{ message.length }}/300</span>
                </div>
              </div>

              <!-- Submit -->
              <button
                @click.prevent="sendMessage"
                class="group relative w-full bg-[#00FF9C] text-black py-6 px-12 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:bg-[#05e68d] hover:shadow-[0_0_40px_rgba(0,255,156,0.3)] transition-all duration-500 flex items-center justify-center gap-6 active:scale-[0.98]"
              >
                <span>Dispatch Message</span>
                <Icon icon="ph:paper-plane-right-fill" class="h-6 w-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700" />
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
import { Icon } from '@iconify/vue';
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
<style scoped>
.italic {
  font-style: italic;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>