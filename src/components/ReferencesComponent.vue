<template>
  <main class="bg-white min-h-screen pt-12 pb-24 px-6 animate-fade-in-up">
    <div class="max-w-5xl mx-auto space-y-24">

      <!-- Header -->
      <section class="text-center space-y-6">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide">
          Endorsements
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
          Professional <span class="text-indigo-600">References</span>
        </h1>

        <p class="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Voices from leadership and peers regarding my contributions to complex engineering projects.
        </p>
      </section>

      <!-- Testimonials -->
      <section class="space-y-24">

        <div
          v-for="(reference, index) in references"
          :key="index"
          class="relative p-12 bg-gray-50 border border-transparent
                 rounded-[48px] hover:bg-white hover:border-indigo-100
                 hover:shadow-2xl hover:shadow-indigo-100/50
                 transition-all duration-500"
        >

          <!-- Floating Icon -->
          <div class="absolute -top-6 left-12 h-14 w-14 rounded-2xl bg-indigo-600
                        flex items-center justify-center shadow-xl shadow-indigo-200">
              <Icon icon="ph:quotes-fill"
                    class="w-7 h-7 text-white" />
          </div>

          <!-- Header -->
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">

            <div class="space-y-4">
              <h2 class="text-3xl font-black text-gray-900 tracking-tight">
                {{ reference.company }}
              </h2>

              <div class="flex items-center gap-3">
                 <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Icon icon="ph:user-bold" class="w-5 h-5 text-indigo-600" />
                 </div>
                 <div>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Endorsed By</p>
                    <p class="text-gray-900 font-bold leading-none">{{ reference.Manager }}</p>
                 </div>
              </div>
            </div>

            <!-- Skills Highlight -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in extractSkills(reference)"
                :key="skill"
                class="px-4 py-2 text-xs font-black rounded-xl
                       bg-white text-indigo-600
                       border border-indigo-50 shadow-sm"
              >
                {{ skill }}
              </span>
            </div>

          </div>

          <!-- Main Reference -->
          <div class="relative">
            <blockquote class="text-gray-700 leading-relaxed text-xl font-medium whitespace-pre-line italic">
              "{{ formatReference(reference.reference) }}"
            </blockquote>
          </div>

          <!-- Key Points -->
          <div class="grid md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-gray-100">
            <div
              v-for="point in extractKeyPoints(reference)"
              :key="point"
              class="flex items-start gap-4 p-6
                     bg-white/50 border border-white
                     rounded-3xl hover:border-indigo-100 transition"
            >
              <div class="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Icon icon="ph:check-circle-bold"
                    class="w-5 h-5 text-emerald-500" />
              </div>
              <p class="text-gray-600 font-bold text-sm leading-relaxed">
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
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { API_ENDPOINTS } from '@/config/api'

const references = ref([])

const fetchReferences = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.REFERENCES)
    if (!response.ok) {
      console.error('Failed to fetch references.', {
        url: API_ENDPOINTS.REFERENCES,
        status: response.status,
        statusText: response.statusText,
      })
      return
    }
    references.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch references (network error).', { url: API_ENDPOINTS.REFERENCES, error })
  }
}

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

onMounted(fetchReferences)
</script>