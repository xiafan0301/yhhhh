<template>
  <div class="tv-main">
    <div class="tv-main-top">
      <div class="top-title">
        <span>{{detailData.plateName}} <i @click="onEditProject" class="iconfont edit-title">&#xe6bd;</i></span>
        <span>创建时间：</span>
        <span>{{detailData.createTime | moment}}</span>
        <span>{{detailData.updateTime | moment}}</span>
      </div>
      <div class="top-text">
        <table>
          <tr>
            <td>
              <div>关键字</div>
              <div>{{detailData.plateNo}}</div>
            </td>
            <td>
              <div>项目类型</div>
              <div>
                <span v-if="detailData.projectType === 0">默认</span>
                <span v-if="detailData.projectType === 1">智慧城市</span>
                <span v-if="detailData.projectType === 2">大数据管理</span>
              </div>
            </td>
            <td>
              <div>项目负责人</div>
              <div>{{detailData.chargeUserName}}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>项目使用机构</div>
              <div>{{detailData.useOrgName}}</div>
            </td>
            <td>
              <div>回调地址</div>
              <div>
                <span v-if="detailData.redirectUrl">{{detailData.redirectUrl}}</span>
                <span v-else>无</span>
              </div>
            </td>
            <td>
              <div>项目开发公司</div>
              <div>{{detailData.developerOrg}}</div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div>开发公司执照</div>
              <div v-if="detailData.licenseImage">
              <img :src="$store.state.imgBaseUrl + detailData.licenseImagePath + '/' + detailData.licenseImage" alt="" width="136px" height="98px">
              </div>
              <div v-else>无</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>授权期限</div>
              <div>{{detailData.startTime | moment('yyyy-MM-dd')}}至{{detailData.endTime | moment('yyyy-MM-dd')}}</div>
            </td>
            <td colspan="2">
              <div>应用key</div>
              <div>{{detailData.cipherDigest}}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom-graph">
      <div class="graph graph-left">
        <div class="graph-left-title">新增用户 (<span>{{numberTotal}}</span>人)</div>
        <div class="graph-left-select">
          <el-select
            v-model="timeType"
            clearable
            placeholder="全部类型"
            @change="onSelectChange">
            <el-option label="本周 (按天统计)" :value="1"/>
            <el-option label="本月 (按周统计)" :value="2"/>
            <el-option label="本年 (按月统计)" :value="3"/>
          </el-select>
        </div>
        <div id="mountNode"></div>
      </div>
      <div class="graph graph-right">
        <div class="graph-right-title">组织架构 (<span>{{departNumData.length}}</span>个)</div>
        <div id="mountNode2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2';
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    return {
      detailData: {},
      addNumdata: [],
      numberTotal: null,
      departNumData: [],
      timeType: 3
    }
  },
  mounted () {
    this.getDetail();
    this.getNumberData();
    this.getDepartNumberData();
  },
  methods: {
    // 获取详情数据
    getDetail () {
      this.axios.get('S2/auth/authServices/plate/' + getCookie('projectId'))
        .then(res => {
          if (res) {
            this.detailData = res.data;
          }
        })
    },
    // 获取新增人数统计图数据
    getNumberData () {
      let params = {
        proKey: this.$store.state.proKey,
        timeType: this.timeType
      }
      this.axios.get('S2/auth/authServices/usersCount', {params})
        .then(res => {
          if (res) {
            let time = 1246838400000;
            res.data.forEach(item => {
              this.numberTotal += item.sumCount;
              item.text = '新增用户';
              item.times = time;
              time = time + 2592000;
            });
            this.addNumdata = res.data;
            console.log(res.data);
            this.loadingAddChat(this.addNumdata);
          }
        })
    },
    // 获取部门人数统计图数据
    getDepartNumberData () {
      this.axios.get('S2/auth/authServices/usersCount/organs?proKey=' + this.$store.state.proKey)
        .then(res => {
          if (res) {
            this.departNumData = res.data;
            console.log(res.data);
            this.loadingDepartChat(this.departNumData);
          }
        })
    },
    loadingAddChat (data) {
      let chart = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        height: 320
      });
      chart.source(data, {
        times: {
          type: 'linear',
          tickInterval: 50
        }
      });
      chart.scale({
        temperature: {
          sync: true
        },
        times: {
          type: 'time',
          mask: 'MM-DD',
          tickInterval: 24 * 3600 * 1000 * 2
        }
      });
      chart.areaStack().position('times*sumCount').color('text').shape('smooth');
      chart.lineStack().position('times*sumCount').color('text').shape('smooth').size(2);
      chart.render();
    },
    loadingDepartChat (data) {
      let chart = new G2.Chart({
        container: 'mountNode2',
        forceFit: true,
        height: 380
      });
      chart.source(data);
      chart.scale('userCount', {
        tickInterval: 2,
        alias: '部门人数'
      });
      chart.interval().position('organName*userCount');
      chart.render();
    },
    onSelectChange () {},
    onEditProject () {
      this.$router.push({name: 'edit-project'});
    }
  }
}
</script>

<style lang="scss" scoped>
.tv-main {
  .tv-main-top {
    width: 100%; height: 360px;
    background: #fff;
    margin-top: 20px;
    padding: 0 25px;
    .top-title {
      width: 100%; height: 60px;
      line-height: 60px;
      margin: 0 auto;
      border-bottom: 1px solid #DBDBDB;
      span, i {
        display: inline-block;
        font-size: 12px;
      }
      span:nth-child(1) {
        font-size: 20px;
        color: #666;
        font-weight: 600;
        padding-left: 15px;
        .edit-title {
          color: #999;
          font-size: 20px;
          cursor: pointer;
        }
      }
      span:nth-child(2) { color: #666; vertical-align: top; margin-left: 15px; }
      span:nth-child(3) { color: #333; vertical-align: top; }
      span:nth-child(4) { color: #333; float: right; margin-right: 12px; }
    }
    .top-text {
      padding: 18px;
      > table {
        width: 100%;
        > tr {
          > td {
            vertical-align: top;
            padding: 10px 10px 15px 0;
            > div {
              &:first-child {
                width: 110px;
                float: left;
                color: #555;
                font-weight: 600;
              }
              &:last-child {
                margin-left: 110px;
                color: #333;
              }
              > img {
                display: inline-block;
                width: 136px; height: 98px;
              }
            }
          }
          td:nth-child(1), td:nth-child(2), td:nth-child(3) { width: 35%; }
        }
      }
    }
  }
  .bottom-graph {
    width: 100%; height: 500px;
    background: #fff;
    margin-top: 10px;
    padding: 0 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .graph {
      display: inline-block;
      width: 48%; height: 445px;
      box-shadow: 2px 0px 6px rgba(5,0,0,0.08);
      border-left: 1px solid rgba(5, 0, 0, 0.08);
    }
    .graph-left {
      padding-right: 30px;
      padding-top: 20px;
      text-align: center;
      .graph-left-title {
        font-size: 16px;
        color: #555;
        font-weight: 600;
        > span { color: #FF5722; }
      }
      .graph-left-select {
        margin-top: 20px;
        margin-bottom: 12px;
        .el-select {
          width: 280px;
        }
      }
    }
    .graph-right {
      margin-left: 28px;
      padding-right: 30px;
      padding-top: 20px;
      text-align: center;
    }
    .graph-right-title {
        font-size: 16px;
        color: #555;
        font-weight: 600;
        padding-bottom: 40px;
        > span { color: #FF5722; }
      }
  }
}
</style>
