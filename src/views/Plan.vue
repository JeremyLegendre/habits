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
          <div class="cards">
            <ion-card :key="activity.id" v-for="activity in activitiesOfDay[day.int]">
              <h2>{{activity.name}}</h2>
              <p> {{ startDate(activity) }} - {{ endDate(activity) }} </p>
              <p>{{categoryName(activity.category)}}</p>
            </ion-card>
          </div>
          <ion-fab vertical="bottom" horizontal="bottom">
            <ion-fab-button>
              <ion-icon :icon="add" @click="addActivity(day)"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </ion-slide>
      </ion-slides>
      <ion-modal :is-open="isOpenRef">
        <add-activity :day="day" @cancel="setOpen(false)" @saveAndClose="saveActivity(response)"></add-activity>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonFab, IonFabButton, IonCard, IonModal, IonIcon} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { ref } from 'vue';
import AddActivity from '../components/AddActivity.vue';

export default  {
  name: 'Plan',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSlides, IonSlide, IonFab, IonFabButton, IonCard, IonModal, IonIcon, AddActivity},
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => { isOpenRef.value = state };
    return {isOpenRef, setOpen, add};
  },
  data() {
    return {
      daysToPlan: [],
      activitiesOfDay: {},
      day: null
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
    async addActivity(day) {
      this.day = day;
      this.setOpen(true);
    },
    async getActivities() {
      // Replace one by this.$store.state.user.userId
      await this.$store.dispatch('activity/getActivities', 1);

      this.daysToPlan.forEach(day => {
        this.activitiesOfDay[day.int] = this.$store.getters['activity/getActivitiesFromDate'](day.time);
      });
    },
    saveActivity(response) {
      this.setOpen(false);

      if (!response) {
        // Display error msg
      }
    },
    startDate(activity) {
      const date = new Date(activity.date);
      return date.getHours() + 'h' + date.getMinutes();
    },
    endDate(activity) {
      const date = new Date(activity.endDate);
      return date.getHours() + 'h' + date.getMinutes();
    },
    categoryName(id) {
      const category = this.$store.getters['category/getCategory'](id);
      return category ? category.title : '';
    }
  },
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

ion-slide {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.cards {
    width: 100%;
    height: 80%;
    overflow: scroll;
}

.cards ion-card {
  width: 90%;
  margin: 15px auto;
}
</style>