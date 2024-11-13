<template>
    <div class="w-3/5 m-5 p-8 bg-[#f7f5eb] rounded-lg shadow-lg font-serif text-gray-800">
        <h1 class="font-serif text-5xl font-bold tracking-wider mb-10 text-center">Get In Touch</h1>
        <p class="text-gray-600 mb-8 text-center">
            I am open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free
            to reach out!
        </p>

        <!-- Contact Details -->
        <div class="space-y-4 mb-5">
            <!-- Phone Number -->
            <div class="flex items-center justify-center space-x-4">
                <span class="text-lg font-medium text-gray-800">+357 99 142840</span>
            </div>

            <!-- Email Address -->
            <div class="flex items-center justify-center space-x-4">
                <a href="mailto:youremail@example.com"
                    class="text-lg font-medium text-gray-800 hover:text-blue-600">tzamil1991@gmail.com</a>
            </div>
        </div>

        <div>
            <h2 class="font-serif text-2xl font-bold tracking-wider mb-4 text-center">Or Leave A Message</h2>
            <div class="w-full md:w-1/2 mx-auto flex flex-col space-y-4">
                <!-- Name Input -->
                <label for="senderName" class="text-gray-700 font-medium">Name</label>
                <input v-model="senderName" id="senderName" name="senderName" type="text" placeholder="Your Name"
                    class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required />

                <!-- Message Textarea -->
                <label for="message" class="text-gray-700 font-medium">Message</label>
                <textarea v-model="message" id="message" name="message" placeholder="Your Message" maxlength="300"
                    rows="6"
                    class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required></textarea>
                <p class="text-sm text-gray-500 text-right">Max 300 characters</p>
                <div>
                    <button @click="sendMessage" class="bg-blue-500 text-white font-serif text-xl w-20 rounded-md">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const senderName = ref('');
const message = ref('');
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
            console.log('Message saved successfully!');
        } else {
            console.log('Error saving message.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>
