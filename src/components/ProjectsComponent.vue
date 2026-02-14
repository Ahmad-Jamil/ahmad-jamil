<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto space-y-24">

      <!-- Header -->
      <section class="text-center space-y-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          My Projects
        </h1>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          A selection of systems and platforms I have designed and contributed to
          across multiple companies.
        </p>
      </section>

      <!-- Companies -->
      <section class="space-y-24">
        <div
          v-for="company in projects"
          :key="company.company"
          class="space-y-12"
        >

          <!-- Company Header -->
          <div
            class="sticky top-28 z-10 bg-gray-50/80 backdrop-blur-md
                   py-6 border-b border-gray-200"
          >
            <h2 class="text-3xl font-semibold text-gray-900">
              {{ company.company }}
            </h2>
          </div>

          <!-- Projects Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

            <div
              v-for="project in company.projects"
              :key="project.title"
              class="p-8 bg-white border border-gray-200
                     rounded-2xl hover:shadow-xl
                     transition duration-300 flex flex-col"
            >

              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ project.title }}
                </h3>

                <div class="h-10 w-10 rounded-xl bg-gray-100
                           flex items-center justify-center">
                  <Icon icon="mdi:rocket-launch"
                        class="w-5 h-5 text-gray-600" />
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 leading-relaxed mb-6">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-3 mt-auto">
                <span
                  v-for="(tag, index) in project.tags"
                  :key="index"
                  class="px-4 py-1.5 text-sm rounded-full
                         bg-gray-100 text-gray-700
                         border border-gray-200"
                >
                  {{ tag }}
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup>
import projects from '@/data/projects.json'
import { Icon } from '@iconify/vue'
</script>