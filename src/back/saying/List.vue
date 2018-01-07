<template>
  <div>
    <el-row style="margin-top: 3rem;">
      <el-col :span="8">
        <el-input placeholder="请输入查询内容" v-model="query" clearable></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary"  @click="initSearch" round>查询</el-button>
      </el-col>
      <div style="float: right;">
        <el-button type="success" @click="openCreate" round>添加</el-button>
      </div>
    </el-row>

    <el-table :data="sayingList" stripe style="width: 100%;margin-top: 1rem;">
      <el-table-column type="index" :span="2"></el-table-column>
      <el-table-column label="类型" :span="4">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'A'">名言</span>
          <span v-else-if="scope.row.type == 'B'">经典</span>
          <span v-else-if="scope.row.type == 'C'">幽默</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="经典语录" :span="8"></el-table-column>
      <el-table-column prop="sayer" label="说者" :span="4"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" :span="6">
          <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="openDelete(scope.row.sayingId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 30px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="title" :visible.sync="isVisible" width="45%" center>
      <el-form ref="sayingForm" :model="sayingForm" :rules="rules" label-width="80px" style="margin: auto 5%;">
        <el-form-item label="内容" prop="content">
          <el-input v-model="sayingForm.content"></el-input>
        </el-form-item>
        <el-form-item label="说者" prop="sayer">
          <el-input v-model="sayingForm.sayer"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="sayingForm.type" placeholder="请选择类型">
            <el-option label="名言" value="A"></el-option>
            <el-option label="经典" value="B"></el-option>
            <el-option label="幽默" value="C"></el-option>
          </el-select>
        </el-form-item>
        <input type="hidden" v-model="sayingForm.sayingId" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="fun == 'handlCreate'" @click.native="handleCreate">确定</el-button>
        <el-button type="primary" v-else @click.native="handleEdit">确定</el-button>
        <el-button @click="isVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/api_saying";

export default {
  name: 'BackSaying',
  data () {
    return {
      isVisible: false,
      title: '',
      fun: '',
      sayingList: [],
      query: '',
      sayingForm: {
        content: '',
        sayer: '',
        type: ''
      },
      rules: {
        content: [{ required: true, message: '内容不能为空', trigger: 'blur'}],
        type: [{ required: true, message: '内容不能为空', trigger: 'blur'}]
      },
      loading: false,
      pageSize: 10,
      currentPage: 1,
      limit: 10,
      offset: 0,
      total: 0
    }
  },
  mounted() {
    this.initSearch();
  },
  watch: {
    isVisible(newValue, oldValue) {
      if(!newValue) {
        this.$refs['sayingForm'].resetFields();
      }
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
        'offset': that.offset,
        'query': that.query
      };

      that.loading = true;
      API.queryList(params).then(res => {
        that.loading = false;
        if(res && res.result) {
          that.total = res.total;
          that.sayingList = res.sayingList;
        }
      }, function(err) {
        that.loading = false;
      }).catch(function(err) {
        that.loading = false;
        that.$message.error({showClose: true, message: '请求出现异常：' + err , duration: 2000});
      });
    },
    openCreate: function() { // 添加框
      let that = this;
      that.title = '添加框';

      that.fun = 'handleCreate';
      that.isVisible = true;
    },
    handleCreate: function() {
      let that = this;
      that.$refs['sayingForm'].validate((valid) => {
        if(valid) {
          that.loading = true;
          let params = Object.assign({}, that.sayingForm);
          API.create(params).then(res => {
            that.loading = false;
            if(res && res.result) {
              that.$message.success({showClose: true, message: '新增成功', duration: 2000});
              that.isVisible = false;
              that.search();
            }
          },function(err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err, duration: 2000});
          }).catch(function(err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err, duration: 2000});
          })
        } else {
          that.$refs['sayingForm'].resetFields();
          return false;
        }
      })
    },
    openEdit: function(row) { // 编辑框
      let that = this;
      that.title = '修改框';
      that.sayingForm.content = row.content;
      that.sayingForm.sayer = row.sayer;
      that.sayingForm.type = row.type;
      that.sayingForm.sayingId = row.sayingId;

      that.fun = 'handleEdit';
      that.isVisible = true;
    },
    handleEdit: function() {
      let that = this;
      that.$refs['sayingForm'].validate((valid) => {
        if(valid) {
          that.loading = true;
          let params = Object.assign({}, that.sayingForm);
          API.edit(params).then(res => {
            that.loading = false;
            if(res && res.result) {
              that.$message({ type: 'success', message: '修改成功!' });
              that.isVisible = false;
              that.search();
            }
          },function(err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err, duration: 2000});
          }).catch(function(err) {
            that.loading = false;
            that.$message.error({showClose: true, message: err, duration: 2000});
          })
        } else {
          return false;
        }
      });
    },
    openDelete: function(sayingId) { // 确认框
      this.$confirm('确认是否删除该记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(sayingId);
      });
    },
    handleDelete: function(sayingId) {
      let that = this;
      let params = { 'sayingId': sayingId };
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
    }
  }
}
</script>
