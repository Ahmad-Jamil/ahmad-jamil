<template>
  <div class="space-y-16">
      
      <!-- Authentication Interface -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-[70vh]">
        <div class="w-full max-w-md ui-card p-8 sm:p-10 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-app-brand/60"></div>
          
          <div class="text-center mb-10 space-y-4">
            <div class="inline-flex items-center justify-center h-16 w-16 bg-app-muted border border-app-border rounded-2xl mb-4">
              <Icon icon="ph:shield-check-duotone" class="text-3xl text-app-brand" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 tracking-tight">Admin access</h3>
            <p class="text-sm text-slate-600">Login to edit projects.</p>
          </div>

          <form @submit.prevent="authenticateUser" class="space-y-8">
            <div class="space-y-2">
              <label for="username" class="ui-field-label">Username</label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                placeholder="UID-0000"
                class="ui-input"
              />
            </div>
            <div class="space-y-2">
              <label for="password" class="ui-field-label">Password</label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                placeholder="••••••••"
                class="ui-input"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="ui-btn-primary w-full"
              >
                Sign in
              </button>
            </div>
          </form>
          <p v-if="authError" class="text-red-700 text-sm text-center mt-6">
            Error: {{ authError }}
          </p>
        </div>
      </div>

      <!-- ADMIN CONTENT -->
      <div v-else class="space-y-24">
        <!-- Header -->
        <section class="text-center space-y-6">
           <div class="ui-eyebrow mx-auto">
            Terminal Admin
          </div>
          <h1 class="ui-h1">
            Admin <br/>
            <span class="text-app-brand">Projects.</span>
          </h1>
          <p class="ui-lead max-w-2xl mx-auto">
            Managing the project deployment ledger and MongoDB data modules.
          </p>
        </section>

        <!-- Global Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-app-border pb-6">
          <button
            @click="addCompany"
            class="ui-btn-primary"
          >
            Add New Company
          </button>
          <button
            @click="refresh"
            class="ui-btn-ghost"
          >
            Refresh System
          </button>
        </div>

        <!-- Feedback Messages -->
        <transition name="fade">
          <div v-if="pageSuccess" class="p-6 bg-[#00FF9C]/10 border border-[#00FF9C]/30 text-[#00FF9C] font-black uppercase text-[10px] tracking-[0.3em] rounded-sm italic">
            Success: {{ pageSuccess }}
          </div>
        </transition>
        <transition name="fade">
          <div v-if="pageError" class="p-6 bg-red-500/10 border border-red-500/30 text-red-500 font-black uppercase text-[10px] tracking-[0.3em] rounded-sm italic">
            System Error: {{ pageError }}
          </div>
        </transition>

        <!-- Companies Interface -->
        <section class="space-y-32">
          <div
            v-for="(company, cIdx) in companies"
            :key="company._key"
            class="space-y-16"
          >
            <!-- Sticky Company Header -->
            <div
              class="sticky top-24 z-10 bg-app-bg/90 backdrop-blur-xl
                     py-6 border-b border-app-border flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div class="w-full max-w-md space-y-2">
                <label class="ui-field-label">Company</label>
                <input
                  v-model="company.company"
                  type="text"
                  class="ui-input text-xl sm:text-2xl font-semibold"
                  placeholder="SOURCE_NAME"
                />
              </div>
              <div class="flex gap-4">
                <button
                  @click="addProject(cIdx)"
                  class="ui-btn-ghost"
                >
                  + Add Project Module
                </button>
                <button
                  @click="saveCompany(cIdx)"
                  class="ui-btn-primary"
                >
                  Commit Changes
                </button>
              </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div
                v-for="(project, pIdx) in company.projects"
                :key="project._key"
                class="ui-card ui-card-hover p-8 sm:p-10 flex flex-col space-y-8"
              >
                <!-- Project Header -->
                <div class="flex items-start justify-between gap-6">
                  <div class="w-full space-y-2">
                    <label class="ui-field-label">Title</label>
                    <input
                      v-model="project.title"
                      type="text"
                      class="ui-input text-lg font-semibold"
                      placeholder="PROJECT_ID"
                    />
                  </div>
                  <button
                    @click="removeProject(cIdx, pIdx)"
                    class="h-11 w-11 bg-app-muted border border-app-border flex items-center justify-center rounded-xl text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <Icon icon="ph:trash-duotone" class="text-xl" />
                  </button>
                </div>

                <!-- Description -->
                <div class="space-y-2">
                  <label class="ui-field-label">Description</label>
                  <textarea
                    v-model="project.description"
                    rows="5"
                    class="ui-textarea"
                    placeholder="DESCRIBE_MODULE_SCOPE"
                  ></textarea>
                </div>

                <!-- NEW: Timeline Fields -->
                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="ui-field-label">Start Date</label>
                    <input
                      v-model="project.startDate"
                      type="date"
                      class="ui-input"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="ui-field-label">End Date</label>
                    <input
                      v-model="project.endDate"
                      type="date"
                      class="ui-input"
                    />
                  </div>
                </div>

                <!-- Tags -->
                <div class="space-y-2">
                  <label class="ui-field-label">Technologies (CSV)</label>
                  <input
                    v-model="project._tagsCsv"
                    type="text"
                    class="ui-input"
                    placeholder="VUE, TAILWIND, MONGODB"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { API_ENDPOINTS } from '@/config/api'
import { Icon } from '@iconify/vue'

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
