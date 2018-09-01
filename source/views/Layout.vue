<template>
    <el-container>
        <el-aside width="200px">
            <el-menu background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
                    <el-menu-item-group>
                        <template slot="title">Group 1</template>
                        <el-menu-item index="1-1">Option 1</el-menu-item>
                        <el-menu-item index="1-2">Option 2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group 2">
                        <el-menu-item index="1-3">Option 3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">Option4</template>
                        <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
                    <el-menu-item-group>
                        <template slot="title">Group 1</template>
                        <el-menu-item index="2-1">Option 1</el-menu-item>
                        <el-menu-item index="2-2">Option 2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group 2">
                        <el-menu-item index="2-3">Option 3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">Option 4</template>
                        <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
                    <el-menu-item-group>
                        <template slot="title">Group 1</template>
                        <el-menu-item index="3-1">Option 1</el-menu-item>
                        <el-menu-item index="3-2">Option 2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group 2">
                        <el-menu-item index="3-3">Option 3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <template slot="title">Option 4</template>
                        <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>View</el-dropdown-item>
                        <el-dropdown-item>Add</el-dropdown-item>
                        <el-dropdown-item>Delete</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>Tom</span>
            </el-header>
            <el-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="typescript">

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

<style lang="scss">
    S
    .el-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
