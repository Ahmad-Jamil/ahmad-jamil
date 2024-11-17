<template>
  <div class="max-w-3xl mx-auto p-8 bg-[#f7f5eb] rounded-lg shadow-lg font-sans text-gray-800">
      <!-- Profile Picture and Header -->
      <div class="flex flex-col items-center mb-10">
          <img :src="profileImage" alt="Profile Picture" class="w-32 h-32 rounded-full object-cover shadow-md mb-4" />
          <h1 class="text-3xl font-bold tracking-wider mb-1">AHMAD JAMIL</h1>
          <h2 class="text-lg font-semibold text-gray-600 tracking-wide mb-4">Software Engineer</h2>
          <p class="text-center text-gray-600 text-sm leading-relaxed max-w-lg">
              I am a dedicated Software Engineer with over 3 years of experience, specializing in Python, gRPC, REST
              APIs,
              Docker, Kubernetes, MySQL, and Google Cloud Platform (GCP). I have a proven track record of implementing
              and
              scaling distributed microservices using modern tools and technologies.

              I am skilled in working collaboratively with cross-functional and globally distributed engineering teams
              to
              deliver high-impact projects. With a strong understanding of team dynamics, I have successfully led
              small
              developer teams, focusing on code quality, system design, and effective planning.

              I am well-versed in Agile methodologies, actively participating in Scrum ceremonies, including backlog
              grooming, sprint reviews, demos, and retrospectives. My experience extends to debugging and
              problem-solving,
              where I am committed to finding efficient, robust solutions to complex challenges.
          </p>
      </div>

      <!-- Profile Section Heading -->
      <h3 class="text-4xl font-bold text-center mb-10 tracking-widest">MY PROFILE</h3>

      <!-- Content Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Education Section -->
          <div>
              <h4 class="text-lg font-semibold mb-4 tracking-wide">EDUCATION</h4>
              <ul class="space-y-3">
                  <li>
                      <span class="font-bold">Borcelle Institute</span> <br />
                      <span class="text-gray-600">Master of Graphic Design</span>
                  </li>
                  <li>
                      <span class="font-bold">Fauget University</span> <br />
                      <span class="text-gray-600">Bachelor of Graphic Design</span>
                  </li>
              </ul>
          </div>

          <!-- Work Experience Section -->
          <div>
              <h4 class="text-lg font-semibold mb-4 tracking-wide">WORK EXPERIENCE</h4>
              <div class="space-y-5">
                  <div>
                      <h5 class="font-semibold">Creative Designer</h5>
                      <p class="text-sm text-gray-600">
                          Wardiere Inc. / Oct 2016 - Present <br />
                          Incorporated integrated sustainable design solutions into projects, preparing 2D and 3D
                          design drawings.
                      </p>
                  </div>
                  <div>
                      <h5 class="font-semibold">Senior Designer</h5>
                      <p class="text-sm text-gray-600">
                          Borcelle / July 2015 - Oct 2016 <br />
                          Incorporated integrated sustainable design solutions into projects, preparing 2D and 3D
                          design drawings.
                      </p>
                  </div>
              </div>
          </div>

          <!-- Skills Section -->
          <div>
              <h4 class="text-lg font-semibold mb-4 tracking-wide">SKILLS</h4>
              <ul class="flex flex-wrap gap-3">
                  <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm">Creativity</li>
                  <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm">Leader</li>
                  <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm">Management</li>
                  <li class="bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm">Teamwork</li>
              </ul>
          </div>

      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const profileImage = computed(() => require('@/assets/images/personal/ahmad.jpeg'));
const downloadPDF = async () => {
    const resumeDiv = resumeContent.value;

    if (!resumeDiv) {
        console.error('Resume contents not found.');
        return;
    }

    try {
        // Capture the div as a canvas
        const canvas = await html2canvas(resumeDiv);
        const imgData = canvas.toDataURL('image/png');

        // Create a new PDF document
        const pdf = new jsPDF();
        const imgWidth = 190; // Adjust width as needed
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Add image to PDF and handle page breaks
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('resume.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

</script>

<style>
/* Custom beige background to match the example */
.bg-[#f7f5eb] {
  background-color: #f7f5eb;
}
</style>