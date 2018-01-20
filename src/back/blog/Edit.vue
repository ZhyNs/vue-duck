<template>
  <!-- ishljs 默认为true -->
  <div style="width: 100%; padding: 0 3px;">
    <div style="height: 30px;padding: 8px;">
      <el-button type="info" @click="handleBack" style="float: left; padding: 6px 12px;" round>返回</el-button>

      <div style="float: right;">
        <el-button type="warning" @click="handleTopublish" style="padding: 6px 12px;" round>存为草稿箱</el-button>
        <el-button type="success" @click="handlePublish" style="padding: 6px 12px;" round>发布</el-button>
      </div>
    </div>
    <div style="height: 40px; font-size: 14px;">
        <el-input v-model="blog.title" placeholder="标题"></el-input>
    </div>
    <mavon-editor :ishljs = "true" style="height: 100%" v-model="blog.content"></mavon-editor>
  </div>
</template>

<script>
import API_BLOG from '@/api/api_blog'

export default {
  name: 'BackBlogEdit',
  data () {
    return {
      content: '',
      loading: true,
      blog: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    handleBack: function() {
      history.back();
    },
    handlePublish: function() {
      let that = this;
      if(that.loading) {
        let params = Object.assign({}, that.blog);
        API_BLOG.publish(params).then(res => {
          that.loading = false;
          if(res && res.result) {
            that.$message.success({showClose: true, message: '博客发布成功', duration: 2000});
            that.$router.push({ path: '/back/blog' });
          } else {
            that.$message({type: 'error', showClose: true, message: res.msg});
          }
        },function(err) {
          that.loading = false;
          that.$message({type: 'error', showClose: true, message: '请求失败：' + err});
        }).catch(function(err) {
          that.loading = false;
          that.$message.error({showClose: true, message: '请求异常' + err, duration: 2000});
        })
      }
    },
    handleTopublish: function() {
      let that = this;
      if(that.loading) {
        let params = Object.assign({}, that.blog);
        API_BLOG.topublish(params).then(res => {
          that.loading = false;
          console.log(res);
          if(res && res.result) {
            that.$message.success({showClose: true, message: '草稿箱保存成功', duration: 2000});
            that.$router.push({ path: '/back/blog' });
          } else {
            that.$message({type: 'error', showClose: true, message: res.msg});
          }
        },function(err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err, duration: 2000});
        }).catch(function(err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err, duration: 2000});
        })
      }
    }
  },
  mounted() {
    let that = this;
    let blogId = that.$route.params.blogId;

    if(blogId != null && blogId != '') {
      let params = {'blogId': blogId};
      API_BLOG.get(params).then(res => {
        if(res && res.result) {
          that.blog.title = res.title;
          that.blog.content = res.content;
        } else {
          that.blog.content = '## 该文章不存在或已删除';
        }
      }, function(err) {
        that.$message.error({showClose: true, message: '请求失败：' + err , duration: 2000});
      }).catch(function(err) {
        that.$message.error({showClose: true, message: '请求异常：' + err , duration: 2000});
      });
    }
  }
}
</script>
