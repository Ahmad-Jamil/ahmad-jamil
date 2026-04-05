<template>
  <main class="bg-white min-h-screen pt-12 pb-24 px-6 animate-fade-in-up">
    <div class="max-w-6xl mx-auto space-y-24">

      <!-- Header -->
      <section class="text-center space-y-6">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide">
          Curriculum Vitae
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tight text-gray-900">
          Professional <span class="text-indigo-600">Resume</span>
        </h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          A deep dive into my journey as a software engineer, from Nicosia to the world.
        </p>

        <div class="flex justify-center pt-8">
           <button @click="downloadPDF"
                class="group relative flex items-center gap-4 px-10 py-5 bg-gray-900 text-white font-bold rounded-[24px] hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-gray-200">
             <Icon icon="ph:file-pdf-duotone" class="text-2xl" />
             <span>Download Full PDF</span>
             <div class="absolute -top-3 -right-3 h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center text-xs border-4 border-white">
                <Icon icon="ph:arrow-down-bold" />
             </div>
          </button>
        </div>
      </section>

      <!-- Grid Layout -->
      <div class="grid lg:grid-cols-12 gap-12">

        <!-- Sidebar (Contact & Languages) -->
        <aside class="lg:col-span-4 space-y-10">

          <!-- Contact Card -->
          <div class="p-10 bg-gray-50 border border-transparent rounded-[40px] space-y-8 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition duration-500">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-4">
              <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                <Icon icon="ph:user-circle-duotone" class="text-white text-xl" />
              </div>
              Contact
            </h2>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                 <Icon icon="ph:phone-duotone" class="text-2xl text-indigo-600 mt-1" />
                 <div>
                   <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Mobile</p>
                   <p class="text-gray-700 font-bold">{{ resumeObject.phonePrefix }} {{ resumeObject.mobileNumber }}</p>
                 </div>
              </div>

              <div class="flex items-start gap-4">
                 <Icon icon="ph:envelope-duotone" class="text-2xl text-indigo-600 mt-1" />
                 <div>
                   <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Email</p>
                   <p class="text-gray-700 font-bold truncate">{{ resumeObject.email }}</p>
                 </div>
              </div>

              <div class="flex items-start gap-4">
                 <Icon icon="ph:map-pin-duotone" class="text-2xl text-indigo-600 mt-1" />
                 <div>
                   <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Location</p>
                   <p class="text-gray-700 font-bold">{{ resumeObject.city }}, {{ resumeObject.country }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Languages Card -->
          <div class="p-10 bg-gray-50 border border-transparent rounded-[40px] space-y-8 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition duration-500">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-4">
               <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                <Icon icon="ph:translate-duotone" class="text-white text-xl" />
              </div>
              Languages
            </h2>
            <div class="space-y-4">
              <div v-for="(lang, i) in resumeObject.languages" :key="i" class="space-y-2">
                <div class="flex justify-between items-center">
                   <span class="text-gray-900 font-bold">{{ lang.name }}</span>
                   <span class="text-xs font-black text-indigo-600 uppercase">{{ lang.level }}</span>
                </div>
                <div class="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                   <div class="h-full bg-indigo-600 rounded-full" :style="{ width: lang.level === 'Native' ? '100%' : '80%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="lg:col-span-8 space-y-16">

          <!-- Summary -->
          <section class="p-10 bg-indigo-50/50 rounded-[40px] border border-indigo-100/50">
            <h2 class="text-3xl font-black text-gray-900 mb-8 tracking-tight">Professional Summary</h2>
            <div class="text-lg text-gray-700 font-medium leading-relaxed whitespace-pre-line">
              {{ resumeObject.aboutMe }}
            </div>
      </section>

          <!-- Work Experience -->
          <section class="space-y-10">
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">Work Experience</h2>
            <div class="space-y-8 relative before:absolute before:left-[31px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              <div v-for="(exp, i) in resumeObject.experiences" :key="i"
                   class="relative pl-20 group">
                <div class="absolute left-0 top-1.5 h-16 w-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center z-10 group-hover:border-indigo-600 transition duration-300">
                   <Icon icon="ph:briefcase-duotone" class="text-2xl text-gray-300 group-hover:text-indigo-600 transition duration-300" />
                </div>
                <div class="p-10 bg-white border border-gray-100 rounded-[40px] group-hover:border-indigo-100 group-hover:shadow-2xl group-hover:shadow-indigo-50/50 transition duration-300">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 class="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition">{{ exp.jobTitle }}</h3>
                      <p class="text-lg font-bold text-gray-400 mt-1 uppercase tracking-wider">{{ exp.companyName }}</p>
                    </div>
                    <div class="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-black rounded-full whitespace-nowrap">
                      {{ exp.startDate }} — {{ exp.endDate }}
                    </div>
                  </div>
                  <p class="text-gray-600 text-lg leading-relaxed font-medium">{{ exp.summary }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Education -->
          <section class="space-y-10">
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">Education</h2>
            <div v-for="(edu, i) in resumeObject.education" :key="i"
                 class="p-10 bg-gray-50 border border-transparent rounded-[40px] hover:bg-white hover:border-indigo-100 transition duration-500">
              <div class="flex items-start gap-6">
                <div class="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0">
                  <Icon icon="ph:graduation-cap-duotone" class="text-3xl text-white" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">{{ edu.degree }}</h3>
                  <p class="text-lg font-bold text-gray-400 mt-1 uppercase tracking-wider">{{ edu.university }}</p>
                  <p class="mt-4 text-emerald-600 font-bold">{{ edu.date }}</p>
                </div>
              </div>
            </div>
          </section>

           <!-- Skills -->
          <section class="space-y-10">
            <h2 class="text-3xl font-black text-gray-900 tracking-tight text-center">Skill Architecture</h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div v-for="(category, index) in skills" :key="index"
                   class="p-8 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl transition duration-500">
                <p class="text-gray-900 font-black uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                   <span class="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                   {{ getCategoryName(category) }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(skill, skillIndex) in getCategoryItems(category)" :key="skillIndex"
                        class="px-4 py-2 text-sm font-bold rounded-xl bg-gray-50 text-gray-600 border border-gray-100">
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