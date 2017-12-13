<template>
  <el-container class="main">
      <el-header>
          head
      </el-header>
      <el-container style="width: 1200px; margin: 0 auto; height: 100vh; padding-top: 8rem; background-color: #fff;">
          <el-aside style="width: 200px;height: 100%; overflow: hidden;">
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
.el-container,.main {
    background-color: #f3f3f3;
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
    background-color: #fff;
    border-bottom: solid 1px #e6e6e6;
}

.el-aside {
    overflow: auto;
}

/* .el-main {
    border-right: solid 1px #e6e6e6;
} */
</style>
