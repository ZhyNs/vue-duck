<template>
  <el-container>
      <el-header>
          head
      </el-header>
      <el-container style="width: 80%; margin: 0 auto; height: 100vh; padding-top: 8rem;">
          <el-aside style="width: 250px;height: 100%; overflow: hidden;">
              <BackNav></BackNav>
          </el-aside>
          <el-main>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
import BackNav from '@/back/Nav'

export default {
  name: 'BackHome',
  components: {
      BackNav
  }
}
</script>

<style scoped>
.el-header {
    border-bottom: solid 1px #f6f6f6;
}

/* .el-menu {
    border-left: solid 1px #e6e6e6;
} */

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

/* .el-main {
    border-right: solid 1px #e6e6e6;
} */
</style>
