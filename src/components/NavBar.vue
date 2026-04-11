<template>
  <nav class="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
    <!-- Navbar Container -->
    <div
      class="relative flex items-center justify-between px-6 py-3 bg-[#0e0e0e]/60 backdrop-blur-xl rounded-full border border-white/5 transition-all duration-500"
      :class="{ 'shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-[#0e0e0e]/80 border-white/10 scale-[0.98]': scrolled }"
    >
      <!-- Logo -->
      <router-link to="/" class="flex items-center group">
        <span class="text-xl font-bold tracking-tighter text-[#00FF9C] group-hover:scale-105 transition-transform duration-300">
          Ahmad Jamil
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex relative items-center bg-white/5 p-1 rounded-full border border-white/5">
        <!-- Active Sliding Background -->
        <div
          class="absolute top-1 bottom-1 bg-[#00FF9C] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          :style="activeStyle"
        ></div>

        <router-link
          v-for="(routeItem, index) in routes"
          :key="routeItem.path"
          :ref="setLinkRef(index)"
          :to="routeItem.path"
          class="relative z-10 px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300"
          :class="route.path === routeItem.path ? 'text-black' : 'text-[#adaaaa] hover:text-white'"
        >
          {{ routeItem.label }}
        </router-link>
      </div>

      <!-- CTA Section -->
      <div class="hidden md:flex items-center gap-4">
        <router-link
          to="/contact"
          class="px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-full bg-[#00FF9C] text-black hover:bg-[#05e68d] hover:shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all duration-300 active:scale-95"
        >
          Contact
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-2 text-white/70 hover:text-[#00FF9C] transition-colors"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-10 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-10 scale-95"
    >
      <div v-if="isOpen" class="absolute top-20 left-0 w-full bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:hidden shadow-2xl">
        <div class="flex flex-col gap-6">
          <router-link
            v-for="routeItem in routes"
            :key="routeItem.path"
            :to="routeItem.path"
            @click="isOpen = false"
            class="text-2xl font-bold uppercase tracking-tighter transition-colors"
            :class="route.path === routeItem.path ? 'text-[#00FF9C]' : 'text-white/50 hover:text-white'"
          >
            {{ routeItem.label }}
          </router-link>
          
          <router-link
            to="/contact"
            @click="isOpen = false"
            class="mt-4 w-full py-4 text-center font-black uppercase tracking-widest bg-[#00FF9C] text-black rounded-2xl"
          >
            Initiate Contact
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
// import iconImage from '@/assets/images/personal/ajIcon.png'

//const icon = ref(iconImage)

const routes = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/references', label: 'References' },
  { path: '/messages', label: 'Messages' },
  // { path: '/admin/projects', label: 'Edit Projects' },
  // { path: '/admin/resume', label: 'Edit Resume' },
  // { path: '/admin/references', label: 'Edit References' },
]

const route = useRoute()
const isOpen = ref(false)
const scrolled = ref(false)
const linkRefs = ref([])

const setLinkRef = (index) => (instance) => {
  if (instance) {
    linkRefs.value[index] = instance
  }
}

const activeStyle = ref({ left: '0px', width: '0px' })

const getLinkEl = (instance) => {
  if (!instance) return null
  // router-link ref is a component instance; DOM is on $el
  const el = instance.$el
  return el instanceof HTMLElement ? el : null
}

const updateActive = async () => {
  await nextTick()
  await nextTick()
  const index = routes.findIndex((r) => r.path === route.path)
  if (index < 0) {
    activeStyle.value = { left: '0px', width: '0px' }
    return
  }
  const instance = linkRefs.value[index]
  const el = getLinkEl(instance)
  if (!el) return

  activeStyle.value = {
    left: `${el.offsetLeft}px`,
    width: `${el.offsetWidth}px`,
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

watch(() => route.path, updateActive)

const handleResize = () => {
  updateActive()
}

onMounted(() => {
  updateActive()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>