<template>
  <div class="space-y-16">
      
      <!-- HERO SECTION -->
      <section class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-10">
          <div class="space-y-6">
            <div class="ui-eyebrow">
              <span class="w-2 h-2 rounded-full bg-app-accent mr-2"></span>
              Available for new opportunities
            </div>
            <h1 class="ui-h1">
              Ahmad <br/>
              <span class="text-app-brand">Jamil</span>
            </h1>
            <p class="ui-lead text-lg sm:text-xl">
              Digital Architect specializing in <span class="text-slate-900 font-semibold">high-performance web ecosystems</span> and scalable system design.
            </p>
          </div>
          
          <div class="flex flex-wrap gap-6 items-center">
            <router-link to="/projects" class="ui-btn-primary">
              View Portfolio
            </router-link>
            <router-link to="/contact" class="ui-btn-ghost">
              Contact Me
            </router-link>
          </div>

          <div class="flex gap-12 pt-8 border-t border-app-border">
            <div>
              <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">{{ years }}+</div>
              <div class="text-xs font-medium text-slate-500 mt-1">Years Experience</div>
            </div>
            <div>
              <div class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">08</div>
              <div class="text-xs font-medium text-slate-500 mt-1">Active Modules</div>
            </div>
          </div>
        </div>

        <div class="relative group">
          <div class="relative aspect-[4/5] ui-card overflow-hidden rounded-2xl">
             <img
              :src="profileImage"
              class="w-full h-full object-cover"
              alt="Ahmad Jamil"
            />
          </div>
        </div>
      </section>

      <!-- EXPERIENCE & EDUCATION -->
      <section class="grid lg:grid-cols-2 gap-12">
        <!-- Work Experience -->
        <div class="space-y-8">
          <div class="space-y-2">
            <div class="ui-eyebrow">System Logs</div>
            <h2 class="ui-h2">Work Experience</h2>
          </div>
          
          <div class="space-y-6 relative border-l border-app-border pl-8 ml-2">
            <div
              v-for="(job, index) in jobs"
              :key="index"
              class="relative group"
            >
              <div class="absolute -left-[37px] top-3 h-4 w-4 rounded-full bg-app-bg border-2 border-app-border group-hover:border-slate-300 transition duration-200"></div>
              <div class="p-6 ui-card ui-card-hover">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                      {{ job.title }}
                    </h3>
                    <p class="text-app-brand font-medium text-sm mt-1">
                      {{ job.company }}
                    </p>
                  </div>
                  <span class="text-xs font-medium text-slate-600 bg-app-muted px-3 py-1 rounded-full">
                    {{ job.period }}
                  </span>
                </div>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Pioneered advanced system architectures and led cross-functional teams to deliver high-impact digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="space-y-8">
          <div class="space-y-2">
            <div class="ui-eyebrow">Foundations</div>
            <h2 class="ui-h2">Education</h2>
          </div>
          
          <div class="ui-card ui-card-hover p-8">
             <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Frederick University
            </h3>
            <p class="text-slate-600 text-base mt-2">
              Bachelor of Computer Science
            </p>
            <div class="mt-6 pt-6 border-t border-app-border flex items-center justify-between">
              <span class="text-xs text-slate-500">Degree Obtained</span>
              <span class="text-app-brand font-semibold">2015 — 2019</span>
            </div>
          </div>
        </div>
      </section>

      <!-- TECH STACK -->
      <section class="space-y-10">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6">
          <div class="space-y-2">
            <div class="ui-eyebrow">Tooling</div>
            <h2 class="ui-h2">Technical Arsenal</h2>
          </div>
          <div class="text-xs text-slate-500 pb-2">
            Active Modules / 08
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Languages -->
          <div class="ui-card p-8 space-y-6">
            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-3">
              <span class="h-1 w-8 bg-app-brand rounded-full"></span>
              Languages
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="lang in programmingLanguages" :key="lang.name" class="p-4 bg-app-muted border border-app-border rounded-xl flex flex-col items-center gap-3">
                <Icon :icon="lang.icon" class="h-8 w-8 text-slate-500" />
                <span class="text-xs font-medium text-slate-700">{{ lang.name }}</span>
              </div>
            </div>
          </div>

          <!-- Frameworks -->
          <div class="ui-card p-8 space-y-6">
            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-3">
              <span class="h-1 w-8 bg-app-brand rounded-full"></span>
              Frameworks
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="fw in frameworks" :key="fw.name" class="p-4 bg-app-muted border border-app-border rounded-xl flex flex-col items-center gap-3">
                <Icon :icon="fw.icon" class="h-8 w-8 text-slate-500" />
                <span class="text-xs font-medium text-slate-700">{{ fw.name }}</span>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="ui-card p-8 space-y-6">
            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-3">
              <span class="h-1 w-8 bg-app-brand rounded-full"></span>
              Core Infrastructure
            </h3>
            <div class="flex flex-wrap gap-3">
              <div v-for="tech in technologies" :key="tech.name" class="px-4 py-2 bg-app-muted border border-app-border rounded-full flex items-center gap-2">
                <Icon :icon="tech.icon" class="h-5 w-5 text-slate-500" />
                <span class="text-xs font-medium text-slate-700">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CORE SKILLS -->
      <section class="space-y-10">
        <div class="space-y-2">
          <div class="ui-eyebrow">Capabilities</div>
          <h2 class="ui-h2">Core Proficiency</h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="ui-card ui-card-hover p-8 flex flex-col gap-6"
          >
            <div class="h-12 w-12 bg-app-muted border border-app-border flex items-center justify-center rounded-xl">
              <Icon :icon="skill.icon" class="h-6 w-6 text-slate-600" />
            </div>
            <div class="space-y-4">
              <span class="text-lg font-semibold text-slate-900 tracking-tight">{{ skill.name }}</span>
              <div class="h-2 w-full bg-app-muted overflow-hidden rounded-full">
                <div class="h-full bg-app-brand w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const profileImage = computed(() => require('@/assets/images/personal/ahmad.jpeg'));

const programmingLanguages = [
    { name: 'PHP', icon: 'skill-icons:php-light', proficiency: 90 },
    { name: 'Python', icon: 'vscode-icons:file-type-python', proficiency: 85 },
    { name: 'Golang', icon: 'skill-icons:golang', proficiency: 75 },
    { name: 'JavaScript', icon: 'skill-icons:javascript', proficiency: 80 }
];
const jobs = [
  {
    title: 'Intermediate Software Engineer',
    company: 'Achievers',
    period: 'Feb 2022 - Present'
  },
  {
    title: 'Junior Software Engineer',
    company: 'Achievers',
    period: 'Dec 2020 - Feb 2022'
  },
  {
    title: 'Web Developer',
    company: 'Ekkotek',
    period: 'Jul 2019 - Aug 2020'
  }
]

const frameworks = [
    { name: 'CodeIgniter', icon: 'logos:codeigniter-icon' },
    { name: 'Laravel', icon: 'skill-icons:laravel-light' },
    { name: 'Vue.js', icon: 'devicon:vuejs' },
    { name: 'React', icon: 'vscode-icons:file-type-reactjs' }
];

const technologies = [
    { name: 'Kubernetes', icon: 'logos:kubernetes' },
    { name: 'Docker', icon: 'skill-icons:docker' },
    { name: 'MySQL', icon: 'skill-icons:mysql-light' },
    { name: 'BigQuery', icon: 'simple-icons:googlebigquery' },
    { name: 'Git', icon: 'skill-icons:git' },
    { name: 'GitHub', icon: 'formkit:github' },
    { name: 'Kanban', icon: 'bi:kanban' },
    { name: 'Tilt', icon: 'file-icons:tilt' },
    { name: 'GCP', icon: 'skill-icons:gcp-light' }
];

const skills = [
    { name: 'API Development', icon: 'carbon:api-1' },
    { name: 'Backend Development', icon: 'carbon:development' },
    { name: 'Software Architecture', icon: 'carbon:software-resource-cluster' },
    { name: 'Problem Solving', icon: 'carbon:solution' },
    { name: 'Team Leadership', icon: 'carbon:group' }
];

const start = new Date('2019-07-01')
const now = new Date()

let years = now.getFullYear() - start.getFullYear()

// Check if the anniversary has happened this year
const hasHadAnniversary =
  now.getMonth() > start.getMonth() ||
  (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate())

if (!hasHadAnniversary) {
  years--
}
</script>