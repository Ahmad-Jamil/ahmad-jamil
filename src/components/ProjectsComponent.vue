<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-16 space-y-4">
        <h1 class="text-4xl md:text-6xl font-black">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            My Projects
          </span>
        </h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore my portfolio of innovative projects and technical achievements across different companies.
        </p>
      </div>

      <!-- Companies Loop -->
      <div class="space-y-16">
        <div v-for="company in projects" :key="company.company" class="relative">
          <!-- Company Name -->
          <div class="sticky top-20 z-10 backdrop-blur-xl bg-gray-900/50 py-6 -mx-4 px-4 border-b border-white/10">
            <div class="max-w-6xl mx-auto">
              <h2 class="text-3xl font-bold">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {{ company.company }}
                </span>
              </h2>
            </div>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div 
              v-for="project in company.projects" 
              :key="project.title"
              class="relative group"
            >
              <!-- Gradient Border Effect -->
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

              <!-- Card Content -->
              <div class="relative p-8 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10 h-full">
                <!-- Project Header -->
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {{ project.title }}
                  </h3>
                  <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Icon icon="mdi:rocket-launch" class="w-6 h-6 text-blue-400" />
                  </div>
                </div>

                <!-- Description -->
                <p class="text-gray-300 leading-relaxed mb-6">
                  {{ project.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-auto">
                  <span 
                    v-for="(tag, index) in project.tags" 
                    :key="index"
                    class="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors duration-300"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Decorative Elements -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-bl-[80px] transition-all duration-500 group-hover:scale-110"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-tr-[60px] transition-all duration-500 group-hover:scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import projects from '@/data/projects.json'
import { Icon } from '@iconify/vue'
</script>