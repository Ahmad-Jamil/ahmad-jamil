<template>
  <main class="bg-white min-h-screen pt-12 pb-24 px-6 animate-fade-in-up">
    <div class="max-w-6xl mx-auto space-y-24">

      <!-- Header -->
      <section class="text-center space-y-6">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide">
          Portfolio
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
          Featured <span class="text-indigo-600">Projects</span>
        </h1>

        <p class="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          A selection of enterprise systems and platforms I've architected and delivered.
        </p>
      </section>

      <!-- Companies -->
      <section class="space-y-32">
        <div
          v-for="company in projects"
          :key="company.company"
          class="space-y-12"
        >

          <!-- Company Header -->
          <div
            class="sticky top-[88px] z-10 bg-white/80 backdrop-blur-md
                   py-6 border-b border-gray-100 flex items-center justify-between"
          >
            <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
              {{ company.company }}
            </h2>
            <div class="h-1px flex-grow mx-8 bg-gray-100 hidden md:block"></div>
            <span class="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Partner Since 2020</span>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div
              v-for="project in company.projects"
              :key="project.title"
              class="group p-10 bg-gray-50 border border-transparent
                     rounded-[40px] hover:bg-white hover:border-indigo-100
                     hover:shadow-2xl hover:shadow-indigo-100/50
                     transition-all duration-500 flex flex-col"
            >

              <!-- Header -->
              <div class="flex items-start justify-between mb-8">
                <div class="space-y-2">
                   <h3 class="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                    {{ project.title }}
                  </h3>
                  <div class="flex items-center gap-2 text-indigo-400">
                    <Icon icon="ph:arrow-right-bold" class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span class="text-xs font-bold uppercase tracking-widest">Enterprise Solution</span>
                  </div>
                </div>

                <div class="h-14 w-14 rounded-2xl bg-white shadow-sm
                           flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Icon icon="ph:rocket-launch-duotone"
                        class="w-7 h-7 text-indigo-600" />
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 leading-relaxed text-lg mb-10 font-medium">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="(tag, index) in project.tags"
                  :key="index"
                  class="px-4 py-2 text-xs font-bold rounded-xl
                         bg-white text-gray-600
                         border border-gray-100 shadow-sm
                         group-hover:border-indigo-50 transition"
                >
                  {{ tag }}
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-indigo-600 rounded-[48px] p-12 md:p-20 text-center space-y-8 shadow-2xl shadow-indigo-200">
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">Have a project in mind?</h2>
        <p class="text-indigo-100 text-lg max-w-xl mx-auto font-medium">Let's build something exceptional together. I'm always open to discussing new engineering challenges.</p>
        <router-link to="/contact" class="inline-block px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl">
          Get Started
        </router-link>
      </section>

    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { API_ENDPOINTS } from '@/config/api'
import { Icon } from '@iconify/vue'

const projects = ref([])

const fetchProjects = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS)
    if (!response.ok) {
      console.error('Failed to fetch projects.', {
        url: API_ENDPOINTS.PROJECTS,
        status: response.status,
        statusText: response.statusText,
      })
      return
    }
    projects.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch projects (network error).', { url: API_ENDPOINTS.PROJECTS, error })
  }
}

onMounted(fetchProjects)
</script>