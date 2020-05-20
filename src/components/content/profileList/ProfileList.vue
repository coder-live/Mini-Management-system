<template>
  <div class= "profileData">  
      <!--  父组件需要传的值/事件
               title, visible: (f/t), 判断提交事件(添加/编辑 ) ,数据(编辑时的数据 scope.row)  
            子组件共享的值/事件
               before-close,model...,取消click
            子向父提交事件
               refresh提交事件()              -->
    <el-dialog 
      :title="title"
      :visible.sync="isShow"
      width="50%"
      :before-close="handleClose">
      <el-form :model="diaData" status-icon :rules= "rules" ref="diaData" label-width="100px" class="demo-addData">
        <el-form-item label="收支类型" prop="type">
          <el-select v-model="diaData.type" placeholder="请选择收支类型">
            <el-option label="餐饮服务" value="餐饮服务"></el-option>
            <el-option label="公司项目" value="公司项目"></el-option>
            <el-option label="出差费用" value="出差费用"></el-option>
            <el-option label="outing" value="outing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述" prop="descript">
          <el-input v-model= "diaData.descript"></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input v-model.number= "diaData.income"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="paid">
          <el-input v-model.number= "diaData.paid"></el-input>
        </el-form-item>
        <el-form-item label="账户现金" prop="cash">
          <el-input v-model.number= "diaData.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model= "diaData.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" class= "submit" @click="submitForm('diaData')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import {request} from '@/network/request';
export default {
  name: 'profileData',
  data() {
    return {
      rules: {
        type: [ { required: true, message: '请选择收支类型', trigger: 'change' } ],
        income: [ { required: true, message: '请输入收入', trigger: 'change' } ],
        paid: [ { required: true, message: '请输入支出', trigger: 'change' } ],
        cash: [ { required: true, message: '请输入账户现金', trigger: 'change' } ],
      }
    }
  },
  props: {
    diaData: Object,
    title: {
      type: String,
      default() {
        return '添加数据'
      }
    },
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    },
    isAdd: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
    //弹窗右上角事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //页面提交,与后台交互数据,  => 当前为增加数据
    submitForm(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          let url = this.isAdd ? "/api/profile/add" : ("/api/profile/edit/" + this.diaData._id)
          //console.log(url)
          request({
            method: "post",
            url,
            data: this.diaData
          }).then( (res) => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.$emit( 'fresh' );
          } );
        } else {
          console.log('error submit!!');
          return;
        }
      });
      // 改变弹出显示影藏
      // this.dialogVisible= false;
      //console.log(333);
    },
  }

}
</script>

<style scoped>
  
</style>