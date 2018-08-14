<template>
  <div class="untreatedEvent">
    <div style="margin-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='untreated-body'>
      <div class='untreated-header'>
        <div class='flag'></div>
        <p class='untreated-text'>事件编号：XPZ180724001</p>
      </div>
      <div class='event-status-untreated'>未处理</div>
      <div class='untreated-form'>
        <el-form class='untreated-form-content'>
          <el-form-item label="上报人手机号" label-width='150px'>
            <span style='color:#0785FD;font-weight:bold;text-decoration:underline'>1234567890</span>
          </el-form-item>
          <el-form-item label="上报时间" label-width='150px'>
            <span style='color:#333333;font-size:13px'>2019-3-4 12:33</span>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px'>
            <el-input style='width: 500px' placeholder='请选择事发地点...'></el-input>
            <span class='look-map' style='color:#0785FD;font-size:13px;position:relative;right:75px'>查看地图</span>
          </el-form-item>
          <el-form-item label="事件情况" label-width='150px'>
            <el-input type="textarea" style='width: 500px' placeholder='请选择事件详细情况...' rows='7'></el-input>
          </el-form-item>
          <el-form-item style='margin-left: 150px'>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加图片</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="事件类型" label-width='150px'>
            <el-select  placeholder="请选择事件类型" style='width: 500px'>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件等级" label-width='150px'>
            <el-select  placeholder="请选择事件等级" style='width: 500px'>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有人员伤亡" label-width='150px'>
            <el-radio-group style='width: 330px'>
              <el-radio label="无"></el-radio>
              <el-radio label="不确定" style='margin-left:22%'></el-radio>
              <el-radio label="有" style='margin-left:22%'></el-radio>
            </el-radio-group>
            <el-input style='width: 150px;margin-left:-1%' placeholder='请输入死亡人数'></el-input><span style='margin-left:1%'>人</span>
          </el-form-item>
          <el-form-item label="事件性质" label-width='150px'>
            <el-checkbox-group>
              <el-checkbox label="应急事件" name="type"></el-checkbox>
              <el-checkbox label="民众互助" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class='operation-btn-untreated'>
      <el-button @click='back'>返回</el-button>
      <el-button @click='dialogFormVisible = true'>关闭事件</el-button>
      <el-button style='background: #0785FD;color:#fff' @click='skipCtcDetail'>去调度指挥</el-button>
    </div>
    <el-dialog title="操作提示" :visible.sync="dialogFormVisible" center width='30%'>
      <p class='close-reason-p'>请选择关闭事件的原因:</p>
      <el-form>
        <el-form-item>
          <el-select placeholder="请选择原因" style='width:100%'>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder='备注' type='textarea' rows='7'></el-input>
        </el-form-item>
         <el-form-item>
          <el-checkbox>
            <span>标为骚扰</span>
            <span>(2次被标为骚扰，将不允许用户再上报事件)</span>
          </el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="dialogFormVisible = false" style='color:#fff;background:#0785FD'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    skipCtcDetail () {
      this.$router.push({name: 'ctc-detail'});
    }
  }
}
</script>
<style lang="scss">
  .untreatedEvent {
    padding: 20px;
    .untreated-body {
      background: #fff;
      margin-bottom: 2%;
      .untreated-header {
        width: 100%;
        display: flex;
        p {
          margin-top: 25px;
        }
        .flag {
          height:20px;
          width:3px;
          position: relative;
          top: 25px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: #0785FD;
        }
        .untreated-text {
          color: #0785FD;
          font-size: 16px;
          font-weight: bold;
          margin-left: 1%;
        }
      }
      .event-status-untreated {
        color: #fff;
        background: #1ABC9C;
        width: 100px;
        height: 40px;
        border-radius: 2px;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        float: right;
        margin-top: -20px;
        margin-right: 2%;
      }
      .untreated-form {
        padding-top: 1%;
        padding-bottom: 5%;
        .untreated-form-content {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
    .operation-btn-untreated {
      margin-top: 2%;
    }
    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
      background-color: #EAEAEA;
      border: 1px solid #EAEAEA;
      position: relative;
      i {
        margin: 0 auto;
        font-weight: bold;
      }
      .add-img-text {
        color: #C4C2C2;
        font-size: 13px;
        display: block;
        width: 54px;
        height: 13px;
        position: absolute;
        top: 25%;
        left: 25%;
      }
    }
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
      font-size: 16px;
    }
    /deep/ .el-dialog__footer {
      padding: 0 20px 20px !important;
    }
    /deep/  .el-dialog--center .el-dialog__body {
      padding: 10px 25px 0 !important;
    }
    .sureBtn {
      background:#0785FD;
      height:35px;
      color: #fff;
      line-height: 10px;
    }
    .noSureBtn {
      border-color:#e5e5e5;
      height:35px;
      line-height: 10px;
      color:#666666;
    }
    /deep/ .el-form-item {
      margin-bottom: 13px;
    }
    .close-reason-p {
      margin-bottom: 10px;
    }
  }
</style>
