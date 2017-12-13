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
      <el-table-column prop="type" label="类型" :span="8"></el-table-column>
      <el-table-column prop="content" label="经典语录" :span="8"></el-table-column>
      <el-table-column prop="sayer" label="说者" :span="8"></el-table-column>
    </el-table>

    <el-dialog title="添加框" :visible.sync="isVisible" width="45%" center>
      <el-form ref="sayingAddForm" :model="saying" label-width="80px" style="margin: auto 5%;">
        <el-form-item label="内容" :rules="[{ required: true, message: '内容不能为空'}]">
          <el-input v-model="saying.content"></el-input>
        </el-form-item>
        <el-form-item label="说者">
          <el-input v-model="saying.sayer"></el-input>
        </el-form-item>
        <el-form-item label="类型" :rules="[{ required: true, message: '内容不能为空'}]">
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
      sayingList: [{"limit":0,"offset":0,"sayingId":1,"content":"失败是成功之母","sayer":"","type":"A","modifyUser":null}],
      keyWord: '',
      limit: 10,
      offset: 0,
      total: 0,
      saying: {
        content: '',
        sayer: '',
        type: ''
      },
      loading: false
    }
  },
  methods: {
    initSearch: function() {
      this.offset = 0;
      this.limit = 10;
      this.search();
    },
    search: function() {
      let that = this;
      let params = {
        limit: 10,
        offset: this.offset,
        keyWord: this.keyWord
      };

      that.loading = true,
      API.queryList(params).then(function(result) {
        that.loading = false;
        if(result && result.sayingList) {
          this.total = result.total;
          this.sayingList = result.sayingList;
        }
      }, function(error) {
        that.loading = false;
        console.log(error);
      }).catch(function(error) {
        that.loading = false;
        this.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
      });
    },
    create: function() {
      let that = this;
      that.$refs['sayingAddForm'].validate((valid) => {
        if(valid) {
          that.loading = true;
          let params = Object.assign({}, this.saying);
          API.create(params).then(function(data) {
            that.loading = false;
            if(data && data.result) {
              that.$message.success({showClose: true, message: '新增成功', duration: 2000});
              that.$refs['sayingAddForm'].resetFields();
              that.isVisible = false;
              that.search();
            }
          },function(error) {
            that.loading = false;
            that.$message.error({showClose: true, message: error.toString(), duration: 2000});
          }).catch(function(error) {
            that.loading = false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          })
        } else {
          console.log('error submit!');
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
