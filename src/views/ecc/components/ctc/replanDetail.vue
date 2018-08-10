<template>
  <div class='replan-detail'>
    <div class='replan-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item>方案制定</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>预案详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='replan-detail-body'>
      <ul class='replan-detail-ul'>
        <li>
          <p class='title'>预案名称</p>
          <p class='content'>公共区域消防安全应急预案</p>
        </li>
        <li>
          <p class='title'>关键词</p>
          <p class='content'>火灾、消防</p>
        </li>
        <li>
          <p class='title'>预案类型</p>
          <p class='content'>I级（特大）、II级（重大）</p>
        </li>
        <li>
          <p class='title'>适用事件等级</p>
          <p class='content'>I级（特大）、II级（重大）</p>
        </li>
        <li>
          <p class='title'>预案正文</p>
          <p class='content'>
            <el-input type='textarea' rows='7' style='width: 70%' />
          </p>
        </li>
        <li>
          <p class='title'>附件</p>
          <p class='content'>
            <a style='color: #0785FD;text-decoration:underline'>公共区域消防安全应急预案</a>
            <span class='download'>下载</span>
          </p>
        </li>
        <li>
          <p class='title'>响应处置</p>
          <div class='content response'>
            <ul class='response-ul'>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>协同部门:</p>
                <p class='response-content'>联动单位A</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务名称:</p>
                <p class='response-content'>灭火</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务内容:</p>
                <p class='response-content'>联动单位A灭火第一时间赶往火灾现场处理，完成后及时上报</p>
              </li>
            </ul>
            <ul class='response-ul'>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>协同部门:</p>
                <p class='response-content'>联动单位A</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务名称:</p>
                <p class='response-content'>灭火</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务内容:</p>
                <p class='response-content'>联动单位A灭火第一时间赶往火灾现场处理，完成后及时上报</p>
              </li>
            </ul>
            <ul class='response-ul'>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>协同部门:</p>
                <p class='response-content'>联动单位A</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务名称:</p>
                <p class='response-content'>灭火</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务内容:</p>
                <p class='response-content'>联动单位A灭火第一时间赶往火灾现场处理，完成后及时上报</p>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <p class='title'>创建用户</p>
          <p class='content'>张小娴</p>
        </li>
        <li class='last-li'>
          <p class='title'>创建时间</p>
          <p class='content'>2018-09-12 12:23:00</p>
        </li>
      </ul>
    </div>
    <div class='operation-btn-replan-detail'>
      <el-button>返回</el-button>
      <el-button style='background: #0785FD; color:#fff'>启用</el-button>
    </div>
  </div>
</template>
<style lang='scss' scoped>
  .replan-detail {
    padding: 20px;
    .replan-detail-header {
      margin-bottom: 20px;
    }
    .replan-detail-body {
      width: 100%;
      background: #fff;
      .replan-detail-ul {
        width: 100%;
        padding: 40px;
        li {
          display: flex;
          line-height: 27px;
          margin-bottom: 1%;
          .title {
            font-size: 13px;
            width: 125px;
            text-align: right;
            color: #333333;
          }
          .content {
            color: #777777;
            font-size: 14px;
            margin-left:2%;
            width: 70%;
            .download {
              background:#0785FD;
              width:45px;
              height:26px;
              color: #fff;
              text-align: center;
              margin-left: 1%;
              border-radius:2px;
              display: inline-block;
            }
          }
          .response {
            display: flex;
            flex-wrap: wrap;
            .response-ul {
              border: 1px solid #EAEAEA;
              padding: 20px;
              width: 70%;
              margin-bottom: 1%;
              .response-content {
                color: #666666;
                font-size: 13px;
                // margin-left: 1%;
              }
              .response-title {
                width: 80px;
                color: #555555;
                font-size: 13px;
              }
            }
          }
        }
      }
    }
    .operation-btn-replan-detail {
      margin-top: 2%;
    }
  }
</style>
