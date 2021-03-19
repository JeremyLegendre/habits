<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="account" href="/tabs/account">
          <font-awesome-icon icon="user-circle" />
          <ion-label>Mon compte</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="day" href="/tabs/day">
          <font-awesome-icon icon="list"/>
          <ion-label>Objectif du jour</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="plan" href="/tabs/plan">
          <font-awesome-icon icon="calendar-week" />
          <ion-label>Planifier</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faCalendarWeek, faList } from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faCalendarWeek, faList);

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage, FontAwesomeIcon },
}
</script>