<template>
    <div ref="resumeContent" class="max-w-4xl mx-auto p-8 bg-white leading-relaxed">
        <!-- Header Section -->
        <header class="mb-10 border-b border-gray-200 pb-6">
            <div class="text-center md:text-left">
                <h1 class="text-4xl font-bold text-gray-800 mb-2">Ahmad Jamil</h1>
                <h2 class="text-2xl text-gray-600 mb-4">Software Engineer</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-3 text-sm">
                <div class="flex items-center gap-2">
                    <span><strong>Phone</strong>: {{ resume.phonePrefix }} - {{ resume.mobileNumber
                        }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span><strong>Email</strong>: {{ resume.email }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span><strong>Location</strong>: {{ resume.country }} - {{ resume.city }}</span>
                </div>
            </div>
        </header>

        <!-- Professional Summary -->
        <section class="mb-8" aria-label="Professional Summary">
            <p class="text-gray-700 leading-relaxed">{{ resume.aboutMe }}</p>
        </section>

        <!-- Experience Section -->
        <section class="mb-8" aria-label="Work Experience">
            <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Professional Experience
            </h2>
            <div v-for="(experience, index) in resume.experiences" :key="index" class="mb-6 last:mb-0">
                <div class="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ experience.jobTitle }}</h3>
                        <div class="text-gray-600">{{ experience.companyName }}</div>
                    </div>
                    <div class="text-sm text-gray-600 mt-1 md:mt-0">
                        {{ experience.startDate }} - {{ experience.endDate }}
                    </div>
                </div>
                <p class="text-gray-700 mt-2">{{ experience.summary }}</p>
            </div>
        </section>

        <!-- Education Section -->
        <section v-if="resume.education" class="mb-8" aria-label="Education">
            <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Education
            </h2>
            <div v-for="(edu, index) in resume.education" :key="index" class="mb-4 last:mb-0">
                <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ edu.university }}</h3>
                        <div class="text-gray-600">{{ edu.degree }}</div>
                    </div>
                    <div class="text-sm text-gray-600 mt-1 md:mt-0">{{ edu.date }}</div>
                </div>
            </div>
        </section>

        <!-- Certificates Section -->
        <section v-if="resume.certificates.length" class="mb-8" aria-label="Certifications">
            <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Certifications
            </h2>
            <div v-for="(cert, index) in certificates" :key="index" class="mb-2 last:mb-0">
                <div class="flex justify-between items-baseline">
                    <span class="text-gray-700">{{ cert.name }}</span>
                    <span class="text-sm text-gray-600">{{ cert.year }}</span>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section class="mb-8" aria-label="Technical Skills">
            <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Technical Skills
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div v-for="(category, index) in skills" :key="index" class="mb-4 last:mb-0">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        {{ getCategoryName(category) }}
                    </h3>
                    <ul class="list-disc list-inside space-y-1">
                        <li v-for="item in getCategoryItems(category)" :key="item" class="text-gray-700">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Languages Section -->
        <section aria-label="Languages">
            <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Languages
            </h2>
            <div class="grid md:grid-cols-2 gap-4">
                <div v-for="(language, index) in resume.languages" :key="index"
                    class="flex justify-between items-center">
                    <span class="font-medium text-gray-800">{{ language.name }}</span>
                    <span class="text-gray-600">{{ language.level }}</span>
                </div>
            </div>
        </section>
    </div>

    <!-- Download Button -->
    <div class="text-center my-8">
        <button @click="downloadPDF"
            class="px-6 py-2.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-200">
            Download PDF
        </button>
    </div>
</template>

<script setup>
import resume from '@/data/resume';
import { ref } from 'vue';
import jsPDF from 'jspdf';

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
    const doc = new jsPDF();
    const content = resumeContent.value.innerText;
    const lines = doc.splitTextToSize(content, 180);
    let cursorY = 10;
    for (let i = 0; i < lines.length; i++) {
        if (cursorY > 280) {
            doc.addPage();
            cursorY = 10;
        }
        doc.text(lines[i], 10, cursorY);
        cursorY += 10;
    }
    doc.save('resume.pdf');
}
</script>