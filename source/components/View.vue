<template>
    <div :class="$style.viewItems">
        <ul>
            <li v-for="(menu, index) in menus" :key="index">
                {{ menu }}
            </li>
        </ul>
        <div>
            Header
            <div></div>
        </div>
    </div>
</template>

<script lang="ts">

    export default {
        components: {},
        data() {
            return {
                inputs: {}
            }
        },
        props: {
            menus: {
                required: true,
                type: Array
            }
        },
        computed: {
            components() {
                return Object.keys(this.inputs)
            }
        },
        beforeRouteEnter(to, from, next) {

            fetch('/api/home?schema=true')
                .then(response => response.json())
                .then(data => next(vm => vm.inputs = data))

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
