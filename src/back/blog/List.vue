<template>
  <div style="padding-right: 30px;">
    <el-row style="margin-top: 3rem;">
      <div style="float: right;">
        <el-button type="primary" @click="handleEdit" round>写博客</el-button>
      </div>
    </el-row>

    <el-table :data="blogList" stripe style="width: 100%;margin-top: 1rem;">
      <el-table-column type="index" :span="2"></el-table-column>
      <el-table-column prop="blogId" label="博客id" :span="2"></el-table-column>
      <el-table-column prop="title" label="标题" :span="12"></el-table-column>
      <el-table-column label="发布状态" :span="3">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'publish'">发布</span>
          <span v-else-if="scope.row.status == 'topublish'">草稿箱</span>
        </template>
      </el-table-column>
      <el-table-column prop="pv" label="PV" :span="3"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" :span="2">
          <el-button size="mini" @click="handleEdit(scope.row.blogId)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" :span="2">
          <el-button size="mini" type="danger" @click="openDelete(scope.row.blogId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 30px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/api/api_blog";

export default {
  name: 'BackBlog',
  data () {
    return {
      loading: false,
      blogList: [],
      pageSize: 10,
      currentPage: 1,
      limit: 10,
      offset: 0,
      total: 0
    }
  },
  methods: {
    initSearch: function() {
      this.pageSize = 10;
      this.offset = 0;
      this.search();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.offset = (this.currentPage - 1) * this.pageSize;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.pageSize;
      this.search();
    },
    search: function() {
      let that = this;
      let params = {
        'limit': that.pageSize,
        'offset': that.offset
      };

      that.loading = true;
      API.queryList(params).then(res => {
        that.loading = false;
        if(res && res.result) {
          that.total = res.total;
          that.blogList = res.blogList;
        }
      }, function(err) {
        that.loading = false;
        that.$message.error({showClose: true, message: '请求失败：' + err , duration: 2000});
      }).catch(function(err) {
        that.loading = false;
        that.$message.error({showClose: true, message: '请求异常：' + err , duration: 2000});
      });
    },
    openDelete: function(blogId) { // 确认框
      this.$confirm('确认是否删除该记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(blogId);
      });
    },
    handleDelete: function(blogId) {
      let that = this;
      let params = { 'blogId': blogId };
      if(that.loading) {
        return false;
      }
      that.loading = true;
      API.delete(params).then(res => {
        that.loading = false;
        if(res && res.result) {
          this.$message({ type: 'success', message: '删除成功!' });
          that.search();
        }
      }, function(err) {
        that.loading = false;
        that.$message.error({showClose: true, message: err, duration: 2000});
      }).catch(function(err) {
        that.loading = false;
        that.$message.error({showClose: true, message: err, duration: 2000});
      })
    },
    handleEdit: function(blogId) {
      console.log(arguments.length);
      if(blogId != null && blogId != '' && typeof(blogId) == 'number') {
        this.$router.push({ name: 'backBlogEdit', params: {'blogId': blogId} });
      } else {
        this.$router.push({ name: 'backBlogEdit' });
      }
    }
  },
  mounted() {
    this.initSearch();
  }
}
</script>
