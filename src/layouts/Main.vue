<template>
  <div >
    <Component
        :titleLong="titleLong"
        :titleShort="titleShort"
        :is="currentLayout"
        :sdmID="sdmID">
      <slot></slot>
      <!-- pass the named slot from caller to callee -->
      <template v-slot:titlebar>
        <slot name="titlebar"></slot>
      </template>
    </Component>
  </div>
</template>

<script>
// import styles from '@/styles/styles';
import Fullwidth from "@/layouts/Fullwidth";
// import Plain from './Plain.vue';

// const getCurrentLayout = (flavour) => ({
//   layoutFullWidth: 'LayoutFullWidth',
//   layout2Columns: 'Layout2Columns',
//   layout3Columns: 'Layout3Columns',
//   layoutFormsStepper: 'LayoutFormsStepper',
//   plain: 'Plain',
// }[flavour] || 'LayoutFullWidth');

export default {
  name: 'Main',

  components: {
    Fullwidth,
  },
  data() {
    return {
      // get state from main store, used to render when session is checked
      currentLayout: Fullwidth,
    };
  },
  props: {
    flavour: {
      type: String,
      default: 'layoutFullWidth',
      validator: (value) => (['layoutFullWidth' ].indexOf(value) !== -1),
    },
    titleLong: String,
    titleShort: String,
    sdmID: {
      type: String,
      required: true,
    },
  },
  created() {
    this.insertStyling();
  },
  methods: {
    // An <style> element is created in the <head>
    // Filled with the css generated from the styles.js file.
    insertStyling() {
      // const styleInline = document.createElement('style');
      // styleInline.innerHTML = styles;
      // document.head.appendChild(styleInline);
    },
  },
};
</script>
