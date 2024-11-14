<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <!-- Header Section with Gradient Background -->
            <div class="p-8 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h1 class="font-sans text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center text-white">
                    Get In Touch
                </h1>
                <p class="text-blue-100 text-center leading-relaxed">
                    I am open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free
                    to reach out!
                </p>
            </div>

            <!-- Contact Details with Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-gray-50">
                <!-- Phone Number Card -->
                <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="text-gray-700 font-medium">+357 99 142840</span>
                </div>

                <!-- Email Card -->
                <div class="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:tzamil1991@gmail.com" 
                       class="text-gray-700 font-medium hover:text-blue-600 transition-colors">
                        tzamil1991@gmail.com
                    </a>
                </div>
            </div>

            <!-- Message Form Section -->
            <div class="p-8">
                <h2 class="font-sans text-2xl font-bold mb-6 text-center text-gray-800">
                    Leave A Message
                </h2>
                <p v-if="successMessage" class="text-sm text-center text-green-500"> {{ successMessage }}</p>
                <p v-if="errorMessage" class="text-sm text-center text-red-500"> {{ errorMessage }}</p>
                <form class="max-w-md mx-auto space-y-6">
                    <!-- Name Input -->
                    <div class="space-y-2">
                        <label for="senderName" class="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            v-model="senderName"
                            id="senderName"
                            type="text"
                            placeholder="Your Name"
                            class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:bg-white"
                            required
                        />
                    </div>

                    <!-- Message Textarea -->
                    <div class="space-y-2">
                        <label for="message" class="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            v-model="message"
                            id="message"
                            placeholder="Your Message"
                            rows="6"
                            maxlength="300"
                            class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:bg-white resize-none"
                            required
                        ></textarea>
                        <div class="flex justify-end">
                            <span class="text-sm text-gray-500">
                                {{ message.length }}/300 characters
                            </span>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button
                        @click.prevent="sendMessage"
                        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const senderName = ref('');
const message = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const sendMessage = async () => {
    const newMessage = {
        name: senderName.value,
        message: message.value,
        datetime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    try {
        const response = await fetch('http://localhost:3000/api/messages',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });
        if (response.ok) {
            senderName.value = ''
            message.value = ''
            successMessage.value = 'Thanks You! I will respond to your message as soon as possible.'
        } else {
            errorMessage.value = 'Oops! Something went wrong, please try again.'
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>
