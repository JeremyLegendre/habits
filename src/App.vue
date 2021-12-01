<template>
  <ion-app v-if="!loading">
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import userService from '@/services/user';
import activityService from '@/services/activity';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.initSession();
  },
  methods: {
    initSession() {
      this.loading = true;
      userService.getUser(1).then(user => {
        if (user) {
          this.$store.commit('user/setUserInformations', user);
        }
        this.loading = false;
      });

      activityService.getActivities(1).then(activities => {
        if (activities) {
          this.$store.commit('activity/setActivities', activities);
        }
      });

      this.$store.dispatch('category/getCategories');
    }
  }
});
</script>