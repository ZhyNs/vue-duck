<template>
  <el-container class="main">
      <el-header>{{ head }}</el-header>
      <el-container style="width: 100%; margin: 0 auto; height: 100vh; padding-top: 8rem; background-color: #fff;">
        <BackNav v-show="this.$store.state.backHomeNavShow"></BackNav>
        <router-view name="home_container"></router-view>
          <el-main v-show="this.$store.state.backHomeNavShow">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
import BackNav from '@/back/Nav'

import API_SAY from '@/api/api_saying'

export default {
  name: 'BackHome',
  components: {
    BackNav
  },
  data() {
    return {
      head: ''
    }
  },
  mounted() {
    this.getSaying();
  },
  methods: {
    getSaying: function() {
      API_SAY.get().then(res => {
        if(res && res.result) {
          this.head = res.content;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      if(to.path.indexOf('/back/blog/edit') > -1) {
        this.$store.commit('backHomeNavShow', false);
      } else {
        this.$store.commit('backHomeNavShow', true);
      }
    }
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
    font-size: 16px;
    letter-spacing: 2px;
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
