<template>
  <ion-page class="today-objectives">
    <ion-header>
      <ion-toolbar>
        <ion-title>Objectifs du jour</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Objectifs du jour</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="date">
        {{today}}
      </div>
      <ion-list v-if="activities">
        <div class="objective" v-for="activity in activities" :key="activity.id">
          <div class="hour"> {{ activity.date }}</div>
          <div class="program"> <objective-icon :icon="activity.icon" :type="activity.parent"/>  {{ activity.name }}</div>
        </div>
      </ion-list>
      <div v-else class="empty-objectives">
        <font-awesome-icon icon="mug-hot" />
        <p>Vous n'avez pas d'objectifs pour aujourd'hui...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import ObjectiveIcon from '@/components/ObjectiveIcon.vue';

library.add(faMugHot);

interface State {
  today: string;
  activities: [{
    id: number;
    parent: number;
    icon: string;
    name: string;
    date: string;
    plannedTime: number;
    passedTime: number;
  }] | null;
}

export default  {
  name: 'DayObjectives',
  components: { IonPage, FontAwesomeIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonList, ObjectiveIcon },
  data: (): State =>
  {
    return {
      today: new Date().toLocaleDateString('fr', {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
      activities: null,
    }
  },
  methods: {
    getDayOfWeek(): any {
      // use today date
      const data = {
        response: [
          {
            id: 0,
            parent: 0,
            icon: "book",
            name: "Lecture Nietzsche",
            date: new Date(2021, 2, 16, 8, 0, 0),
            plannedTime: 3600000,
            passedTime: 0
          },
          {
            id: 3,
            parent: 1,
            icon: "dumbbell",
            name: "Musculation Abdos",
            date: new Date(2021, 2, 16, 10, 30, 0),
            plannedTime: 1800000,
            passedTime: 0
          }
        ]
      };

      const response = data.response.map((value) => {
        const newVal: any = {
          id: value.id,
          parent: value.parent,
          icon: value.icon,
          name: value.name,
          plannedTime: value.plannedTime,
          passedTime: value.passedTime,
        };

        const hour = value.date.getHours() < 10 ? "0" + value.date.getHours() : value.date.getHours();
        const minutes = value.date.getMinutes() < 10 ? "0" + value.date.getMinutes() : value.date.getMinutes() ;
        newVal.date = hour + "H" + minutes;

        return newVal;
      });

      return response;
    },
    getActivities(): void {
      this.activities = this.getDayOfWeek();
    }
  },
  mounted() {
    this.getActivities();
  }
}
</script>