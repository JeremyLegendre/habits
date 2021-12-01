export default {
    methods: {
        displayErrorMessage(msg = '') {
            console.log(msg);
        }
    },
    computed: {
        currentUserId() {
            return this.$store.state.user && this.$store.state.user.user && this.$store.state.user.user.userId ? this.$store.state.user.user.userId : 0;
        }
    }
}