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
            <p class="text-sm text-slate-600">Login to edit resume content.</p>
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
            <span class="text-app-brand">Resume.</span>
          </h1>
          <p class="ui-lead max-w-2xl mx-auto">
            Syncing the professional curriculum and skill architecture modules.
          </p>
        </section>

        <!-- Global Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-app-border pb-6">
          <div class="flex gap-4">
             <button
              @click="refresh"
              class="ui-btn-ghost"
            >
              Refresh Data
            </button>
          </div>
          <button
            @click="save"
            class="ui-btn-primary"
          >
            Commit All Changes
          </button>
        </div>

        <!-- Feedback Modules -->
        <transition name="fade">
          <div v-if="pageSuccess" class="p-4 bg-app-accent/10 border border-app-accent/25 text-slate-900 rounded-lg">
            Success: {{ pageSuccess }}
          </div>
        </transition>
        <transition name="fade">
          <div v-if="pageError" class="p-4 bg-red-500/10 border border-red-500/25 text-red-700 rounded-lg">
            System Error: {{ pageError }}
          </div>
        </transition>

        <!-- Main Form -->
        <div class="w-full space-y-16">
          
          <!-- Contact Module -->
          <div class="ui-card ui-card-hover p-8 sm:p-10 space-y-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-app-brand/40"></div>
            <h2 class="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4">
               <Icon icon="ph:identification-card-duotone" class="text-app-brand" />
               Identification Modules
            </h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="space-y-2">
                <label class="ui-field-label">Phone Prefix</label>
                <input v-model="form.phonePrefix" class="ui-input" />
              </div>
              <div class="space-y-2">
                <label class="ui-field-label">Mobile Number</label>
                <input v-model="form.mobileNumber" class="ui-input" />
              </div>
              <div class="space-y-2">
                <label class="ui-field-label">Email</label>
                <input v-model="form.email" class="ui-input" />
              </div>
              <div class="space-y-2">
                <label class="ui-field-label">Country</label>
                <input v-model="form.country" class="ui-input" />
              </div>
              <div class="space-y-2">
                <label class="ui-field-label">City</label>
                <input v-model="form.city" class="ui-input" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="ui-field-label">About Me</label>
              <textarea v-model="form.aboutMe" rows="6" class="ui-textarea"></textarea>
            </div>
          </div>

          <!-- Experiences Module -->
          <div class="space-y-8">
            <div class="flex items-center justify-between">
              <h2 class="text-3xl font-black uppercase italic tracking-tighter text-[#00FF9C]">Experience Ledger</h2>
              <button @click="addExperience" class="px-6 py-2 border border-[#00FF9C]/20 text-[#00FF9C] rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF9C]/5 transition-all">
                Push New Experience
              </button>
            </div>
            
            <div class="grid gap-8">
              <div v-for="(item, i) in form.experiences" :key="item._key" class="ui-card ui-card-hover p-6 sm:p-8 space-y-6 relative">
                <button @click="form.experiences.splice(i, 1)" class="absolute top-6 right-6 text-red-500/30 hover:text-red-500 transition-colors">
                  <Icon icon="ph:trash-duotone" class="text-xl" />
                </button>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Job Title</label>
                    <input v-model="item.jobTitle" class="ui-input" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Company</label>
                    <input v-model="item.companyName" class="ui-input" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Start</label>
                    <input v-model="item.startDate" class="ui-input" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">End</label>
                    <input v-model="item.endDate" class="ui-input" />
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Summary / Accomplishments</label>
                  <textarea v-model="item.summary" rows="4" class="ui-textarea"></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills & Languages Grid -->
          <div class="grid lg:grid-cols-2 gap-12">
            
            <!-- Skills Module -->
            <div class="space-y-8">
               <div class="flex items-center justify-between">
                <h2 class="text-2xl font-black uppercase italic tracking-tighter text-[#00FF9C]">Skill Nodes</h2>
                <button @click="addSkillCategory" class="px-4 py-2 border border-[#00FF9C]/20 text-[#00FF9C] rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF9C]/5 transition-all">
                  New Category
                </button>
              </div>
              <div class="space-y-6">
                <div v-for="(item, i) in form.skills" :key="item._key" class="ui-card ui-card-hover p-6 space-y-4 relative">
                  <button @click="form.skills.splice(i, 1)" class="absolute top-4 right-4 text-red-500/30 hover:text-red-500 transition-colors">
                    <Icon icon="ph:x-bold" />
                  </button>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Category Label</label>
                    <input v-model="item.category" placeholder="e.g. BACKEND" class="ui-input" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Values (CSV)</label>
                    <input v-model="item._skillsCsv" placeholder="NODE, GO, K8S" class="ui-input" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Languages Module -->
            <div class="space-y-8">
               <div class="flex items-center justify-between">
                <h2 class="text-2xl font-black uppercase italic tracking-tighter text-[#00FF9C]">Linguistic Arrays</h2>
                <button @click="addLanguage" class="px-4 py-2 border border-[#00FF9C]/20 text-[#00FF9C] rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF9C]/5 transition-all">
                  Add Language
                </button>
              </div>
              <div class="space-y-6">
                <div v-for="(item, i) in form.languages" :key="item._key" class="ui-card ui-card-hover p-6 flex items-center gap-6 relative">
                   <div class="grid grid-cols-2 gap-6 flex-grow">
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Identity</label>
                        <input v-model="item.name" class="ui-input" />
                      </div>
                      <div class="space-y-2">
                        <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Level</label>
                        <input v-model="item.level" class="ui-input" />
                      </div>
                   </div>
                   <button @click="form.languages.splice(i, 1)" class="text-red-500/30 hover:text-red-500 transition-colors mt-4">
                    <Icon icon="ph:trash-duotone" class="text-xl" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Education & Certificates -->
          <div class="grid lg:grid-cols-2 gap-12">
            <div class="space-y-8">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-black uppercase italic tracking-tighter text-[#00FF9C]">Education Logs</h2>
                <button @click="addEducation" class="px-4 py-2 border border-[#00FF9C]/20 text-[#00FF9C] rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF9C]/5 transition-all">
                  Push Education
                </button>
              </div>
              <div v-for="(item, i) in form.education" :key="item._key" class="ui-card ui-card-hover p-6 space-y-4 relative">
                <button @click="form.education.splice(i, 1)" class="absolute top-4 right-4 text-red-500/30 hover:text-red-500 transition-colors">
                  <Icon icon="ph:x-bold" />
                </button>
                <input v-model="item.university" placeholder="University" class="ui-input" />
                <div class="grid grid-cols-2 gap-4">
                  <input v-model="item.degree" placeholder="Degree" class="ui-input" />
                  <input v-model="item.date" placeholder="Date" class="ui-input" />
                </div>
              </div>
            </div>

            <div class="space-y-8">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-black uppercase italic tracking-tighter text-[#00FF9C]">Certificates</h2>
                <button @click="addCertificate" class="px-4 py-2 border border-[#00FF9C]/20 text-[#00FF9C] rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF9C]/5 transition-all">
                  New Cert
                </button>
              </div>
              <div v-for="(item, i) in form.certificates" :key="item._key" class="ui-card ui-card-hover p-6 space-y-4 relative">
                 <button @click="form.certificates.splice(i, 1)" class="absolute top-4 right-4 text-red-500/30 hover:text-red-500 transition-colors">
                    <Icon icon="ph:x-bold" />
                  </button>
                <input v-model="item.name" placeholder="Certificate Name" class="ui-input" />
                <input v-model="item.date" placeholder="Date Issued" class="ui-input" />
              </div>
            </div>
          </div>

        </div>

        <div class="text-center py-12">
           <p class="text-[10px] font-black text-gray-700 uppercase tracking-[0.8em]">Core Resume Module v2.0.4</p>
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

const normalizeSkillItems = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      if (typeof s === 'string') return s.trim();
      if (s && typeof s === 'object') return String(s.name || s.skill || '').trim();
      return '';
    })
    .filter(Boolean);
}

const normalizeSkills = (rawSkills) => {
  if (!Array.isArray(rawSkills)) return [];
  return rawSkills
    .map((s) => {
      if (!s || typeof s !== 'object') return null;
      if ('category' in s) {
        const directSkills = normalizeSkillItems(s.skills);
        if (String(s.category || '').trim().toLowerCase() === 'skills' && directSkills.length === 0) {
          const backupKey = Object.keys(s).find(
            (k) => !['_id', 'category', 'skills', '__v'].includes(k) && Array.isArray(s[k])
          );
          if (backupKey) {
            return { category: backupKey, skills: normalizeSkillItems(s[backupKey]) };
          }
        }
        return { category: s.category || '', skills: directSkills };
      }
      const categoryKey = Object.keys(s).find((k) => k !== '_id');
      if (!categoryKey) return null;
      return { category: categoryKey, skills: normalizeSkillItems(s[categoryKey]) };
    })
    .filter((x) => x && x.category);
}

const normalizeResume = (data = {}) => ({
  _id: data?._id,
  phonePrefix: data?.phonePrefix || '',
  mobileNumber: data?.mobileNumber || '',
  email: data?.email || data?.emailAddress || data?.mail || '',
  country: data?.country || '',
  city: data?.city || '',
  aboutMe: data?.aboutMe || '',
  languages: (Array.isArray(data?.languages) ? data.languages : []).map((l) => ({ _key: key(), name: l?.name || '', level: l?.level || '' })),
  experiences: (Array.isArray(data?.experiences) ? data.experiences : []).map((e) => ({ _key: key(), jobTitle: e?.jobTitle || '', companyName: e?.companyName || '', startDate: e?.startDate || '', endDate: e?.endDate || '', summary: e?.summary || '' })),
  education: (Array.isArray(data?.education) ? data.education : []).map((e) => ({ _key: key(), university: e?.university || '', degree: e?.degree || '', date: e?.date || '' })),
  skills: normalizeSkills(data?.skills).map((s) => ({
    _key: key(),
    category: s.category || '',
    _skillsCsv: Array.isArray(s.skills) ? s.skills.join(', ') : '',
  })),
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
    })).filter((s) => s.category && s.skills.length > 0),
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
