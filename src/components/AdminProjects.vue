<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-4 font-['Space_Grotesk']">
    <div class="w-full max-w-7xl mx-auto px-6 space-y-24">
      
      <!-- Authentication Interface -->
      <div v-if="!isAuthenticated" class="flex justify-center items-center min-h-[70vh]">
        <div class="w-full max-w-md p-12 bg-[#131313] border border-white/5 rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-full h-1 bg-[#00FF9C] opacity-50"></div>
          
          <div class="text-center mb-10 space-y-4">
            <div class="inline-flex items-center justify-center h-16 w-16 bg-[#0e0e0e] border border-white/5 rounded-sm mb-4">
              <Icon icon="ph:shield-check-duotone" class="text-3xl text-[#00FF9C]" />
            </div>
            <h3 class="text-3xl font-black text-white uppercase italic tracking-tighter">System Access</h3>
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Encrypted Login Required</p>
          </div>

          <form @submit.prevent="authenticateUser" class="space-y-8">
            <div class="space-y-2">
              <label for="username" class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Identity / Username</label>
              <input
                id="username"
                v-model="credentials.username"
                type="text"
                placeholder="UID-0000"
                class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-white focus:border-[#00FF9C]/50 focus:ring-1 focus:ring-[#00FF9C]/20 outline-none transition-all placeholder:text-gray-800"
              />
            </div>
            <div class="space-y-2">
              <label for="password" class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Access Key / Password</label>
              <input
                id="password"
                v-model="credentials.password"
                type="password"
                placeholder="••••••••"
                class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-white focus:border-[#00FF9C]/50 focus:ring-1 focus:ring-[#00FF9C]/20 outline-none transition-all placeholder:text-gray-800"
              />
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="w-full py-5 bg-[#00FF9C] text-black font-black uppercase tracking-[0.2em] text-sm rounded-sm hover:bg-[#05e68d] transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Authorize Access
              </button>
            </div>
          </form>
          <p v-if="authError" class="text-[#FF4D4D] text-[10px] font-black text-center mt-8 uppercase tracking-widest animate-pulse">
            Error: {{ authError }}
          </p>
        </div>
      </div>

      <!-- ADMIN CONTENT -->
      <div v-else class="space-y-24">
        <!-- Header -->
        <section class="text-center space-y-6">
           <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.4em]">
            Terminal Admin
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
            Admin <br/>
            <span class="text-[#00FF9C]">Projects.</span>
          </h1>
          <p class="text-2xl text-gray-400 max-w-2xl mx-auto font-medium tracking-tight">
            Managing the project deployment ledger and MongoDB data modules.
          </p>
        </section>

        <!-- Global Actions -->
        <div class="flex items-center justify-between border-b border-white/5 pb-8">
          <button
            @click="addCompany"
            class="px-8 py-4 bg-[#00FF9C] text-black rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#05e68d] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Add New Company
          </button>
          <button
            @click="refresh"
            class="px-8 py-4 bg-transparent border border-white/10 text-white rounded-sm font-black uppercase tracking-widest text-xs hover:border-[#00FF9C] hover:text-[#00FF9C] transition-all"
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
              class="sticky top-24 z-10 bg-[#0e0e0e]/90 backdrop-blur-xl
                     py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div class="w-full max-w-md space-y-2">
                <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Company / Organization</label>
                <input
                  v-model="company.company"
                  type="text"
                  class="w-full bg-[#131313] border border-white/5 rounded-sm px-5 py-4 text-white font-black italic tracking-tighter text-3xl focus:border-[#00FF9C]/50 outline-none transition-all"
                  placeholder="SOURCE_NAME"
                />
              </div>
              <div class="flex gap-4">
                <button
                  @click="addProject(cIdx)"
                  class="px-6 py-3 bg-[#0e0e0e] border border-white/10 text-[#00FF9C] rounded-sm font-black uppercase tracking-widest text-[10px] hover:border-[#00FF9C] transition-all"
                >
                  + Add Project Module
                </button>
                <button
                  @click="saveCompany(cIdx)"
                  class="px-8 py-3 bg-[#00FF9C] text-black rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-[#05e68d] transition-all"
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
                class="p-10 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/20 transition-all duration-700 flex flex-col space-y-10 group"
              >
                <!-- Project Header -->
                <div class="flex items-start justify-between gap-6">
                  <div class="w-full space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Module Title</label>
                    <input
                      v-model="project.title"
                      type="text"
                      class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-white font-black italic tracking-tighter text-2xl focus:border-[#00FF9C]/50 outline-none transition-all"
                      placeholder="PROJECT_ID"
                    />
                  </div>
                  <button
                    @click="removeProject(cIdx, pIdx)"
                    class="h-12 w-12 bg-[#0e0e0e] border border-white/5 flex items-center justify-center rounded-sm text-red-500/50 hover:text-red-500 hover:border-red-500/30 transition-all"
                  >
                    <Icon icon="ph:trash-duotone" class="text-xl" />
                  </button>
                </div>

                <!-- Description -->
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Functionality / Brief</label>
                  <textarea
                    v-model="project.description"
                    rows="5"
                    class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-gray-400 font-medium tracking-tight leading-relaxed focus:border-[#00FF9C]/50 outline-none transition-all resize-none"
                    placeholder="DESCRIBE_MODULE_SCOPE"
                  ></textarea>
                </div>

                <!-- NEW: Timeline Fields -->
                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Start Date</label>
                    <input
                      v-model="project.startDate"
                      type="date"
                      class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-[#00FF9C] font-black outline-none focus:border-[#00FF9C]/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">End Date</label>
                    <input
                      v-model="project.endDate"
                      type="date"
                      class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-[#00FF9C] font-black outline-none focus:border-[#00FF9C]/50 transition-all"
                    />
                  </div>
                </div>

                <!-- Tags -->
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Technologies (CSV)</label>
                  <input
                    v-model="project._tagsCsv"
                    type="text"
                    class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-5 py-4 text-white font-bold uppercase tracking-widest text-[10px] focus:border-[#00FF9C]/50 outline-none transition-all"
                    placeholder="VUE, TAILWIND, MONGODB"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
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
