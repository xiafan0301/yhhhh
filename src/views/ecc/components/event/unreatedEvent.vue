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
      <el-button>返回</el-button>
      <el-button>关闭事件</el-button>
      <el-button style='background: #0785FD;color:#fff'>去调度指挥</el-button>
    </div>
  </div>
</template>
<script>
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
  }
</style>
