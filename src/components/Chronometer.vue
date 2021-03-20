<template>
    <div class="chronometer">
        <div> {{ activity.name }} </div>
        <div class="time">
            <span class="hour"> {{ hours }} h </span>
            <span class="minutes"> {{ minutes }} min </span>
            <span class="seconds"> {{ seconds }} s </span>
            <span class="mseconds"> {{ mseconds }}</span>
        </div>
        <div class="actions">
            <font-awesome-icon @click="resetTime" icon="undo"> Reset </font-awesome-icon>
            <font-awesome-icon @click="startTime" v-if="state == 'stop'" icon="play"> Start </font-awesome-icon>
            <font-awesome-icon @click="stopTime" v-else icon="pause"> Stop </font-awesome-icon>
            <font-awesome-icon @click="saveTime" icon="check"> Save </font-awesome-icon>
        </div>
    </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faUndo, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faPause, faUndo, faCheck);

export default {
    name: 'Chronometer',
    components: {FontAwesomeIcon},
    props: {
        activity: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            state: 'stop',
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
                this.state = 'start';
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
            this.state = 'stop';
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
    justify-content: space-between;
    align-items: center;
    margin: auto;
    height: 150px;
    min-width: 200px;
}

.chronometer .time {
    font-size: x-large;
}

.chronometer .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.chronometer .actions svg{
    font-size: 30px;
}

.actions > svg:first-child {
    color: var(--ion-color-danger);
}

.actions > svg:last-child {
    color: var(--ion-color-success);
}
</style>