<template>
  <div class="addEvent">
    <div style="margin-bottom: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>添加事件</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='add-body'>
      <div class='add-form'>
        <el-form class='form-content'>
          <el-form-item label="上报人手机号" label-width='150px'>
            <el-input style='width: 500px' placeholder='请输入手机号'></el-input>
          </el-form-item>
          <el-form-item label="上报时间" label-width='150px'>
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
              <i class="el-icon-plus"></i>
              添加图片
            </el-upload>
          </el-form-item>
          <el-form-item label="事件类型" label-width='150px'>
            <el-select  placeholder="请选择事件类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件等级" label-width='150px'>
            <el-select  placeholder="请选择事件等级">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有人员伤亡" label-width='150px'>
            <el-radio-group>
              <el-radio label="无"></el-radio>
              <el-radio label="不确定"></el-radio>
              <el-radio label="有"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="事件性质" label-width='150px'>
            <el-checkbox-group>
              <el-checkbox label="应急事件" name="type"></el-checkbox>
              <el-checkbox label="民众互助" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button>返回</el-button>
        <el-button>保存</el-button>
        <el-button type="primary">去调度指挥</el-button>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  .addEvent {
    padding: 20px;
    .add-body {
      .add-form {
        background-color: #fff;
        .form-content {
          padding-top: 2%;
          .el-form-item {
            margin-bottom: 15px;
          }
        }
      }
    }
    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
  }
</style>
