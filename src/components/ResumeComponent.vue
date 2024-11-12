<template>
    <div class="max-w-4xl mx-auto p-8 bg-white">
        <header class=" flex justify-between mb-8">
            <div class="w-3/4">
                <h1 class="text-3xl font-bold text-gray-800">Ahmad Jamil</h1>
                <h2 class="text-xl text-gray-600 mb-4">Software Engineer</h2>
            </div>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 w-1/4 items-end justify-end">
                <div class="flex justify-start gap-1 w-full">
                    <span class="font-bold">Phone:</span> {{ resume.phonePrefix }} - {{ resume.mobileNumber }}
                </div>
                <div class="flex justify-start gap-1 w-full">
                    <span class="font-bold">Email:</span>{{ resume.email }}
                </div>
                <div class="flex justify-start gap-1 w-full">
                    <span class="font-bold">Location:</span>{{ resume.country }} - {{ resume.city }}
                </div>
            </div>
        </header>

        <section class="mb-8">
            <h2 class="text-lg font-bold uppercase text-gray-800 mb-4 border-b pb-2">Profile</h2>
            <p>{{ resume.aboutMe }}</p>
        </section>

        <section class="mb-8">
            <h2 class="text-lg font-bold uppercase text-gray-800 mb-4 border-b pb-2">Experience</h2>
            <div v-for="(experience, index) in resume.experiences" :key="index" class="mb-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-gray-800">{{ experience.jobTitle }} at {{ experience.companyName }}
                    </h3>
                    <span class="text-sm text-gray-600">{{ experience.startDate }} - {{ experience.endDate }}</span>
                </div>
                <p>{{ experience.summary }}</p>
            </div>
        </section>

        <section v-if="resume.education" class="mb-8">
            <h2 class="text-lg font-bold uppercase text-gray-800 mb-4 border-b pb-2">Education</h2>
            <div v-for="(edu, index) in resume.education" :key="index" class="mb-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-gray-800">{{ edu.university }}</h3>
                        <p class="text-sm text-gray-700">{{ edu.degree }}</p>
                    </div>
                    <span class="text-sm text-gray-600">{{ edu.date }}</span>
                </div>
            </div>
        </section>

        <section v-if="resume.certificates.length" class="mb-8">
            <h2 class="text-lg font-bold uppercase text-gray-800 mb-4 border-b pb-2">Certificates</h2>
            <div v-for="(cert, index) in certificates" :key="index" class="mb-2">
                <div class="flex justify-between items-center">
                    <span class="text-gray-700">{{ cert.name }}</span>
                    <span class="text-sm text-gray-600">{{ cert.year }}</span>
                </div>
            </div>
        </section>

        <section class="mb-8">
            <h2 class="text-lg font-bold uppercase text-gray-800 mb-4 border-b pb-2">Skills</h2>
            <div class="grid grid-cols-2 gap-4">
                <div v-for="(category, index) in skills" :key="index" class="mb-4">
                    <h3 class="text-xl font-semibold mb-2">
                        {{ getCategoryName(category) }}
                    </h3>
                    <ul class="list-disc list-inside ml-4">
                        <li v-for="item in getCategoryItems(category)" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section>
            <h2 class="text-lg font-bold uppercase text-gray-800 mb-4 border-b pb-2">Languages</h2>
            <div class="grid grid-cols-2 gap-4">
                <div v-for="(language, index) in resume.languages" :key="index"
                    class="flex justify-between items-center w-1/2">
                    <span class="text-gray-700">{{ language.name }}</span>
                    <span class="text-sm text-gray-600">{{ language.level }}</span>
                </div>
            </div>
        </section>

        <div class="text-center mt-8">
            <button @click="downloadPDF" class="px-4 py-2 border border-gray-300">
                Download PDF
            </button>
        </div>
    </div>
</template>

<script setup>
import resume from '@/data/resume';

const skills = resume.skills
const getCategoryName = (category) => Object.keys(category)[0]
const getCategoryItems = (category) => Object.values(category)[0]
</script>