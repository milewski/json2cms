<template>
    <div :class="$style.viewItems">
        <ul>
            <li v-for="(menu, index) in menus" :key="index">
                {{ menu }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    export default {
        components: {},
        props: {
            menus: {
                required: true,
                type: Array
            }
        },
        mounted() {
            console.log(this.$style)
        }
    }
</script>

<style lang="scss" module>

    .view {

        background: red;

        &__menu {
            background: green;
        }

    }

</style>
