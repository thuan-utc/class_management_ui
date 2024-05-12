<template>
    <div id="notification-container">
        <transition-group name="notification">
            <div v-for="(notification, index) in notifications" :key="index" class="alert"
                :class="'alert-' + notification.type">
                {{ notification.message }}
                <button type="button" class="close" @click="removeNotification(index)" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notifications: []
        };
    },
    methods: {
        showNotification(message, type = 'info') {
            this.notifications.push({ message, type });

            setTimeout(() => {
                this.notifications.shift();
            }, 5000);
            alert("test")
        },
        removeNotification(index) {
            this.notifications.splice(index, 1);
        }
    }
};
</script>

<style scoped>
#notification-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 9999;
    width: 300px;
}

.notification-enter-active,
.notification-leave-active {
    transition: opacity 0.5s;
}

.notification-enter,
.notification-leave-to {
    opacity: 0;
}
</style>