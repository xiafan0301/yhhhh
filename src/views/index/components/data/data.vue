<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-bd">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>页面管理</el-breadcrumb-item>
        <el-breadcrumb-item ><span style="color:#0785FD;font-size:14px;">数据维护</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-plate-sf">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="地图组件">
          <el-select v-model="searchForm.dataTypeId" placeholder="选择数据" style="width: 160px;" @change="getValue">
            <el-option  v-for="(item, index) in pageList" :label="item.typeName" :value="item.dataTypeId" :key="'spl_' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <!--贫困村添加-->
      <el-button type="primary" size="small" class="add-plate-btn" icon="el-icon-plus" @click="dialogFormVisible1 = true">添加</el-button>
      <el-button style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" class="add-plate-btnf" >一键导入</el-button>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '4fce5edb-7092-4455-971b-6f8526d6a827'" href="http://10.16.3.40:8080/api/vis/mapServices/template/download/4fce5edb-7092-4455-971b-6f8526d6a827">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2'" href="http://10.16.3.40:8080/api/vis/mapServices/template/download/e46c60f2-b1ea-46b7-9f83-51c51a5738b2">模块下载</a>
    </div>
    <div class="bg-plate-tb">
      <!--  5 贫困村表格-->
      <el-table :data="plateList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '4fce5edb-7092-4455-971b-6f8526d6a827'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="村名" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="贫困户数" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="贫困人数" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="地址" min-width="100">
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify5(scope)">修改</el-button>
            <el-button type="text"  @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--人口分布表格   块-->
      <el-table :data="populationDistributionList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2'">
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="人口数量" min-width="180"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modify(scope)" v-if="scope.row.dataExtendList[0].valueContent < 0">录入</el-button>
            <el-button type="text" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  6 医疗机构表格-->
      <el-table :data="medicalInstitutionList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="医院名" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="类型" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="主任及副主任医师" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="主治医师" min-width="100"></el-table-column>
        <el-table-column prop="dataExtendList[3].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 6 教育资源表格-->
      <el-table :data="educationList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="学校名" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="级别" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="老师" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="学生" min-width="100"></el-table-column>
        <el-table-column prop="dataExtendList[3].valueContent" label="地址" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 4 停车场表格-->
      <el-table :data="parkingList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="停车场名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="停车位数量" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 空气检测站点表格-->
      <el-table :data="airList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '25c2ec86-a62e-45c2-a3e7-49a121a1f56d'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="空气监测站点名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 企业分布表格   块-->
      <el-table :data="enterpriseList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'ab84a57c-a97b-42c9-a51a-212db7a7e22b'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="企业数" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modify(scope)" v-if="scope.row.dataExtendList[0].valueContent < 0">录入</el-button>
            <el-button type="text" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 水位监测表格-->
      <el-table :data="waterlevelpriseList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '88ee0a59-19a0-4e42-b4d2-bae59634e110'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="水位监测站点名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--外出务工表格   块-->
      <el-table :data="workList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'fc98c648-edf4-4b87-866c-ef38f39c07a3'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="外出务工人数" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modify(scope)" v-if="scope.row.dataExtendList[0].valueContent < 0">录入</el-button>
            <el-button type="text" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 文化旅游表格-->
      <el-table :data="culturalList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd633bafc-74d0-4f0d-bea5-927ef2df4192'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="文化旅游建筑名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 4 养老机构表格-->
      <el-table :data="pensionList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'a649c4a2-314e-4490-bfee-ca3b7695057b'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="养老机构名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="床位数量" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify5(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 政务部门表格-->
      <el-table :data="governmentList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd42795ca-dad6-4531-aed7-eb75f3d3646d'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="政务部门名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 重点监控污染企业表格-->
      <el-table :data="contaminatedList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'f90edff9-7f21-48e0-9ce4-472377825dae'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="重点监控污染企业名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--贫困人口分布表格 块-->
      <el-table :data="poorList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd525abeb-fcc7-4b8b-96c1-90ff50b14121'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="贫困人口数" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modify(scope)" v-if="scope.row.dataExtendList[0].valueContent < 0">录入</el-button>
            <el-button type="text" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  4 扶贫项目表格-->
      <el-table :data="povertyAlleviationList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'dc42b85c-ee98-4895-bfc2-4c472a092170'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="项目名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详情地区" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="投入金额（万元）" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify5(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--财政人员表格     块-->
      <el-table :data="financialList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '3c7944d7-d874-4478-a25a-e75fc2020d96'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="财政人员数" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modify(scope)" v-if="scope.row.dataExtendList[0].valueContent < 0">录入</el-button>
            <el-button type="text" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--党员分布表格     块-->
      <el-table :data="partyMemberlList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '8a8071f2-2909-4fc7-8125-c2d58aac8263'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="党员分布数" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modify(scope)" v-if="scope.row.dataExtendList[0].valueContent < 0">录入</el-button>
            <el-button type="text" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 公共车站表格-->
      <el-table :data="publicStationList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'e5654a00-c642-44f3-a340-2827f51367d6'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="公共车站名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100">
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="图标" min-width="180"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详情地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 5 规上工业企业表格-->
      <el-table :data="IndustryList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '61894e2c-7738-41af-b797-b8d735a44428'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="规上工业企业名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100"></el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="注册资金" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="员工人数" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详情地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 5 规上建筑企业表格-->
      <el-table :data="architectureList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '9487e07e-6b2f-49c6-b464-2216a680cc3e'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="规上建筑企业名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100"></el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="注册资金" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="员工人数" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详情地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 5 规上商贸企业表格-->
      <el-table :data="tradeList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="规上商贸企业名称" min-width="180"></el-table-column>
        <el-table-column prop="longitude" label="坐标" min-width="100"></el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="注册资金" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="员工人数" min-width="120"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详情地址" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope)">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--修改弹窗-->
      <el-dialog title="修改" :visible.sync="dialogFormVisible" width="500px"  >
        <el-form :model="form" ref ="form" >
          <el-form-item label="村名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="坐标" :label-width="formLabelWidth">
            <el-input v-model="form.coordinate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="贫困户数" :label-width="formLabelWidth">
            <el-input v-model="form.households" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="贫困人数" :label-width="formLabelWidth">
            <el-input v-model="form.pople" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.addrs" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
      <!--5号添加弹窗-->
      <el-dialog title="添加" :visible.sync="dialogFormVisible1" width="500px"  >
        <el-form :model="form" ref ="form" >
          <el-form-item label="村名" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规上工业企业名称" :label-width="formLabelWidth" v-show="this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规上商贸企业名称" :label-width="formLabelWidth" v-show="this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规上建筑企业名称" :label-width="formLabelWidth" v-show="this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="坐标" :label-width="formLabelWidth">
            <el-input v-model="form.coordinate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="贫困户数" :label-width="formLabelWidth" v-show="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'">
            <el-input v-model="form.households" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="注册资金" :label-width="formLabelWidth" v-show="this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'|| this.searchForm.dataTypeId =='1bfa2f78-2174-4e9d-8f2f-58264a00ce83'">
            <el-input v-model="form.households" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="贫困人数" :label-width="formLabelWidth"  v-show="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'">
            <el-input v-model="form.pople" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工人数" :label-width="formLabelWidth" v-show="this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'">
            <el-input v-model="form.pople" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.addrs" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="addTopk()" v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'">确 定</el-button>
          <el-button type="primary" @click="addTogsgy()" v-if="this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'">确 定</el-button>
          <el-button type="primary" @click="addTogsjz()" v-if="this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">确 定</el-button>
          <el-button type="primary" @click="addTogssm()" v-if="this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'">确 定</el-button>
        </div>
      </el-dialog>
      <!--停车场弹窗-->
      <el-dialog title="修改" :visible.sync="dialogFormVisible" width="500px" v-if="this.searchForm.dataTypeId  == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'" >
        <el-form :model="form" ref ="form">
          <el-form-item label="停车位数量" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
      <div class="bg-plate-tbp">
        <el-pagination
          @size-change="pagerSizeChange"
          @current-change="pagerCurrChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 贫困村
      plateList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: '130px',
      form: {
        name: '',
        households: '',
        pople: '',
        addrs: '',
        coordinate: ''
      },
      obj: {},
      // 贫困村添加
      Tobjpk: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1
          },
          {
            valueContent: '',
            serialNumber: 2
          },
          {
            valueContent: '',
            serialNumber: 3
          }
        ],
        dataTypeId: '4fce5edb-7092-4455-971b-6f8526d6a827',
        iconType: 0,
        latitude: 0,
        locationName: '',
        locationTag: '',
        longitude: 0
      },
      // 规上工业添加
      Tobjgsgy: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1
          },
          {
            valueContent: '',
            serialNumber: 2
          },
          {
            valueContent: '',
            serialNumber: 3
          }
        ],
        dataTypeId: '61894e2c-7738-41af-b797-b8d735a44428',
        iconType: 0,
        latitude: 0,
        locationName: '',
        locationTag: '',
        longitude: 0
      },
      // 规上建筑添加
      Tobjgsjz: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1
          },
          {
            valueContent: '',
            serialNumber: 2
          },
          {
            valueContent: '',
            serialNumber: 3
          }
        ],
        dataTypeId: '9487e07e-6b2f-49c6-b464-2216a680cc3e',
        iconType: 0,
        latitude: 0,
        locationName: '',
        locationTag: '',
        longitude: 0
      },
      // 规上商贸添加
      Tobjgssm: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1
          },
          {
            valueContent: '',
            serialNumber: 2
          },
          {
            valueContent: '',
            serialNumber: 3
          }
        ],
        dataTypeId: '1bfa2f78-2174-4e9d-8f2f-58264a00ce83',
        iconType: 0,
        latitude: 0,
        locationName: '',
        locationTag: '',
        longitude: 0
      },
      // 下拉框
      pageList: [
        {dataTypeId: '', typeName: ''}
      ],
      searchForm: {
        dataTypeId: ''
      },
      // 人口分布
      populationDistributionList: [],
      // 医疗机构
      medicalInstitutionList: [],
      // 教育资源
      educationList: [],
      // 停车场
      parkingList: [],
      // 空气监测站点
      airList: [],
      // 企业分布
      enterpriseList: [],
      // 水位监测站点
      waterlevelpriseList: [],
      // 外出务工
      workList: [],
      // 文化旅游
      culturalList: [],
      // 养老机构
      pensionList: [],
      // 政务部门
      governmentList: [],
      // 重点监控污染企业
      contaminatedList: [],
      // 贫困人口分布
      poorList: [],
      // 扶贫项目
      povertyAlleviationList: [],
      // 财政人员
      financialList: [],
      // 党员分布
      partyMemberlList: [],
      // 公共车站
      publicStationList: [],
      // 规上工业企业
      IndustryList: [],
      // 规上建筑企业
      architectureList: [],
      // 规上商贸企业
      tradeList: []
    }
  },
  computed: {
  },
  created () {
    this.getPlateList();
    this.getdataTypesList();
    this.populationDistribution();
    this.medicalInstitution();
    this.education();
    this.parking();
    this.industry();
    this.architecture();
    this.trade();
  },
  mounted () {
  },
  methods: {
    // 下拉框事件
    getValue: function (scope) {
      console.log(scope)
    },
    // 点击事件
    query: function () {
      // let scope = this.searchForm.dataTypeId;
      // if (scope === '4fce5edb-7092-4455-971b-6f8526d6a827') {
      //   this.$router.push({name: 'poor-village'});
      // } else if (scope === 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2') {
      //   this.$router.push({name: 'population-distribution'});
      // }
    },
    // 分页
    pagerSizeChange (val) {
      this.pageSize = val;
      this.getPlateList();
    },
    pagerCurrChange (val) {
      this.currentPage = val;
      this.getPlateList();
    },
    // 查询地图应用类型
    getdataTypesList () {
      this.axios.get('/vis/mapServices/dataTypes')
        .then(res => {
          this.pageList = res.data;
        })
    },
    // 获取贫困村数据
    getPlateList () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=4fce5edb-7092-4455-971b-6f8526d6a827')
        .then(res => {
          this.plateList = res.data.list;
          this.total = res.data.total;
          console.log(res)
        })
    },
    // 获取人口分布数据
    populationDistribution () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=e46c60f2-b1ea-46b7-9f83-51c51a5738b2')
        .then(res => {
          this.populationDistributionList = res.data.list;
        })
    },
    // 获取医疗机构数据
    medicalInstitution () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=d60e1ff2-e6c0-4393-94c7-28bb9f118cce')
        .then(res => {
          this.medicalInstitutionList = res.data.list;
        })
    },
    // 获取教育资源
    education () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=739fe4f5-49c6-42ca-ba87-76f5300ab5af')
        .then(res => {
          this.educationList = res.data.list;
        })
    },
    // 获取停车场
    parking () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=ac94e4c6-7e49-45c5-9610-1556245c45cf')
        .then(res => {
          this.parkingList = res.data.list;
        })
    },
    // 获取规上工业企业数据
    industry () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=61894e2c-7738-41af-b797-b8d735a44428')
        .then(res => {
          this.IndustryList = res.data.list;
        })
    },
    // 获取规上建筑企业数据
    architecture () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=9487e07e-6b2f-49c6-b464-2216a680cc3e')
        .then(res => {
          this.architectureList = res.data.list;
        })
    },
    // 获取规上商贸企业数据
    trade () {
      this.axios.get('/vis/mapServices/datas?where.dataTypeId=1bfa2f78-2174-4e9d-8f2f-58264a00ce83')
        .then(res => {
          this.tradeList = res.data.list;
        })
    },
    // 修改数据
    modify5 (scope) {
      this.dialogFormVisible = true;
      this.obj = {
        dataExtendList: [
          {
            extendId: scope.row.dataExtendList[0].extendId,
            dataId: scope.row.dataExtendList[0].dataId,
            contentName: scope.row.dataExtendList[0].contentName,
            valueContent: scope.row.dataExtendList[0].valueContent,
            valueUnit: scope.row.dataExtendList[0].valueUnit,
            serialNumber: scope.row.dataExtendList[0].serialNumber
          },
          {
            extendId: scope.row.dataExtendList[1].extendId,
            dataId: scope.row.dataExtendList[1].dataId,
            contentName: scope.row.dataExtendList[1].contentName,
            valueContent: scope.row.dataExtendList[1].valueContent,
            valueUnit: scope.row.dataExtendList[1].valueUnit,
            serialNumber: scope.row.dataExtendList[1].serialNumber
          },
          {
            extendId: scope.row.dataExtendList[2].extendId,
            dataId: scope.row.dataExtendList[2].dataId,
            contentName: scope.row.dataExtendList[2].contentName,
            valueContent: scope.row.dataExtendList[2].valueContent,
            valueUnit: scope.row.dataExtendList[2].valueUnit,
            serialNumber: scope.row.dataExtendList[2].serialNumber
          }
        ],
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      console.log(this.obj)
    },
    sure () {
      this.dialogFormVisible = false;
      let params = this.obj;
      params.locationName = this.form.name;
      params.longitude = this.form.coordinate;
      params.dataExtendList[0].valueContent = this.form.households;
      params.dataExtendList[1].valueContent = this.form.pople;
      params.dataExtendList[2].valueContent = this.form.addrs;
      this.axios.put('/vis/mapServices/datas', params)
        .then(res => {
          this.getPlateList();
        })
    },
    // 删除数据
    shchu (scope) {
      this.axios.delete('/vis/mapServices/data/' + scope.row.dataId)
        .then(res => {
          this.getPlateList();
        })
    },
    // 添加贫困村数据
    addTopk () {
      this.dialogFormVisible1 = false;
      this.Tobjpk.locationName = this.form.name;
      this.Tobjpk.longitude = this.form.coordinate;
      this.Tobjpk.dataExtendList[0].valueContent = this.form.households;
      this.Tobjpk.dataExtendList[1].valueContent = this.form.pople;
      this.Tobjpk.dataExtendList[2].valueContent = this.form.addrs;
      this.axios.post('/vis/mapServices/data', this.Tobjpk)
        .then(res => {
          this.getPlateList();
        });
    },
    // 添加规上工业企业数据
    addTogsgy () {
      this.dialogFormVisible1 = false;
      this.Tobjgsgy.locationName = this.form.name;
      this.Tobjgsgy.longitude = this.form.coordinate;
      this.Tobjgsgy.dataExtendList[0].valueContent = this.form.households;
      this.Tobjgsgy.dataExtendList[1].valueContent = this.form.pople;
      this.Tobjgsgy.dataExtendList[2].valueContent = this.form.addrs;
      this.axios.post('/vis/mapServices/data', this.Tobjgsgy)
        .then(res => {
          this.industry();
        });
    },
    // 添加规上建筑企业数据
    addTogsjz () {
      this.dialogFormVisible1 = false;
      this.Tobjgsjz.locationName = this.form.name;
      this.Tobjgsjz.longitude = this.form.coordinate;
      this.Tobjgsjz.dataExtendList[0].valueContent = this.form.households;
      this.Tobjgsjz.dataExtendList[1].valueContent = this.form.pople;
      this.Tobjgsjz.dataExtendList[2].valueContent = this.form.addrs;
      this.axios.post('/vis/mapServices/data', this.Tobjgsjz)
        .then(res => {
          this.architecture();
        });
    },
    // 添加规上商贸企业数据
    addTogssm () {
      this.dialogFormVisible1 = false;
      this.Tobjgssm.locationName = this.form.name;
      this.Tobjgssm.longitude = this.form.coordinate;
      this.Tobjgssm.dataExtendList[0].valueContent = this.form.households;
      this.Tobjgssm.dataExtendList[1].valueContent = this.form.pople;
      this.Tobjgssm.dataExtendList[2].valueContent = this.form.addrs;
      this.axios.post('/vis/mapServices/data', this.Tobjgssm)
        .then(res => {
          this.trade();
        });
    }
  }
}
</script>
<style lang="scss" scoped>
  .vis-bg-plate {
    padding: 20px 20px 0 20px;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-sf {
    padding-top: 20px;
    position: relative;
    .add-plate-btn {
      position: absolute; top: 23px; right: 195px;
    }
    .add-plate-btnf{
      position: absolute; top: 23px; right: 95px
    }
    .add-plate-btns{
      position: absolute; top: 26px; right: 20px;
      border: none;
      display: inline-block;
    }
  }
  .bg-plate-tb {
    border: 1px solid #E3E3E3;
    padding-bottom: 20px;
    > .bg-plate-tbp {
      text-align: right;
      padding: 20px 20px 0 0;
    }
  }
</style>
