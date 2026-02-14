<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-5xl mx-auto space-y-24">

      <!-- Header -->
      <section class="text-center space-y-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          Professional References
        </h1>

        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Testimonials from professionals who have worked closely with me
          across engineering teams and production systems.
        </p>
      </section>

      <!-- Testimonials -->
      <section class="space-y-16">

        <div
          v-for="(reference, index) in references"
          :key="index"
          class="p-10 bg-white border border-gray-200
                 rounded-3xl shadow-sm hover:shadow-lg
                 transition duration-300"
        >

          <!-- Header -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

            <div>
              <h2 class="text-2xl font-semibold text-gray-900">
                {{ reference.company }}
              </h2>

              <div class="flex items-center gap-2 text-gray-600 mt-2">
                <Icon icon="mdi:account-tie" class="w-5 h-5" />
                <span>{{ reference.Manager }}</span>
              </div>
            </div>

            <div class="h-14 w-14 rounded-2xl bg-gray-100
                        flex items-center justify-center">
              <Icon icon="mdi:format-quote-close"
                    class="w-7 h-7 text-gray-500" />
            </div>

          </div>

          <!-- Skills Highlight -->
          <div class="flex flex-wrap gap-3 mb-8">
            <span
              v-for="skill in extractSkills(reference)"
              :key="skill"
              class="px-4 py-1.5 text-sm rounded-full
                     bg-gray-100 text-gray-700
                     border border-gray-200"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Main Reference -->
          <blockquote class="text-gray-700 leading-relaxed text-lg whitespace-pre-line border-l-4 border-gray-300 pl-6">
            {{ formatReference(reference.reference) }}
          </blockquote>

          <!-- Key Points -->
          <div class="grid md:grid-cols-2 gap-6 mt-10">
            <div
              v-for="point in extractKeyPoints(reference)"
              :key="point"
              class="flex items-start gap-4 p-5
                     bg-gray-50 border border-gray-200
                     rounded-2xl"
            >
              <Icon icon="mdi:check-circle"
                    class="w-6 h-6 text-emerald-500 mt-1" />
              <p class="text-gray-700">
                {{ point }}
              </p>
            </div>
          </div>

        </div>

      </section>

    </div>
  </main>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import references from '@/data/references.json'

const extractSkills = (reference) => {
  const skills = reference.skills
  return skills.filter(skill =>
    reference.reference.toLowerCase().includes(skill.toLowerCase())
  )
}

const extractKeyPoints = (reference) => {
  return reference.keyPoints
}

const formatReference = (text) => {
  return text.replace(/\. /g, '.\n\n')
}
</script>