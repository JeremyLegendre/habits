<template>
  <ion-content>
    <font-awesome-icon class="close-modal" @click="$emit('cancel')" icon="times" />
    <div class="categories">
      <ion-card :key="category.id" v-for="category in categories">
        <ion-title :class="{'selected': activity.category == category.id}" @click="activity.category = category.id">{{ category.title }}</ion-title>
      </ion-card>
    </div>
    <div class="dates">
      <ion-item id="start-time">
        <ion-label>Commencer à </ion-label>
        <ion-datetime display-format="h:mm A" picker-format="h:mm A" :value="activity.date" display-timezone="Europe/Paris"></ion-datetime>
      </ion-item>
      <ion-item id="duration">
        <ion-label>Fin </ion-label>
        <ion-datetime display-format="h:mm A" picker-format="h:mm A" :value="activity.endDate" display-timezone="Europe/Paris"></ion-datetime>
      </ion-item>
    </div>
    <font-awesome-icon icon="check" @click="saveActivity"/>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonCard, IonItem, IonDatetime, IonLabel, IonTitle } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import activityService from '../services/activity';

library.add(faCheck, faTimes);

export default {
  name: "AddActivity",
  components: { IonContent, IonCard, IonItem, IonDatetime, IonLabel, IonTitle, FontAwesomeIcon },
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activity: {
        category: 0,
        name: "",
        date: new Date(this.day.time).toString(),
        endDate: new Date(this.day.time + 3600000).toString(),
        passedTime: 0,
        plannedTime: 3600000
      },
      categories: null,
      subCategories: null
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.categories = this.$store.state.category.categories;
      this.subCategories = this.$store.state.category.subCategories;
    },
    setCategory(category) {
      this.activity.category = category.id;
      this.activity.name = category.name; // TODO: add possibility to edit activity title
    },
    async saveActivity() {
      if (this.activity.category) {
        // TODO: reformat date
        const params = this.activity;
        params.user = 1;

        const response = await activityService.postActivity(params);

        this.$emit('saveAndClose', {
          response: response
        });
      } else {
        // TODO: display error msg
      }
    }
  }
}
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.categories ion-card {
  height: 90px;
  margin: 10px;
  width: 43%;
}

.categories ion-card ion-title {
  width: 100%;
  padding: 0;
  transition: all .3s;
}

ion-title.selected {
  color: var(--ion-color-primary-contrast);
  background-color: var(--ion-color-primary);
}
</style>