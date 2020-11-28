import TeamPools from '../views/TeamPools.vue';
import ReportScore from "@/components/modify/ReportScore";

export default [

{
  path: '',
  name: 'TeamPools',
  component: TeamPools,
},
  {
    path: '/report',
    name: 'ReportScore',
    component: ReportScore,
    props: true,
  },


];
