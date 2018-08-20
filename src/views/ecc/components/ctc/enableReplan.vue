<template>
  <div class='enable-replan'>
    <div class='enable-replan-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件处理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='enable-replan-detail-body'>
      <div class='enable-replan-detail-basic'>
        <div class='enable-replan-detail-basic-header'>
          <div class='flag'></div>
          <p class='enable-replan-detail-basic-text'>基本信息</p>
          <p class='enable-replan-detail-number'>事件编号：{{eventDetailObj.eventCode}}</p>
        </div>
        <div class='enable-replan-detail-basic-detail'>
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>事件类型：</span>
              <span class='content'>{{eventDetailObj.eventTypeName}}</span>
            </div>
            <div>
              <span class='title'>事件等级：</span>
              <span class='content'>{{eventDetailObj.eventLevelName}}</span>
            </div>
            <div><span class='title'>报案时间：</span><span class='content'>{{eventDetailObj.reportTime}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <span class='content'>{{eventDetailObj.reporterPhone}}</span>
            </div>
            <div><span class='title'>事发地点：</span><span class='content'>{{eventDetailObj.eventAddress}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>人员伤亡：</span>
              <template v-if='eventDetailObj.casualties == -1'>
                <span class='content'>不确定</span>
              </template>
              <template v-else-if='eventDetailObj.casualties == 0'>
                <span class='content'>无</span>
              </template>
              <template v-if='eventDetailObj.casualties > 0'>
                <span class='content'>{{eventDetailObj.casualties}}</span>
              </template>
            </div>
          </div>
          <div class='enable-replan-detail-basic-list'>
            <div style='width:100%'><span class='title'>事件情况：</span><span class='content'>{{eventDetailObj.eventDetail}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list enable-replan-detail-img-content'>
            <img
              v-for='item in eventDetailObj.attachmentList'
              :src='item.url'
              :key='item.attachmentId'
            />
          </div>
        </div>
      </div>
      <div class='enable-replan-detail-bottom'>
        <div class='enable-replan-idea-left'>
          <div class='enable-replan-idea-header'>
            <div class='flag'></div>
            <p class='enable-replan-idea-text'>调度指挥方案</p>
          </div>
          <div class='enable-replan-list'>
            <div class='enable-replan-list-num'>任务一</div>
            <div class='enable-replan-list-body'>
              <p>执行部门： 消防部</p>
              <p>任务名称：紧急火灾</p>
              <p>任务内容： 执行部门：消防部任务名称：紧急火灾任务内容：请芙蓉南路消防部组织好队伍，迅速前往XX进行灭火！</p>
            </div>
          </div>
          <div class='enable-replan-list'>
            <div class='enable-replan-list-num'>任务一</div>
            <div class='enable-replan-list-body'>
              <p>执行部门： 消防部</p>
              <p>任务名称：紧急火灾</p>
              <p>任务内容： 执行部门：消防部任务名称：紧急火灾任务内容：请芙蓉南路消防部组织好队伍，迅速前往XX进行灭火！</p>
            </div>
          </div>
          <div class='enable-replan-list'>
            <div class='enable-replan-list-num'>任务一</div>
            <div class='enable-replan-list-body'>
              <p>执行部门： 消防部</p>
              <p>任务名称：紧急火灾</p>
              <p>任务内容： 执行部门：消防部任务名称：紧急火灾任务内容：请芙蓉南路消防部组织好队伍，迅速前往XX进行灭火！</p>
            </div>
          </div>
          <div class='divide'></div>
          <div class='enable-replan-idea-body'>
            <el-form class='enable-replan-idea-form'>
              <el-form-item label="执行部门" label-width='120px'>
                <el-select  placeholder="请选择执行部门" style='width: 500px'>
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="部分" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务名称" label-width='120px'>
                <el-input type="text" placeholder='请输入任务名称' style='width: 500px'></el-input>
              </el-form-item>
              <el-form-item label="任务内容" label-width='120px'>
                <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 500px'></el-input>
              </el-form-item>
              <el-form-item style='margin-left: 120px'>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
                  <span class='add-img-text'>添加任务</span>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class='operation-btn-enable-replan-detail'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff'>确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      eventDetailObj: {},
      reservePlanList: [{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }]
    }
  },
  mounted () {
    this.getEventDetail();
  },
  methods: {
    selectMorePlan () { // 查看更多预案
      this.$router.push({name: 'replan-list'});
    },
    back () {
      this.$router.back(-1);
    },
    getEventDetail () { // 获取事件详情
      const eventId = this.$route.params.eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res && res.data) {
              this.eventDetailObj = res.data;
            }
          })
          .catch(() => {})
      }
    },
    selectReplanDetail () { // 查看预案详情
      this.$router.push({name: 'replan-detail'});
    }
  }
}
</script>
<style lang='scss'>
  .enable-replan {
    padding: 20px;
    height: 100%;
    .enable-replan-header {
      margin-bottom: 10px;
    }
    .enable-replan-detail-body {
      width: 100%;
      .enable-replan-detail-basic {
        background: #fff;
        margin-bottom: 0.7%;
        .enable-replan-detail-basic-header {
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
          .enable-replan-detail-basic-text {
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .enable-replan-detail-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
        }
        .enable-replan-detail-basic-detail {
          width: 100%;
          display:flex;
          padding: 20px;
          flex-direction: column;
          .enable-replan-detail-basic-list {
            display: flex;
            flex-wrap: wrap;
            div {
              width:33.3%;
              line-height:27px;
              .title {
                color: #222222;
                font-size: 13px;
                width: 80px;
                display: inline-block;
                text-align: right;
              }
              .content {
                color: #777777;
                font-size: 14px;
                margin-left: 1%;
              }
            }
          }
          .enable-replan-detail-img-content {
            width: 100%;
            padding-left: 80px;
            img {
              width: 100px;
              height: 75px;
              margin-right: 1%;
              margin-top: 1%;
            }
          }
        }
      }
      .enable-replan-detail-bottom {
        width: 100%;
        display: flex;
        .enable-replan-idea-left {
          margin-right: 2%;
        }
        .enable-replan-idea-left{
          background: #fff;
          width: 100%;
          height: 50%;
          .divide {
            width: 570px;
            height:1px;
            margin: 2% 0 2% 55px;
            background: #EAEAEA;
          }
          .enable-replan-list {
            width: 100%;
            display: flex;
            padding-top: 2%;
            font-size: 14px;
            margin-bottom: -1%;
            .enable-replan-list-num {
              text-align: right;
              width: 120px;
              color: #999999;
            }
            .enable-replan-list-body {
              margin-left:1%;
              width: 500px;
              color: #555555;
              p {
                margin-bottom: 2%;
              }
            }
          }
          .enable-replan-idea-header{
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
            .enable-replan-idea-text{
              color: #0785FD;
              font-size: 16px;
              font-weight: bold;
              margin-left: 1%;
            }
          }
          .enable-replan-idea-body {
            width: 100%;
            .enable-replan-idea-form {
              padding-top: 1%;
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
          }
        }
      }
    }
    .operation-btn-enable-replan-detail {
      margin-top: 1%;
      margin-bottom: 1%;
    }
  }
</style>
