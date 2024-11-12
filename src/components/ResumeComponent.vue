<template>
    <div ref="resumeContent" class="max-w-4xl mx-auto p-8 bg-white">
        <header class="mb-8">
            <div class="w-full">
                <h1 class="text-3xl font-bold">Ahmad Jamil</h1>
                <h2 class="text-xl mb-4">Software Engineer</h2>
            </div>
            <div class="gap-4 text-sm w-full items-start justify-start">
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
            <p>{{ resume.aboutMe }}</p>
        </section>

        <section class="mb-8">
            <h2 class="text-lg font-bold uppercase mb-4 border-b pb-2">Experience</h2>
            <div v-for="(experience, index) in resume.experiences" :key="index" class="mb-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold">{{ experience.jobTitle }} at {{ experience.companyName }}
                    </h3>
                    <span class="text-sm">{{ experience.startDate }} - {{ experience.endDate }}</span>
                </div>
                <p>{{ experience.summary }}</p>
            </div>
        </section>

        <section v-if="resume.education" class="mb-8">
            <h2 class="text-lg font-bold uppercase mb-4 border-b pb-2">Education</h2>
            <div v-for="(edu, index) in resume.education" :key="index" class="mb-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold">{{ edu.university }}</h3>
                        <p class="text-sm">{{ edu.degree }}</p>
                    </div>
                    <span class="text-sm">{{ edu.date }}</span>
                </div>
            </div>
        </section>

        <section v-if="resume.certificates.length" class="mb-8">
            <h2 class="text-lg font-bold uppercase mb-4 border-b pb-2">Certificates</h2>
            <div v-for="(cert, index) in certificates" :key="index" class="mb-2">
                <div class="flex justify-between items-center">
                    <span>{{ cert.name }}</span>
                    <span class="text-sm">{{ cert.year }}</span>
                </div>
            </div>
        </section>

        <section class="mb-8">
            <h2 class="text-lg font-bold uppercase mb-4 border-b pb-2">Skills</h2>
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
            <h2 class="text-lg font-bold uppercase mb-4 border-b pb-2">Languages</h2>
            <div class="grid grid-cols-1">
                <div v-for="(language, index) in resume.languages" :key="index"
                    class="grid grid-cols-2 items-center w-1/2">
                    <span class="font-bold gap-2">{{ language.name }}</span>
                    <span class="text-sm">{{ language.level }}</span>
                </div>
            </div>
        </section>
    </div>
    <div class="text-center mb-8">
        <button @click="downloadPDF" class="px-4 py-2 border border-gray-300">
            Download PDF
        </button>
    </div>
</template>

<script setup>
import resume from '@/data/resume';
import { ref } from 'vue';
import html2pdf from 'html2pdf.js';

const resumeContent = ref(null);
const skills = resume.skills
const getCategoryName = (category) => {
    const rawName = Object.keys(category)[0];
    return rawName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
const getCategoryItems = (category) => Object.values(category)[0]

const downloadPDF = () => {
    const element = resumeContent.value;
    const options = {
        margin: 0.5,
        filename: 'Ahmad_Jamil.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
};

</script>