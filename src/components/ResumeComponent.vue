<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
      <div class="max-w-6xl mx-auto space-y-16">
        <!-- Header Section -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl md:text-6xl font-black">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Resume of Ahmad Jamil
            </span>
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            A comprehensive view of my skills, experience, and achievements.
          </p>
        </div>
  
        <!-- Resume Content -->
        <div class="relative group">
          <!-- Decorative Gradient Background -->
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
  
          <!-- Card Content -->
          <div class="relative bg-gray-900 rounded-2xl backdrop-blur-xl border border-white/10 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Sidebar -->
            <div class="col-span-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-xl p-6 text-white space-y-6">
              <div class="text-center">
                <h2 class="text-3xl font-bold">Ahmad Jamil</h2>
                <p class="text-blue-200">Software Engineer</p>
              </div>
              <div>
                <h3 class="font-semibold text-lg border-b border-white/25 pb-2">Contact</h3>
                <p class="mt-2">{{ resume.phonePrefix }} {{ resume.mobileNumber }}</p>
                <p>{{ resume.email }}</p>
                <p>{{ resume.city }}, {{ resume.country }}</p>
              </div>
              <div>
                <h3 class="font-semibold text-lg border-b border-white/25 pb-2">Languages</h3>
                <div class="space-y-2 mt-2">
                  <div v-for="(lang, index) in resume.languages" :key="index" class="flex justify-between">
                    <span>{{ lang.name }}</span>
                    <span class="text-blue-200">{{ lang.level }}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-lg border-b border-white/25 pb-2">Skills</h3>
                <div class="mt-2 space-y-4">
                  <div v-for="(category, index) in skills" :key="index">
                    <p class="font-medium">{{ getCategoryName(category) }}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                      <span
                        v-for="(skill, skillIndex) in getCategoryItems(category)"
                        :key="skillIndex"
                        class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Main Content -->
            <div class="col-span-2 space-y-12">
              <!-- Professional Summary -->
              <section>
                <h2 class="text-2xl font-bold text-white border-b-4 border-blue-600 pb-2 mb-4">
                  Professional Summary
                </h2>
                <p class="text-gray-300">{{ resume.aboutMe }}</p>
              </section>
  
              <!-- Work Experience -->
              <section>
                <h2 class="text-2xl font-bold text-white border-b-4 border-blue-600 pb-2 mb-4">
                  Work Experience
                </h2>
                <div class="space-y-6">
                  <div
                    v-for="(exp, index) in resume.experiences"
                    :key="index"
                    class="bg-white/5 p-6 rounded-xl border border-white/10"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-xl font-semibold text-white">{{ exp.jobTitle }}</h3>
                      <span class="text-gray-400 text-sm">{{ exp.startDate }} - {{ exp.endDate }}</span>
                    </div>
                    <p class="text-gray-300 mb-2">{{ exp.companyName }}</p>
                    <p class="text-gray-300">{{ exp.summary }}</p>
                  </div>
                </div>
              </section>
  
              <!-- Education -->
              <section>
                <h2 class="text-2xl font-bold text-white border-b-4 border-blue-600 pb-2 mb-4">
                  Education
                </h2>
                <div class="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 class="text-xl font-semibold text-white">{{ resume.education[0].degree }}</h3>
                  <p class="text-gray-300">{{ resume.education[0].university }}</p>
                  <p class="text-gray-400 text-sm">{{ resume.education[0].date }}</p>
                </div>
              </section>
  
              <!-- PDF Download -->
              <div class="text-center mt-6">
                <button
                  @click="downloadPDF"
                  class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition duration-300"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import resume from '@/data/resume';
import createResumePDF from '../js/resumePDFGenerator';

const skills = resume.skills
const getCategoryName = (category) => {
    const rawName = Object.keys(category)[0];
    return rawName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
const getCategoryItems = (category) => Object.values(category)[0]
const downloadPDF = async () => {
    createResumePDF(resume);
}
</script>