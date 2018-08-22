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
          <p class='content'>{{replanDetail.planName}}</p>
        </li>
        <li>
          <p class='title'>预案类型</p>
          <p class='content'>{{replanDetail.eventType}}</p>
        </li>
        <li>
          <p class='title'>适用事件等级</p>
          <p class='content'>
            <template v-if='replanDetail.levelList'>
              {{replanDetail.levelList.join()}}
            </template>
          </p>
        </li>
        <li>
          <p class='title'>预案正文</p>
          <p class='content'>
            <el-input type='textarea' disabled rows='7' v-model='replanDetail.planDetail' style='width: 70%' />
          </p>
        </li>
        <li>
          <p class='title'>附件</p>
          <p class='content'>
            <a :href='replanDetail.url' style='color: #0785FD;text-decoration:underline'>{{replanDetail.attachmentName}}</a>
            <span class='download' @click='downloadFile(replanDetail.url)'>下载</span>
          </p>
        </li>
        <li>
          <p class='title'>响应处置</p>
          <div class='content response'>
            <ul class='response-ul' v-for="(item, index) in replanDetail.taskList" :key="'item'+index">
              <li>
                <p class='response-title'><span style='color:red;'>*</span>协同部门:</p>
                <p class='response-content'>{{item.departmentName}}</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务名称:</p>
                <p class='response-content'>{{item.taskName}}</p>
              </li>
              <li>
                <p class='response-title'><span style='color:red;'>*</span>任务内容:</p>
                <p class='response-content'>{{item.taskContent}}</p>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <p class='title'>创建用户</p>
          <p class='content'>{{replanDetail.createUserName}}</p>
        </li>
        <li class='last-li'>
          <p class='title'>创建时间</p>
          <p class='content'>{{replanDetail.createTime}}</p>
        </li>
      </ul>
    </div>
    <div class='operation-btn-replan-detail'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD; color:#fff' @click='skipOpenReplan'>启用</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      replanDetail: {} // 预案详情
    }
  },
  mounted () {
    this.getReplanDetail();
  },
  methods: {
    getReplanDetail () { // 获取预案详情
      const planId = this.$route.query.planId;
      if (planId) {
        this.axios.get('A2/planServices/plans/' + planId, planId)
          .then((res) => {
            if (res && res.data) {
              console.log(res.data)
              this.replanDetail = res.data;
            }
          })
          .catch(() => {})
      }
    },
    back () {
      this.$router.back(-1);
    },
    skipOpenReplan () { // 跳到启用预案
      this.$router.push({name: 'enable-replan', query: {eventId: this.$route.query.eventId, planId: this.$route.query.planId}});
    },
    downloadFile (file) { // 下载文件
      if (file) {
        window.open(file);
      }
    }
  }
}
</script>
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
              cursor: pointer;
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
