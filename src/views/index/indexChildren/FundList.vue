<template>
  <div class= "fundList">
    <div class="date">
      <el-date-picker
        v-model="time" type="daterange" unlink-panels range-separator="至" 
        start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button class= "date_btn" type="primary" plain @click= 'timeBtn'>筛选</el-button>
    </div>
    <div class="add"><el-button size= "small" @click="add()" type="primary">添加</el-button></div>
    <el-table
    :data="profileData"
    border
    height="400"
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date"
        sortable
        width="130">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收支类型"
        prop="type"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-menu"></i>
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收支描述"
        prop="descript"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-data-analysis"></i>
          <span style="margin-left: 10px">{{ scope.row.descript }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收入"
        prop="income"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-s-finance"></i>
          <span style="margin-left: 10px">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="支出"
        prop="paid"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-s-order"></i>
          <span style="margin-left: 10px">{{ scope.row.paid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账户现金"
        prop="cash"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-wallet"></i>
          <span style="margin-left: 10px">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="备注"
        prop="remark"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-more"></i>
          <span style="margin-left: 10px">{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170" fixed= "right" v-if= 'isManager'>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-col :span= '24'>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync= "current_page"
          :page-sizes="page_sizes"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_total">
        </el-pagination>
      </el-col>
    </div>
    <!--dialog对话框组件位置-->
    <ProfileList :diaData= 'diaData' 
    :title= 'title' :isShow= 'dialogVisible' 
    :isAdd= 'isAdd' @fresh= 'update()'/>
  </div>

</template>

<script>
import ProfileList from '@/components/content/profileList/ProfileList'
import {request} from '@/network/request';
export default {
  name: 'fundList',
  // computed: {
  //   timed( date ) { 
  //     let time = new Date(date);
  //     return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  //   }
  // },
  computed: {
    isManager() {
      return this.$store.getters.user.identity === 'manager' ? true : false;
    }
  },
  data() {
    return {
      //日期数据
      time: '',
      //换页数据
      current_page: 1,
      //可以打开 并且更改当前页面最多 所存数据
      page_sizes: [5, 10, 15, 20],
      // 当前页面的数据 最多 条数
      page_size: 5,
      page_total: 0,

      //表格实际渲染数据
      profileData: [],
      //表格根据分页事件后当前页面数据过滤后的暂时数据
      pageData: [],
      //中间数据
      middleData: [],

      //需要传给dialog对话框的值
      diaData: {},
      dialogVisible: false,
      title: '添加数据',
      isAdd: true
    }
  },
  components: {
    ProfileList
  },
  methods: {
    //换页事件
    //当前页面的数据最多条数
    handleSizeChange(max) {
      this.profileData = this.pageData.filter( (item,index) => {
        return index < max ;
      } )
      this.page_size = max;
      console.log(`每页 ${max} 条`);
    },
    handleCurrentChange(page) {
      this.middleData = this.pageData.filter( (item, index) => {
        return index < this.page_size * page ;
      } );
      this.profileData = this.middleData.filter( (item, index) => {
        return index >= this.page_size * ( page - 1 ) ;
      } )
      console.log(`当前页: ${page}`);
    },
    timeBtn() {
      if( this.time ) {
        //设置中间数据的 数组
        let middleData= [];
        //let [startTime, endTime] = [ new Date( this.time[0] ), new Date( this.time[1]) ];
        //console.log( startTime, endTime ) ;
        middleData = this.pageData.filter( (item, index) => {
          //判断 数据中时间大于 时间筛选初时间  小于时间筛选末时间
          // console.log(new Date(item.date) ,'-', this.time[0],'-',this.time[1]);
          // console.log( new Date(item.date) < this.time[0], new Date(item.date) > this.time[0])
          return new Date(item.date) >= this.time[0];
        } );
        this.profileData = middleData.filter( (item, index) => {
          return new Date(item.date) <= this.time[1];
        } );
        console.log(this.profileData)
      }else{
        this.$message({message: '请选择时间'});
      }
    },
    // 添加事件
    add() {
      //给添加界面赋予空值
      this.diaData = {
        type: '',
        descript: '',
        income: '',
        paid: '',
        cash: '',
        remark: '',
      }
      //打开dialog
      this.dialogVisible = true;
    },
    //编辑事件
    handleEdit(index, row) {
      //编辑时给对话框传送的值( 里面的id为 _id )
      this.diaData = row;
      this.isAdd = false;
      //打开dialog
      this.dialogVisible = true;
      //console.log(index, row);
    },
    //添加或编辑后更新数据事件  
    update() {
      this.dialogVisible = false;
      this.refresh();
    },
    //删除事件
    handleDelete(index, row) {
      //交互 删除后台信息
      request({
        method: "delete",
        url: "/api/profile/delete/" + row._id
      }).then( (res)=>{
        // console.log(1)
        this.$message({
          message: '删除成功',
          type: success
        });
        this.dialogVisible = false;
        this.refresh();
      } ).catch(err => console.log(err));
      //console.log(index, row);
    },
    //最初页面请求数据 界面显示 ,以及页面更新数据
    refresh() {
      request({
        method: "get",
        url: "/api/profile"
      }).then( res => {
        // console.log(res.data)
        this.pageData = res.data;
        this.profileData = this.pageData.filter( (item, index) => index < 5 );
        // console.log(this.profileData)
        this.page_total = this.pageData.length;
        //this.$store.dispatch('saveData', res.data)
      } )
      //console.log("refresh")
    },
  },
  // 组件创建时
  created() {
    //console.log(1)
    this.refresh();
  }
}
</script>

<style scoped>
  .fundList {
    padding: 20px;
    overflow: hidden;
    position: relative;
  }
  .date {
    position: absolute
  }
  .date_btn {
    margin-left: 65px;
  }
  .fundList .add {
    margin-bottom: 20px;
    float: right;
    font-size: 18px;
  }
  .add::after {
    content: '';
    display: block;
    clear: both;
  }
  .submit {
    position: relative;
    left: 208px;
  }
  .pagination {
    margin-top: 5px;
    float: right;
  }
</style>