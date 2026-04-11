<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-6 font-['Space_Grotesk'] text-white">
    <div class="max-w-7xl mx-auto space-y-32">
      
      <!-- HERO SECTION -->
      <section class="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
        <div class="space-y-10">
          <div class="space-y-6">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-xs font-bold uppercase tracking-widest">
              <span class="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse mr-2"></span>
              Available for new opportunities
            </div>
            <h1 class="text-7xl sm:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              Ahmad <br/>
              <span class="text-[#00FF9C]">Jamil</span>
            </h1>
            <p class="text-2xl text-gray-400 font-medium tracking-tight">
              Digital Architect specializing in <span class="text-white">high-performance web ecosystems</span> and scalable system design.
            </p>
          </div>
          
          <div class="flex flex-wrap gap-6 items-center">
            <router-link to="/projects" class="px-10 py-5 bg-[#00FF9C] text-black rounded-sm font-black uppercase tracking-widest hover:bg-[#05e68d] transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_0_30px_rgba(0,255,156,0.2)]">
              View Portfolio
            </router-link>
            <router-link to="/contact" class="px-10 py-5 bg-transparent border border-white/10 text-white rounded-sm font-black uppercase tracking-widest hover:border-[#00FF9C] hover:text-[#00FF9C] transition-all">
              Contact Me
            </router-link>
          </div>

          <div class="flex gap-16 pt-10 border-t border-white/5">
            <div>
              <div class="text-5xl font-black text-white italic tracking-tighter">{{ years }}+</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">Years Experience</div>
            </div>
            <div>
              <div class="text-5xl font-black text-white italic tracking-tighter">08</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">Active Modules</div>
            </div>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-[#00FF9C] to-transparent opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative aspect-[4/5] bg-[#131313] border border-white/5 overflow-hidden rounded-2xl">
             <img
              :src="profileImage"
              class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700"
              alt="Ahmad Jamil"
            />
          </div>
        </div>
      </section>

      <!-- EXPERIENCE & EDUCATION -->
      <section class="grid lg:grid-cols-2 gap-24">
        <!-- Work Experience -->
        <div class="space-y-12">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-[#00FF9C] uppercase tracking-[0.4em]">System Logs</span>
            <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter">Work Experience</h2>
          </div>
          
          <div class="space-y-8 relative border-l border-white/5 pl-8 ml-2">
            <div
              v-for="(job, index) in jobs"
              :key="index"
              class="relative group"
            >
              <div class="absolute -left-[37px] top-2 h-4 w-4 rounded-full bg-[#0e0e0e] border-2 border-white/10 group-hover:border-[#00FF9C] transition duration-300"></div>
              <div class="p-8 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/30 transition-all duration-500">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-2xl font-bold text-white tracking-tight uppercase group-hover:text-[#00FF9C] transition-colors italic">
                      {{ job.title }}
                    </h3>
                    <p class="text-[#00FF9C] font-bold text-xs uppercase tracking-widest mt-1 opacity-70">
                      {{ job.company }}
                    </p>
                  </div>
                  <span class="text-[10px] font-black text-gray-600 bg-white/5 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {{ job.period }}
                  </span>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Pioneered advanced system architectures and led cross-functional teams to deliver high-impact digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="space-y-12">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-[#00FF9C] uppercase tracking-[0.4em]">Foundations</span>
            <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter">Education</h2>
          </div>
          
          <div class="p-10 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/30 transition-all duration-500 group">
             <h3 class="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-[#00FF9C] transition-colors">
              Frederick University
            </h3>
            <p class="text-gray-400 text-lg font-bold mt-2">
              Bachelor of Computer Science
            </p>
            <div class="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <span class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Degree Obtained</span>
              <span class="text-[#00FF9C] font-black italic">2015 — 2019</span>
            </div>
          </div>
        </div>
      </section>

      <!-- TECH STACK -->
      <section class="space-y-16">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-[#00FF9C] uppercase tracking-[0.4em]">Tooling</span>
            <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter">Technical Arsenal</h2>
          </div>
          <div class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] pb-2">
            Active Modules / 08
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Languages -->
          <div class="p-10 bg-[#131313] border border-white/5 rounded-sm space-y-8">
            <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <span class="h-1 w-8 bg-[#00FF9C]"></span>
              Languages
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="lang in programmingLanguages" :key="lang.name" class="p-5 bg-[#0e0e0e] border border-white/5 flex flex-col items-center gap-4 hover:border-[#00FF9C]/40 transition group">
                <Icon :icon="lang.icon" class="h-8 w-8 text-white/40 group-hover:text-[#00FF9C] transition-colors" />
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">{{ lang.name }}</span>
              </div>
            </div>
          </div>

          <!-- Frameworks -->
          <div class="p-10 bg-[#131313] border border-white/5 rounded-sm space-y-8">
            <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <span class="h-1 w-8 bg-[#00FF9C]"></span>
              Frameworks
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="fw in frameworks" :key="fw.name" class="p-5 bg-[#0e0e0e] border border-white/5 flex flex-col items-center gap-4 hover:border-[#00FF9C]/40 transition group">
                <Icon :icon="fw.icon" class="h-8 w-8 text-white/40 group-hover:text-[#00FF9C] transition-colors" />
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">{{ fw.name }}</span>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="p-10 bg-[#131313] border border-white/5 rounded-sm space-y-8">
            <h3 class="text-xs font-black text-gray-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <span class="h-1 w-8 bg-[#00FF9C]"></span>
              Core Infrastructure
            </h3>
            <div class="flex flex-wrap gap-3">
              <div v-for="tech in technologies" :key="tech.name" class="px-4 py-3 bg-[#0e0e0e] border border-white/5 flex items-center gap-3 hover:border-[#00FF9C]/40 transition group">
                <Icon :icon="tech.icon" class="h-5 w-5 text-white/40 group-hover:text-[#00FF9C] transition-colors" />
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CORE SKILLS -->
      <section class="space-y-16">
        <div class="space-y-2">
          <span class="text-[10px] font-bold text-[#00FF9C] uppercase tracking-[0.4em]">Capabilities</span>
          <h2 class="text-5xl font-black text-white uppercase italic tracking-tighter">Core Proficiency</h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="p-10 bg-[#131313] border border-white/5 hover:border-[#00FF9C]/30 transition-all duration-500 flex flex-col gap-8 group"
          >
            <div class="h-14 w-14 bg-[#0e0e0e] border border-white/5 flex items-center justify-center group-hover:border-[#00FF9C]/40 transition-colors">
              <Icon :icon="skill.icon" class="h-7 w-7 text-white/40 group-hover:text-[#00FF9C] transition-colors" />
            </div>
            <div class="space-y-4">
              <span class="text-xl font-black text-white uppercase italic tracking-tighter">{{ skill.name }}</span>
              <div class="h-1 w-full bg-white/5 overflow-hidden">
                <div class="h-full bg-[#00FF9C] w-full transform -translate-x-1/4 group-hover:translate-x-0 transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>
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