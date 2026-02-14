<template>
  <nav class="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
    <div
      class="relative flex items-center justify-between w-full max-w-6xl px-6 h-16
             bg-white/70 backdrop-blur-xl border border-gray-200/60
             shadow-[0_8px_30px_rgba(0,0,0,0.06)]
             rounded-2xl transition-all duration-300"
      :class="{ 'shadow-[0_12px_40px_rgba(0,0,0,0.1)] scale-[0.98]': scrolled }"
    >

      <!-- Logo -->
      <router-link
        to="/"
        class="text-base font-semibold tracking-tight text-gray-900"
      >
        Ahmad
      </router-link>

      <!-- Desktop Nav -->
      <div class="hidden md:flex relative items-center bg-gray-100/60 p-1 rounded-full">

        <!-- Active Sliding Background -->
        <div
          class="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300"
          :style="activeStyle"
        ></div>

        <router-link
          v-for="(route, index) in routes"
          :key="route.path"
          :ref="el => linkRefs[index] = el"
          :to="route.path"
          class="relative z-10 px-5 py-2 text-sm font-medium text-gray-600
                 hover:text-gray-900 transition-colors duration-200"
        >
          {{ route.label }}
        </router-link>
      </div>

      <!-- CTA -->
      <div class="hidden md:flex">
        <router-link
          to="/contact"
          class="px-5 py-2 text-sm font-medium rounded-full
                 bg-gray-900 text-white hover:bg-gray-800
                 transition-all duration-200"
        >
          Contact
        </router-link>
      </div>

      <!-- Mobile Toggle -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
      >
        <svg
          class="h-6 w-6 transition-transform duration-300"
          :class="{ 'rotate-90': isOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="absolute top-20 w-[90%] max-w-md
               bg-white/90 backdrop-blur-xl border border-gray-200
               rounded-2xl shadow-xl p-6 md:hidden"
      >
        <div class="space-y-4">
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            @click="isOpen = false"
            class="block text-base font-medium text-gray-700 hover:text-gray-900"
          >
            {{ route.label }}
          </router-link>

          <router-link
            to="/contact"
            @click="isOpen = false"
            class="block mt-4 px-5 py-2 text-center text-sm font-medium
                   rounded-full bg-gray-900 text-white"
          >
            Contact
          </router-link>
        </div>
      </div>
    </transition>
  </nav>

  <div class="h-28"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const routes = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/references', label: 'References' },
  { path: '/messages', label: 'Messages' },
]

const route = useRoute()
const isOpen = ref(false)
const scrolled = ref(false)
const linkRefs = []
const activeStyle = ref({})

const updateActive = async () => {
  await nextTick()
  const index = routes.findIndex(r => r.path === route.path)
  const el = linkRefs[index]
  if (!el) return

  activeStyle.value = {
    left: el.offsetLeft + 'px',
    width: el.offsetWidth + 'px',
  }
}

watch(() => route.path, updateActive)
onMounted(() => {
  updateActive()
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})
</script>