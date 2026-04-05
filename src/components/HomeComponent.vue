<template>
  <main class="bg-white min-h-screen pt-12 pb-24 px-6 animate-fade-in-up">
    <div class="max-w-6xl mx-auto space-y-32">

      <!-- HERO -->
      <section class="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">

        <div class="space-y-10">
          <div class="space-y-6">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold tracking-wide">
              Available for new opportunities
            </div>
            <h1 class="text-6xl sm:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Ahmad <span class="text-indigo-600">Jamil</span>
            </h1>
            <p class="text-2xl text-gray-500 font-medium">
              Software Engineer · <span class="text-gray-900">Backend Specialist</span>
            </p>
          </div>

          <p class="text-xl text-gray-600 leading-relaxed max-w-xl">
            Building robust distributed systems and cloud-native services with a focus on performance, scalability, and clean code.
          </p>

          <div class="flex flex-wrap gap-6 items-center">
            <router-link to="/projects" class="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
              View My Work
            </router-link>
            <router-link to="/contact" class="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">
              Get in Touch
            </router-link>
          </div>

          <div class="flex gap-12 pt-4 border-t border-gray-100">
            <div>
              <div class="text-4xl font-black text-gray-900">
                {{ years }}+
              </div>
              <div class="text-sm font-bold text-gray-400 uppercase tracking-widest">Experience</div>
            </div>

            <div>
              <div class="text-4xl font-black text-gray-900">
                5+
              </div>
              <div class="text-sm font-bold text-gray-400 uppercase tracking-widest">Major Projects</div>
            </div>
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end group">
          <div class="absolute -inset-4 bg-indigo-100/50 rounded-[40px] blur-2xl group-hover:bg-indigo-200/50 transition duration-700"></div>
          <img
            :src="profileImage"
            class="relative w-full max-w-sm aspect-[4/5] rounded-[32px] shadow-2xl object-cover grayscale-[0.2] hover:grayscale-0 transition duration-700"
            alt="Ahmad"
          />
        </div>

      </section>

      <!-- EXPERIENCE & EDUCATION -->
      <section class="grid lg:grid-cols-2 gap-20">

        <!-- Work -->
        <div class="space-y-12">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Icon icon="ph:briefcase-duotone" class="text-white text-2xl" />
            </div>
            <h2 class="text-4xl font-bold text-gray-900 tracking-tight">Work</h2>
          </div>

          <div class="space-y-6 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            <div
              v-for="(job, index) in jobs"
              :key="index"
              class="relative pl-14 group"
            >
              <div class="absolute left-0 top-1.5 h-12 w-12 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center z-10 group-hover:border-indigo-600 transition duration-300">
                <div class="h-3 w-3 rounded-full bg-gray-200 group-hover:bg-indigo-600 transition duration-300"></div>
              </div>
              <div class="p-8 bg-white border border-gray-100 rounded-3xl group-hover:border-indigo-100 group-hover:shadow-2xl group-hover:shadow-indigo-50/50 transition duration-300">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                  {{ job.title }}
                </h3>
                <p class="text-lg font-semibold text-gray-500 mt-1">
                  {{ job.company }}
                </p>
                <p class="text-sm font-bold text-indigo-400 mt-3 uppercase tracking-wider">
                  {{ job.period }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="space-y-12">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-100">
              <Icon icon="ph:student-duotone" class="text-white text-2xl" />
            </div>
            <h2 class="text-4xl font-bold text-gray-900 tracking-tight">Education</h2>
          </div>

          <div
            class="p-10 bg-white border border-gray-100 rounded-[32px] hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-50/50 transition duration-500"
          >
            <h3 class="text-2xl font-bold text-gray-900">
              Frederick University
            </h3>
            <p class="text-lg font-medium text-gray-500 mt-2">
              Bachelor of Computer Science
            </p>
            <div class="inline-block mt-6 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold">
              2015 – 2019
            </div>
          </div>
        </div>

      </section>

      <!-- SKILLS -->
      <section class="space-y-16">
        <div class="text-center space-y-4">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Tech Stack</h2>
          <p class="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            I specialize in high-performance backend technologies and modern infrastructure.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Languages -->
          <div class="p-8 bg-gray-50 rounded-[40px] space-y-8">
            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-3">
              <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
              Languages
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="lang in programmingLanguages" :key="lang.name" class="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md transition">
                <Icon :icon="lang.icon" class="h-10 w-10" />
                <span class="text-sm font-bold text-gray-700">{{ lang.name }}</span>
              </div>
            </div>
          </div>

          <!-- Frameworks -->
          <div class="p-8 bg-gray-50 rounded-[40px] space-y-8">
            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-3">
              <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
              Frameworks
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="fw in frameworks" :key="fw.name" class="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md transition">
                <Icon :icon="fw.icon" class="h-10 w-10" />
                <span class="text-sm font-bold text-gray-700">{{ fw.name }}</span>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="p-8 bg-gray-50 rounded-[40px] space-y-8">
            <h3 class="text-xl font-bold text-gray-900 flex items-center gap-3">
              <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
              Infrastructure
            </h3>
            <div class="flex flex-wrap gap-3">
              <div v-for="tech in technologies" :key="tech.name" class="p-3 bg-white rounded-xl border border-gray-100 flex items-center gap-2 hover:shadow-md transition">
                <Icon :icon="tech.icon" class="h-5 w-5" />
                <span class="text-xs font-bold text-gray-600">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SKILLS -->
      <section class="space-y-16">
        <div class="text-center space-y-4">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Core Skills</h2>
          <p class="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            A blend of engineering depth, architectural thinking, and leadership experience.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="p-8 bg-gray-50 rounded-[40px] border border-transparent hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50/50 transition-all duration-500 flex items-center gap-6"
          >
            <div class="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-md">
              <Icon :icon="skill.icon" class="h-7 w-7 text-indigo-600" />
            </div>
            <span class="text-lg font-bold text-gray-900">{{ skill.name }}</span>
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