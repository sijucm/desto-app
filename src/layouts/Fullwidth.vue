<template>
  <div class="d-flex flex-column">
<!--    <aab-short-disturbance-message :id="sdmID"></aab-short-disturbance-message>-->
<!--    <header-panel class="position-relative"></header-panel>-->
<!--    <main id="main" role="main" class="gradient-md&#45;&#45;g200">-->
      <div class="container-fluid max-w-layout px-0 px-md-4">
        <div class="row">
          <div class="col-lg-12 d-flex flex-column">
            <div class="mt-2 mt-sm-8 mb-1 mb-sm-2 title-bar">
              <slot name="titlebar">
                <h2 class="text-white d-md-block d-none mb-0">{{ titleLong }}</h2>
                <h2 class="d-md-none d-block ml-2 mb-0">{{ titleShort }}</h2>
              </slot>
            </div>
            <div id="innerPage">
              <slot>
                <p>Here comes the main application</p>
              </slot>
            </div>
          </div>
        </div>
      </div>
<!--    </main>-->
<!--    <footer-panel></footer-panel>-->
  </div>
</template>
<script>
// import '@aab/sc-aab-short-disturbance-message';
// import { layoutStyles } from '../../styles';

export default {
  name: 'LayoutFullWidth',
  props: {
    titleLong: {
      Type: String,
      required: true,
    },
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
    // Using the CSS-in-JS styling strategy, creates an HTML <style> element in <head>.
    insertStyling() {
      // const styleInline = document.createElement('style');
      // styleInline.innerHTML = layoutStyles;
      // document.head.appendChild(styleInline);
    },
  },
};
</script>

<style scoped>
.title-bar  {
  background-color: lightslategrey;
}

</style>
