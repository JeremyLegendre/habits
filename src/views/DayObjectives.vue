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
            <objective-icon :icon="getCategoryIcon(activity.category)" :type="getCategoryType(activity.category)"/>
            <p> {{ activity.name }} </p>
            <ion-fab horizontal="end" :class="{'inactive': activity.passedTime >= activity.plannedTime}">
              <ion-fab-button size="small" :color="getBtnColorFromActivity(activity)">
                <font-awesome-icon v-if="isCorrectIcon(activity, 'start')" icon="hourglass-start"></font-awesome-icon>
                <font-awesome-icon v-if="isCorrectIcon(activity, 'end')" icon="hourglass-end"></font-awesome-icon>
                <font-awesome-icon v-if="isCorrectIcon(activity, 'half')" icon="hourglass-half"></font-awesome-icon>
              </ion-fab-button>
              <ion-fab-list side="top">
                <ion-fab-button @click="startTime(activity)">
                  <font-awesome-icon icon="hourglass-start" />
                </ion-fab-button>
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
      <ion-modal
        :is-open="isOpenRef"
      >
        <chronometer v-if="modal == 'chrono'" @onSave="saveAndClose($event)" @closeModal="closeModal" :activity="chosenActivity"></chronometer>
        <edit-time v-else @onSave="saveAndClose($event)" @closeModal="closeModal" :activity="chosenActivity"></edit-time>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonFabList, IonModal } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMugHot, faHourglass, faHourglassHalf, faHourglassStart, faHourglassEnd, faTimes } from '@fortawesome/free-solid-svg-icons';
import ObjectiveIcon from '@/components/ObjectiveIcon.vue';
import Chronometer from '@/components/Chronometer.vue';
import EditTime from '@/components/EditTime.vue';

library.add(faMugHot, faHourglass, faHourglassHalf, faHourglassStart, faHourglassEnd, faTimes);

interface State {
  today: string;
  activities: [{
    id: number;
    category: number;
    name: string;
    date: string;
    endDate: string;
    plannedTime: number;
    passedTime: number;
  }] | null;
  chosenActivity: any;
  modal: string;
}

export default  {
  name: 'DayObjectives',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonFabList, IonModal, FontAwesomeIcon, ObjectiveIcon, Chronometer, EditTime },
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
      chosenActivity: null,
      modal: "chrono"
    }
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => { isOpenRef.value = state };
    return { isOpenRef, setOpen }
  },
  mounted() {
    this.getActivities();
  },
  methods: {
    getActivities(): void {
      this.activities = this.getDayOfWeek();
    },
    getDayOfWeek(): any {
      // use today date
      const data = {
        response: [
          {
            id: 3,
            category: 6,
            name: "Musculation Abdos",
            date: new Date(2021, 2, 16, 10, 30, 0),
            plannedTime: 1800000,
            passedTime: 0
          },
                    {
            id: 2,
            category: 5,
            name: "Lecture Isaac Asimov",
            date: new Date(2021, 2, 16, 16, 0, 0),
            plannedTime: 900000,
            passedTime: 0
          },
          {
            id: 0,
            category: 5,
            name: "Lecture Nietzsche",
            date: new Date(2021, 2, 16, 8, 0, 0),
            plannedTime: 3600000,
            passedTime: 3600000
          }
        ]
      };

      data.response = data.response.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });

      const response = data.response.map((value) => {
        const newVal: any = {
          id: value.id,
          category: value.category,
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
    isCorrectIcon(activity, type): boolean {
      let isCorrectIcon = false;

      if (activity.passedTime == 0 && type == 'start') {
        isCorrectIcon = true;
      } else if (activity.passedTime >= activity.plannedTime && type == 'end') {
        isCorrectIcon = true;
      } else if (activity.passedTime > 0 && activity.passedTime < activity.plannedTime && type == 'half') {
        isCorrectIcon = true;
      }

      return isCorrectIcon;
    },
    getCategoryIcon(categoryId) {
      const icon = this.$store.getters['category/getCategory'](categoryId).icon;

      return icon ? icon : "book";
    },
    getCategoryType(categoryId) {
      let type = 0;
      const category = this.$store.getters['category/getCategory'](categoryId);

      if (category) {
        if (category.parent == 0) {
          type = category.id
        } else {
          type = category.parent
        }
      }
      return type;
    },
    getBtnColorFromActivity(activity): string {
      return activity.passedTime >= activity.plannedTime ? "medium" : "primary";
    },
    startTime(activity): void {
      this.modal = "chrono";
      this.chosenActivity = activity;
      this.setOpen(true);
    },
    setTime(index): void {
      this.modal = "edit-time";
      this.chosenActivity = this.activities[index];
      this.setOpen(true);
    },
    endActivity(index): void {
      this.activities[index].passedTime = this.activities[index].plannedTime;
    },
    closeModal(): void {
      this.setOpen(false);
      this.modal = "";
    },
    saveAndClose(data): void {
      for (const index in this.activities) {
        if (this.activities[index].id == data.activity.id) {
          this.activities[index].passedTime += data.time;
        }
      }
      this.setOpen(false);
      this.modal = "";
    }
  },
}
</script>

<style scoped>

.today-objectives .date {
    margin: 20px auto;
    width: fit-content;
}

.today-objectives .hour {
    display: inline-block;
}

.today-objectives .objective {
    margin: 60px 10px;
}

.today-objectives .program {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0 10px 20px;
}

.today-objectives .program span {
    width: 15%;
}

.today-objectives .program p {
    padding: 5px;
    width: 225px;
    border-radius: 5px;
    text-align: center;overflow: hidden;
}

.today-objectives .program .cultural {
    color: var(--ion-color-success-shade);
}

.today-objectives .program .sports {
    color: var(--ion-color-danger-shade);
}

.today-objectives .program .leisure {
    color: var(--ion-color-primary);
}

.today-objectives .program .work {
    color: var(--ion-color-tertiary);
}

.today-objectives .empty-objectives {
    text-align: center;
    margin-top: 200px;
}

.empty-objectives > svg {
    font-size: 60px;
    color: antiquewhite;
}

ion-fab.inactive {
    pointer-events: none;
    cursor: not-allowed;
}
</style>