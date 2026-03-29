<template>
  <main class="bg-gray-50 min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl w-full mx-auto space-y-24">
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
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Admin References</h1>
          <p class="text-gray-600">Add or update references stored in MongoDB.</p>
        </section>

        <div class="flex items-center justify-between gap-4">
          <button
            @click="addNew"
            class="px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Add Reference
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

        <div class="w-full grid grid-cols-1 gap-8">
          <div
            v-for="refItem in references"
            :key="refItem._id || refItem._key"
            class="w-full p-8 bg-white border border-gray-200 rounded-2xl space-y-5"
          >
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ refItem.company || 'New reference' }}
              </h2>
              <button
                @click="save(refItem)"
                class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input v-model="refItem.company" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                <input v-model="refItem.Manager" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Reference text</label>
              <textarea v-model="refItem.reference" rows="7" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"></textarea>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <input v-model="refItem._skillsCsv" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Key points (one per line)</label>
                <textarea v-model="refItem._keyPointsText" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"></textarea>
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

const references = ref([])
const pageError = ref('')
const pageSuccess = ref('')

const normalize = (r) => ({
  _id: r?._id,
  _key: r?._id || crypto.randomUUID(),
  company: r?.company || '',
  Manager: r?.Manager || '',
  reference: r?.reference || '',
  skills: Array.isArray(r?.skills) ? r.skills : [],
  keyPoints: Array.isArray(r?.keyPoints) ? r.keyPoints : [],
  _skillsCsv: Array.isArray(r?.skills) ? r.skills.join(', ') : '',
  _keyPointsText: Array.isArray(r?.keyPoints) ? r.keyPoints.join('\n') : '',
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
    const res = await fetch(API_ENDPOINTS.REFERENCES)
    if (!res.ok) {
      pageError.value = `Failed to fetch references. (${res.status})`
      return
    }
    const data = await res.json()
    references.value = Array.isArray(data) ? data.map(normalize) : []
  } catch (e) {
    console.error(e)
    pageError.value = 'Failed to fetch references (network error).'
  }
}

const addNew = () => {
  references.value.unshift(normalize({}))
}

const save = async (refItem) => {
  pageError.value = ''
  pageSuccess.value = ''

  const payload = {
    _id: refItem._id || undefined,
    company: (refItem.company || '').trim(),
    Manager: (refItem.Manager || '').trim(),
    reference: (refItem.reference || '').trim(),
    skills: String(refItem._skillsCsv || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    keyPoints: String(refItem._keyPointsText || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  }

  if (!payload.company || !payload.Manager || !payload.reference) {
    pageError.value = 'Company, Manager, and Reference text are required.'
    return
  }

  try {
    const res = await fetch(API_ENDPOINTS.REFERENCES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      pageError.value = `Failed to save reference. (${res.status}) ${text}`
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

