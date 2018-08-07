<template>
  <div class="add-msg-person">
    <div class='add-msg-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>添加消息</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-msg-body'>
      <div class='add-form-person'>
        <el-form class='form-content-person'>
          <el-form-item label="事发时间" label-width='150px'>
            <el-date-picker type="date" placeholder="选择日期" style="width: 500px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="事发地点" label-width='150px'>
            <el-input style='width: 500px' placeholder='请选择事发地点...'></el-input>
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
          <el-form-item label="是否推送消息" label-width='150px'>
            <el-radio-group style='width: 330px'>
              <el-radio label="不推送"></el-radio>
              <el-radio label="推送" style='margin-left:22%'></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="接受的APP用户" label-width='150px'>
            <el-select  placeholder="请选择APP用户" style='width: 500px'>
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="部分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='operation-btn'>
        <el-button>返回</el-button>
        <el-button type="primary" style='background: #0785FD'>确认发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  .add-msg-person {
    padding: 20px;
    .add-msg-header {
      margin-bottom: 20px;
    }
    .add-msg-body {
      .add-form-person {
        background-color: #fff;
        padding-bottom: 5%;
        .form-content-person {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
  }
</style>
