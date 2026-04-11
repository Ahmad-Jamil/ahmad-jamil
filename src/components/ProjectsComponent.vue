<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-6 font-['Space_Grotesk'] text-white">
    <div class="max-w-7xl mx-auto space-y-32">
      
      <!-- Header -->
      <section class="space-y-6 max-w-3xl">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.3em]">
          Portfolio Artifacts
        </div>
        <h1 class="text-7xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
          Selected <br/>
          <span class="text-[#00FF9C]">Works.</span>
        </h1>
        <p class="text-2xl text-gray-400 font-medium tracking-tight">
          A collection of enterprise-grade systems and high-performance web ecosystems architected for scale.
        </p>
      </section>

      <!-- Projects Section -->
      <section class="space-y-40">
        <div
          v-for="company in projects"
          :key="company.company"
          class="space-y-16"
        >
          <!-- Company Header -->
          <div
            class="sticky top-24 z-10 bg-[#0e0e0e]/80 backdrop-blur-xl
                   py-8 border-b border-white/5 flex items-end justify-between"
          >
            <div class="space-y-1">
              <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.4em]">Organization</span>
              <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter">
                {{ company.company }}
              </h2>
            </div>
            <div class="hidden md:flex flex-col items-end">
              <span class="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Deployment Cycle</span>
              <span class="text-white font-black italic tracking-tighter text-xl">2020 — ACTIVE</span>
            </div>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="project in company.projects"
              :key="project.title"
              class="group relative p-12 bg-[#131313] border border-white/5
                     rounded-sm hover:border-[#00FF9C]/30
                     transition-all duration-700 flex flex-col overflow-hidden"
            >
              <!-- Hover Background Effect -->
              <div class="absolute -inset-1 bg-gradient-to-br from-[#00FF9C] to-transparent opacity-0 group-hover:opacity-5 blur-2xl transition duration-1000"></div>

              <!-- Header -->
              <div class="relative z-10 flex items-start justify-between mb-12">
                <div class="space-y-3">
                  <div class="flex items-center gap-2 text-[#00FF9C]">
                    <span class="h-[1px] w-8 bg-[#00FF9C]"></span>
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em]">Enterprise Module</span>
                  </div>
                  <h3 class="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-[#00FF9C] transition-colors duration-500">
                    {{ project.title }}
                  </h3>
                </div>
                <div class="h-16 w-16 rounded-sm bg-[#0e0e0e] border border-white/5
                           flex items-center justify-center group-hover:border-[#00FF9C]/40 transition-all duration-500 shadow-2xl">
                  <Icon icon="ph:circuitry-duotone"
                        class="w-8 h-8 text-white/40 group-hover:text-[#00FF9C] transition-colors" />
                </div>
              </div>

              <!-- Description -->
              <p class="relative z-10 text-gray-400 leading-relaxed text-lg mb-12 font-medium tracking-tight">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="relative z-10 flex flex-wrap gap-3 mt-auto">
                <span
                  v-for="(tag, index) in project.tags"
                  :key="index"
                  class="px-4 py-2 text-[10px] font-black uppercase tracking-widest
                         bg-[#0e0e0e] text-gray-500
                         border border-white/5 group-hover:border-[#00FF9C]/20 transition-all duration-500"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="relative bg-[#131313] border border-white/5 rounded-sm p-16 md:p-24 text-center space-y-10 overflow-hidden group">
        <!-- Background Accents -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#00FF9C] opacity-[0.03] blur-[100px] -mr-48 -mt-48 transition-opacity group-hover:opacity-[0.06] duration-1000"></div>
        
        <div class="relative z-10 space-y-4">
          <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em]">System Query</span>
          <h2 class="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
            Have a project <br/> in mind?
          </h2>
        </div>
        <p class="relative z-10 text-gray-400 text-xl max-w-xl mx-auto font-medium tracking-tight">
          Let's engineer something exceptional. I'm currently accepting inquiries for high-impact architecture roles.
        </p>
        <div class="relative z-10 pt-6">
          <router-link to="/contact" class="inline-block px-12 py-6 bg-[#00FF9C] text-black rounded-sm font-black uppercase tracking-[0.2em] text-sm hover:bg-[#05e68d] hover:shadow-[0_0_40px_rgba(0,255,156,0.3)] transition-all transform hover:-translate-y-1 active:scale-95">
            Initiate Contact
          </router-link>
        </div>
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