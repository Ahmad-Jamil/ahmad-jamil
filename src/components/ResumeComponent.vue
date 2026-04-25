<template>
  <div class="space-y-16">
      
      <!-- Header Section -->
      <section class="text-center space-y-10">
        <div class="ui-eyebrow mx-auto">
          Curriculum Vitae
        </div>
        <h1 class="ui-h1">
          Professional <br/>
          <span class="text-app-brand">Resume.</span>
        </h1>
        <p class="ui-lead max-w-2xl mx-auto">
          A deep dive into my journey as a digital architect, engineering scalable systems from Nicosia to the world.
        </p>
        
        <div class="flex justify-center pt-8">
           <button @click="downloadPDF"
                class="ui-btn-primary px-6 py-3 relative">
             <Icon icon="ph:file-pdf-duotone" class="text-xl" />
             <span>Download Full PDF</span>
             <div class="absolute -top-2.5 -right-2.5 h-9 w-9 bg-white rounded-full flex items-center justify-center text-app-brand border border-app-border shadow-soft">
                <Icon icon="ph:arrow-down-bold" class="text-sm text-app-brand" />
             </div>
          </button>
        </div>
      </section>

      <!-- Main Layout Grid -->
      <div class="grid lg:grid-cols-12 gap-16">
        
        <!-- Left Sidebar: Identity & Linguistics -->
        <aside class="lg:col-span-4 space-y-12">
          
          <!-- Contact Interface -->
          <div class="ui-card ui-card-hover p-8 sm:p-10 space-y-8">
            <h2 class="text-sm font-semibold text-slate-700 flex items-center gap-3">
              <span class="h-[2px] w-8 bg-app-brand rounded-full"></span>
              Contact
            </h2>
            <div class="space-y-8">
              <div class="flex items-start gap-6 group/item">
                 <div class="h-12 w-12 bg-app-muted border border-app-border flex items-center justify-center rounded-xl">
                    <Icon icon="ph:phone-duotone" class="text-xl text-slate-500" />
                 </div>
                 <div>
                   <p class="text-xs text-slate-500">Mobile</p>
                   <p class="text-slate-900 font-semibold tracking-tight">{{ resumeObject.phonePrefix }} {{ resumeObject.mobileNumber }}</p>
                 </div>
              </div>
              <div class="flex items-start gap-6 group/item">
                 <div class="h-12 w-12 bg-app-muted border border-app-border flex items-center justify-center rounded-xl">
                    <Icon icon="ph:envelope-duotone" class="text-xl text-slate-500" />
                 </div>
                 <div class="overflow-hidden">
                   <p class="text-xs text-slate-500">Email</p>
                   <p class="text-slate-900 font-semibold tracking-tight truncate">{{ resumeObject.email }}</p>
                 </div>
              </div>
              <div class="flex items-start gap-6 group/item">
                 <div class="h-12 w-12 bg-app-muted border border-app-border flex items-center justify-center rounded-xl">
                    <Icon icon="ph:map-pin-duotone" class="text-xl text-slate-500" />
                 </div>
                 <div>
                   <p class="text-xs text-slate-500">Location</p>
                   <p class="text-slate-900 font-semibold tracking-tight">{{ resumeObject.city }}, {{ resumeObject.country }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Language Modules -->
          <div class="ui-card ui-card-hover p-8 sm:p-10 space-y-8">
            <h2 class="text-sm font-semibold text-slate-700 flex items-center gap-3">
              <span class="h-[2px] w-8 bg-app-brand rounded-full"></span>
              Languages
            </h2>
            <div class="space-y-8">
              <div v-for="(lang, i) in resumeObject.languages" :key="i" class="space-y-4">
                <div class="flex justify-between items-end">
                   <span class="text-slate-900 font-semibold tracking-tight">{{ lang.name }}</span>
                   <span class="text-xs font-medium text-app-brand">{{ lang.level }}</span>
                </div>
                <div class="h-2 w-full bg-app-muted overflow-hidden rounded-full">
                   <div class="h-full bg-app-brand transition-all duration-500" :style="{ width: lang.level === 'Native' ? '100%' : '80%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Workspace: Summary & Logs -->
        <div class="lg:col-span-8 space-y-24">
          
          <!-- Abstract -->
          <section class="ui-card p-8 sm:p-10 border-l-4 border-app-brand">
            <h2 class="text-sm font-semibold text-slate-700 mb-6">Professional Abstract</h2>
            <div class="text-slate-700 leading-relaxed whitespace-pre-line">
              {{ resumeObject.aboutMe }}
            </div>
          </section>

          <!-- System Logs: Experience -->
          <section class="space-y-16">
            <div class="space-y-2">
              <div class="ui-eyebrow">Work Experience</div>
              <h2 class="ui-h2">Career Modules</h2>
            </div>
            <div class="space-y-8 relative border-l border-app-border pl-10 ml-4">
              <div v-for="(exp, i) in resumeObject.experiences" :key="i"
                   class="relative group">
                <!-- Timeline Node -->
                <div class="absolute -left-[50px] top-3 h-6 w-6 rounded-full bg-app-bg border-2 border-app-border flex items-center justify-center">
                   <div class="h-2 w-2 rounded-full bg-app-brand/60"></div>
                </div>

                <div class="ui-card ui-card-hover p-8 sm:p-10">
                  <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {{ exp.jobTitle }}
                      </h3>
                      <p class="text-app-brand font-medium text-sm mt-2">
                        {{ exp.companyName }}
                      </p>
                    </div>
                    <div class="px-4 py-2 bg-app-muted border border-app-border text-slate-600 text-xs font-medium rounded-full whitespace-nowrap">
                      {{ exp.startDate }} — {{ exp.endDate }}
                    </div>
                  </div>
                  <p class="text-slate-600 leading-relaxed">
                    {{ exp.summary }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Educational Foundations -->
          <section class="space-y-16">
            <div class="space-y-2">
              <div class="ui-eyebrow">Foundations</div>
              <h2 class="ui-h2">Education</h2>
            </div>
            <div class="grid gap-8">
              <div v-for="(edu, i) in resumeObject.education" :key="i"
                   class="ui-card ui-card-hover p-8 sm:p-10">
                <div class="flex items-start gap-10">
                  <div class="h-16 w-16 bg-app-muted border border-app-border flex items-center justify-center shrink-0 rounded-xl">
                    <Icon icon="ph:graduation-cap-duotone" class="text-3xl text-slate-600" />
                  </div>
                  <div class="space-y-4">
                    <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {{ edu.degree }}
                    </h3>
                    <p class="text-slate-600 font-medium text-sm">{{ edu.university }}</p>
                    <div class="inline-block mt-2 text-app-brand font-semibold">
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
              <div class="ui-eyebrow mx-auto">Capabilities</div>
              <h2 class="ui-h2">Skill Architecture</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              <div v-for="(category, index) in skills" :key="index"
                   class="ui-card ui-card-hover p-8">
                <p class="text-sm font-semibold text-slate-700 mb-6 flex items-center gap-3">
                   <span class="h-1 w-8 bg-app-brand rounded-full"></span>
                   {{ getCategoryName(category) }}
                </p>
                <div class="flex flex-wrap gap-3">
                  <span v-for="(skill, skillIndex) in getCategoryItems(category)" :key="skillIndex"
                        class="ui-pill">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
  </div>
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