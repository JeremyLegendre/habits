<template>
  <ion-page class="my_account">
    <ion-header>
      <ion-toolbar>
        <ion-title> Mon compte </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"> {{ account.name }} </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card class="account">
        <ion-avatar>
          <img :src="account.image" alt="account_img">
        </ion-avatar>
        <div class="cumulated_points">
          <p> {{ account.points }} </p>
          <p>Points cumulés</p>
        </div>
      </ion-card>
      <partial-analysis :userId="account.userId"></partial-analysis>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import PartialAnalysis from '@/components/PartialAnalysis.vue';

export default defineComponent({
  name: 'MyAccount',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonAvatar, PartialAnalysis },
  data(){
    return {
      account: {
        userId: 0,
        name: "",
        points: 0,
        achievements: [],
        image: ""
      }
    }
  },
  methods: {
    getInformation() {
      this.account.name = "Jérémy LEGENDRE";
      this.account.points = 53;
      this.account.image = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
    },
  },
  mounted() {
    this.getInformation();
  }
})
</script>