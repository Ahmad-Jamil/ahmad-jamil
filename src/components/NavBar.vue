<template>
  <nav class="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
    <div
      class="relative flex items-center justify-between px-4 sm:px-6 py-3 rounded-full border bg-white/80 backdrop-blur-xl transition-colors duration-200"
      :class="scrolled ? 'border-app-border shadow-soft' : 'border-transparent'"
    >
      <router-link to="/" class="flex items-center gap-2 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-app-brand/25">
        <span class="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
          Ahmad Jamil
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex relative items-center bg-app-muted p-1 rounded-full border border-app-border">
        <!-- Active Sliding Background -->
        <div
          class="absolute top-1 bottom-1 bg-white rounded-full border border-app-border shadow-soft transition-all duration-300 ease-out"
          :style="activeStyle"
        ></div>

        <router-link
          v-for="(routeItem, index) in routes"
          :key="routeItem.path"
          :ref="setLinkRef(index)"
          :to="routeItem.path"
          class="relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors"
          :class="route.path === routeItem.path ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ routeItem.label }}
        </router-link>
      </div>

      <!-- CTA Section -->
      <div class="hidden md:flex items-center gap-4">
        <router-link
          to="/contact"
          class="ui-btn-primary rounded-full px-5 py-2.5 text-sm"
        >
          Contact
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-app-muted focus:outline-none focus:ring-2 focus:ring-app-brand/25"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-label="Toggle navigation menu"
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
      <div v-if="isOpen" class="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-2xl border border-app-border rounded-2xl p-6 md:hidden shadow-soft">
        <div class="flex flex-col gap-3">
          <router-link
            v-for="routeItem in routes"
            :key="routeItem.path"
            :to="routeItem.path"
            @click="isOpen = false"
            class="rounded-xl px-4 py-3 text-base font-medium transition-colors"
            :class="route.path === routeItem.path ? 'bg-app-brand/10 text-app-brand' : 'text-slate-800 hover:bg-app-muted'"
          >
            {{ routeItem.label }}
          </router-link>
          
          <router-link
            to="/contact"
            @click="isOpen = false"
            class="mt-2 ui-btn-primary w-full rounded-xl py-3"
          >
            Contact
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