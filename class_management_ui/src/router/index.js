import { createRouter, createWebHistory } from 'vue-router'
import { getAccessToken, isLoggedIn } from '@/utils/auth-api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/new-account',
      name: 'NewAccount',
      component: () => import('../views/NewAccount.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: () => import('../components/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/all-classroom',
      name: 'AllClassroom',
      component: () => import('../teacherView/AllClassroom.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/student-classroom',
      name: 'StudentClassroom',
      component: () => import('../studentView/StudentClassroom.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('../components/Setting.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/class-document',
      name: 'ClassDocument',
      component: () => import('../teacherView/AllDocument.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/all-student',
      name: 'AllStudent',
      component: () => import('../teacherView/AllStudent.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/student-not-submitted-fee',
      name: 'StudentNotSubmittedFee',
      component: () => import('../teacherView/StudentNotSubmittedFee.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/class-attendance/:classIdFromParent?',
      name: 'ClassAttendance',
      component: () => import('../teacherView/ClassAttendance.vue'),
      meta: { requiresAuth: true }
    },  
    {
      path: '/exam-score/:classIdFromParent?',
      name: 'ExamScore',
      component: () => import('../teacherView/ExamScore.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tutor-fee/:classIdFromParent?',
      name: 'TutorFee',
      component: () => import('../teacherView/TutorFee.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../components/BlankPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      // Redirect to login page if not logged in
      next('/login');
    } else {
      // Proceed to the requested route if logged in
      next();
    }
  } else {
    next(); // Proceed to the requested route if it does not require authentication
  }
});

export default router
