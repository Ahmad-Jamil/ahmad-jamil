<template>
    <div class="w-3/5 m-5 p-8 bg-[#f7f5eb] rounded-lg shadow-lg font-serif text-gray-800">
        <!-- Profile Picture and Header -->
        <div class="items-center mb-10 grid grid-cols-4">
            <div class="col-span-2 p-2 m-2 flex justify-center">
                <img :src="profileImage" alt="Profile Picture" class="object-cover shadow-md mb-4 rounded-full"
                    style="border-radius: 0 30% 0 30%;" />
            </div>
            <div class="col-span-2 flex flex-col justify-start items-start">
                <h1 class="font-serif text-5xl font-bold tracking-wider mb-10">AHMAD JAMIL</h1>
                <h2 class="font-serif text-2xl font-bold tracking-wider mb-2">ABOUT ME</h2>
                <p class="text-start text-gray-600 text-xs leading-relaxed max-w-lg">
                    I'm a dedicated Software Engineer with 3+ years of experience in building and scaling distributed microservices using 
                    a diverse set of programming languages and technologies. I excel in collaborating with cross-functional 
                    teams to deliver impactful projects, and have led small developer teams with a focus on code quality, system design, 
                    and effective planning. Skilled in Agile methodologies, I actively contribute to Scrum processes and am committed 
                    to delivering robust, efficient solutions to complex challenges.
                </p>
            </div>

        </div>

        <!-- Profile Section Heading -->
        <h3 class="font-serif text-6xl font-bold text-center mb-10 tracking-widest">MY PROFILE</h3>

        <!-- Content Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Education Section -->
            <div>
                <h4 class="font-serif text-xl mb-4 tracking-wide font-bold">EDUCATION</h4>
                <ul class="space-y-3">
                    <li>
                        <span class="font-serif font-bold">Frederick University Of Nicosia</span> <br />
                        <span class="text-gray-600">2015 - 2019</span> <br />
                        <span class="text-gray-600">Bachelor Of Computer Science</span>
                    </li>
                </ul>
            </div>

            <!-- Work Experience Section -->
            <div>
                <h4 class="text-xl font-bold font-serif mb-4 tracking-wide">WORK EXPERIENCE</h4>
                <div class="space-y-5">
                    <div>
                        <h5 class="font-semibold">Intermidiate Software Engineer</h5>
                        <p class="text-sm text-gray-600">
                            Achievers. / Feb 2022 - Present <br />
                            Design, develop, and maintain Python micro-services, integrating seamlessly with PHP
                            applications.
                            Collaborate on new project planning and feature implementation, solve production issues, and
                            ensure
                            reliability through rigorous unit and functional testing.
                        </p>
                    </div>
                    <div>
                        <h5 class="font-semibold">Junior Software Engineer</h5>
                        <p class="text-sm text-gray-600">
                            Achievers / Dec 2020 - Feb 2022 <br />
                            Assist in integrating Python micro-services with PHP applications and developing tools for
                            library monitoring
                            and micro-service communication. Enhance existing tools and ensure application quality
                            through unit and functional testing.
                        </p>
                    </div>
                    <div>
                        <h5 class="font-semibold">Web Developer</h5>
                        <p class="text-sm text-gray-600">
                            Ekkotek / Jul 2019 - Aug 2020 <br />
                            Responsible for developing and maintaining the website's front end (HTML, CSS, JavaScript),
                            identifying and fixing bugs,
                            optimizing UI, and implementing chart interfaces to enhance user experience.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Programming Languages -->
            <div>
                <h4 class="text-xl font-serif font-bold mb-4 tracking-wide">Programming Language</h4>
                <ul class="flex flex-wrap gap-3">
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="logos:php" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="vscode-icons:file-type-python" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="devicon:vuejs" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="vscode-icons:file-type-reactjs" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="skill-icons:golang" />
                    </li>
                </ul>
            </div>

            <!-- Technologies -->
            <div>
                <h4 class="text-xl font-serif font-bold mb-4 tracking-wide">Technologies</h4>
                <ul class="flex flex-wrap gap-3">
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="logos:kubernetes" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="skill-icons:docker" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="skill-icons:mysql-dark" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="simple-icons:googlebigquery" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="skill-icons:git" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="formkit:github" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="bi:kanban" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="file-icons:tilt" />
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-2xl">
                        <Icon icon="skill-icons:gcp-light" />
                    </li>
                </ul>
            </div>

            <!-- Skills Section -->
            <div>
                <h4 class="text-xl font-serif font-bold mb-4 tracking-wide">SKILLS</h4>
                <ul class="flex flex-wrap gap-3">
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-lg">
                        API Development
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-lg">
                        Backend Web Development
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-lg">
                        Software Development
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-lg">
                        Problem Solving
                    </li>
                    <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-lg">
                        Team Work & Motivation
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
const profileImage = computed(() => require('@/assets/images/personal/ahmad.jpeg'));
</script>

<style>
/* Custom beige background to match the example */
.bg-[#f7f5eb] {
    background-color: #f7f5eb;
}
</style>