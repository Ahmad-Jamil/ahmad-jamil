<template>
  <div class="space-y-16">
      
      <!-- Header -->
      <section class="space-y-4 max-w-3xl">
        <div class="ui-eyebrow">
          Portfolio Artifacts
        </div>
        <h1 class="ui-h1">
          Selected <br/>
          <span class="text-app-brand">Works.</span>
        </h1>
        <p class="ui-lead">
          A collection of enterprise-grade systems and high-performance web ecosystems architected for scale.
        </p>
      </section>

      <!-- Projects Section -->
      <section class="space-y-20">
        <div
          v-for="company in projects"
          :key="company.company"
          class="space-y-10"
        >
          <!-- Company Header -->
          <div
            class="sticky top-24 z-10 bg-app-bg/90 backdrop-blur-xl
                   py-6 border-b border-app-border flex items-end justify-between"
          >
            <div class="space-y-1">
              <span class="text-xs font-medium text-app-textMuted">Organization</span>
              <h2 class="ui-h2">
                {{ company.company }}
              </h2>
            </div>
            <div class="hidden md:flex flex-col items-end">
              <span class="text-xs text-slate-500">Deployment Cycle</span>
              <span class="text-slate-900 font-semibold tracking-tight">2020 — ACTIVE</span>
            </div>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="project in company.projects"
              :key="project.title"
              class="group relative ui-card ui-card-hover p-8 sm:p-10 flex flex-col overflow-hidden"
            >
              <!-- Header -->
              <div class="relative z-10 flex items-start justify-between mb-8">
                <div class="space-y-3">
                  <div class="flex items-center gap-2 text-app-brand">
                    <span class="h-[2px] w-8 bg-app-brand rounded-full"></span>
                    <span class="text-xs font-medium text-app-textMuted">Project</span>
                  </div>
                  <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {{ project.title }}
                  </h3>
                </div>
                <div class="h-12 w-12 rounded-xl bg-app-muted border border-app-border flex items-center justify-center">
                  <Icon icon="ph:circuitry-duotone"
                        class="w-6 h-6 text-slate-500" />
                </div>
              </div>

              <!-- Description -->
              <p class="relative z-10 text-slate-600 leading-relaxed mb-8">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="relative z-10 flex flex-wrap gap-3 mt-auto">
                <span
                  v-for="(tag, index) in project.tags"
                  :key="index"
                  class="ui-pill"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="ui-card p-10 sm:p-14 md:p-16 text-center space-y-6">
        <div class="relative z-10 space-y-4">
          <div class="ui-eyebrow mx-auto">System Query</div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Have a project <br/> in mind?
          </h2>
        </div>
        <p class="relative z-10 text-slate-600 max-w-xl mx-auto">
          Let's engineer something exceptional. I'm currently accepting inquiries for high-impact architecture roles.
        </p>
        <div class="relative z-10 pt-2">
          <router-link to="/contact" class="ui-btn-primary">
            Contact
          </router-link>
        </div>
      </section>

  </div>
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