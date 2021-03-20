<template>
    <div class="chronometer">
        <p> {{ activity.name }} </p>
        <div class="time">
            <span class="hour"> {{ hours }} h </span>
            <span class="minutes"> {{ minutes }} min </span>
            <span class="seconds"> {{ seconds }} s </span>
            <span class="mseconds"> {{ mseconds }}</span>
        </div>
        <div class="actions">
            <ion-button @click="startTime"> Start </ion-button>
            <ion-button @click="stopTime"> Stop </ion-button>
            <ion-button @click="resetTime"> Reset </ion-button>
            <ion-button @click="saveTime"> Save </ion-button>
        </div>
    </div>
</template>

<script lang="ts">
import {IonButton} from '@ionic/vue'

export default {
    name: 'Chronometer',
    components: {IonButton},
    props: {
        activity: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            timer: null,
            hours: 0,
            minutes: 0,
            seconds: 0,
            mseconds: 0,
        }
    },
    methods: {
        startTime(){
            this.timer = setInterval((function() {
                this.updateTime()
            }).bind(this), 100);
        },
        updateTime() {
            this.mseconds += 1;

            if (this.time == this.activity.plannedTime) {
                this.saveTime();
            } else {
                if (this.mseconds == 10) {
                    this.mseconds = 1;
                    this.seconds += 1;
                }

                if (this.seconds == 60) {
                    this.seconds = 0;
                    this.minutes += 1;
                }

                if (this.minutes == 60) {
                    this.minutes = 0;
                    this.hours += 1;
                }
            }
        },
        stopTime(){
            clearInterval(this.timer);
        },
        resetTime(){
            this.stopTime();
            this.time = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.mseconds = 0;
        },
        saveTime(){
            this.stopTime();

            // Close modal, convert all to ms
            let result = this.mseconds;
            result += this.seconds ? this.seconds * 1000 : 0;
            result += this.minutes ? this.minutes * 60000 : 0;
            result += this.hours ? this.hours * 3600000 : 0;
            this.$emit('onSave', { activity: this.activity, time: result});
        },
    }
}
</script>

<style scoped>
.chronometer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
}
</style>