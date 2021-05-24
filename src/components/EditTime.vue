<template>
    <div class="timer">
        <font-awesome-icon class="close-modal" @click="$emit('closeModal')" icon="times" />
        <div> {{ activity.name }} </div>
        <div class="inputs">
            <ion-item>
                <ion-label position="floating">hours</ion-label>
                <ion-select @ionChange="hours = $event.target.value" interface="popover" class="hour" :value="hours">
                    <ion-select-option v-for="(n, i) in 24" :key="i" :value="i"> {{i}}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-label position="floating">minutes</ion-label>
                <ion-select @ionChange="minutes = $event.target.value" interface="popover" class="minutes" :value="minutes">
                    <ion-select-option v-for="(n, i) in 60" :key="i" :value="i"> {{i}}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-label position="floating">seconds</ion-label>
                <ion-select @ionChange="seconds = $event.target.value" interface="popover" class="seconds" :value="seconds">
                    <ion-select-option v-for="(n, i) in 60" :key="i" :value="i"> {{i}}</ion-select-option>
                </ion-select>
            </ion-item>
        </div>
        <font-awesome-icon icon="check" @click="saveTime"/>
    </div>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faTimes);


export default {
    name: 'EditTime',
    components: {IonSelect, IonSelectOption, IonItem, IonLabel, FontAwesomeIcon},
    props: {
        activity: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    },
    methods: {
        saveTime() {
            let result = 0;
            result += this.seconds ? this.seconds * 1000 : 0;
            result += this.minutes ? this.minutes * 60000 : 0;
            result += this.hours ? this.hours * 3600000 : 0;

            this.$emit('onSave', { activity: this.activity, time: result});
        }
    }
}
</script>

<style scoped>
.timer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    height: 150px;
    min-width: 200px;
}

.inputs{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

svg {
    color: var(--ion-color-success);
}

.close-modal {
    color: black;
    position: absolute;
    top: 15px;
    right: 15px;
}
</style>