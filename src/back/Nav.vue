<template>
<el-menu style="height: 100%; padding-top: 3rem;">
    <el-submenu index="1" style="margin-top: 1.5rem;">
        <template slot="title">
            <span>My</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="1-1">
                <a>简介</a>
            </el-menu-item>
            <el-menu-item index="1-2">
                <a>简历</a>
            </el-menu-item>
            <el-menu-item index="1-2">
                <a>修改密码</a>
            </el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
        <span slot="title">博客管理</span>
    </el-menu-item>
    <el-menu-item index="3">
        <span slot="title">留言板</span>
    </el-menu-item>
    <router-link to="saying">
    <el-menu-item index="3">
        <span slot="title">经典语录</span>
    </el-menu-item>
    </router-link>
    <el-menu-item index="4">
        <span slot="title">菜单管理</span>
    </el-menu-item>
    <el-menu-item index="5">
        <span slot="title">权限管理</span>
    </el-menu-item>
    <el-menu-item index="6">
        <span slot="title">标签管理</span>
    </el-menu-item>
</el-menu>
</template>

<script>
export default {
  name: 'BackNav'
}
</script>
