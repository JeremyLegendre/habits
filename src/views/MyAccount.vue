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
      <ion-card class="analytics">
        Analytics
      </ion-card>
      <ion-card class="classment">
        <h2>Classement</h2>
        <div class="top-users">
          <div id="second" v-if="topUsers[1]">
            <span>{{topUsers[1].name}}</span>
            <span>{{topUsers[1].points}}</span>
          </div>
          <div id="first" v-if="topUsers[0]">
            <span>{{topUsers[0].name}}</span>
            <span>{{topUsers[0].points}}</span>
          </div>
          <div id="third" v-if="topUsers[2]">
            <span>{{topUsers[2].name}}</span>
            <span>{{topUsers[2].points}}</span>
          </div>
        </div>
      </ion-card>
      <ion-card class="achievements">
        Achievements
      </ion-card>
      <partial-analysis :userId="account.userId"></partial-analysis>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import PartialAnalysis from '@/components/PartialAnalysis.vue';
import userService from '@/services/user';

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
      },
      topUsers: []
    }
  },
  methods: {
    getInformation() {
      this.account.name = "Jérémy LEGENDRE";
      this.account.points = 53;
      this.account.image = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
    },
    async getTopUsers() {
      this.topUsers = await userService.getTopUsers();

    }
  },
  mounted() {
    this.getInformation();
    this.getTopUsers();
  }
})
</script>

<style scoped>

ion-card {
  padding: 20px;
}

.classment h2{
  margin-top: 0;
  margin-bottom: 30px;
}

.top-users {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.top-users > div {
  display: flex;
  flex-direction: column;
}

.top-users > #second {
  margin-top: 30px;
}

.top-users > #third {
  margin-top: 50px;
}

</style>