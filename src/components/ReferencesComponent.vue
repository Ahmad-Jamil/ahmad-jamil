<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-6 font-['Space_Grotesk'] text-white">
    <div class="max-w-5xl mx-auto space-y-32">
      
      <!-- Header -->
      <section class="text-center space-y-10">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.4em]">
          Endorsements
        </div>
        <h1 class="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none uppercase italic">
          Professional <br/>
          <span class="text-[#00FF9C]">References.</span>
        </h1>
        <p class="text-2xl text-gray-400 max-w-2xl mx-auto font-medium tracking-tight">
          System validation from leadership and peers regarding architectural contributions to complex engineering ecosystems.
        </p>
      </section>

      <!-- Testimonials -->
      <section class="space-y-32">
        <div
          v-for="(reference, index) in references"
          :key="index"
          class="relative p-12 md:p-16 bg-[#131313] border border-white/5
                 rounded-sm hover:border-[#00FF9C]/30
                 transition-all duration-700 group"
        >
          <!-- Quote Icon Accent -->
          <div class="absolute -top-8 left-12 h-16 w-16 rounded-sm bg-[#00FF9C]
                        flex items-center justify-center shadow-[0_0_40px_rgba(0,255,156,0.3)] z-10">
              <Icon icon="ph:quotes-fill"
                    class="w-8 h-8 text-black" />
          </div>

          <!-- Header -->
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
            <div class="space-y-6">
              <div class="space-y-1">
                <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.4em]">Organization</span>
                <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter">
                  {{ reference.company }}
                </h2>
              </div>
              <div class="flex items-center gap-6">
                 <div class="h-14 w-14 bg-[#0e0e0e] border border-white/5 flex items-center justify-center rounded-sm group-hover:border-[#00FF9C]/40 transition-colors">
                    <Icon icon="ph:user-bold" class="w-6 h-6 text-white/40 group-hover:text-[#00FF9C] transition-colors" />
                 </div>
                 <div>
                    <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Validated By</p>
                    <p class="text-white font-black italic tracking-tighter text-xl">{{ reference.Manager }}</p>
                 </div>
              </div>
            </div>

            <!-- Technical Skills Validated -->
            <div class="flex flex-wrap gap-3 md:justify-end max-w-sm">
              <span
                v-for="skill in extractSkills(reference)"
                :key="skill"
                class="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest
                       bg-[#0e0e0e] text-gray-500
                       border border-white/5 group-hover:border-[#00FF9C]/20 transition-all"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Main Reference Content -->
          <div class="relative mb-16">
            <div class="absolute -left-8 top-0 bottom-0 w-1 bg-[#00FF9C] opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <blockquote class="text-gray-300 leading-relaxed text-2xl font-medium tracking-tight whitespace-pre-line italic">
              "{{ formatReference(reference.reference) }}"
            </blockquote>
          </div>

          <!-- Key Architectural Contributions -->
          <div class="grid md:grid-cols-2 gap-8 pt-16 border-t border-white/5">
            <div
              v-for="point in extractKeyPoints(reference)"
              :key="point"
              class="flex items-start gap-6 p-8
                     bg-[#0e0e0e] border border-white/5
                     rounded-sm group-hover:border-[#00FF9C]/10 transition-all"
            >
              <div class="h-10 w-10 bg-[#131313] border border-white/5 flex items-center justify-center shrink-0">
                <Icon icon="ph:check-circle-duotone"
                    class="w-6 h-6 text-[#00FF9C]" />
              </div>
              <p class="text-gray-400 font-medium text-sm leading-relaxed tracking-tight">
                {{ point }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Status -->
      <section class="text-center py-16">
        <p class="text-[10px] font-black text-gray-600 uppercase tracking-[0.6em]">End of Endorsements / All Modules Verified</p>
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