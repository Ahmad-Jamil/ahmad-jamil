<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl w-full mx-auto space-y-24">
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-lg transition duration-300">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h3>
          <form @submit.prevent="authenticateUser" class="space-y-4">
            <div>
              <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
              <input id="username" v-model="credentials.username" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900" />
            </div>
            <div>
              <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
              <input id="password" v-model="credentials.password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900" />
            </div>
            <div class="flex justify-end">
              <button type="submit" class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">Login</button>
            </div>
          </form>
          <p v-if="authError" class="text-red-500 text-center mt-4">{{ authError }}</p>
        </div>
      </div>

      <div v-else class="space-y-12 w-full">
        <section class="text-center space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Admin Resume</h1>
          <p class="text-gray-600">Update the resume stored in MongoDB.</p>
        </section>

        <div class="flex items-center justify-between gap-4">
          <button @click="refresh" class="px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition">Refresh</button>
          <button @click="save" class="px-5 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">Save resume</button>
        </div>

        <p v-if="pageError" class="text-red-600 text-sm">{{ pageError }}</p>
        <p v-if="pageSuccess" class="text-emerald-600 text-sm">{{ pageSuccess }}</p>

        <div class="w-full p-8 bg-white border border-gray-200 rounded-2xl space-y-8">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone prefix</label>
              <input v-model="form.phonePrefix" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mobile number</label>
              <input v-model="form.mobileNumber" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="form.email" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input v-model="form.country" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input v-model="form.city" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">About me</label>
            <textarea v-model="form.aboutMe" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"></textarea>
          </div>

          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Languages</h2>
              <button @click="addLanguage" class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Add language</button>
            </div>
            <div v-for="(item, i) in form.languages" :key="item._key" class="grid md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-xl">
              <input v-model="item.name" placeholder="Name" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <input v-model="item.level" placeholder="Level" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <button @click="form.languages.splice(i, 1)" class="text-red-600 text-sm justify-self-start md:justify-self-end">Remove</button>
            </div>
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Experiences</h2>
              <button @click="addExperience" class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Add experience</button>
            </div>
            <div v-for="(item, i) in form.experiences" :key="item._key" class="space-y-3 p-4 border border-gray-200 rounded-xl">
              <div class="grid md:grid-cols-2 gap-3">
                <input v-model="item.jobTitle" placeholder="Job title" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
                <input v-model="item.companyName" placeholder="Company name" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
                <input v-model="item.startDate" placeholder="Start date" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
                <input v-model="item.endDate" placeholder="End date" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <textarea v-model="item.summary" rows="4" placeholder="Summary" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"></textarea>
              <button @click="form.experiences.splice(i, 1)" class="text-red-600 text-sm">Remove</button>
            </div>
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Education</h2>
              <button @click="addEducation" class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Add education</button>
            </div>
            <div v-for="(item, i) in form.education" :key="item._key" class="grid md:grid-cols-4 gap-3 p-4 border border-gray-200 rounded-xl">
              <input v-model="item.university" placeholder="University" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <input v-model="item.degree" placeholder="Degree" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <input v-model="item.date" placeholder="Date" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <button @click="form.education.splice(i, 1)" class="text-red-600 text-sm justify-self-start md:justify-self-end">Remove</button>
            </div>
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Skills</h2>
              <button @click="addSkillCategory" class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Add category</button>
            </div>
            <div v-for="(item, i) in form.skills" :key="item._key" class="space-y-3 p-4 border border-gray-200 rounded-xl">
              <div class="flex items-center gap-3">
                <input v-model="item.category" placeholder="Category (e.g. front_end)" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
                <button @click="form.skills.splice(i, 1)" class="text-red-600 text-sm">Remove</button>
              </div>
              <input v-model="item._skillsCsv" placeholder="Comma separated skills" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
            </div>
          </section>

          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Certificates</h2>
              <button @click="addCertificate" class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">Add certificate</button>
            </div>
            <div v-for="(item, i) in form.certificates" :key="item._key" class="grid md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl">
              <input v-model="item.name" placeholder="Certificate name" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <input v-model="item.date" placeholder="Date" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
              <button @click="form.certificates.splice(i, 1)" class="text-red-600 text-sm justify-self-start md:justify-self-end">Remove</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

const ADMIN_SESSION_KEY = 'portfolio_admin_authed'

const credentials = ref({ username: '', password: '' })
const authError = ref('')
const isAuthenticated = ref(sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true')

const pageError = ref('')
const pageSuccess = ref('')

const key = () => crypto.randomUUID()

const form = ref({
  _id: undefined,
  phonePrefix: '',
  mobileNumber: '',
  email: '',
  country: '',
  city: '',
  aboutMe: '',
  languages: [],
  experiences: [],
  education: [],
  skills: [],
  certificates: [],
})

const normalizeResume = (data = {}) => ({
  _id: data?._id,
  phonePrefix: data?.phonePrefix || '',
  mobileNumber: data?.mobileNumber || '',
  email: data?.email || '',
  country: data?.country || '',
  city: data?.city || '',
  aboutMe: data?.aboutMe || '',
  languages: (Array.isArray(data?.languages) ? data.languages : []).map((l) => ({ _key: key(), name: l?.name || '', level: l?.level || '' })),
  experiences: (Array.isArray(data?.experiences) ? data.experiences : []).map((e) => ({ _key: key(), jobTitle: e?.jobTitle || '', companyName: e?.companyName || '', startDate: e?.startDate || '', endDate: e?.endDate || '', summary: e?.summary || '' })),
  education: (Array.isArray(data?.education) ? data.education : []).map((e) => ({ _key: key(), university: e?.university || '', degree: e?.degree || '', date: e?.date || '' })),
  skills: (Array.isArray(data?.skills) ? data.skills : []).map((s) => ({ _key: key(), category: s?.category || '', _skillsCsv: Array.isArray(s?.skills) ? s.skills.join(', ') : '' })),
  certificates: (Array.isArray(data?.certificates) ? data.certificates : []).map((c) => ({ _key: key(), name: c?.name || '', date: c?.date || '' })),
})

const authenticateUser = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials.value),
    })

    if (!response.ok) {
      authError.value = response.status === 401 ? 'Invalid username or password.' : 'Authentication failed.'
      return
    }

    isAuthenticated.value = true
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
    authError.value = ''
    await refresh()
  } catch (error) {
    console.error(error)
    authError.value = 'Cannot connect to server. Please check your connection.'
  }
}

const refresh = async () => {
  pageError.value = ''
  pageSuccess.value = ''
  try {
    const res = await fetch(API_ENDPOINTS.RESUME)
    if (!res.ok) {
      pageError.value = `Failed to fetch resume. (${res.status})`
      return
    }
    const data = await res.json()
    form.value = normalizeResume(data || {})
  } catch (e) {
    console.error(e)
    pageError.value = 'Failed to fetch resume (network error).'
  }
}

const addLanguage = () => form.value.languages.push({ _key: key(), name: '', level: '' })
const addExperience = () => form.value.experiences.push({ _key: key(), jobTitle: '', companyName: '', startDate: '', endDate: '', summary: '' })
const addEducation = () => form.value.education.push({ _key: key(), university: '', degree: '', date: '' })
const addSkillCategory = () => form.value.skills.push({ _key: key(), category: '', _skillsCsv: '' })
const addCertificate = () => form.value.certificates.push({ _key: key(), name: '', date: '' })

const save = async () => {
  pageError.value = ''
  pageSuccess.value = ''

  const payload = {
    _id: form.value._id,
    phonePrefix: form.value.phonePrefix,
    mobileNumber: form.value.mobileNumber,
    email: form.value.email,
    country: form.value.country,
    city: form.value.city,
    aboutMe: form.value.aboutMe,
    languages: form.value.languages.map((l) => ({ name: l.name, level: l.level })),
    experiences: form.value.experiences.map((e) => ({
      jobTitle: e.jobTitle,
      companyName: e.companyName,
      startDate: e.startDate,
      endDate: e.endDate,
      summary: e.summary,
    })),
    education: form.value.education.map((e) => ({ university: e.university, degree: e.degree, date: e.date })),
    skills: form.value.skills.map((s) => ({
      category: s.category,
      skills: String(s._skillsCsv || '').split(',').map((x) => x.trim()).filter(Boolean),
    })),
    certificates: form.value.certificates.map((c) => ({ name: c.name, date: c.date })),
  }

  try {
    const res = await fetch(API_ENDPOINTS.RESUME, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      pageError.value = `Failed to save resume. (${res.status}) ${text}`
      return
    }
    pageSuccess.value = 'Saved successfully.'
    await refresh()
  } catch (e) {
    console.error(e)
    pageError.value = 'Failed to save (network error).'
  }
}

onMounted(() => {
  if (isAuthenticated.value) refresh()
})
</script>
