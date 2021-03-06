<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="account" href="/tabs/account">
          <ion-icon :icon="person" />
          <ion-label>Mon compte</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="day" href="/tabs/day">
          <ion-icon :icon="listOutline"></ion-icon>
          <ion-label>Objectif du jour</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="plan" href="/tabs/plan">
          <ion-icon :icon="calendar" />
          <ion-label>Planifier</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { person, listOutline, calendar } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      person,
      listOutline,
      calendar,
    }
  }
}
</script>