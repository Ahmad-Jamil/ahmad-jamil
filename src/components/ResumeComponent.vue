<template>
    <div ref="resumeContent" class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div class="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-3 gap-6 p-8">
            <!-- Sidebar -->
            <div class="col-span-1 bg-blue-600 text-white p-6 space-y-6">
                <div class="text-center">
                    <h1 class="text-2xl font-bold">Ahmad Jamil
                    </h1>
                    <p class="text-blue-100">Software Engineer</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <h3 class="font-semibold text-lg border-b pb-2">Contact</h3>
                        <p class="mt-2">{{ resume.phonePrefix }} {{ resume.mobileNumber }}</p>
                        <p>{{ resume.email }}</p>
                        <p>{{ resume.city }}, {{ resume.country }}</p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-lg border-b pb-2">Languages</h3>
                        <div class="space-y-2 mt-2">
                            <div v-for="(lang, index) in resume.languages" :key="index" class="flex justify-between">
                                <span>{{ lang.name }}</span>
                                <span class="text-blue-200">{{ lang.level }}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="font-semibold text-lg border-b pb-2">Skills</h3>
                        <div class="mt-2 space-y-4">
                            <div v-for="(category, index) in skills" :key="index">
                                <p class="font-medium">{{ getCategoryName(category) }}</p>
                                <div class="flex flex-wrap gap-2 mt-1">
                                    <span v-for="(skill, skillIndex) in getCategoryItems(category)" :key="skillIndex"
                                        class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                                        {{ skill }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-span-2 p-6 space-y-6">
                <section>
                    <h2 class="text-2xl font-bold text-gray-800 border-b-4 border-blue-600 pb-2 mb-4">
                        Professional Summary
                    </h2>
                    <p class="text-gray-600">{{ resume.aboutMe }}</p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-gray-800 border-b-4 border-blue-600 pb-2 mb-4">
                        Work Experience
                    </h2>
                    <div class="space-y-6">
                        <div v-for="(exp, index) in resume.experiences" :key="index" class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="text-xl font-semibold">{{ exp.jobTitle }}</h3>
                                <span class="text-gray-500 text-sm">{{ exp.startDate }} - {{ exp.endDate }}</span>
                            </div>
                            <p class="text-gray-600 mb-2">{{ exp.companyName }}</p>
                            <p class="text-gray-700">{{ exp.summary }}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-gray-800 border-b-4 border-blue-600 pb-2 mb-4">
                        Education
                    </h2>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="text-xl font-semibold">{{ resume.education[0].degree }}</h3>
                        <p class="text-gray-600">{{ resume.education[0].university }}</p>
                        <p class="text-gray-500 text-sm">{{ resume.education[0].date }}</p>
                    </div>
                </section>

                <!-- PDF Download Button -->
                <div class="text-center mt-6">
                    <button @click="downloadPDF"
                        class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import resume from '@/data/resume';
import { ref } from 'vue';
//import jsPDF from 'jspdf';
import createResumePDF from '../js/resumePDFGenerator';

const resumeContent = ref(null);
const skills = resume.skills
const getCategoryName = (category) => {
    const rawName = Object.keys(category)[0];
    return rawName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
const getCategoryItems = (category) => Object.values(category)[0]

// const downloadPDF = () => {
//     const doc = new jsPDF();
//     const content = resumeContent.value.innerText;
//     const lines = doc.splitTextToSize(content, 180);
//     let cursorY = 10;
//     for (let i = 0; i < lines.length; i++) {
//         if (cursorY > 280) {
//             doc.addPage();
//             cursorY = 10;
//         }
//         doc.text(lines[i], 10, cursorY);
//         cursorY += 10;
//     }
//     doc.save('resume.pdf');
// }
const downloadPDF = async () => {
    createResumePDF(resume);
}
</script>