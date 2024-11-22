<template>
    <main class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
      <div class="max-w-6xl mx-auto space-y-16">
        <!-- Hero Section -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-xl">
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
            <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50"></div>
          </div>
          
          <div class="relative grid lg:grid-cols-2 gap-8 p-8 items-center">
            <!-- Profile Info -->
            <div class="space-y-8">
              <div class="space-y-4">
                <h1 class="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                  AHMAD JAMIL
                </h1>
                <p class="text-xl text-gray-300 font-medium">
                  Software Engineer | Backend Developer
                </p>
              </div>
              
              <p class="text-gray-300 text-lg leading-relaxed">
                I'm a dedicated Software Engineer with 5 years of experience in building and scaling
                distributed microservices using a diverse set of programming languages and technologies.
              </p>
              
              <!-- Quick Stats -->
              <div class="grid grid-cols-2 gap-4">
                <div class="group p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div class="text-sm font-medium text-gray-400">Experience</div>
                  <div class="text-2xl font-bold text-white">5 Years</div>
                </div>
                <div class="group p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div class="text-sm font-medium text-gray-400">Projects</div>
                  <div class="text-2xl font-bold text-white">5</div>
                </div>
              </div>
            </div>
            
            <!-- Profile Image -->
            <div class="relative group">
              <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-300"></div>
              <img :src="profileImage" alt="Ahmad Jamil" class="relative rounded-full w-full aspect-square object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300" />
            </div>
          </div>
        </div>
  
        <!-- Experience & Education -->
        <div class="mt-8 grid lg:grid-cols-2 gap-8">
          <!-- Experience -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:briefcase" class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-white">Work Experience</h2>
            </div>
  
            <div class="space-y-4">
              <div v-for="(job, index) in [
                { title: 'Intermediate Software Engineer', company: 'Achievers', period: 'Feb 2022 - Present' },
                { title: 'Junior Software Engineer', company: 'Achievers', period: 'Dec 2020 - Feb 2022' },
                { title: 'Web Developer', company: 'Ekkotek', period: 'Jul 2019 - Aug 2020' }
              ]" :key="index" class="group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div class="flex justify-between items-start">
                  <div class="space-y-2">
                    <h3 class="text-xl font-bold text-white">{{ job.title }}</h3>
                    <div class="flex items-center gap-2 text-gray-400">
                      <Icon icon="mdi:office-building" class="h-4 w-4" />
                      <span>{{ job.company }}</span>
                      <span class="text-gray-600">•</span>
                      <span>{{ job.period }}</span>
                    </div>
                  </div>
                  <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Icon icon="mdi:code-braces" class="h-5 w-5 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Education -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:school" class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-white">Education</h2>
            </div>
  
            <div class="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div class="flex justify-between items-start">
                <div class="space-y-2">
                  <h3 class="text-xl font-bold text-white">Frederick University Of Nicosia</h3>
                  <div class="flex items-center gap-2 text-gray-400">
                    <Icon icon="mdi:calendar" class="h-4 w-4" />
                    <span>2015 - 2019</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-300 mt-2">
                    <Icon icon="mdi:book-education" class="h-5 w-5 text-blue-400" />
                    <span>Bachelor Of Computer Science</span>
                  </div>
                </div>
                <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Icon icon="mdi:certificate" class="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Skills Section -->
        <div class="mt-16 space-y-16">
          <!-- Programming Languages -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:code" class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-white">Programming Languages</h2>
            </div>
  
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div v-for="lang in programmingLanguages" :key="lang.name" 
                   class="group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div class="flex flex-col items-center gap-4">
                  <Icon :icon="lang.icon" class="h-12 w-12 text-gray-300 group-hover:text-white transition-colors" />
                  <span class="text-gray-300 group-hover:text-white font-medium">{{ lang.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- FrameWorks Languages -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:code" class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-white">FrameWorks</h2>
            </div>
  
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div v-for="framework in frameworks" :key="framework.name" 
                   class="group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div class="flex flex-col items-center gap-4">
                  <Icon :icon="framework.icon" class="h-12 w-12 text-gray-300 group-hover:text-white transition-colors" />
                  <span class="text-gray-300 group-hover:text-white font-medium">{{ framework.name }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Technologies -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:tools" class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-white">Technologies & Tools</h2>
            </div>
  
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              <div v-for="tech in technologies" :key="tech.name" 
                   class="group p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div class="flex flex-col items-center gap-3">
                  <Icon :icon="tech.icon" class="h-8 w-8 text-gray-300 group-hover:text-white transition-colors" />
                  <span class="text-sm text-gray-400 group-hover:text-white text-center font-medium">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Professional Skills -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Icon icon="mdi:star" class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-white">Professional Skills</h2>
            </div>
  
            <div class="flex flex-wrap gap-4">
              <div v-for="skill in skills" :key="skill.name" 
                   class="group px-6 py-3 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <Icon :icon="skill.icon" class="h-5 w-5 text-gray-400 group-hover:text-white" />
                  <span class="text-gray-300 group-hover:text-white font-medium">{{ skill.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</script>