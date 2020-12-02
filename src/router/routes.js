import TeamPools from '../views/TeamPools.vue';
import ReportScore from "@/views/ReportScore";
import AboutHelp from "@/views/AboutHelp";
import TeamView from "@/views/TeamView";

export default [


  {
    path: '/report',
    name: 'ReportScore',
    component: ReportScore,
    props: true,
  },
  {
    path: '/team',
    name: 'TeamView',
    component: TeamView,
    props: true,
  },
  {
    path: '/about',
    name: 'AboutHelp',
    component: AboutHelp,
    props: true,
  },
  {
    path: '',
    name: 'TeamPools',
    component: TeamPools,
  },



];
