<template>
  <ion-page>
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
      <ion-list>
        <div v-for="n in 24" :key="n">
          {{ n }}
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue';

interface State {
  today: Date;
  activities: [{
    id: number;
    name: string;
    date: Date;
    plannedTime: number;
    passedTime: number;
  }] | null;
}

export default  {
  name: 'DayObjectives',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList },
  data: (): State => {
    return {
      today: new Date(),
      activities: null,
    }
  },
  methods: {
    getDayOfWeek(): any {
      // use today date
      return {
        response: [
          {
            id: 1,
            parent: 0,
            name: "Lecture Nietzsche",
            date: new Date(),
            plannedTime: 3600000,
            passedTime: 0
          },
          {
            id: 3,
            parent: 1,
            name: "Musculation Abdos",
            date: new Date(),
            plannedTime: 1800000,
            passedTime: 0
          }
        ]
      };
    },
    getActivities(): void {
      const data = this.getDayOfWeek();
      this.activities = data.response;
    }
  },
  mounted() {
    this.getActivities();
  }
}
</script>