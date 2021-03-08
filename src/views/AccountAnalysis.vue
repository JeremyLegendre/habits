<template>
<ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true"></ion-content>
</ion-page>
</template>

<script lang="ts">
import {IonPage, IonHeader, IonContent} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonPage, IonHeader, IonContent}
})
</script>