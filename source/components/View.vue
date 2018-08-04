<template>
    <el-container>
        <el-header height="5rem">
            Header
        </el-header>
        <el-container>
            <el-aside width="20rem">
                <el-menu class="el-menu-vertical-demo">
                    <template v-for="(menu, index) in menus">
                        <component :is="menu.component" :key="index" :index="index.toString()"
                                   @click="selectMenu(menu.name)">
                            <i class="el-icon-setting"></i>
                            <span>{{ capitalize(menu.name) }}</span>
                        </component>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view :key="key"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">

    import { Aside, Container, Header, Main, Menu, MenuItem, MenuItemGroup, Submenu } from 'element-ui'

    export default {

        components: {
            'el-container': Container,
            'el-aside': Aside,
            'el-header': Header,
            'el-menu': Menu,
            'el-menu-item': MenuItem,
            'el-menu-item-group': MenuItemGroup,
            'el-submenu': Submenu,
            'el-main': Main
        },
        props: {
            menus: {
                required: true,
                type: Array
            }
        },
        data() {
            return {
                key: null
            }
        },
        methods: {
            capitalize: item => item.replace(/\b\w/g, s => s.toUpperCase()),
            selectMenu(name: string) {
                this.$router.push(this.key = name)
                // const params = new URLSearchParams()
                // params.append('table', name)
                //
                // fetch('/api/data?' + params).then(response => {
                //     if (response.ok) {
                //         return response.json()
                //     }
                // }).then(data => {
                //     this.$router.push({ name: this.key = name, params: data })
                // })

            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>
