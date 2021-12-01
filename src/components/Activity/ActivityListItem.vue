<template>
  <div class="activity-list-item">
		<p>Name: {{ activity.name }}</p>
		<p>Category: {{ activity.category }}</p>
		<p>Date: {{ activity.date }}</p>
		<p>EndDate: {{ activity.endDate }}</p>
	</div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
};
</script>