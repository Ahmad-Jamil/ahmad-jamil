<template>
  <main class="bg-[#0e0e0e] min-h-screen pt-32 pb-24 px-4 font-['Space_Grotesk'] text-white">
    <div class="w-full max-w-6xl mx-auto px-6 space-y-24">
      
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
      <div v-else class="space-y-24 w-full">
        <!-- Header -->
        <section class="text-center space-y-6">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-[10px] font-bold uppercase tracking-[0.4em]">
            Terminal Admin
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
            Admin <br/>
            <span class="text-[#00FF9C]">References.</span>
          </h1>
          <p class="text-2xl text-gray-400 max-w-2xl mx-auto font-medium tracking-tight">
            Managing the endorsement ledger and MongoDB data modules.
          </p>
        </section>

        <!-- Global Actions -->
        <div class="flex items-center justify-between border-b border-white/5 pb-8">
          <button
            @click="addNew"
            class="px-8 py-4 bg-[#00FF9C] text-black rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#05e68d] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Add New Reference
          </button>
          <button
            @click="refresh"
            class="px-8 py-4 bg-transparent border border-white/10 text-white rounded-sm font-black uppercase tracking-widest text-xs hover:border-[#00FF9C] hover:text-[#00FF9C] transition-all"
          >
            Refresh System
          </button>
        </div>

        <!-- Feedback Modules -->
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

        <!-- References Grid -->
        <div class="w-full grid grid-cols-1 gap-12">
          <div
            v-for="refItem in references"
            :key="refItem._id || refItem._key"
            class="w-full p-12 bg-[#131313] border border-white/5 rounded-sm hover:border-[#00FF9C]/30 transition-all duration-700 space-y-12 relative overflow-hidden group"
          >
            <!-- Security Accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-[#00FF9C] opacity-20 group-hover:opacity-40 transition-opacity"></div>

            <div class="flex items-center justify-between gap-6">
              <div class="w-full max-w-md space-y-2">
                <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Company / Organization</label>
                <input
                  v-model="refItem.company"
                  type="text"
                  class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-6 py-4 text-white font-black italic tracking-tighter text-3xl focus:border-[#00FF9C]/50 outline-none transition-all"
                  placeholder="SOURCE_NAME"
                />
              </div>
              <button
                @click="save(refItem)"
                class="px-8 py-4 bg-[#00FF9C] text-black rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#05e68d] transition-all"
              >
                Commit Changes
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-10">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Validated By / Manager</label>
                <input
                  v-model="refItem.Manager"
                  class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-6 py-4 text-white font-bold italic tracking-tight text-xl focus:border-[#00FF9C]/50 outline-none transition-all"
                  placeholder="IDENTITY_NAME"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Technical Skills (CSV)</label>
                <input
                  v-model="refItem._skillsCsv"
                  class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-6 py-4 text-[#00FF9C] font-bold uppercase tracking-widest text-[10px] focus:border-[#00FF9C]/50 outline-none transition-all"
                  placeholder="BACKEND, CLOUD, K8S"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Reference Log / Content</label>
              <textarea
                v-model="refItem.reference"
                rows="7"
                class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-6 py-5 text-gray-400 font-medium tracking-tight leading-relaxed focus:border-[#00FF9C]/50 outline-none transition-all resize-none"
                placeholder="INPUT_VALIDATION_TEXT"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Key Architectural Contributions (One per line)</label>
              <textarea
                v-model="refItem._keyPointsText"
                rows="5"
                class="w-full bg-[#0e0e0e] border border-white/5 rounded-sm px-6 py-5 text-gray-400 font-medium tracking-tight leading-relaxed focus:border-[#00FF9C]/50 outline-none transition-all resize-none"
                placeholder="POINT_01&#10;POINT_02"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div class="text-center py-12">
           <p class="text-[10px] font-black text-gray-700 uppercase tracking-[0.8em]">End of Reference Modules</p>
        </div>
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
