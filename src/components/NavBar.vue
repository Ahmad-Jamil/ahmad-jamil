<template>
  <nav
    class="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md border-b border-white/10 z-50 transition-all duration-300"
    :class="{ 'shadow-lg': scrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">

        <!-- Centered Navigation Links -->
        <div class="flex-grow flex justify-center">
          <div class="hidden md:flex items-center space-x-1">
            <router-link v-for="route in routes" :key="route.path" :to="route.path"
              class="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 rounded-full group overflow-hidden"
              :class="{ 'bg-white/20': $route.path === route.path }">
              <span class="relative z-10">{{ route.label }}</span>
              <div
                class="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full">
              </div>
            </router-link>
          </div>
        </div>

        <!-- Theme Toggle & Contact Button -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/contact"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 text-sm font-medium hover:scale-105">
            Get in touch
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
            :aria-expanded="isOpen">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6 transition-transform duration-300" :class="{ 'rotate-90': isOpen }" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
      <div v-if="isOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-indigo-500/95 via-purple-500/95 to-pink-500/95 backdrop-blur-md">
        <div class="pt-2 pb-3 space-y-1 px-4">
          <router-link v-for="route in routes" :key="route.path" :to="route.path"
            class="block px-4 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
            :class="{ 'bg-white/20 text-white': $route.path === route.path }" @click="isOpen = false">
            {{ route.label }}
          </router-link>
          <div class="pt-4 flex items-center justify-between border-t border-white/10 mt-4">
            <router-link to="/contact"
              class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-200 text-sm font-medium">
              Get in touch
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>


  <!-- Spacer to prevent content from going under fixed nav -->
  <div class="h-20"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const routes = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/references', label: 'References' },
  { path: '/messages', label: 'Messages' },
]

const isOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>