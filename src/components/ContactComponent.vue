<template>
  <div class="space-y-16">
      
      <!-- Header Section -->
      <section class="text-center space-y-10">
        <div class="ui-eyebrow">
          Communication Interface
        </div>
        <h1 class="ui-h1">
          Initiate <br/>
          <span class="text-app-brand">Contact.</span>
        </h1>
        <p class="ui-lead max-w-2xl mx-auto">
          Open to discussing engineering leadership, cloud architecture, or high-performance backend opportunities.
        </p>
      </section>

      <!-- Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- Info Sidebar -->
        <aside class="lg:col-span-4 space-y-12">
          <div class="ui-card ui-card-hover p-8 sm:p-10 space-y-10">
            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-3">
              <span class="h-[2px] w-8 bg-app-brand rounded-full"></span>
              Direct Channels
            </h3>
            
            <div class="space-y-12">
              <!-- Phone -->
              <div class="flex items-center gap-8 group/item">
                <div class="h-14 w-14 bg-app-muted border border-app-border flex items-center justify-center rounded-xl group-hover/item:border-slate-300 transition-colors">
                  <Icon icon="ph:phone-duotone" class="h-6 w-6 text-slate-500 group-hover/item:text-app-brand transition-colors" />
                </div>
                <div>
                  <p class="text-xs font-medium text-slate-500 mb-1">Secure Line</p>
                  <p class="text-slate-900 font-semibold text-lg tracking-tight">+357 99 142840</p>
                </div>
              </div>
              
              <!-- Email -->
              <div class="flex items-center gap-8 group/item">
                <div class="h-14 w-14 bg-app-muted border border-app-border flex items-center justify-center rounded-xl group-hover/item:border-slate-300 transition-colors">
                  <Icon icon="ph:paper-plane-tilt-duotone" class="h-6 w-6 text-slate-500 group-hover/item:text-app-brand transition-colors" />
                </div>
                <div>
                  <p class="text-xs font-medium text-slate-500 mb-1">Digital Mail</p>
                  <a href="mailto:tzamil1991@gmail.com" class="text-slate-900 font-semibold text-lg tracking-tight hover:text-app-brand transition-colors">
                    tzamil1991@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Message Form -->
        <div class="lg:col-span-8">
          <div class="ui-card p-8 sm:p-10 md:p-12 relative overflow-hidden">
            <!-- Security Accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-app-brand/60"></div>
            
            <h2 class="ui-h2 mb-10">Dispatch Inquiry</h2>
            
            <!-- Feedback Modules -->
            <transition name="fade">
              <div v-if="successMessage" class="mb-8 p-5 bg-app-accent/10 border border-app-accent/25 rounded-lg text-slate-900 font-medium flex items-center gap-4">
                <Icon icon="ph:check-circle-fill" class="text-3xl shrink-0" />
                <span class="text-sm">Success: {{ successMessage }}</span>
              </div>
            </transition>
            
            <transition name="fade">
              <div v-if="errorMessage" class="mb-8 p-5 bg-red-500/10 border border-red-500/25 rounded-lg text-red-700 font-medium flex items-center gap-4">
                <Icon icon="ph:warning-circle-fill" class="text-3xl shrink-0" />
                <span class="text-sm">Error: {{ errorMessage }}</span>
              </div>
            </transition>

            <form class="space-y-8">
              <!-- Name -->
              <div class="space-y-4">
                <label for="senderName" class="ui-field-label">Name</label>
                <input
                  v-model="senderName"
                  id="senderName"
                  type="text"
                  placeholder="SOURCE NAME"
                  class="ui-input"
                  required
                />
              </div>

              <!-- Message -->
              <div class="space-y-4">
                <label for="message" class="ui-field-label">Message</label>
                <textarea
                  v-model="message"
                  id="message"
                  placeholder="DESCRIBE PROJECT SCOPE OR INQUIRY"
                  rows="6"
                  maxlength="300"
                  class="ui-textarea"
                  required
                ></textarea>
                <div class="flex justify-end pr-2">
                  <span class="text-xs text-slate-500">{{ message.length }}/300</span>
                </div>
              </div>

              <!-- Submit -->
              <button
                @click.prevent="sendMessage"
                class="ui-btn-primary w-full py-3.5"
              >
                <span>Dispatch Message</span>
                <Icon icon="ph:paper-plane-right-fill" class="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

      </div>
  </div>
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