<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto space-y-24">
      <!-- Authentication Modal -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-lg transition duration-300">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h3>
          <form @submit.prevent="authenticateUser" class="space-y-4">
            <div>
              <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                placeholder="Enter username"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
            </div>
            <div>
              <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                placeholder="Enter password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </div>
          </form>
          <p v-if="authError" class="text-red-500 text-center mt-4">{{ authError }}</p>
        </div>
      </div>

      <div v-else class="space-y-24 w-full">
        <section class="text-center space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Admin Projects</h1>
          <p class="text-gray-600">Add or update projects stored in MongoDB.</p>
        </section>

        <div class="flex items-center justify-between gap-4">
          <button
            @click="addCompany"
            class="px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Add Company
          </button>
          <button
            @click="refresh"
            class="px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
          >
            Refresh
          </button>
        </div>

        <p v-if="pageError" class="text-red-600 text-sm">{{ pageError }}</p>
        <p v-if="pageSuccess" class="text-emerald-600 text-sm">{{ pageSuccess }}</p>

        <div class="space-y-10 w-full">
          <div
            v-for="(company, cIdx) in companies"
            :key="company._key"
            class="w-full p-8 bg-white border border-gray-200 rounded-2xl"
          >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Company name</label>
                <input
                  v-model="company.company"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div class="flex gap-2">
                <button
                  @click="addProject(cIdx)"
                  class="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
                >
                  Add project
                </button>
                <button
                  @click="saveCompany(cIdx)"
                  class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Save company
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(project, pIdx) in company.projects"
                :key="project._key"
                class="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-3"
              >
                <div class="flex items-center justify-between gap-4">
                  <h3 class="font-semibold text-gray-900">Project</h3>
                  <button
                    @click="removeProject(cIdx, pIdx)"
                    class="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    v-model="project.title"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="project.description"
                    rows="5"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input
                    v-model="project._tagsCsv"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                    placeholder="Vue, Tailwind, Node"
                  />
                </div>
              </div>
            </div>

          </div>
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

const companies = ref([])
const pageError = ref('')
const pageSuccess = ref('')

const normalizeCompany = (c) => ({
  _id: c?._id,
  _key: c?._id || crypto.randomUUID(),
  company: c?.company || '',
  projects: Array.isArray(c?.projects)
    ? c.projects.map((p) => ({
      _key: crypto.randomUUID(),
      title: p?.title || '',
      description: p?.description || '',
      tags: Array.isArray(p?.tags) ? p.tags : [],
      _tagsCsv: Array.isArray(p?.tags) ? p.tags.join(', ') : '',
    }))
    : [],
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
    const res = await fetch(API_ENDPOINTS.PROJECTS)
    if (!res.ok) {
      pageError.value = `Failed to fetch projects. (${res.status})`
      return
    }
    const data = await res.json()
    companies.value = Array.isArray(data) ? data.map(normalizeCompany) : []
  } catch (e) {
    console.error(e)
    pageError.value = 'Failed to fetch projects (network error).'
  }
}

const addCompany = () => {
  companies.value.unshift(normalizeCompany({ company: '', projects: [] }))
}

const addProject = (cIdx) => {
  companies.value[cIdx].projects.push({
    _key: crypto.randomUUID(),
    title: '',
    description: '',
    tags: [],
    _tagsCsv: '',
  })
}

const removeProject = (cIdx, pIdx) => {
  companies.value[cIdx].projects.splice(pIdx, 1)
}

const saveCompany = async (cIdx) => {
  pageError.value = ''
  pageSuccess.value = ''

  const c = companies.value[cIdx]
  const payload = {
    _id: c._id || undefined,
    company: (c.company || '').trim(),
    projects: (c.projects || []).map((p) => ({
      title: (p.title || '').trim(),
      description: (p.description || '').trim(),
      tags: String(p._tagsCsv || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })),
  }

  if (!payload.company) {
    pageError.value = 'Company name is required.'
    return
  }

  try {
    const res = await fetch(API_ENDPOINTS.PROJECTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      pageError.value = `Failed to save company. (${res.status}) ${text}`
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

