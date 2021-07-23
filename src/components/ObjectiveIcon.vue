<template>
    <span :class="classFromType">
        <font-awesome-icon :icon="icon"/>
    </span>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook, faDumbbell } from '@fortawesome/free-solid-svg-icons';

library.add(faBook, faDumbbell);

export default {
    name: 'ObjectiveIcon',
    props: {
        icon: {
            type: String,
            required: true
        },
        type: {
            type: Number,
            required: true
        }
    },
    components: { FontAwesomeIcon },
    computed: {
        classFromType() {
            let iconClass = "";
            switch(this.type) {
                case 2:
                    iconClass = 'cultural';
                    break;
                case 1:
                    iconClass = 'sports';
                break;
                case 3:
                    iconClass = 'work';
                break;
                case 4:
                    iconClass = 'leisure';
                break;
            }

            return iconClass;
        }
    },
}
</script>