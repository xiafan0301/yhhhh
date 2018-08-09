<template>
  <div class='ctc-detail'>
    <div class='ctc-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>方案制定</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='ctc-detail-body'>
      <div class='ctc-detail-basic'>
        <div class='ctc-detail-basic-header'>
          <div class='flag'></div>
          <p class='ctc-detail-basic-text'>基本信息</p>
          <p class='ctc-detail-number'>事件编号：XPZ180724001</p>
        </div>
        <div class='ctc-detail-basic-detail'>
          <div class='ctc-detail-basic-list'>
            <div>
              <span class='title'>事件类型：</span>
              <span class='content'>自然灾害类</span>
            </div>
            <div>
              <span class='title'>事件等级：</span>
              <span class='content'>I极（特大）</span>
            </div>
            <div><span class='title'>报案事件：</span><span class='content'>2017-4-2 15：00</span></div>
          </div>
          <div class='ctc-detail-basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <span class='content'>1234567890</span>
              <!-- <span style='color:#0785FD;font-weight:bold;text-decoration:underline'>1234567890</span> -->
            </div>
            <div><span class='title'>事发地点：</span><span class='content'>长沙市雨花区雀园路232号创谷工业园</span></div>
          </div>
          <div class='ctc-detail-basic-list'>
            <div><span class='title'>人员伤亡：</span><span class='content'>无</span></div>
          </div>
          <div class='ctc-detail-basic-list'>
            <div><span class='title'>事件情况：</span><span class='content'>园区门口有电动车起火</span></div>
          </div>
          <div class='ctc-detail-basic-list ctc-detail-img-content'>
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
      <div class='ctc-detail-bottom'>
        <div class='ctc-idea-left'>
          <div class='ctc-idea-header'>
            <div class='flag'></div>
            <p class='ctc-idea-text'>调度指挥方案</p>
          </div>
          <div class='ctc-idea-body'>
            <el-form class='ctc-idea-form'>
              <el-form-item label="执行部门" label-width='120px'>
                <el-select  placeholder="请选择执行部门" style='width: 80%'>
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="部分" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务名称" label-width='120px'>
                <el-select  placeholder="请选择任务名称" style='width: 80%'>
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="部分" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务内容" label-width='120px'>
                <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 80%'></el-input>
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
        <div class='ctc-replan-right'>
          <div class='ctc-replan-header'>
            <div class='flag'></div>
            <p class='ctc-replan-text'>推荐预案</p>
          </div>
          <div class='ctc-replan-table'>
            <el-table
              style="width: 100%"
              :data='reservePlanList'
              highlight-current-row 
              class='ctc-table'
               max-height="372"
            >
              <el-table-column label="预案名称" prop='planName' align='center' show-overflow-tooltip></el-table-column>
              <el-table-column label="预案类型" prop='planType' align='center'></el-table-column>
              <el-table-column label="适用等级" prop='levelList' align='center'></el-table-column>
              <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button type='text' style='color: #0785FD'>查看</el-button>
                  <el-button type='text' style='color: #0785FD'>启用</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class='more-replan' @click='selectMorePlan'>更多预案</div>
          </div>
        </div>
      </div>
    </div>
    <div class='operation-btn-ctc-detail'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff'>确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reservePlanList: [{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      },{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }]
    }
  },
  methods: {
    selectMorePlan () { // 查看更多预案
      this.$router.push({name: 'replan-list'});
    },
    back () {
      this.$router.back(-1);
    }
  }
}
</script>
<style lang='scss'>
  .ctc-detail {
    padding: 20px;
    height: 100%;
    .ctc-detail-header {
      margin-bottom: 10px;
    }
    .ctc-detail-body {
      width: 100%;
      .ctc-detail-basic {
        background: #fff;
        margin-bottom: 0.7%;
        .ctc-detail-basic-header {
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
          .ctc-detail-basic-text {
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .ctc-detail-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
        }
        .ctc-detail-basic-detail {
          width: 100%;
          display:flex;
          padding: 20px;
          flex-direction: column;
          .ctc-detail-basic-list {
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
          .ctc-detail-img-content {
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
      .ctc-detail-bottom {
        width: 100%;
        display: flex;
        .ctc-idea-left {
          margin-right: 2%;
        }
        .ctc-idea-left, .ctc-replan-right {
          background: #fff;
          width: 49%;
          height: 50%;
          .ctc-idea-header, .ctc-replan-header {
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
            .ctc-idea-text, .ctc-replan-text {
              color: #0785FD;
              font-size: 16px;
              font-weight: bold;
              margin-left: 1%;
            }
          }
          .ctc-idea-body {
            width: 100%;
            .ctc-idea-form {
              padding-top: 4%;
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
          .ctc-replan-table {
            width: 100%;
            .el-table td {
              padding: 3px 0 !important;
            }
            .ctc-table {
              padding-top:20px;
            }
            .more-replan {
              color: #fff;
              background: #0785FD;
              width: 120px;
              height: 40px;
              margin: 3% auto;
              text-align: center;
              line-height: 40px;
              border-radius: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .operation-btn-ctc-detail {
      margin-top: 1%;
      margin-bottom: 1%;
    }
  }
</style>