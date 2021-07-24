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
            <span class="points">{{topUsers[1].points}}</span>
          </div>
          <div id="first" v-if="topUsers[0]">
            <span>{{topUsers[0].name}}</span>
            <span class="points">{{topUsers[0].points}}</span>
          </div>
          <div id="third" v-if="topUsers[2]">
            <span>{{topUsers[2].name}}</span>
            <span class="points">{{topUsers[2].points}}</span>
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
  background-color: rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.3);
  box-shadow: 10px 10px 60px -8px rgba(0,0,0,0.2);
  padding: 10px 0;
  font-weight: bold;
}

.top-users > div > span:last-child {
  margin-top: 10px;
}

.top-users > #first {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.top-users > #first > span:last-child {
  color: gold;
}

.top-users > #second {
  margin-top: 30px;
  border-top-left-radius: 5px;
}

.top-users > #second > span:last-child {
  color: #a89c91;
}

.top-users > #third {
  margin-top: 50px;
  border-top-right-radius: 5px;
}

.top-users > #third > span:last-child {
  color: #CD7F32;
}
</style>