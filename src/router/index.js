import { createRouter, createWebHistory } from 'vue-router';

import HomeComponent from '../components/HomeComponent.vue'
import ProjectsComponent from '../components/ProjectsComponent.vue'
import ContactComponent from '../components/ContactComponent.vue'
import ReferencesComponent from '../components//ReferencesComponent.vue'
import ResumeComponent from '../components/ResumeComponent.vue'
import ReadMessagesComponent from '@/components/ReadMessagesComponent.vue'
import AdminProjects from '@/components/AdminProjects.vue'
import AdminResume from '@/components/AdminResume.vue'
import AdminReferences from '@/components/AdminReferences.vue'

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/projects', component: ProjectsComponent },
  { path: '/contact', component: ContactComponent },
  { path: '/resume', component: ResumeComponent },
  { path: '/references', component: ReferencesComponent },
  { path: '/messages', component: ReadMessagesComponent },
  { path: '/admin/projects', component: AdminProjects },
  { path: '/admin/resume', component: AdminResume },
  { path: '/admin/references', component: AdminReferences },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
