import Vue from 'vue';
import VueRouter from 'vue-router';
// import i18n from '@/i18n';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history', // !!!! for agw !!!!
//   base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   // i18n check
//   // (not really needed to on every route change, cuz main URL will not change,
//   // but like this we're future proof)
//   // i18n.locale = document.documentElement.lang || i18n.fallbackLocale || 'en';
// //   i18n.locale = 'nl';
//   // do sessionCheck, will resolve or redirect
//   // await sessionCheck();
//   // set state in store for Main.vue rendering
//   // continue with routing
//   next();
// });

export default router;
