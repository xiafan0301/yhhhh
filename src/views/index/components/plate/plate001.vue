<template>
<div class="plate-ecl2-c clearfix">
  <h2>基础数据</h2>
  <div class="plate-ecl2-cl">
    <img src="../../../../assets/img/temp/temp-t032.png" alt="" style="width:90%">
    <!--<div class="plate-body-left">
      <p>参考对应位置</p>
      <div class="plate-ul">
        <ul class="plate-first">
          <li>位置1</li>
          <li>位置2</li>
          <li>位置3</li>
        </ul>
        <ul class="plate-detail">
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
        </ul>
        <ul class="plate-detail">
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
        </ul>
        <ul class="plate-detail">
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
          <li>
            <span class='title-left'>a1</span><span class='title-right'>全社会用电量</span>
          </li>
        </ul>
      </div>
    </div>-->
  </div>
  <div class="plate-ecl2-cr">
    <div>
      <el-form :inline="true" :model="dataForm" class="demo-form-inline" size="small">
        <el-form-item label="板块名称" required>
          <el-input v-model="dataForm.plateName" placeholder="板块名称"></el-input>
        </el-form-item>
        <el-form-item label="注释">
          <el-input v-model="dataForm.remark" placeholder="注释"></el-input>
        </el-form-item>
      </el-form>
      <div class="ecl2-cr-list">
        <p class="list-title">添加项</p>
        <table class="plate-table" style="width: 100%;">
          <thead>
          <tr>
            <th>项</th>
            <th>值</th>
            <th>单位</th>
            <th>同比值(%)</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in projectList" :key="'wwa' + index">
              <td><input type="text" v-model="item.name" placeholder="请填项名称"></td>
              <td><input type="text" v-model="item.value" placeholder="请填值"></td>
              <td>
                <input type="text" v-model="item.danwei" placeholder="请填单位">
              </td>
              <td><input type="text" v-model="item.percent" placeholder="请填同比值"></td>
              <td>
                <i style="font-size: 23px; cursor: pointer; color: #DDDDDD;" class="el-icon-remove-outline" @click="deleteProject(index, projectList)" title="删除此项"></i>
                <i style="font-size: 23px; cursor: pointer;  color: #0785FD;" class="el-icon-circle-plus-outline" @click="editProject(true, index)" title="新增项"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      dataForm: {
        plateName: '',
        remark: ''
      },
      projectList: [
        {
          name: '测试的项目名',
          value: 9.68,
          danwei: '亿千瓦时',
          percent: '0.2%'
        },
        {
          name: '测试的项目名',
          value: 9.68,
          danwei: '亿千瓦时',
          percent: '0.2%'
        },
        {
          name: '测试的项目名',
          value: 9.68,
          danwei: '亿千瓦时',
          percent: '0.2%'
        }
      ],
      valueSize: 2
    }
  },
  methods: {
    deleteProject (index, projectList) {
      this.$confirm('您确定要删除该项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        projectList.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style lang='scss' scoped>
  .plate-ecl2-c {
    display:flex;
    width:100%;
    flex-wrap: wrap;
    h2 {
      color: #333333;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 1%;
      width: 100%;
    }
    >div {
      width: 50%;
    }
  }
  .plate-body-left {
    margin: 5% 0;
    p {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
    }
    .plate-ul {
      margin-top: 3%;
      .plate-first {
        color: #333333;
        font-size: 12px;
        font-weight: bold;
      }
      ul {
        display: flex;
        li {
          width:33.3%;
        }
      }
      .plate-detail {
        margin-top: 2%;
        .title-left {
          color: #666666;
          font-size: 14px;
          margin-right: 3%;
        }
        .title-right {
          color: #999999;
          font-size: 12px;
        }
        li {
          height: 1.1em;
        }
      }
    }
  }
  .plate-ecl2-cr {
    .ecl2-cr-list {
      margin-top: 3%;
      .list-title {
        color: #333333;
        font-size: 14px;
        font-weight: bold;
        margin: 2% 0;
      }
    }
  }

  .el-form-item--small {
    .el-form-item__label {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>
