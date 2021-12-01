<template>
  <div class="actvity-list">
    <activity-list-item
      v-for="item in items"
      :activity="item"
      :key="item.id"
    ></activity-list-item>
  </div>
</template>

<script>
import ActivityListItem from "./ActivityListItem.vue";

export default {
  props: {
    date: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  components: {
    ActivityListItem,
  },
  mounted() {
    this.getUserPlannedActivities();
  },
  methods: {
    getUserPlannedActivities() {
      if (this.$store.state.activity.activities === null || this.$store.state.activity.activities.length === 0) {
        this.$store
          .dispatch("activity/getActivities", this.currentUserId)
          .then(() => {
            this.items = this.$store.getters["activity/getActivitiesFromDate"](this.date);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.items = this.$store.getters["activity/getActivitiesFromDate"](this.date);
      }
    },
  },
};
</script>