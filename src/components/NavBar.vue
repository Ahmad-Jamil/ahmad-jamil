<template>
  <nav class="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
    <div
      class="relative flex items-center justify-between w-full max-w-6xl px-6 h-14
             bg-white/80 backdrop-blur-xl border border-gray-200/60
             shadow-[0_8px_30px_rgba(0,0,0,0.04)]
             rounded-2xl transition-all duration-500"
      :class="{ 'shadow-[0_20px_50px_rgba(0,0,0,0.1)] scale-[0.99] border-indigo-100': scrolled }"
    >
    <div class="flex items-center">
     <router-link to="/" class="flex items-center group">
        <img
          :src="icon"
          class="h-14 w-auto object-contain transition-all duration-500 group-hover:scale-110"
          :class="{ 'h-11': scrolled }"
          alt="Ahmad Jamil"
        />
      </router-link>
    </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex relative items-center bg-gray-100/80 p-1 rounded-full">
        <!-- Active Sliding Background -->
        <div
          class="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300"
          :style="activeStyle"
        ></div>

        <router-link
          v-for="(routeItem, index) in routes"
          :key="routeItem.path"
          :ref="setLinkRef(index)"
          :to="routeItem.path"
          class="relative z-10 px-5 py-2 text-sm font-medium text-gray-500
                 hover:text-gray-900 transition-colors duration-200"
          active-class="text-indigo-600 font-semibold"
        >
          {{ routeItem.label }}
        </router-link>
      </div>

      <!-- CTA -->
      <div class="hidden md:flex">
        <router-link
          to="/contact"
          class="px-6 py-2 text-sm font-semibold rounded-full
                 bg-indigo-600 text-white hover:bg-indigo-700
                 hover:shadow-lg hover:shadow-indigo-200
                 transition-all duration-300"
        >
          Contact
        </router-link>
      </div>

      <!-- Mobile Toggle -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        aria-label="Toggle menu"
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
               bg-white/95 backdrop-blur-2xl border border-indigo-50
               rounded-3xl shadow-2xl p-8 md:hidden"
      >
        <div class="space-y-6">
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            @click="isOpen = false"
            class="block text-lg font-semibold text-gray-600 hover:text-indigo-600 transition"
            active-class="text-indigo-600"
          >
            {{ route.label }}
          </router-link>

          <router-link
            to="/contact"
            @click="isOpen = false"
            class="block mt-6 px-5 py-3 text-center text-base font-bold
                   rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100"
          >
            Contact
          </router-link>
        </div>
      </div>
    </transition>
  </nav>

  <div class="h-24"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import iconImage from '@/assets/images/personal/ajIcon.png'

const icon = ref(iconImage)

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