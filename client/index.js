import Vue from 'vue';
import Hello from './Hello.vue';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    render: (createElement) => {
      return createElement(Hello);
    }
  });
});