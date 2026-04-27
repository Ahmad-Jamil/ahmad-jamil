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
            <p class="text-sm text-slate-600">Login to edit references.</p>
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
      <div v-else class="space-y-24 w-full">
        <!-- Header -->
        <section class="text-center space-y-6">
          <div class="ui-eyebrow mx-auto">
            Terminal Admin
          </div>
          <h1 class="ui-h1">
            Admin <br/>
            <span class="text-app-brand">References.</span>
          </h1>
          <p class="ui-lead max-w-2xl mx-auto">
            Managing the endorsement ledger and MongoDB data modules.
          </p>
        </section>

        <!-- Global Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-app-border pb-6">
          <button
            @click="addNew"
            class="ui-btn-primary"
          >
            Add New Reference
          </button>
          <button
            @click="refresh"
            class="ui-btn-ghost"
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
            class="w-full ui-card ui-card-hover p-8 sm:p-10 space-y-10 relative overflow-hidden"
          >
            <!-- Security Accent -->
            <div class="absolute top-0 left-0 w-full h-1 bg-app-brand/50"></div>

            <div class="flex items-center justify-between gap-6">
              <div class="w-full max-w-md space-y-2">
                <label class="ui-field-label">Company</label>
                <input
                  v-model="refItem.company"
                  type="text"
                  class="ui-input text-xl sm:text-2xl font-semibold"
                  placeholder="SOURCE_NAME"
                />
              </div>
              <button
                @click="save(refItem)"
                class="ui-btn-primary"
              >
                Commit Changes
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-10">
              <div class="space-y-2">
                <label class="ui-field-label">Manager</label>
                <input
                  v-model="refItem.Manager"
                  class="ui-input"
                  placeholder="IDENTITY_NAME"
                />
              </div>
              <div class="space-y-2">
                <label class="ui-field-label">Technical Skills (CSV)</label>
                <input
                  v-model="refItem._skillsCsv"
                  class="ui-input"
                  placeholder="BACKEND, CLOUD, K8S"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="ui-field-label">Reference</label>
              <textarea
                v-model="refItem.reference"
                rows="7"
                class="ui-textarea"
                placeholder="INPUT_VALIDATION_TEXT"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="ui-field-label">Key points (one per line)</label>
              <textarea
                v-model="refItem._keyPointsText"
                rows="5"
                class="ui-textarea"
                placeholder="POINT_01&#10;POINT_02"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div class="text-center py-12">
           <p class="text-sm text-slate-500">End of reference modules</p>
        </div>
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
