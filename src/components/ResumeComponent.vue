<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto space-y-24">

      <!-- Header -->
      <section class="text-center space-y-6">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
          Resume of Ahmad Jamil
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive view of my skills, experience, and achievements.
        </p>
      </section>

      <!-- Contact & Languages -->
      <section class="grid md:grid-cols-2 gap-10">
        <!-- Contact -->
        <div class="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p class="text-gray-600">{{ resume.phonePrefix }} {{ resume.mobileNumber }}</p>
          <p class="text-gray-600">{{ resume.email }}</p>
          <p class="text-gray-600">{{ resume.city }}, {{ resume.country }}</p>
        </div>

        <!-- Languages -->
        <div class="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
          <div class="space-y-2">
            <div v-for="(lang, i) in resume.languages" :key="i" class="flex justify-between text-gray-600">
              <span>{{ lang.name }}</span>
              <span class="text-gray-500">{{ lang.level }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Professional Summary -->
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Professional Summary</h2>
        <div class="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300 text-gray-600 whitespace-pre-line">
          {{ resume.aboutMe }}
        </div>
      </section>

      <!-- Work Experience -->
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
        <div class="space-y-6">
          <div v-for="(exp, i) in resume.experiences" :key="i"
               class="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ exp.jobTitle }}</h3>
                <p class="text-gray-500 text-sm">{{ exp.companyName }}</p>
                <p class="text-gray-400 text-xs">{{ exp.startDate }} — {{ exp.endDate }}</p>
              </div>
              <div class="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Icon icon="mdi:briefcase" class="w-5 h-5 text-gray-600"/>
              </div>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed">{{ exp.summary }}</p>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Education</h2>
        <div v-for="(edu, i) in resume.education" :key="i"
             class="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300 text-gray-600">
          <h3 class="text-lg font-semibold text-gray-900">{{ edu.degree }}</h3>
          <p class="text-gray-500">{{ edu.university }}</p>
          <p class="text-gray-400 text-sm">{{ edu.date }}</p>
        </div>
      </section>

      <!-- Skills -->
      <section>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
        <div class="grid md:grid-cols-2 gap-10">
          <div v-for="(category, index) in skills" :key="index" class="space-y-4">
            <p class="text-gray-900 font-semibold">{{ getCategoryName(category) }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="(skill, skillIndex) in getCategoryItems(category)" :key="skillIndex"
                    class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- PDF Download -->
      <div class="text-center mt-12">
        <button @click="downloadPDF"
                class="px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:opacity-90 transition">
          Download PDF
        </button>
      </div>

    </div>
  </main>
</template>

<script setup>
import resume from '@/data/resume';
import createResumePDF from '../js/resumePDFGenerator';
import { Icon } from '@iconify/vue';

const skills = resume.skills
const getCategoryName = (category) => Object.keys(category)[0].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const getCategoryItems = (category) => Object.values(category)[0]

const downloadPDF = () => createResumePDF(resume);
</script>