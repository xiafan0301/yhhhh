<template>
  <div class='event-end'>
    <div class='event-end-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-end-body'>
      <el-form class='event-end-form'>
        <el-form-item label="请确认事件等级" label-width='150px'>
          <el-select  placeholder="请选择事件等级" style='width: 500px'>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入事件总结" label-width='150px'>
          <el-input type='textarea' style="width: 500px;" rows='9' placeholder='请输入事件详细情况...'></el-input>
        </el-form-item>
        <el-form-item style='margin-left: 150px'>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
            <span class='add-img-text'>上传附件</span>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class='operation-btn-event-end'>
      <el-button>返回</el-button>
      <el-button style='background: #0785FD;color:#fff'>确定</el-button>
    </div>
  </div>
</template>
<style lang='scss'>
  .event-end {
    padding: 20px;
    height: 100%;
    .event-end-header {
      margin-bottom: 20px;
    }
    .event-end-body {
      width: 100%;
      height: 85%;
      // padding-bottom: 20%;
      background: #fff;
      .event-end-form {
        padding-top: 2%;
      }
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
    .operation-btn-event-end {
      margin-top: 1%;
    }
  }
</style>
