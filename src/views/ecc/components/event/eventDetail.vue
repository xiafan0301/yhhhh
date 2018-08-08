<template>
  <div class='event-detail'>
    <div class='event-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-detail-body'>
      <div class='basic'>
        <div class='basic-header'>
          <div class='flag'></div>
          <p class='basic-text'>基本信息</p>
          <p class='event-number'>事件编号：XPZ180724001</p>
        </div>
        <div class='event-status'>处理中</div>
        <div class='basic-detail'>
          <div class='basic-list'>
            <div>
              <span class='title'>事件类型：</span>
              <span class='content'>自然灾害类</span>
              <!-- <el-select v-model="value" placeholder="请选择" style='width: 200px;'>
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </div>
            <div>
              <span class='title'>事件等级：</span>
              <span class='content'>I极（特大）</span>
              <!-- <el-select v-model="value" placeholder="请选择" style='width: 200px;'>
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </div>
            <div><span class='title'>报案事件：</span><span class='content'>2017-4-2 15：00</span></div>
          </div>
          <div class='basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <!-- <span class='content'>1234567890</span> -->
              <span style='color:#0785FD;font-weight:bold;text-decoration:underline'>1234567890</span>
            </div>
            <div><span class='title'>事发地点：</span><span class='content'>长沙市雨花区雀园路232号创谷工业园</span></div>
          </div>
          <div class='basic-list'>
            <div><span class='title'>人员伤亡：</span><span class='content'>无</span></div>
          </div>
          <div class='basic-list'>
            <div><span class='title'>事件情况：</span><span class='content'>园区门口有电动车起火</span></div>
          </div>
          <div class='basic-list img-content'>
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
          </div>
        </div>
      </div>
      <div class='ctc'>
        <div class='ctc-header'>
          <div class='flag'></div>
          <p class='ctc-text'>调度指挥方案</p>
        </div>
        <div class='ctc-content'>
          <ul>
            <li>
              <span class='title'>调度部门：</span><span class='content'>消防部</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>灭火</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>速去现场灭火</span>
            </li>
            <li class='divide'></li>
          </ul>

          <ul>
            <li>
              <span class='title'>调度部门：</span><span class='content'>消防部</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>灭火</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>速去现场灭火</span>
            </li>
            <li class='divide'></li>
          </ul>
          <ul>
            <li>
              <span class='title'>调度部门：</span><span class='content'>消防部</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>灭火</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>速去现场灭火</span>
            </li>
            <li class='divide'></li>
          </ul>
        </div>
      </div>
      <div class='event-progress'>
        <div class='event-progress-header'>
          <div class='flag'></div>
          <p class='event-progress-text'>事件进展</p>
        </div>
        <div class='event-progress-body'>
          <div class='depart'>
            <p class='progress-title'>参与部门</p>
            <div class='depart-detail'>
              <p>消防部</p>
              <p>06-25 13：30</p>
              <p>处理完毕</p>
            </div>
            <div class='depart-detail'>
              <p>消防部</p>
              <p>06-25 13：30</p>
              <p>处理完毕</p>
            </div>
            <div class='depart-detail'>
              <p>消防部</p>
              <p>06-25 13：30</p>
              <p>处理完毕</p>
            </div>
          </div>
          <div class=divide></div>
          <div class='event-process'>
            <p class='progress-title'>事件过程</p>
            <div></div>
          </div>
          <div class=divide></div>
          <div class='comment'>
            <p class='progress-title'>
              APP端互助
              <span style='color: #0785FD;font-size: 12px'>(5条评论)</span>
            </p>
            <ul>
              <li>
                <div class='info-top'>
                  <p class='phone'>13812341234</p>
                  <p class='time'>06-25 11:30</p>
                </div>
                <div class='info-detail'>火势好大！</div>
                <i class='el-icon-circle-close close'></i>
              </li>
              <li>
                <div class='info-top'>
                  <p class='phone'>13812341234</p>
                  <p class='time'>06-25 11:30</p>
                </div>
                <div class='info-detail'>火势好大！</div>
                <i class='el-icon-circle-close close'></i>
              </li>
              <li>
                <div class='info-top'>
                  <p class='phone'>13812341234</p>
                  <p class='time'>06-25 11:30</p>
                </div>
                <div class='info-detail'>火势好大！</div>
                <i class='el-icon-circle-close close'></i>
              </li>
              <li>
                <div class='info-top'>
                  <p class='phone'>13812341234</p>
                  <p class='time'>06-25 11:30</p>
                </div>
                <div class='info-detail'>火势好大！</div>
                <i class='el-icon-circle-close close'></i>
              </li>
            </ul>
            <el-pagination
              background
              :page-sizes="[5, 10, 20, 50, 100]"
              @size-change="onSizeChange"
              @current-change="onPageChange"
              :current-page.sync="pagination.pageNum"
              :page-size="pagination.pageSize"
              layout="prev, pager, next, jumper"
              :total="pagination.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class='event-summary'>
        <div class='event-summary-header'>
          <div class='flag'></div>
          <p class='event-summary-text'>事件总结</p>
        </div>
        <div class='summary-content'>
          a啊打卡快乐圣诞节看拉克丝打了啊的就爱上了；拉萨巨大代价爱神的箭；啊实打实的静安寺
          a啊打卡快乐圣诞节看拉克丝打了啊的就爱上了；拉萨巨大代价爱神的箭；啊实打实的静安寺
          a啊打卡快乐圣诞节看拉克丝打了啊的就爱上了；拉萨巨大代价爱神的箭；啊实打实的静安寺
          a啊打卡快乐圣诞节看拉克丝打了啊的就爱上了；拉萨巨大代价爱神的箭；啊实打实的静安寺
          a啊打卡快乐圣诞节看拉克丝打了啊的就爱上了；拉萨巨大代价爱神的箭；啊实打实的静安寺
          a啊打卡快乐圣诞节看拉克丝打了啊的就爱上了；拉萨巨大代价爱神的箭；啊实打实的静安寺
        </div>
      </div>
      <div class='close-reason'>
        <div class='close-reason-header'>
          <div class='flag'></div>
          <p class='close-reason-text'>被关闭的原因</p>
        </div>
        <div class='close-reason-body'>
          <div class='detail'>阿斯顿杰拉德尽快离开的；两岸三地卡死了；阿斯达卡是</div>
          <div class='divide'></div>
          <div class='remark'>备注：lsdkjasljd卡死了较大利空打击爱上了就打算考虑的就是</div>
        </div>
      </div>
    </div>
    <div class='operation-btn-event'>
      <el-button>返回</el-button>
      <el-button>再次调度</el-button>
      <el-button type="primary" style='background: #0785FD' @click='skipEventEnd'>事件结束</el-button>
      <!-- <el-button>返回</el-button> -->
      <!-- <el-button type="primary" style='background: #0785FD'>保存</el-button> -->
      <!-- <el-button type="primary" style='background: #FB796C;border-color:#FB796C'>修改</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pagination: {
        total: 1000,
        pageNum: 1,
        pageSize: 10
      },
      options1: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: ''
    }
  },
  methods: {
    skipEventEnd () { // 跳到事件结束页面
      this.$router.push({name: 'event-end'});
    }
  }
}
</script>
<style lang='scss' scoped>
  .event-detail {
    padding: 20px;
    .event-detail-header {
      margin-bottom: 20px;
    }
    .event-detail-body {
      width: 100%;
      .basic, .ctc,.event-progress,.event-summary,.close-reason {
        background: #fff;
        margin-bottom: 2%;
        .basic-header,.ctc-header,.event-progress-header,.event-summary-header,.close-reason-header {
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
          .basic-text, .ctc-text,.event-progress-text,.event-summary-text,.close-reason-text {
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .event-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
          
        }
        .event-status {
          color: #fff;
          background: #0785FD;
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
        .basic-detail {
          width: 100%;
          display:flex;
          padding: 20px;
          flex-direction: column;
          .basic-list {
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
          .img-content {
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
        .ctc-content {
          width: 100%;
          padding: 20px 20px 0 30px;
          ul {
            li {
              line-height: 27px;
              .title {
                color: #222222;
                font-size: 13px;
              }
              .content {
                color: #777777;
                font-size: 14px;
                margin-left:1%;
              }
            }
          }
        }
        .summary-content {
          width: 100%;
          padding: 20px 20px 20px 30px;
        }
        .event-progress-body {
          width: 100%;
          padding: 20px 20px 20px 30px;
          .depart {
            .depart-detail {
              display: flex;
              padding-top: 15px;
              p {
                margin-right: 3%;
                color: #222222;
                font-size: 13px;
              }
            }
          }
          .comment {
            ul {
              margin: 20px 0;
              li {
                margin-bottom: 1%;
                width: 70%;
                background: #fafafa;
                padding: 10px;
                position: relative;
                .info-top {
                  display: flex;
                  .phone {
                    font-size: 14px;
                    color: #222222;
                    font-weight: bold;
                    margin-right: 3%;
                    margin-bottom: 1%;
                  }
                  .time {
                    font-size: 13px;
                    color: #888888;
                  }
                }
                .close {
                  position: absolute;
                  font-size: 21px;
                  color: #E9E8E8;
                  right: 2%;
                  top: 30%;
                }
              }
            }
          }
        }
        .close-reason-body {
          width: 100%;
          padding: 20px 20px 20px 30px;
          .detail {
            color: #222222;
            font-size: 14px;
            margin-bottom: 2%;
          }
          .remark {
            color: #555555;
            font-size: 13px;
            margin-top: 2%;
          }
        }
        .progress-title {
          font-size: 14px;
          color: #222222;
          font-weight: bold;
        }
      }
      .divide {
        height:1px;
        margin: 1% 0;
        background: #EAEAEA;
      }
    }
    .operation-btn-event {
      margin-top: 2%;
    }
  }
</style>