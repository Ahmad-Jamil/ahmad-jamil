<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div class="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <!-- Profile Section -->
            <div class="grid md:grid-cols-12 gap-12 mb-16">
                <!-- Profile Picture and Header -->
                <div class="md:col-span-5 space-y-6">
                    <div class="relative group">
                        <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
                        <img :src="profileImage" alt="Profile Picture" 
                             class="relative w-full h-80 object-cover rounded-[36px] shadow-lg" />
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                        AHMAD JAMIL
                        <!-- AHMAD <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">JAMIL</span> -->
                    </h1>
                </div>

                <!-- About Me Section -->
                <div class="md:col-span-7 space-y-8">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-800 tracking-tight">About Me</h2>
                        <p class="text-gray-600 leading-relaxed">
                            I'm a dedicated Software Engineer with 3+ years of experience in building and scaling distributed microservices using 
                            a diverse set of programming languages and technologies. I excel in collaborating with cross-functional 
                            teams to deliver impactful projects, and have led small developer teams with a focus on code quality, system design, 
                            and effective planning.
                        </p>
                    </div>

                    <!-- Quick Info Cards -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-gray-50 rounded-xl">
                            <p class="text-sm text-gray-500">Experience</p>
                            <p class="text-lg font-semibold text-gray-800">4 Years</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded-xl" hidden>
                            <p class="text-sm text-gray-500">Projects</p>
                            <p class="text-lg font-semibold text-gray-800">20+ Completed</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="space-y-16">
                <!-- Education & Experience Grid -->
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Education Section -->
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Education</h3>
                        <div class="p-6 bg-gray-50 rounded-xl space-y-3 hover:shadow-md transition duration-300">
                            <h4 class="font-bold text-lg text-gray-800">Frederick University Of Nicosia</h4>
                            <p class="text-gray-600 text-sm">2015 - 2019</p>
                            <p class="text-gray-600">Bachelor Of Computer Science</p>
                        </div>
                    </div>

                    <!-- Work Experience Section -->
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Work Experience</h3>
                        <div class="space-y-4">
                            <div class="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                                <h4 class="font-bold text-lg text-gray-800">Intermediate Software Engineer</h4>
                                <p class="text-blue-600 text-sm mb-2">Achievers / Feb 2022 - Present</p>
                                <p class="text-gray-600 text-sm">Design, develop, and maintain Python micro-services, integrating with PHP applications.</p>
                            </div>
                            <div class="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                                <h4 class="font-bold text-lg text-gray-800">Junior Software Engineer</h4>
                                <p class="text-blue-600 text-sm mb-2">Achievers / Dec 2020 - Feb 2022</p>
                                <p class="text-gray-600 text-sm">Assist in integrating Python micro-services with PHP applications.</p>
                            </div>
                            <div class="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                                <h4 class="font-bold text-lg text-gray-800">Web Developer</h4>
                                <p class="text-blue-600 text-sm mb-2">Ekkotek / Jul 2019 - Aug 2020</p>
                                <p class="text-gray-600 text-sm">Developing and maintaining the website's frontend, identifying and fixing bugs, optimizing UI, and implementing chart interfaces to enhance user experience</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Skills Sections -->
                <div class="space-y-12">
                    <!-- Programming Languages -->
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Programming Languages</h3>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="icon in ['skill-icons:php-light', 'vscode-icons:file-type-python', 'skill-icons:golang', 'skill-icons:javascript']" 
                                 :key="icon"
                                 class="p-4 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                                <Icon :icon="icon" class="text-3xl" />
                            </div>
                        </div>
                    </div>

                    <!-- Frameworks -->
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Frameworks</h3>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="icon in ['logos:codeigniter-icon', 'skill-icons:laravel-light', 'devicon:vuejs', 'vscode-icons:file-type-reactjs']" 
                                 :key="icon"
                                 class="p-4 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                                <Icon :icon="icon" class="text-3xl" />
                            </div>
                        </div>
                    </div>

                    <!-- Technologies -->
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Technologies</h3>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="icon in [
                                'logos:kubernetes', 
                                'skill-icons:docker', 
                                'devicon:mysql',
                                'simple-icons:googlebigquery',
                                'skill-icons:git',
                                'formkit:github',
                                'bi:kanban',
                                'file-icons:tilt',
                                'skill-icons:gcp-light'
                            ]" 
                                 :key="icon"
                                 class="p-4 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                                <Icon :icon="icon" class="text-3xl" />
                            </div>
                        </div>
                    </div>

                    <!-- Skills -->
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-gray-800 tracking-tight">Skills</h3>
                        <div class="flex flex-wrap gap-3">
                            <span v-for="skill in [
                                'API Development',
                                'Backend Web Development',
                                'Software Development',
                                'Problem Solving',
                                'Team Work & Motivation'
                            ]" 
                                  :key="skill"
                                  class="px-4 py-2 bg-gray-50 rounded-full text-gray-700 text-sm hover:shadow-md transition duration-300">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const profileImage = computed(() => require('@/assets/images/personal/ahmad.jpeg'));
</script>