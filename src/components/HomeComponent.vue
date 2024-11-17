<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div class="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <!-- Profile Section -->
            <div class="grid md:grid-cols-12 gap-12 mb-16">
                <!-- Profile Picture and Header -->
                <div class="md:col-span-5 flex flex-col items-center space-y-10 p-8 bg-gray-50 rounded-3xl shadow-2xl">
                    <!-- Profile Image Section -->
                    <div class="relative group w-full max-w-md">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 rounded-full blur-lg opacity-70 group-hover:opacity-90 transition duration-500">
                        </div>
                        <img :src="profileImage" alt="Profile Picture"
                            class="relative z-10 w-full h-80 object-cover rounded-full border-4 border-white shadow-xl group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500" />
                    </div>

                    <!-- Name Section -->
                    <div class="text-center">
                        <h1
                            class="text-4xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                            AHMAD JAMIL
                        </h1>
                        <p class="mt-4 text-gray-600 text-lg md:text-xl">
                            Software Engineer | Backend Developer
                        </p>
                    </div>
                </div>


                <!-- About Me Section -->
                <div class="md:col-span-7 space-y-8">
                    <!-- About Me Section -->
                    <div class="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">About Me</h2>
                        <p class="text-gray-700 leading-relaxed text-lg">
                            I'm a dedicated Software Engineer with 3+ years of experience in building and scaling
                            distributed microservices using a diverse set of programming languages and technologies. I
                            excel in collaborating with
                            cross-functional teams to deliver impactful projects, and have led small developer teams
                            with a focus on code
                            quality, system design, and effective planning.
                        </p>
                    </div>

                    <!-- Quick Info Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div
                            class="p-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl duration-300">
                            <p class="text-sm font-semibold text-white">Experience</p>
                            <p class="text-2xl font-bold text-white">4 Years</p>
                        </div>
                        <!-- Add more info cards if needed -->
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="space-y-16">
                <!-- Education & Experience Grid -->
                <div class="grid md:grid-cols-2 gap-12 p-6">
                    <!-- Education Section -->
                    <div class="space-y-8">
                        <div class="flex items-center space-x-3">
                            <i-mdi-school class="w-8 h-8 text-indigo-600" />
                            <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Education</h3>
                        </div>

                        <div
                            class="p-6 bg-white rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                            <!-- Decorative gradient overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            </div>

                            <div class="relative z-10">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h4 class="font-bold text-lg text-gray-800">Frederick University Of Nicosia</h4>
                                        <div class="flex items-center space-x-2 mt-2">
                                            <i-mdi-calendar class="w-4 h-4 text-gray-500" />
                                            <p class="text-gray-600 text-sm">2015 - 2019</p>
                                        </div>
                                    </div>
                                    <i-mdi-certificate class="w-8 h-8 text-indigo-500" />
                                </div>
                                <div class="mt-4 flex items-center space-x-2">
                                    <i-mdi-book-education class="w-5 h-5 text-indigo-500" />
                                    <p class="text-gray-700">Bachelor Of Computer Science</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Work Experience Section -->
                    <div class="space-y-8">
                        <div class="flex items-center space-x-3">
                            <i-mdi-briefcase class="w-8 h-8 text-indigo-600" />
                            <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Work Experience</h3>
                        </div>

                        <div class="space-y-6">
                            <!-- Current Position -->
                            <div
                                class="p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>

                                <div class="relative z-10">
                                    <div class="flex items-start justify-between">
                                        <h4 class="font-bold text-lg text-gray-800">Intermediate Software Engineer</h4>
                                        <i-mdi-star class="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div class="flex items-center space-x-2 mt-2 text-indigo-600">
                                        <i-mdi-office-building class="w-4 h-4" />
                                        <p class="text-sm">Achievers</p>
                                        <span class="text-gray-400">•</span>
                                        <div class="flex items-center space-x-1 text-sm">
                                            <i-mdi-calendar class="w-4 h-4" />
                                            <span>Feb 2022 - Present</span>
                                        </div>
                                    </div>
                                    <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                                        Design, develop, and maintain Python micro-services, integrating with PHP
                                        applications.
                                    </p>
                                </div>
                            </div>

                            <!-- Previous Positions -->
                            <div
                                class="p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>

                                <div class="relative z-10">
                                    <div class="flex items-start justify-between">
                                        <h4 class="font-bold text-lg text-gray-800">Junior Software Engineer</h4>
                                        <i-mdi-code-braces class="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div class="flex items-center space-x-2 mt-2 text-indigo-600">
                                        <i-mdi-office-building class="w-4 h-4" />
                                        <p class="text-sm">Achievers</p>
                                        <span class="text-gray-400">•</span>
                                        <div class="flex items-center space-x-1 text-sm">
                                            <i-mdi-calendar class="w-4 h-4" />
                                            <span>Dec 2020 - Feb 2022</span>
                                        </div>
                                    </div>
                                    <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                                        Assist in integrating Python micro-services with PHP applications.
                                    </p>
                                </div>
                            </div>

                            <div
                                class="p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>

                                <div class="relative z-10">
                                    <div class="flex items-start justify-between">
                                        <h4 class="font-bold text-lg text-gray-800">Web Developer</h4>
                                        <i-mdi-web class="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div class="flex items-center space-x-2 mt-2 text-indigo-600">
                                        <i-mdi-office-building class="w-4 h-4" />
                                        <p class="text-sm">Ekkotek</p>
                                        <span class="text-gray-400">•</span>
                                        <div class="flex items-center space-x-1 text-sm">
                                            <i-mdi-calendar class="w-4 h-4" />
                                            <span>Jul 2019 - Aug 2020</span>
                                        </div>
                                    </div>
                                    <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                                        Developing and maintaining the website's frontend, identifying and fixing bugs,
                                        optimizing UI, and implementing chart interfaces to enhance user experience
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Skills Sections -->
                <section class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div class="container mx-auto px-4">
                        <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">
                            My Technical Arsenal
                        </h2>

                        <div class="max-w-6xl mx-auto space-y-16">
                            <!-- Programming Languages -->
                            <div class="space-y-8">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="h-1 w-10 bg-blue-500 rounded"></div>
                                    <h3 class="text-2xl font-bold text-gray-800">Programming Languages</h3>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div v-for="(lang, index) in programmingLanguages" :key="index"
                                        class="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div
                                            class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        </div>
                                        <div class="relative flex flex-col items-center gap-4">
                                            <Icon :icon="lang.icon"
                                                class="text-5xl text-gray-700 group-hover:text-blue-600 transition-colors" />
                                            <span class="font-medium text-gray-600 group-hover:text-gray-900">{{
                                                lang.name }}</span>
                                            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                <div class="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                                                    :style="{ width: `${lang.proficiency}%` }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Frameworks -->
                            <div class="space-y-8">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="h-1 w-10 bg-emerald-500 rounded"></div>
                                    <h3 class="text-2xl font-bold text-gray-800">Frameworks & Libraries</h3>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div v-for="(framework, index) in frameworks" :key="index"
                                        class="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div class="flex flex-col items-center gap-4">
                                            <Icon :icon="framework.icon"
                                                class="text-5xl transition-transform duration-300 group-hover:scale-110" />
                                            <span class="font-medium text-gray-600 group-hover:text-gray-900">{{
                                                framework.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Technologies -->
                            <div class="space-y-8">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="h-1 w-10 bg-purple-500 rounded"></div>
                                    <h3 class="text-2xl font-bold text-gray-800">Technologies & Tools</h3>
                                </div>
                                <div class="grid grid-cols-3 md:grid-cols-5 gap-6">
                                    <div v-for="(tech, index) in technologies" :key="index"
                                        class="group relative bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div class="flex flex-col items-center gap-3">
                                            <Icon :icon="tech.icon"
                                                class="text-4xl transition-all duration-300 group-hover:scale-110" />
                                            <span
                                                class="text-sm font-medium text-gray-600 text-center group-hover:text-gray-900">
                                                {{ tech.name }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Skills -->
                            <div class="space-y-8">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="h-1 w-10 bg-orange-500 rounded"></div>
                                    <h3 class="text-2xl font-bold text-gray-800">Professional Skills</h3>
                                </div>
                                <div class="flex flex-wrap gap-4">
                                    <div v-for="(skill, index) in skills" :key="index" class="group relative">
                                        <div class="px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-lg 
                          transition-all duration-300 transform hover:-translate-y-1
                          flex items-center gap-3">
                                            <Icon :icon="skill.icon"
                                                class="text-xl text-gray-600 group-hover:text-blue-600" />
                                            <span class="text-gray-700 font-medium group-hover:text-gray-900">{{
                                                skill.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
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

const frameworks = [
    { name: 'CodeIgniter', icon: 'logos:codeigniter-icon' },
    { name: 'Laravel', icon: 'skill-icons:laravel-light' },
    { name: 'Vue.js', icon: 'devicon:vuejs' },
    { name: 'React', icon: 'vscode-icons:file-type-reactjs' }
];

const technologies = [
    { name: 'Kubernetes', icon: 'logos:kubernetes' },
    { name: 'Docker', icon: 'skill-icons:docker' },
    { name: 'MySQL', icon: 'devicon:mysql' },
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