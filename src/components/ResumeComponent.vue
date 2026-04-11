<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-6 font-['Space_Grotesk'] text-white">
    <div class="max-w-7xl mx-auto space-y-32">
      
      <!-- Header Section -->
      <section class="text-center space-y-10">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.4em]">
          Curriculum Vitae
        </div>
        <h1 class="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none uppercase italic">
          Professional <br/>
          <span class="text-[#00FF9C]">Resume.</span>
        </h1>
        <p class="text-2xl text-gray-400 max-w-2xl mx-auto font-medium tracking-tight">
          A deep dive into my journey as a digital architect, engineering scalable systems from Nicosia to the world.
        </p>
        
        <div class="flex justify-center pt-8">
           <button @click="downloadPDF"
                class="group relative flex items-center gap-6 px-12 py-6 bg-[#00FF9C] text-black font-black uppercase tracking-widest text-sm rounded-sm hover:bg-[#05e68d] transition-all duration-500 shadow-[0_0_40px_rgba(0,255,156,0.2)] transform hover:-translate-y-1 active:scale-95">
             <Icon icon="ph:file-pdf-duotone" class="text-2xl" />
             <span>Download Full PDF</span>
             <div class="absolute -top-3 -right-3 h-10 w-10 bg-white rounded-full flex items-center justify-center text-black border-4 border-[#0e0e0e]">
                <Icon icon="ph:arrow-down-bold" class="text-sm" />
             </div>
          </button>
        </div>
      </section>

      <!-- Main Layout Grid -->
      <div class="grid lg:grid-cols-12 gap-16">
        
        <!-- Left Sidebar: Identity & Linguistics -->
        <aside class="lg:col-span-4 space-y-12">
          
          <!-- Contact Interface -->
          <div class="p-12 bg-[#131313] border border-white/5 rounded-sm space-y-10 hover:border-[#00FF9C]/30 transition-all duration-700 group">
            <h2 class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em] flex items-center gap-4">
              <span class="h-[1px] w-8 bg-[#00FF9C]"></span>
              Contact
            </h2>
            <div class="space-y-8">
              <div class="flex items-start gap-6 group/item">
                 <div class="h-12 w-12 bg-[#0e0e0e] border border-white/5 flex items-center justify-center group-hover/item:border-[#00FF9C]/40 transition-colors">
                    <Icon icon="ph:phone-duotone" class="text-xl text-white/40 group-hover/item:text-[#00FF9C]" />
                 </div>
                 <div>
                   <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Mobile</p>
                   <p class="text-white font-bold italic tracking-tight">{{ resumeObject.phonePrefix }} {{ resumeObject.mobileNumber }}</p>
                 </div>
              </div>
              <div class="flex items-start gap-6 group/item">
                 <div class="h-12 w-12 bg-[#0e0e0e] border border-white/5 flex items-center justify-center group-hover/item:border-[#00FF9C]/40 transition-colors">
                    <Icon icon="ph:envelope-duotone" class="text-xl text-white/40 group-hover/item:text-[#00FF9C]" />
                 </div>
                 <div class="overflow-hidden">
                   <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Email</p>
                   <p class="text-white font-bold italic tracking-tight truncate">{{ resumeObject.email }}</p>
                 </div>
              </div>
              <div class="flex items-start gap-6 group/item">
                 <div class="h-12 w-12 bg-[#0e0e0e] border border-white/5 flex items-center justify-center group-hover/item:border-[#00FF9C]/40 transition-colors">
                    <Icon icon="ph:map-pin-duotone" class="text-xl text-white/40 group-hover/item:text-[#00FF9C]" />
                 </div>
                 <div>
                   <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Location</p>
                   <p class="text-white font-bold italic tracking-tight">{{ resumeObject.city }}, {{ resumeObject.country }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Language Modules -->
          <div class="p-12 bg-[#131313] border border-white/5 rounded-sm space-y-10 hover:border-[#00FF9C]/30 transition-all duration-700">
            <h2 class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em] flex items-center gap-4">
              <span class="h-[1px] w-8 bg-[#00FF9C]"></span>
              Languages
            </h2>
            <div class="space-y-10">
              <div v-for="(lang, i) in resumeObject.languages" :key="i" class="space-y-4">
                <div class="flex justify-between items-end">
                   <span class="text-white font-black uppercase italic tracking-tighter text-xl">{{ lang.name }}</span>
                   <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-widest">{{ lang.level }}</span>
                </div>
                <div class="h-1 w-full bg-white/5 overflow-hidden">
                   <div class="h-full bg-[#00FF9C] transition-all duration-1000" :style="{ width: lang.level === 'Native' ? '100%' : '80%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Workspace: Summary & Logs -->
        <div class="lg:col-span-8 space-y-24">
          
          <!-- Abstract -->
          <section class="p-12 bg-[#131313] border-l-4 border-[#00FF9C] rounded-sm">
            <h2 class="text-xs font-black text-gray-500 uppercase tracking-[0.4em] mb-10">Professional Abstract</h2>
            <div class="text-xl text-gray-300 font-medium leading-relaxed whitespace-pre-line tracking-tight">
              {{ resumeObject.aboutMe }}
            </div>
          </section>

          <!-- System Logs: Experience -->
          <section class="space-y-16">
            <div class="space-y-2">
              <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em]">Work Experience</span>
              <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Career Modules</h2>
            </div>
            <div class="space-y-12 relative border-l border-white/5 pl-12 ml-4">
              <div v-for="(exp, i) in resumeObject.experiences" :key="i"
                   class="relative group">
                <!-- Timeline Node -->
                <div class="absolute -left-[54px] top-2 h-6 w-6 rounded-full bg-[#0e0e0e] border-2 border-white/10 group-hover:border-[#00FF9C] transition duration-500 flex items-center justify-center">
                   <div class="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-[#00FF9C] transition-colors"></div>
                </div>

                <div class="p-12 bg-[#131313] border border-white/5 rounded-sm group-hover:border-[#00FF9C]/30 transition-all duration-700">
                  <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                    <div>
                      <h3 class="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-[#00FF9C] transition-colors duration-500">
                        {{ exp.jobTitle }}
                      </h3>
                      <p class="text-[#00FF9C] font-black text-[10px] uppercase tracking-[0.3em] mt-2 opacity-70">
                        {{ exp.companyName }}
                      </p>
                    </div>
                    <div class="px-5 py-2 bg-[#0e0e0e] border border-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap">
                      {{ exp.startDate }} — {{ exp.endDate }}
                    </div>
                  </div>
                  <p class="text-gray-400 text-lg leading-relaxed font-medium tracking-tight">
                    {{ exp.summary }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Educational Foundations -->
          <section class="space-y-16">
            <div class="space-y-2">
              <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em]">Foundations</span>
              <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Education</h2>
            </div>
            <div class="grid gap-8">
              <div v-for="(edu, i) in resumeObject.education" :key="i"
                   class="p-12 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/30 transition-all duration-700 group">
                <div class="flex items-start gap-10">
                  <div class="h-20 w-20 bg-[#0e0e0e] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#00FF9C]/40 transition-colors">
                    <Icon icon="ph:graduation-cap-duotone" class="text-4xl text-white/40 group-hover:text-[#00FF9C] transition-colors" />
                  </div>
                  <div class="space-y-4">
                    <h3 class="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-[#00FF9C] transition-colors">
                      {{ edu.degree }}
                    </h3>
                    <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">{{ edu.university }}</p>
                    <div class="inline-block mt-4 text-[#00FF9C] font-black italic text-xl tracking-tighter">
                      {{ edu.date }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Technical Arsenal: Grid -->
          <section class="space-y-16">
            <div class="text-center space-y-4">
              <span class="text-[10px] font-black text-[#00FF9C] uppercase tracking-[0.5em]">Capabilities</span>
              <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Skill Architecture</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div v-for="(category, index) in skills" :key="index"
                   class="p-10 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/30 transition-all duration-700 group">
                <p class="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-4">
                   <span class="h-1 w-8 bg-[#00FF9C]"></span>
                   {{ getCategoryName(category) }}
                </p>
                <div class="flex flex-wrap gap-3">
                  <span v-for="(skill, skillIndex) in getCategoryItems(category)" :key="skillIndex"
                        class="px-5 py-3 text-[10px] font-black uppercase tracking-widest bg-[#0e0e0e] text-gray-500 border border-white/5 group-hover:text-white group-hover:border-white/20 transition-all">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import createResumePDFODFLib from '../js/resumePDFGeneratorODFLib';
import { Icon } from '@iconify/vue';
import { API_ENDPOINTS } from '@/config/api';

const resumeObject = ref({
  phonePrefix: '',
  mobileNumber: '',
  email: '',
  city: '',
  country: '',
  aboutMe: '',
  languages: [],
  experiences: [],
  education: [],
  skills: [],
});

const fetchResume = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.RESUME);

    if (response.ok) {
      const data = await response.json();
      console.log("FULL API RESPONSE:", data);
      // Handle array or single object
      const resume = Array.isArray(data) ? (data[0] || {}) : (data || {});

      // Keep critical fields available even if older documents use different keys.
      resume.email = resume.email || resume.emailAddress || resume.mail || '';
      resume.languages = Array.isArray(resume.languages) ? resume.languages : [];
      resume.experiences = Array.isArray(resume.experiences) ? resume.experiences : [];
      resume.education = Array.isArray(resume.education) ? resume.education : [];
      resume.skills = normalizeSkills(resume.skills);

      resumeObject.value = resume;
      console.log("RAW API SKILLS:", resume.skills);

    } else {
      console.error('Failed to fetch resume.', {
        url: API_ENDPOINTS.RESUME,
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    console.error('Failed to fetch resume (network error).', { url: API_ENDPOINTS.RESUME, error });
  }
};

onMounted(fetchResume);

const skills = computed(() => resumeObject.value?.skills || []);
const normalizeSkillItems = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      if (typeof s === 'string') return s.trim();
      if (s && typeof s === 'object') return String(s.name || s.skill || '').trim();
      return '';
    })
    .filter(Boolean);
};

const normalizeSkills = (rawSkills) => {
  if (!Array.isArray(rawSkills)) return [];
  return rawSkills
    .map((item) => {
      if (!item || typeof item !== 'object') return null;

      if ('category' in item) {
        // Some legacy/broken records may keep useful keys besides category/skills.
        // If category is the placeholder "skills" and list is empty, try recovery.
        const directSkills = normalizeSkillItems(item.skills);
        if (String(item.category || '').trim().toLowerCase() === 'skills' && directSkills.length === 0) {
          const backupKey = Object.keys(item).find(
            (k) => !['_id', 'category', 'skills', '__v'].includes(k) && Array.isArray(item[k])
          );
          if (backupKey) {
            return {
              category: String(backupKey).trim(),
              skills: normalizeSkillItems(item[backupKey]),
            };
          }
        }
        return {
          category: String(item.category || '').trim(),
          skills: directSkills,
        };
      }

      const categoryKey = Object.keys(item).find((key) => key !== '_id');
      if (!categoryKey) return null;
      return {
        category: String(categoryKey).trim(),
        skills: normalizeSkillItems(item[categoryKey]),
      };
    })
    .filter((x) => x && x.category && Array.isArray(x.skills) && x.skills.length > 0);
};

const formatCategoryName = (name) =>
  String(name || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getCategoryName = (category) => formatCategoryName(category.category);

const getCategoryItems = (category) => category.skills || [];

const downloadPDF = () => createResumePDFODFLib(resumeObject.value);
</script>