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
        <div class="objective" v-for="(activity, index) in activities" :key="activity.id">
          <div class="hour"> {{ activity.date }} - {{ activity.endDate }}</div>
          <div class="program">
            <objective-icon :icon="activity.icon" :type="activity.parent"/>
            <p> {{ activity.name }} </p>
            <ion-fab horizontal="end" :class="{'inactive': activity.passedTime == activity.plannedTime}">
              <ion-fab-button size="small" :color="getBtnColorFromActivity(activity)">
                <font-awesome-icon :icon="getIconfromActivity(activity)"></font-awesome-icon>
              </ion-fab-button>
              <ion-fab-list side="top">
                <ion-fab-button @click="startTime(index)"><font-awesome-icon icon="hourglass-start"></font-awesome-icon></ion-fab-button>
              </ion-fab-list>
              <ion-fab-list side="bottom">
                <ion-fab-button @click="endActivity(index)"><font-awesome-icon icon="hourglass-end"></font-awesome-icon></ion-fab-button>
              </ion-fab-list>
              <ion-fab-list side="start">
                <ion-fab-button @click="setTime(index)"><font-awesome-icon icon="hourglass-half"></font-awesome-icon></ion-fab-button>
              </ion-fab-list>
            </ion-fab>
          </div>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonFabList } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMugHot, faHourglass, faHourglassHalf, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import ObjectiveIcon from '@/components/ObjectiveIcon.vue';

library.add(faMugHot, faHourglass, faHourglassHalf, faHourglassStart, faHourglassEnd);

interface State {
  today: string;
  activities: [{
    id: number;
    parent: number;
    icon: string;
    name: string;
    date: string;
    endDate: string;
    plannedTime: number;
    passedTime: number;
  }] | null;
}

export default  {
  name: 'DayObjectives',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonFabList, FontAwesomeIcon, ObjectiveIcon },
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
            passedTime: 3600000
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

        const endDate = new Date(value.date.getTime() + value.plannedTime);
        const endhour = endDate.getHours() < 10 ? "0" + endDate.getHours() : endDate.getHours();
        const endminutes = endDate.getMinutes() < 10 ? "0" + endDate.getMinutes() : endDate.getMinutes() ;
        newVal.endDate = endhour + "H" + endminutes;

        return newVal;
      });

      return response;
    },
    getActivities(): void {
      this.activities = this.getDayOfWeek();
      console.log(this.activities)
    },
    getIconfromActivity(activity) {
      let icon = "";

      // ! When changing activity passed time, icon isn't updated on front ??

      if (activity.passedTime == 0) {
        icon = "hourglass-start";
      } else if (activity.passedTime == activity.plannedTime) {
        icon = "hourglass-end";
      } else {
        icon = "hourglass-half";
      }

      return icon;
    },
    getBtnColorFromActivity(activity) {
      return activity.passedTime == activity.plannedTime ? "medium" : "primary";
    },
    startTime(index) {
      // TODO: activate chrono
    },
    setTime(index) {
      // TODO: open modal where editing time passed on activity
    },
    endActivity(index) {
      // TODO: send info to api + add points to user
      this.activities[index].passedTime = this.activities[index].plannedTime;
    }
  },
  mounted() {
    this.getActivities();
  }
}
</script>