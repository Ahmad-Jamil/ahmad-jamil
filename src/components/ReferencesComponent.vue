<template>
  <div class="space-y-16 max-w-5xl mx-auto">
      
      <!-- Header -->
      <section class="text-center space-y-10">
        <div class="ui-eyebrow mx-auto">
          Endorsements
        </div>
        <h1 class="ui-h1">
          Professional <br/>
          <span class="text-app-brand">References.</span>
        </h1>
        <p class="ui-lead max-w-2xl mx-auto">
          System validation from leadership and peers regarding architectural contributions to complex engineering ecosystems.
        </p>
      </section>

      <!-- Testimonials -->
      <section class="space-y-10">
        <div
          v-for="(reference, index) in references"
          :key="index"
          class="relative ui-card ui-card-hover p-8 sm:p-10 md:p-12 group"
        >
          <!-- Quote Icon Accent -->
          <div class="absolute -top-6 left-8 sm:left-10 h-12 w-12 rounded-xl bg-app-brand flex items-center justify-center shadow-brand-glow z-10">
              <Icon icon="ph:quotes-fill"
                    class="w-6 h-6 text-white" />
          </div>

          <!-- Header -->
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-8 pt-4">
            <div class="space-y-6">
              <div class="space-y-1">
                <span class="text-xs text-slate-500">Organization</span>
                <h2 class="ui-h2">
                  {{ reference.company }}
                </h2>
              </div>
              <div class="flex items-center gap-6">
                 <div class="h-12 w-12 bg-app-muted border border-app-border flex items-center justify-center rounded-xl">
                    <Icon icon="ph:user-bold" class="w-6 h-6 text-slate-500" />
                 </div>
                 <div>
                    <p class="text-xs text-slate-500">Validated By</p>
                    <p class="text-slate-900 font-semibold tracking-tight text-lg">{{ reference.Manager }}</p>
                 </div>
              </div>
            </div>

            <!-- Technical Skills Validated -->
            <div class="flex flex-wrap gap-3 md:justify-end max-w-sm">
              <span
                v-for="skill in extractSkills(reference)"
                :key="skill"
                class="ui-pill"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Main Reference Content -->
          <div class="relative mb-10">
            <div class="absolute -left-6 top-0 bottom-0 w-1 bg-app-brand/30 rounded-full"></div>
            <blockquote class="text-slate-700 leading-relaxed text-lg sm:text-xl font-medium whitespace-pre-line italic pl-4">
              "{{ formatReference(reference.reference) }}"
            </blockquote>
          </div>

          <!-- Key Architectural Contributions -->
          <div class="grid md:grid-cols-2 gap-6 pt-8 border-t border-app-border">
            <div
              v-for="point in extractKeyPoints(reference)"
              :key="point"
              class="flex items-start gap-4 p-5 bg-app-muted border border-app-border rounded-xl"
            >
              <div class="h-10 w-10 bg-white border border-app-border flex items-center justify-center shrink-0 rounded-xl">
                <Icon icon="ph:check-circle-duotone"
                    class="w-6 h-6 text-app-accent" />
              </div>
              <p class="text-slate-600 font-medium text-sm leading-relaxed">
                {{ point }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Status -->
      <section class="text-center py-16">
        <p class="text-xs text-slate-500">End of endorsements</p>
      </section>

  </div>
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