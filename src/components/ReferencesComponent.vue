<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-16 space-y-4">
          <h1 class="text-4xl md:text-6xl font-black">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Professional References
            </span>
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Testimonials from industry professionals who have witnessed my work ethic, skills, and dedication firsthand.
          </p>
        </div>
  
        <!-- Testimonials Section -->
        <div class="space-y-12">
          <div v-for="(reference, index) in references" :key="index" 
               class="relative group">
            <!-- Decorative Elements -->
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            <!-- Card Content -->
            <div class="relative p-8 bg-gray-900 rounded-xl backdrop-blur-xl border border-white/10">
              <!-- Company Info -->
              <div class="flex items-center justify-between mb-8">
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-white">{{ reference.company }}</h2>
                  <div class="flex items-center space-x-2 text-gray-400">
                    <Icon icon="mdi:account-tie" class="w-5 h-5" />
                    <span>{{ reference.Manager }}</span>
                  </div>
                </div>
                <div class="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Icon icon="mdi:format-quote-close" class="w-8 h-8 text-blue-400" />
                </div>
              </div>
  
              <!-- Reference Text -->
              <div class="space-y-6">
                <!-- Skills Highlights -->
                <div class="flex flex-wrap gap-2">
                  <div v-for="skill in extractSkills(reference)" :key="skill"
                       class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                    {{ skill }}
                  </div>
                </div>
  
                <!-- Main Text -->
                <div class="relative">
                  <div class="absolute -left-4 top-0 text-6xl text-blue-500/20">"</div>
                  <p class="text-gray-300 leading-relaxed text-lg pl-6">
                    {{ formatReference(reference.reference) }}
                  </p>
                </div>
  
                <!-- Key Points -->
                <div class="grid md:grid-cols-2 gap-4 mt-8">
                  <div v-for="point in extractKeyPoints(reference)" :key="point"
                       class="flex items-start space-x-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                    <Icon icon="mdi:check-circle" class="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <p class="text-gray-300">{{ point }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue';
  import references from '@/data/references.json';
 
  // Helper function to extract skills from reference text
  const extractSkills = (reference) => {
    const skills = reference.skills;
    return skills.filter(skill => reference.reference.toLowerCase().includes(skill.toLowerCase()));
  };
  
  // Helper function to extract key points from reference
  const extractKeyPoints = (reference) => {
    return reference.keyPoints;
  };
  
  // Helper function to format reference text
  const formatReference = (text) => {
    return text.replace(/\. /g, '.\n\n');
  };
  </script>