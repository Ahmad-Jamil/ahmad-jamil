<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto space-y-28">

      <!-- HERO -->
      <section class="grid lg:grid-cols-2 gap-16 items-center">

        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
              Ahmad Jamil
            </h1>
            <p class="text-xl text-gray-600 font-medium">
              Software Engineer · Backend Developer
            </p>
          </div>

          <p class="text-lg text-gray-600 leading-relaxed max-w-xl">
            I build scalable distributed systems and cloud-native microservices,
            focusing on clean architecture and long-term maintainability.
          </p>

          <div class="flex gap-10 pt-4">
            <div>
              <div class="text-3xl font-bold text-gray-900">
                {{ years }}+
              </div>
              <div class="text-sm text-gray-500">Years Experience</div>
            </div>

            <div>
              <div class="text-3xl font-bold text-gray-900">
                5+
              </div>
              <div class="text-sm text-gray-500">Major Projects</div>
            </div>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <img
            :src="profileImage"
            class="w-80 rounded-3xl shadow-xl object-cover"
            alt="Ahmad"
          />
        </div>

      </section>

      <!-- EXPERIENCE & EDUCATION -->
      <section class="grid lg:grid-cols-2 gap-16">

        <!-- Work -->
        <div class="space-y-10">
          <h2 class="text-3xl font-bold text-gray-900">Work Experience</h2>

          <div
            v-for="(job, index) in jobs"
            :key="index"
            class="p-8 bg-white border border-gray-200 rounded-2xl
                   hover:shadow-lg transition duration-300"
          >
            <h3 class="text-xl font-semibold text-gray-900">
              {{ job.title }}
            </h3>
            <p class="text-gray-600 mt-1">
              {{ job.company }}
            </p>
            <p class="text-sm text-gray-400 mt-2">
              {{ job.period }}
            </p>
          </div>
        </div>

        <!-- Education -->
        <div class="space-y-10">
          <h2 class="text-3xl font-bold text-gray-900">Education</h2>

          <div
            class="p-8 bg-white border border-gray-200 rounded-2xl
                   hover:shadow-lg transition duration-300"
          >
            <h3 class="text-xl font-semibold text-gray-900">
              Frederick University Of Nicosia
            </h3>

            <p class="text-gray-600 mt-1">
              Bachelor of Computer Science
            </p>

            <p class="text-sm text-gray-400 mt-2">
              2015 – 2019
            </p>
          </div>
        </div>

      </section>

      <!-- PROGRAMMING LANGUAGES -->
      <section class="space-y-12">
        <h2 class="text-3xl font-bold text-gray-900">
          Programming Languages
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="lang in programmingLanguages"
            :key="lang.name"
            class="p-8 bg-white border border-gray-200 rounded-2xl
                   text-center hover:shadow-md transition"
          >
            <Icon :icon="lang.icon" class="h-12 w-12 mx-auto text-gray-700" />
            <div class="mt-4 font-medium text-gray-800">
              {{ lang.name }}
            </div>
          </div>
        </div>
      </section>

      <!-- FRAMEWORKS -->
      <section class="space-y-12">
        <h2 class="text-3xl font-bold text-gray-900">
          Frameworks
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="framework in frameworks"
            :key="framework.name"
            class="p-8 bg-white border border-gray-200 rounded-2xl
                   text-center hover:shadow-md transition"
          >
            <Icon :icon="framework.icon" class="h-12 w-12 mx-auto text-gray-700" />
            <div class="mt-4 font-medium text-gray-800">
              {{ framework.name }}
            </div>
          </div>
        </div>
      </section>

      <!-- TECHNOLOGIES -->
      <section class="space-y-12">
        <h2 class="text-3xl font-bold text-gray-900">
          Technologies & Tools
        </h2>

        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <div
            v-for="tech in technologies"
            :key="tech.name"
            class="p-6 bg-white border border-gray-200 rounded-xl
                   text-center hover:shadow-md transition"
          >
            <Icon :icon="tech.icon" class="h-8 w-8 mx-auto text-gray-700" />
            <div class="mt-3 text-sm text-gray-600">
              {{ tech.name }}
            </div>
          </div>
        </div>
      </section>

      <!-- PROFESSIONAL SKILLS -->
      <section class="space-y-12">
        <h2 class="text-3xl font-bold text-gray-900">
          Professional Skills
        </h2>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="px-6 py-3 rounded-full bg-white border border-gray-200
                   text-gray-700 hover:shadow-sm transition"
          >
            {{ skill.name }}
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