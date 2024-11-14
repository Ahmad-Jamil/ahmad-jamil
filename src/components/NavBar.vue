<template>
  <nav class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-xl font-bold text-gray-800">
            AJ
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="route in routes" 
            :key="route.path"
            :to="route.path"
            class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 relative group"
            :class="{ 'text-blue-600': $route.path === route.path }"
          >
            {{ route.label }}
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            :aria-expanded="isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Heroicon name: menu (open) -->
            <svg 
              v-if="!isOpen"
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Heroicon name: x (close) -->
            <svg 
              v-else
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-if="isOpen" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === route.path }"
            @click="isOpen = false"
          >
            {{ route.label }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>

  <!-- Spacer to prevent content from going under fixed nav -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref } from 'vue'

const routes = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/references', label: 'References' },
  { path: '/contact', label: 'Contact' },
]

const isOpen = ref(false)
</script>