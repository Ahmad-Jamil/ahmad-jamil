<template>
    <div class="w-full max-w-7xl mx-auto px-4 py-8">
      <!-- Companies Loop -->
      <div class="space-y-16">
        <div v-for="company in projects" :key="company.company" class="relative">
          <!-- Company Name -->
          <div class="sticky top-0 z-10 backdrop-blur-sm bg-white/75 py-4">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              {{ company.company }}
              <div class="h-1 w-20 bg-blue-500 rounded mt-2"></div>
            </h2>
          </div>
  
          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div 
              v-for="project in company.projects" 
              :key="project.title"
              class="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <!-- Decorative Elements -->
              <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
              <div class="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/5 rounded-tr-full"></div>
  
              <div class="relative p-6 h-full flex flex-col">
                <!-- Project Title -->
                <h3 class="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {{ project.title }}
                </h3>
  
                <!-- Description -->
                <p class="text-gray-600 leading-relaxed">
                  {{ project.description }}
                </p>
  
                <!-- Tags (optional) -->
                <div class="mt-4 flex flex-wrap gap-2">
                    <span v-for="(tag, index) in project.tags" :key="index" 
                        class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    {{tag}}
                  </span>
                  <!-- <span v-if="project.title.toLowerCase().includes('microservice')" 
                        class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    Microservices
                  </span>
                  <span v-if="project.description.toLowerCase().includes('golang')" 
                        class="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-full">
                    GoLang
                  </span>
                  <span v-if="project.description.toLowerCase().includes('vue')" 
                        class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Vue.js
                  </span>
                  <span v-if="project.description.toLowerCase().includes('php')" 
                        class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    PHP
                  </span> -->
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

console.log(projects);

</script>
