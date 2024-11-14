<script setup>
const routes = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
  { path: '/resume', label: 'Resume' },
  { path: '/references', label: 'References' },
  { path: '/messages', label: 'Messages' }
]
</script>

<template>
  <nav class="flex justify-center mb-5">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center p-3 ">
        <div class="flex space-x-4">
          <!-- Primary Nav Links -->
          <ul class="hidden md:flex items-center space-x-1">
            <li v-for="route in routes" :key="route.path" class="list-none">
              <router-link 
                :to="route.path" 
                class="py-5 px-3 text-gray-700 hover:text-gray-900" 
                active-class="font-bold"
              >
                {{ route.label }}
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Mobile Button -->
        <div class="md:hidden flex items-center">
          <button class="mobile-menu-button">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <ul class="mobile-menu hidden md:hidden">
      <li v-for="route in routes" :key="route.path" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">
        <router-link 
          :to="route.path" 
          active-class="underline"
        >
          {{ route.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
