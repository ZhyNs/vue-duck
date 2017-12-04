<template>
  <el-container>
      <el-header>
          head
      </el-header>
      <el-container style="width: 80%; margin: 0 auto; height: 100vh; padding-top: 8rem;">
          <el-aside style="width: 250px;height: 100%; overflow: hidden;">
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
          </el-aside>
          <el-main>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'BackHome'
}
</script>

<style scoped>
.el-header {
    width: 100%;
    height: 8rem !important;
    line-height: 8rem;
    text-align: center;
    position: fixed;
}

.el-aside {
    overflow: auto;
}
</style>
