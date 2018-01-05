<template>
  <div>
    <el-row style="margin-top: 3rem;">
      <el-col :span="8">
        <el-input placeholder="请输入查询内容" v-model="keyWord" clearable></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" round>查询</el-button>
      </el-col>
      <div style="float: right;">
        <el-button type="success" @click="isVisible = true" round>添加</el-button>
        <el-button type="danger" round>删除</el-button>
      </div>
    </el-row>

    <el-table :data="sayingList" stripe style="width: 100%;margin-top: 1rem;">
      <el-table-column label="类型" :span="8">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'A'">名言</span>
          <span v-else-if="scope.row.type == 'B'">经典</span>
          <span v-else-if="scope.row.type == 'C'">幽默</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="经典语录" :span="8"></el-table-column>
      <el-table-column prop="sayer" label="说者" :span="8"></el-table-column>
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

    <el-dialog title="添加框" :visible.sync="isVisible" width="45%" center>
      <el-form ref="sayingAddForm" :model="saying" label-width="80px" style="margin: auto 5%;">
        <el-form-item label="内容" :rules="[{ required: true, message: '内容不能为空', trigger: 'blur'}]">
          <el-input v-model="saying.content"></el-input>
        </el-form-item>
        <el-form-item label="说者">
          <el-input v-model="saying.sayer"></el-input>
        </el-form-item>
        <el-form-item label="类型" :rules="[{ required: true, message: '内容不能为空', trigger: 'blur'}]">
          <el-select v-model="saying.type" placeholder="请选择类型">
            <el-option label="名言" value="A"></el-option>
            <el-option label="经典" value="B"></el-option>
            <el-option label="幽默" value="C"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="create">确定</el-button>
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
      sayingList: [],
      keyWord: '',
      saying: {
        content: '',
        sayer: '',
        type: ''
      },
      loading: false,
      pageSize: 10,
      currentPage: 1,
      limit: 10,
      offset: 0,
      total: 0
    }
  },
  methods: {
    initSearch: function() {
      this.offset = 0;
      this.limit = 10;
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
        limit: that.pageSize,
        offset: that.offset,
        keyWord: that.keyWord
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
    create: function() {
      let that = this;
      that.$refs['sayingAddForm'].validate((valid) => {
        if(valid) {
          that.loading = true;
          let params = Object.assign({}, this.saying);
          API.create(params).then(res => {
            that.loading = false;
            if(res && res.result) {
              that.$message.success({showClose: true, message: '新增成功', duration: 2000});
              that.$refs['sayingAddForm'].resetFields();
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
          that.$refs['sayingAddForm'].resetFields();
          return false;
        }
      })
    }
  },
  mounted() {
    this.initSearch();
  }
}
</script>
