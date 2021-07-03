<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Planifier mes activités</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-slides>
        <ion-slide :key="day.int" v-for="day in daysToPlan">
          <h1>{{ day.formattedDate }}</h1>
          <!-- TODO: Add activity cards -->
          <div class="cards">
            <ion-card :key="activity.id" v-for="activity in activitiesOfDay[day.int]"></ion-card>
          </div>
          <ion-fab vertical="bottom" horizontal="bottom">
            <ion-fab-button>
              <ion-icon :icon="add" @click="addActivity(day.int)"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonFab, IonFabButton, IonCard, IonIcon} from '@ionic/vue';
import { add } from 'ionicons/icons';

export default  {
  name: 'Plan',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSlides, IonSlide, IonFab, IonFabButton, IonCard, IonIcon},
  setup() {
    return {add};
  },
  data() {
    return {
      daysToPlan: [],
      activitiesOfDay: {}
    };
  },
  mounted() {
    this.findNextMonday();
    this.getActivities();
  },
  methods: {
    findNextMonday(): void {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);


      if (tomorrow.getDay() == 1) {
        this.setDaysToWeek(tomorrow);
      } else {
        const nextMonday = new Date(tomorrow);
        while(nextMonday.getDay() !== 1) {
          nextMonday.setTime(nextMonday.getTime() + 86400000);
        }

        this.setDaysToWeek(nextMonday);
      }
    },
    setDaysToWeek(current: Date): void {
      for (let i = 0 ; i < 7 ; i++) {
        const dayOfWeek = new Date();
        dayOfWeek.setTime(current.getTime() +  86400000 * i);

        this.daysToPlan.push({
          int: dayOfWeek.getDate(),
          time: dayOfWeek.getTime(),
          formattedDate: dayOfWeek.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})
        });
      }
    },
    addActivity(day: number): void {
      console.log(day);
    },
    async getActivities() {
      // Replace one by this.$store.state.user.userId
      await this.$store.dispatch('activity/getActivities', 1);

      this.daysToPlan.forEach(day => {
        this.activitiesOfDay[day.int] = this.$store.getters['activity/getActivitiesFromDate'](day.time);
      });
    }
  }
}
</script>

<style scoped>
ion-slides {
  height: 100%;
}

ion-slides .swiper-wrapper {
  display: flex;
  flex-direction: column;
}
</style>