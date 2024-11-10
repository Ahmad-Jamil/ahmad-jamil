import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/HomeComponent.vue'
import ProjectsComponent from '../components/ProjectsComponent.vue'
import ContactComponent from '../components/ContactComponent.vue'
import ReferencesComponent from '../components//ReferencesComponent.vue'
import ResumeComponent from '../components/ResumeComponent.vue'

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/projects', component: ProjectsComponent },
  { path: '/contact', component: ContactComponent },
  { path: '/resume', component: ResumeComponent },
  { path: '/references', component: ReferencesComponent },
];

const router = createRouter({ 
    history: createWebHistory(), 
    routes, 
}); 
export default router;
