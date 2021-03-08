<template>
    <ion-card class="analysis" @click="moreDataAnalysis">

    </ion-card>
</template>

<script lang="ts">
import { IonCard } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'PartialAnalysis',
    components : { IonCard },
    props:  {
        userId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            prevWeek: {},
            currentWeek: {},
        };
    },
    methods: {
        moreDataAnalysis() {
            this.$router.push({name: 'CompleteAnalysis'})
        },
        getWeeksData(userId: number) {
            // TODO: service request from userId
            if (userId) {
                this.prevWeek = {
                    date: new Date(),
                    userId: userId,
                    activities: []
                };
                this.currentWeek = {
                    date: new Date(),
                    userId: userId,
                    activities: []
                };
            }
        }
    },
    mounted() {
        this.getWeeksData(this.userId);
    }
})
</script>