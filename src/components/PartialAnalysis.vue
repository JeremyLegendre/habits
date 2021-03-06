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
        getWeeksData() {
            this.prevWeek = {};
            this.currentWeek = {};
        }
    },
    mounted() {
        this.getWeeksData();
    }
})
</script>