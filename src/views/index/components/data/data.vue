<template>
  <div class="vis-bg-plate">
    <div class="bg-plate-bd">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item ><span style="color:#0785FD;font-size:14px;">数据维护</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-plate-sf">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
        <el-form-item label="地图板块">
          <el-select v-model="searchForm.dataTypeId" placeholder="选择数据" style="width: 160px;" @change="getValue">
            <el-option  v-for="(item, index) in pageList" :label="item.typeName" :value="item.dataTypeId" :key="'spl_' + index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坐标状态" v-if="o[searchForm.dataTypeId]">
          <el-select v-model="searchForm.coordinateStatus" placeholder="选择坐标状态" style="width: 160px;" @change="getStatusValue">
            <el-option label="无坐标" :value="-1"></el-option>
            <el-option label="精确坐标" :value="0"></el-option>
            <el-option label="推荐坐标" :value="1"></el-option>
          </el-select>
          <el-button icon="el-icon-search" @click.native="searchFormSubmit" type="primary" >查询</el-button>
          <el-button  @click.native="searchreFormSubmit" class="selectBtn">重置</el-button>
        </el-form-item>
      </el-form>
      <!--贫困村添加-->
      <span class="add-plate-btnsh" :loading="calcCoordinateLoading" style="color: #1ABC9C; font-size: 14px;" ><i :class="staclass"></i>{{status}}</span>
      <el-button v-if="o[searchForm.dataTypeId]" type="primary" size="small" class="add-plate-btnh" icon="el-icon-location-outline" @click="calcCoordinate" >获取坐标</el-button>
      <el-button v-if="o[searchForm.dataTypeId]" type="primary" size="small" class="add-plate-btn" icon="el-icon-plus" @click="fillIn">添加</el-button>
      <el-upload :action ="$store.state.fileUploadUrl +'/mapServices/data/excelImport/' + searchForm.dataTypeId" :auto-upload="true" :on-success="handlePreview" :show-file-list="false">
        <el-button style="color:#0785FD;font-size:14px; border-color:#0785FD" size="mini" class="add-plate-btnf"  v-if="o[searchForm.dataTypeId]">一键导入</el-button>
      </el-upload>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/1bfa2f78-2174-4e9d-8f2f-58264a00ce83'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '9487e07e-6b2f-49c6-b464-2216a680cc3e'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/9487e07e-6b2f-49c6-b464-2216a680cc3e'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '61894e2c-7738-41af-b797-b8d735a44428'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/61894e2c-7738-41af-b797-b8d735a44428'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'e5654a00-c642-44f3-a340-2827f51367d6'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/e5654a00-c642-44f3-a340-2827f51367d6'">模块下载</a>
      <!--<a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '8a8071f2-2909-4fc7-8125-c2d58aac8263'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/8a8071f2-2909-4fc7-8125-c2d58aac8263'">模块下载</a>-->
      <!--<a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '3c7944d7-d874-4478-a25a-e75fc2020d96'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/3c7944d7-d874-4478-a25a-e75fc2020d96'">模块下载</a>-->
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'dc42b85c-ee98-4895-bfc2-4c472a092170'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/dc42b85c-ee98-4895-bfc2-4c472a092170'">模块下载</a>
      <!--<a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'd525abeb-fcc7-4b8b-96c1-90ff50b14121'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/d525abeb-fcc7-4b8b-96c1-90ff50b14121'">模块下载</a>-->
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'f90edff9-7f21-48e0-9ce4-472377825dae'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/f90edff9-7f21-48e0-9ce4-472377825dae'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'd42795ca-dad6-4531-aed7-eb75f3d3646d'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/d42795ca-dad6-4531-aed7-eb75f3d3646d'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'a649c4a2-314e-4490-bfee-ca3b7695057b'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/a649c4a2-314e-4490-bfee-ca3b7695057b'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'd633bafc-74d0-4f0d-bea5-927ef2df4192'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/d633bafc-74d0-4f0d-bea5-927ef2df4192'">模块下载</a>
      <!--<a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'fc98c648-edf4-4b87-866c-ef38f39c07a3'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/fc98c648-edf4-4b87-866c-ef38f39c07a3'">模块下载</a>-->
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '88ee0a59-19a0-4e42-b4d2-bae59634e110'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/88ee0a59-19a0-4e42-b4d2-bae59634e110'">模块下载</a>
      <!--<a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'ab84a57c-a97b-42c9-a51a-212db7a7e22b'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/ab84a57c-a97b-42c9-a51a-212db7a7e22b'">模块下载</a>-->
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '25c2ec86-a62e-45c2-a3e7-49a121a1f56d'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/25c2ec86-a62e-45c2-a3e7-49a121a1f56d'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/ac94e4c6-7e49-45c5-9610-1556245c45cf'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/739fe4f5-49c6-42ca-ba87-76f5300ab5af'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/d60e1ff2-e6c0-4393-94c7-28bb9f118cce'">模块下载</a>
      <a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == '4fce5edb-7092-4455-971b-6f8526d6a827'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/4fce5edb-7092-4455-971b-6f8526d6a827'">模块下载</a>
      <!--<a style="color:#0785FD;font-size:14px;" size="mini" class="add-plate-btns" v-if="this.searchForm.dataTypeId  == 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2'" :href="$store.state.fileUploadUrl + '/mapServices/template/download/e46c60f2-b1ea-46b7-9f83-51c51a5738b2'">模块下载</a>-->
    </div>
    <div class="bg-plate-tb">
      <!--选择数据-->
      <div v-if="searchForm.dataTypeId == ''" style=" width: 200px; margin:0 auto; padding-top:200px;padding-bottom:200px; color:#999999; font-size: 14px">请先选择你要维护的数据类型</div>
      <!--  5 贫困村表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-if="searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'" key="2" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="村名" ></el-table-column>
        <el-table-column label="坐标">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="贫困户数(户)"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="贫困人数(人)"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详细地址" >
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="modifypk5(scope)" >修改</el-button>
            <el-button type="text" class="vis-bg-del-btn"  @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--人口分布表格   块-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-if="searchForm.dataTypeId == 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2'" key="1">
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名" min-width="180"></el-table-column>
        <el-table-column  label="坐标" min-width="220">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="人口数量(人)" min-width="180"></el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent <= 0">录入</el-button>
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  6 医疗机构表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="医疗机构名称"></el-table-column>
        <el-table-column  label="坐标"  >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="类型" ></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="工作人员数量(人)" ></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="床位数(张)" ></el-table-column>
        <el-table-column prop="dataExtendList[3].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="modify6(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 5 教育资源表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="学校名" ></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="级别" ></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="师生人数(人)" ></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详细地址"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyjy5(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 4 停车场表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="停车场名称"></el-table-column>
        <el-table-column  label="坐标">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="停车位数量(个)"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="modify4(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 空气检测站点表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '25c2ec86-a62e-45c2-a3e7-49a121a1f56d'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="空气监测站点名称" min-width="130"></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="modify3(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 企业分布表格   块-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'ab84a57c-a97b-42c9-a51a-212db7a7e22b'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="120"></el-table-column>
        <el-table-column label="坐标" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="企业数(家)" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent <= 0">录入</el-button>
            <el-button type="text"   @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 水位监测表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '88ee0a59-19a0-4e42-b4d2-bae59634e110'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="水位监测站点名称" ></el-table-column>
        <el-table-column  label="坐标">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify3(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--外出务工表格   块-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'fc98c648-edf4-4b87-866c-ef38f39c07a3'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="100"></el-table-column>
        <el-table-column  label="坐标" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="外出务工人数(人)" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent <= 0">录入</el-button>
            <el-button type="text"   @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 文化旅游表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd633bafc-74d0-4f0d-bea5-927ef2df4192'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="文化旅游建筑名称"></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify3(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 4 养老机构表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'a649c4a2-314e-4490-bfee-ca3b7695057b'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="养老机构名称"></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="床位数量(张)"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify4(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 政务部门表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd42795ca-dad6-4531-aed7-eb75f3d3646d'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="政务部门名称"></el-table-column>
        <el-table-column  label="坐标">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址" min-width="150"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify3(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 重点监控污染企业表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'f90edff9-7f21-48e0-9ce4-472377825dae'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="重点监控污染企业名称"></el-table-column>
        <el-table-column  label="坐标">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify3(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--贫困人口分布表格 块-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'd525abeb-fcc7-4b8b-96c1-90ff50b14121'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="130"></el-table-column>
        <el-table-column  label="坐标" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="贫困人口数(人)" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent <= 0">录入</el-button>
            <el-button type="text"   @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  4 扶贫项目表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'dc42b85c-ee98-4895-bfc2-4c472a092170'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="项目名称" ></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="投入金额（万元" ></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify4(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--财政人员表格     块-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '3c7944d7-d874-4478-a25a-e75fc2020d96'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="140"></el-table-column>
        <el-table-column  label="坐标" min-width="130">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="财政人员数(人)" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent == ''">录入</el-button>
            <el-button type="text"   @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--党员分布表格     块-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '8a8071f2-2909-4fc7-8125-c2d58aac8263'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="镇名称" min-width="140"></el-table-column>
        <el-table-column  label="坐标" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="党员分布数(人)" min-width="120"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent <= 0">录入</el-button>
            <el-button type="text"  @click="modifyk3(scope)" v-if="scope.row.dataExtendList[0].valueContent > 0">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3 公共车站表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == 'e5654a00-c642-44f3-a340-2827f51367d6'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="公共车站名称" min-width="120"></el-table-column>
        <el-table-column label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify3(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 5 规上工业企业表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '61894e2c-7738-41af-b797-b8d735a44428'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="规上工业企业名称"></el-table-column>
        <el-table-column  label="坐标">
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="员工人数(人)"></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="注册资金(万元)" ></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify5(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 5 规上建筑企业表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '9487e07e-6b2f-49c6-b464-2216a680cc3e'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="规上建筑企业名称" ></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="员工人数(人)" ></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="注册资金(万元)"></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify5(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 5 规上商贸企业表格-->
      <el-table :data="plateList"  highlight-current-row style="width: 100%;" v-show="this.searchForm.dataTypeId  == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="locationName" label="规上商贸企业名称" ></el-table-column>
        <el-table-column  label="坐标" >
          <template slot-scope="scope">
            <span>{{scope.row.longitude}}</span>,<span>{{scope.row.latitude}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="coordinateStatus">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="推荐坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon2.png"  v-show="scope.row.coordinateStatus === 1">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="无坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon3.png" v-show="scope.row.coordinateStatus === -1"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="精确坐标" placement="bottom">
              <img src="../../../../assets/img/icons/icon1.png" v-show="scope.row.coordinateStatus === 0">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dataExtendList[0].valueContent" label="员工人数(人)" ></el-table-column>
        <el-table-column prop="dataExtendList[1].valueContent" label="注册资金(万元)" ></el-table-column>
        <el-table-column prop="dataExtendList[2].valueContent" label="详细地址" ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="modify5(scope)">修改</el-button>
            <el-button type="text" class="vis-bg-del-btn" @click="shchu(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--修改弹窗-->
      <el-dialog title="修改" :visible.sync="dialogFormVisible" width="600px"  >
        <el-form :model="form" ref ="form"  :rules="rulesx" style="padding-right: 60px;" >
          <el-form-item :label="getName" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="坐标" :label-width="formLabelWidth" prop="coordinate">
            <el-input v-model="form.coordinate" auto-complete="off"  style="width: 80%"></el-input>
            <i @click="selPosition" class="el-icon-location-outline" style="font-size: 24px; cursor: pointer; color: #409EFF; position: relative; top: 3px;"></i>
          </el-form-item>
          <el-form-item label="投入金额（万元）" :label-width="formLabelWidth" prop="number" v-if="this.searchForm.dataTypeId == 'dc42b85c-ee98-4895-bfc2-4c472a092170'">
            <el-input v-model="form.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="床位数量(张)" :label-width="formLabelWidth" prop="number" v-if="this.searchForm.dataTypeId == 'a649c4a2-314e-4490-bfee-ca3b7695057b'">
            <el-input v-model="form.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="停车位数量(个)" :label-width="formLabelWidth" prop="number" v-if="this.searchForm.dataTypeId == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'">
            <el-input v-model="form.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth" prop="level" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">
            <el-input v-model="form.level" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作人员数量(人)" :label-width="formLabelWidth" prop="teacher" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">
            <el-input v-model="form.teacher" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别" :label-width="formLabelWidth" prop="level" v-if="this.searchForm.dataTypeId == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'">
            <el-input v-model="form.level" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="床位数(张)" :label-width="formLabelWidth" prop="student" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">
            <el-input v-model="form.student" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="getHouseholds" :label-width="formLabelWidth" prop="households"
                        v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'||
                               this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'||this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'||this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">
            <el-input v-model="form.households" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="getpPoples" :label-width="formLabelWidth" prop="pople"
                        v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'||this.searchForm.dataTypeId == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'||
                               this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'||this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'||this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">
            <el-input v-model="form.pople" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="addrs">
            <el-input v-model="form.addrs" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure5('form')" v-show="this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'||this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'||this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">确 定</el-button>
          <el-button type="primary" @click="sure6('form')" v-show="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">确 定</el-button>
          <el-button type="primary" @click="sure4('form')" v-show="this.searchForm.dataTypeId == 'a649c4a2-314e-4490-bfee-ca3b7695057b'||this.searchForm.dataTypeId == 'dc42b85c-ee98-4895-bfc2-4c472a092170'||this.searchForm.dataTypeId == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'">确 定</el-button>
          <el-button type="primary" @click="surepk5('form')" v-show="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'">确 定</el-button>
          <el-button type="primary" @click="surejy5('form')" v-show="this.searchForm.dataTypeId == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'">确 定</el-button>
          <el-button
            type="primary" @click="sure3('form')"
            v-show="this.searchForm.dataTypeId == '25c2ec86-a62e-45c2-a3e7-49a121a1f56d'
            ||this.searchForm.dataTypeId == '88ee0a59-19a0-4e42-b4d2-bae59634e110'||this.searchForm.dataTypeId == 'd633bafc-74d0-4f0d-bea5-927ef2df4192'||this.searchForm.dataTypeId == 'd42795ca-dad6-4531-aed7-eb75f3d3646d'||this.searchForm.dataTypeId == 'f90edff9-7f21-48e0-9ce4-472377825dae'||this.searchForm.dataTypeId == 'e5654a00-c642-44f3-a340-2827f51367d6'">确 定</el-button>
        </div>
      </el-dialog>
      <!--块修改弹窗-->
      <el-dialog title="修改" :visible.sync="dialogFormVisible2" width="600px"  >
        <el-form :model="form2" ref ="form2" :rules="rule2" style="padding-right: 60px;">
          <!--<el-form-item label="镇名称" :label-width="formLabelWidth" prop="name">-->
            <!--<el-input v-model ="form2.name" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="坐标" :label-width="formLabelWidth" prop="coordinate">
            <el-input v-model="form2.coordinate" auto-complete="off" style="width: 80%"></el-input>
            <i @click="selPosition" class="el-icon-location-outline" style="font-size: 24px; cursor: pointer; color: #409EFF; position: relative; top: 3px;"></i>
          </el-form-item>
          <el-form-item label="人口数量(人)" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == 'e46c60f2-b1ea-46b7-9f83-51c51a5738b2'" prop="addrs">
            <el-input v-model ="form2.addrs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业数(家)" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == 'ab84a57c-a97b-42c9-a51a-212db7a7e22b'" prop="addrs">
            <el-input v-model ="form2.addrs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="外出务工人数(人)" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == 'fc98c648-edf4-4b87-866c-ef38f39c07a3'" prop="addrs">
            <el-input v-model ="form2.addrs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="贫困人口数(人)" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == 'd525abeb-fcc7-4b8b-96c1-90ff50b14121'" prop="addrs">
            <el-input v-model ="form2.addrs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="财政人员数(人)" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == '3c7944d7-d874-4478-a25a-e75fc2020d96'" prop="addrs">
            <el-input v-model ="form2.addrs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label ="党员分布数(人)" :label-width="formLabelWidth" v-if="this.searchForm.dataTypeId == '8a8071f2-2909-4fc7-8125-c2d58aac8263'" prop="addrs">
            <el-input v-model ="form2.addrs" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="surek3('form2')">确定</el-button>
        </div>
      </el-dialog>
      <!--添加弹窗-->
      <el-dialog title="添加" :visible.sync="dialogFormVisible1" width="600px">
        <el-form :model="form1" ref ="form1"  :rules="rules" style="padding-right: 60px;">
          <el-form-item :label="getName" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form1.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="坐标" :label-width="formLabelWidth" prop="coordinate">
            <el-input v-model="form1.coordinate" auto-complete="off" style="width: 80%;"></el-input>
            <i @click="selPosition" class="el-icon-location-outline" style="font-size: 24px; cursor: pointer; color: #409EFF; position: relative; top: 3px;"></i>
          </el-form-item>
          <el-form-item label="投入金额（万元）" :label-width="formLabelWidth"  prop="number" v-if="this.searchForm.dataTypeId == 'dc42b85c-ee98-4895-bfc2-4c472a092170'">
            <el-input v-model="form1.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="床位数量(张)" :label-width="formLabelWidth" prop="number" v-if="this.searchForm.dataTypeId == 'a649c4a2-314e-4490-bfee-ca3b7695057b'">
            <el-input v-model="form1.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="停车位数量(个)" :label-width="formLabelWidth"  prop="number" v-if="this.searchForm.dataTypeId == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'">
            <el-input v-model="form1.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth" prop="level" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">
            <el-input v-model="form1.level" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作人员数量(人)" :label-width="formLabelWidth" prop="teacher" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">
            <el-input v-model="form1.teacher" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别" :label-width="formLabelWidth" prop="level" v-if="this.searchForm.dataTypeId == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'">
            <el-input v-model="form1.level" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="床位数(张)" :label-width="formLabelWidth" prop="student" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">
            <el-input v-model="form1.student" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="getHouseholds" :label-width="formLabelWidth" prop="households"
                        v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'||
                               this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'||this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'||this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">
            <el-input v-model="form1.households" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="getpPoples" :label-width="formLabelWidth" prop="pople"
                        v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'||this.searchForm.dataTypeId == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'||
                               this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'||this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'||this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">
            <el-input v-model="form1.pople" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="addrs">
            <el-input v-model="form1.addrs" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="addTopk('form1')" v-if="this.searchForm.dataTypeId == '4fce5edb-7092-4455-971b-6f8526d6a827'">确 定</el-button>
          <el-button type="primary" @click="addTogsgy('form1')" v-if="this.searchForm.dataTypeId == '61894e2c-7738-41af-b797-b8d735a44428'">确 定</el-button>
          <el-button type="primary" @click="addTogsjz('form1')" v-if="this.searchForm.dataTypeId == '9487e07e-6b2f-49c6-b464-2216a680cc3e'">确 定</el-button>
          <el-button type="primary" @click="addTogssm('form1')" v-if="this.searchForm.dataTypeId == '1bfa2f78-2174-4e9d-8f2f-58264a00ce83'">确 定</el-button>
          <el-button type="primary" @click="addToylzy('form1')" v-if="this.searchForm.dataTypeId == 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce'">确 定</el-button>
          <el-button type="primary" @click="addTojyzy('form1')" v-if="this.searchForm.dataTypeId == '739fe4f5-49c6-42ca-ba87-76f5300ab5af'">确 定</el-button>
          <el-button type="primary" @click="addTotcc('form1')" v-if="this.searchForm.dataTypeId == 'ac94e4c6-7e49-45c5-9610-1556245c45cf'">确 定</el-button>
          <el-button type="primary" @click="addToyljg('form1')" v-if="this.searchForm.dataTypeId == 'a649c4a2-314e-4490-bfee-ca3b7695057b'">确 定</el-button>
          <el-button type="primary" @click="addTofpxm('form1')" v-if="this.searchForm.dataTypeId == 'dc42b85c-ee98-4895-bfc2-4c472a092170'">确 定</el-button>
          <el-button type="primary" @click="addTokq('form1')" v-if="this.searchForm.dataTypeId == '25c2ec86-a62e-45c2-a3e7-49a121a1f56d'">确 定</el-button>
          <el-button type="primary" @click="addTosw('form1')" v-if="this.searchForm.dataTypeId == '88ee0a59-19a0-4e42-b4d2-bae59634e110'">确 定</el-button>
          <el-button type="primary" @click="addTowh('form1')" v-if="this.searchForm.dataTypeId == 'd633bafc-74d0-4f0d-bea5-927ef2df4192'">确 定</el-button>
          <el-button type="primary" @click="addTozw('form1')" v-if="this.searchForm.dataTypeId == 'd42795ca-dad6-4531-aed7-eb75f3d3646d'">确 定</el-button>
          <el-button type="primary" @click="addTozdjk('form1')" v-if="this.searchForm.dataTypeId == 'f90edff9-7f21-48e0-9ce4-472377825dae'">确 定</el-button>
          <el-button type="primary" @click="addToggcz('form1')" v-if="this.searchForm.dataTypeId == 'e5654a00-c642-44f3-a340-2827f51367d6'">确 定</el-button>
        </div>
      </el-dialog>
      <!--删除弹窗-->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
        <span>确认删除吗？</span>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="qued()">确 定</el-button>
           </span>
      </el-dialog>
      <div class="bg-plate-tbp" v-if="u[searchForm.dataTypeId]">
        <el-pagination
          background
          @size-change="pagerSizeChange"
          @current-change="pagerCurrChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div is="mapPoint" @mapPointSubmit="mapPointSubmit" :open="open" :oConfig="oConfig"></div>
  </div>
</template>
<script>
import mapPoint from '@/components/common/mapPoint.vue';
import {checkGps} from '@/utils/validator.js';
export default {
  components: {mapPoint},
  data () {
    return {
      staclass: '',
      status: '',
      calcCoordinateLoading: false,
      aa: '',
      open: false,
      oConfig: {},
      qureyId: '',
      // 贫困村
      plateList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogVisible: false,
      formLabelWidth: '140px',
      form: {
        name: '',
        households: '',
        pople: '',
        addrs: '',
        coordinate: '',
        level: '',
        teacher: '',
        student: '',
        number: ''
      },
      form1: {
        name: '',
        households: '',
        pople: '',
        addrs: '',
        coordinate: '',
        level: '',
        teacher: '',
        student: '',
        number: ''
      },
      form2: {
        name: '',
        addrs: '',
        coordinate: ''
      },
      // 添加表单验证
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        coordinate: [
          {required: true, message: '请输入坐标', trigger: 'blur'},
          { validator: checkGps, trigger: 'blur' }
        ],
        addrs: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
        number: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^-?\d*\.?\d*$/, message: '必须为数字值'}
        ],
        households: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^-?\d*\.?\d*$/, message: '必须为数字值'}
        ],
        pople: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ],
        level: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        teacher: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ],
        student: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ]
      },
      rulesx: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        coordinate: [
          {required: true, message: '请输入坐标', trigger: 'blur'},
          { validator: checkGps, trigger: 'blur' }
        ],
        addrs: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
        number: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^-?\d*\.?\d*$/, message: '必须为数字值'}
        ],
        households: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^-?\d*\.?\d*$/, message: '必须为数字值'}
        ],
        pople: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ],
        level: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        teacher: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ],
        student: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ]
      },
      rule2: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        coordinate: [
          {required: true, message: '请输入坐标', trigger: 'blur'},
          { validator: checkGps, trigger: 'blur' }
        ],
        addrs: [
          {required: true, message: '不能为空', trigger: 'blur'},
          {pattern: /^[1-9]\d*$/, message: '必须为正整数'}
        ]
      },
      obj: {},
      // 删除ID
      shchuId: '',
      // 控制添加按钮的显隐
      o: {
        '4fce5edb-7092-4455-971b-6f8526d6a827': true,
        'd60e1ff2-e6c0-4393-94c7-28bb9f118cce': true,
        '739fe4f5-49c6-42ca-ba87-76f5300ab5af': true,
        'ac94e4c6-7e49-45c5-9610-1556245c45cf': true,
        '25c2ec86-a62e-45c2-a3e7-49a121a1f56d': true,
        '88ee0a59-19a0-4e42-b4d2-bae59634e110': true,
        'd633bafc-74d0-4f0d-bea5-927ef2df4192': true,
        'a649c4a2-314e-4490-bfee-ca3b7695057b': true,
        'd42795ca-dad6-4531-aed7-eb75f3d3646d': true,
        'f90edff9-7f21-48e0-9ce4-472377825dae': true,
        'dc42b85c-ee98-4895-bfc2-4c472a092170': true,
        'e5654a00-c642-44f3-a340-2827f51367d6': true,
        '61894e2c-7738-41af-b797-b8d735a44428': true,
        '9487e07e-6b2f-49c6-b464-2216a680cc3e': true,
        '1bfa2f78-2174-4e9d-8f2f-58264a00ce83': true
      },
      // 控制翻页的显影
      u: {
        '4fce5edb-7092-4455-971b-6f8526d6a827': true,
        'd60e1ff2-e6c0-4393-94c7-28bb9f118cce': true,
        '739fe4f5-49c6-42ca-ba87-76f5300ab5af': true,
        'ac94e4c6-7e49-45c5-9610-1556245c45cf': true,
        '25c2ec86-a62e-45c2-a3e7-49a121a1f56d': true,
        '88ee0a59-19a0-4e42-b4d2-bae59634e110': true,
        'd633bafc-74d0-4f0d-bea5-927ef2df4192': true,
        'a649c4a2-314e-4490-bfee-ca3b7695057b': true,
        'd42795ca-dad6-4531-aed7-eb75f3d3646d': true,
        'f90edff9-7f21-48e0-9ce4-472377825dae': true,
        'dc42b85c-ee98-4895-bfc2-4c472a092170': true,
        'e5654a00-c642-44f3-a340-2827f51367d6': true,
        '61894e2c-7738-41af-b797-b8d735a44428': true,
        '9487e07e-6b2f-49c6-b464-2216a680cc3e': true,
        '1bfa2f78-2174-4e9d-8f2f-58264a00ce83': true,
        'e46c60f2-b1ea-46b7-9f83-51c51a5738b2': true,
        'ab84a57c-a97b-42c9-a51a-212db7a7e22b': true,
        'fc98c648-edf4-4b87-866c-ef38f39c07a3': true,
        'd525abeb-fcc7-4b8b-96c1-90ff50b14121': true,
        '3c7944d7-d874-4478-a25a-e75fc2020d96': true,
        '8a8071f2-2909-4fc7-8125-c2d58aac8263': true
      },
      // 贫困村添加
      Tobjpk: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '贫困户数',
            valueUnit: '户'
          },
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '贫困人数',
            valueUnit: '人'
          },
          {
            valueContent: '',
            serialNumber: 2,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '4fce5edb-7092-4455-971b-6f8526d6a827',
        iconType: 8,
        latitude: 0,
        locationName: '',
        locationTag: '村名',
        longitude: 0
      },
      // 规上工业添加
      Tobjgsgy: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '员工人数',
            valueUnit: '人'
          },
          {
            valueContent: '',
            serialNumber: 2,
            contentName: '注册资金',
            valueUnit: '万元'
          },
          {
            valueContent: '',
            serialNumber: 3,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '61894e2c-7738-41af-b797-b8d735a44428',
        iconType: 12,
        latitude: 0,
        locationName: '',
        locationTag: '规上工业企业名称',
        longitude: 0
      },
      // 规上建筑添加
      Tobjgsjz: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '员工人数',
            valueUnit: '人'
          },
          {
            valueContent: '',
            serialNumber: 2,
            contentName: '注册资金',
            valueUnit: '万元'
          },
          {
            valueContent: '',
            serialNumber: 3,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '9487e07e-6b2f-49c6-b464-2216a680cc3e',
        iconType: 12,
        latitude: 0,
        locationName: '',
        locationTag: '规上建筑企业名称',
        longitude: 0
      },
      // 规上商贸添加
      Tobjgssm: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '员工人数',
            valueUnit: '人'
          },
          {
            valueContent: '',
            serialNumber: 2,
            contentName: '注册资金',
            valueUnit: '万元'
          },
          {
            valueContent: '',
            serialNumber: 3,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '1bfa2f78-2174-4e9d-8f2f-58264a00ce83',
        iconType: 12,
        latitude: 0,
        locationName: '',
        locationTag: '规上商贸企业名称',
        longitude: 0
      },
      // 医疗资源添加
      Tobjylzy: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '类型',
            valueUnit: ''
          },
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '工作人员数量',
            valueUnit: '人'
          },
          {
            valueContent: '',
            serialNumber: 2,
            contentName: '床位数',
            valueUnit: '张'
          },
          {
            valueContent: '',
            serialNumber: 3,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'd60e1ff2-e6c0-4393-94c7-28bb9f118cce',
        iconType: 1,
        latitude: 0,
        locationName: '',
        locationTag: '医疗机构名称',
        longitude: 0
      },
      // 教育资源添加
      Tobjjyzy: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '级别',
            valueUnit: ''
          },
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '师生人数',
            valueUnit: '人'
          },
          {
            valueContent: '',
            serialNumber: 2,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '739fe4f5-49c6-42ca-ba87-76f5300ab5af',
        iconType: 9,
        latitude: 0,
        locationName: '',
        locationTag: '学校名',
        longitude: 0
      },
      // 停车场添加
      Tobjtcc: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '停车位数量',
            valueUnit: '个'
          },
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'ac94e4c6-7e49-45c5-9610-1556245c45cf',
        iconType: 7,
        latitude: 0,
        locationName: '',
        locationTag: '停车场名称',
        longitude: 0
      },
      // 养老机构添加
      Tobjyljg: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '床位数量',
            valueUnit: '张'
          },
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'a649c4a2-314e-4490-bfee-ca3b7695057b',
        iconType: 4,
        latitude: 0,
        locationName: '',
        locationTag: '养老机构名称',
        longitude: 0
      },
      // 扶贫项目添加
      Tobjfpxm: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '投入金额',
            valueUnit: '万元'
          },
          {
            valueContent: '',
            serialNumber: 1,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'dc42b85c-ee98-4895-bfc2-4c472a092170',
        iconType: 0,
        latitude: 0,
        locationName: '',
        locationTag: '项目名称',
        longitude: 0
      },
      // 空气监测站点添加
      Tobjkq: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '25c2ec86-a62e-45c2-a3e7-49a121a1f56d',
        iconType: 11,
        latitude: 0,
        locationName: '',
        locationTag: '空气监测站点名称',
        longitude: 0
      },
      // 水位监测站点添加
      Tobjsw: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: '88ee0a59-19a0-4e42-b4d2-bae59634e110',
        iconType: 10,
        latitude: 0,
        locationName: '',
        locationTag: '水位监测站点名称',
        longitude: 0
      },
      // 文化添加旅游
      Tobjwh: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'd633bafc-74d0-4f0d-bea5-927ef2df4192',
        iconType: 2,
        latitude: 0,
        locationName: '',
        locationTag: '文化旅游建筑名称',
        longitude: 0
      },
      // 政务部门
      Tobjzw: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'd42795ca-dad6-4531-aed7-eb75f3d3646d',
        iconType: 0,
        latitude: 0,
        locationName: '',
        locationTag: '政务部门名称',
        longitude: 0
      },
      // 重点监控污染企业
      Tobjzdjk: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'f90edff9-7f21-48e0-9ce4-472377825dae',
        iconType: 12,
        latitude: 0,
        locationName: '',
        locationTag: '重点监控污染企业名称',
        longitude: 0
      },
      // 公共车站
      Tobjggcz: {
        dataExtendList: [
          {
            valueContent: '',
            serialNumber: 0,
            contentName: '详细地址',
            valueUnit: ''
          }
        ],
        dataTypeId: 'e5654a00-c642-44f3-a340-2827f51367d6',
        iconType: 5,
        latitude: 0,
        locationName: '',
        locationTag: '公共车站名称',
        longitude: 0
      },
      // 下拉框
      pageList: [
        {dataTypeId: '', typeName: ''}
      ],
      searchForm: {
        dataTypeId: '', // 4fce5edb-7092-4455-971b-6f8526d6a827
        coordinateStatus: ''
      },
      names: {
        '4fce5edb-7092-4455-971b-6f8526d6a827': '村名',
        '61894e2c-7738-41af-b797-b8d735a44428': '规上工业企业名称',
        '1bfa2f78-2174-4e9d-8f2f-58264a00ce83': '规上商贸企业名称',
        '9487e07e-6b2f-49c6-b464-2216a680cc3e': '规上建筑企业名称',
        'd60e1ff2-e6c0-4393-94c7-28bb9f118cce': '医院疗机构名',
        '739fe4f5-49c6-42ca-ba87-76f5300ab5af': '学校名',
        'ac94e4c6-7e49-45c5-9610-1556245c45cf': '停车场名称',
        'a649c4a2-314e-4490-bfee-ca3b7695057b': '养老机构名称',
        'dc42b85c-ee98-4895-bfc2-4c472a092170': '项目名称',
        '25c2ec86-a62e-45c2-a3e7-49a121a1f56d': '空气监测站点名称',
        '88ee0a59-19a0-4e42-b4d2-bae59634e110': '水位监测站点名称',
        'd633bafc-74d0-4f0d-bea5-927ef2df4192': '文化旅游建筑名称',
        'd42795ca-dad6-4531-aed7-eb75f3d3646d': '政务部门名称',
        'f90edff9-7f21-48e0-9ce4-472377825dae': '重点污染企业名称',
        'e5654a00-c642-44f3-a340-2827f51367d6': '公共车站名称'
      },
      poples: {
        '4fce5edb-7092-4455-971b-6f8526d6a827': '贫困人数(人)',
        '61894e2c-7738-41af-b797-b8d735a44428': '员工人数(人)',
        '1bfa2f78-2174-4e9d-8f2f-58264a00ce83': '员工人数(人)',
        '9487e07e-6b2f-49c6-b464-2216a680cc3e': '员工人数(人)',
        '739fe4f5-49c6-42ca-ba87-76f5300ab5af': '师生人数(人)'
      },
      households: {
        '4fce5edb-7092-4455-971b-6f8526d6a827': '贫困户数(户)',
        '61894e2c-7738-41af-b797-b8d735a44428': '注册资金(万元)',
        '1bfa2f78-2174-4e9d-8f2f-58264a00ce83': '注册资金(万元)',
        '9487e07e-6b2f-49c6-b464-2216a680cc3e': '注册资金(万元)'
      },
      time: ''
    }
  },
  computed: {
    getName () {
      return this.names[this.searchForm.dataTypeId];
    },
    getpPoples () {
      return this.poples[this.searchForm.dataTypeId];
    },
    getHouseholds () {
      return this.households[this.searchForm.dataTypeId];
    }
  },
  created () {
    this.getPlateList();
    this.getdataTypesList();
  },
  mounted () {
  },
  methods: {
    // 获取坐标
    calcCoordinate () {
      this.staclass = 'el-icon-loading';
      this.status = '加载坐标中';
      this.calcCoordinateLoading = true;
      setTimeout(() => {
        this.calcCoordinateLoading = false;
        this.status = '加载完成！';
        this.staclass = '';
      }, 3000);
      this.axios.get('/mapServices/data/calcCoordinate')
        .then(res => {
        })
        .catch(() => {});
      this.time = setInterval(() => {
        this.getPlateList();
      }, 1000)
    },
    searchFormSubmit () {
      this.getPlateList();
    },
    searchreFormSubmit () {
      this.pageNum = 1;
      this.searchForm.coordinateStatus = '';
      this.getPlateList();
    },
    selPosition () {
      // 编辑状态
      if (this.dialogFormVisible1) {
        if (this.form1.addrs === '') {
          this.oConfig = {};
        } else {
          this.oConfig = {
            _name: this.form1.addrs,
            center: [this.form1.coordinate.split(',')[0], this.form1.coordinate.split(',')[1]]
          }
        }
      } else if (this.dialogFormVisible) {
        if (this.form.coordinate === '') {
          this.oConfig = {};
        } else {
          this.oConfig = {
            _name: this.form.addrs,
            center: [this.form.coordinate.split(',')[0], this.form.coordinate.split(',')[1]]
          }
        }
      } else if (this.dialogFormVisible2) {
        if (this.form2.addrs === '') {
          this.oConfig = {};
        } else {
          this.oConfig = {
            _name: this.form2.name,
            center: [this.form2.coordinate.split(',')[0], this.form2.coordinate.split(',')[1]]
          }
        }
      }
      this.open = !this.open;
    },
    mapPointSubmit (val, address) {
      console.log('接收到的经纬度为：', val);
      if (this.dialogFormVisible1) {
        this.form1.coordinate = val;
        this.form1.addrs = address;
      } else if (this.dialogFormVisible) {
        this.form.coordinate = val;
        this.form.addrs = address;
      } else if (this.dialogFormVisible2) {
        this.form2.coordinate = val;
      }
    },
    // 添加事件清空form表单
    fillIn (form) {
      this.dialogFormVisible1 = true;
      this.resetForm('form1');
    },
    resetForm (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    // 下拉框事件
    getValue: function (scope) {
      this.searchForm.dataTypeId = scope;
      clearInterval(this.time)
      this.getPlateList();
      this.status = ''
    },
    getStatusValue () {
      clearInterval(this.time)
    },
    // 点击事件
    query: function (val) {
    },
    // 分页
    pagerSizeChange (val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getPlateList();
    },
    pagerCurrChange (val) {
      this.pageNum = val;
      this.getPlateList();
    },
    // 查询地图应用类型
    getdataTypesList () {
      this.axios.get('/mapServices/dataTypes')
        .then(res => {
          this.pageList = res.data;
        })
    },
    // 获取数据
    getPlateList () {
      let params = {
        'where.coordinateStatus': this.searchForm.coordinateStatus,
        'where.dataTypeId': this.searchForm.dataTypeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.searchForm.dataTypeId) {
        this.axios.get('/mapServices/datas?' + $.param(params))
          .then(res => {
            if (res && res.data) {
              this.plateList = res.data.list;
              this.total = res.data.total;
              console.log(res)
            }
          })
      }
    },
    // 修改5号数据
    modify5 (scope) {
      this.resetFormpk('form');
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
        coordinateStatus: scope.row.coordinateStatus,
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      console.log(scope);
      this.form.name = this.obj.locationName;
      this.form.households = this.obj.dataExtendList[1].valueContent;
      this.form.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form.pople = this.obj.dataExtendList[0].valueContent;
      this.form.addrs = this.obj.dataExtendList[2].valueContent;
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    sure5 (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = this.obj;
          params.locationName = this.form.name;
          params.longitude = this.form.coordinate.split(',')[0];
          params.latitude = this.form.coordinate.split(',')[1];
          params.dataExtendList[1].valueContent = this.form.households;
          params.dataExtendList[0].valueContent = this.form.pople;
          params.dataExtendList[2].valueContent = this.form.addrs;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.getPlateList();
              params.coordinateStatus = 0;
            });
        } else {
          return false;
        }
      });
    },
    modifyjy5 (scope) {
      this.resetFormpk('form');
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
        coordinateStatus: scope.row.coordinateStatus,
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      this.form.name = this.obj.locationName;
      this.form.level = this.obj.dataExtendList[0].valueContent;
      this.form.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form.pople = this.obj.dataExtendList[1].valueContent;
      this.form.addrs = this.obj.dataExtendList[2].valueContent;
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    surejy5 (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = this.obj;
          params.locationName = this.form.name;
          params.longitude = this.form.coordinate.split(',')[0];
          params.latitude = this.form.coordinate.split(',')[1];
          params.dataExtendList[0].valueContent = this.form.level;
          params.dataExtendList[1].valueContent = this.form.pople;
          params.dataExtendList[2].valueContent = this.form.addrs;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.getPlateList();
              params.coordinateStatus = 0;
            });
        } else {
          return false;
        }
      });
    },
    // 修改贫困5号数据
    modifypk5 (scope) {
      this.resetFormpk('form');
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
        coordinateStatus: scope.row.coordinateStatus,
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      console.log(scope);
      this.form.name = this.obj.locationName;
      this.form.households = this.obj.dataExtendList[0].valueContent;
      this.form.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form.pople = this.obj.dataExtendList[1].valueContent;
      this.form.addrs = this.obj.dataExtendList[2].valueContent;
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    surepk5 (form, scope) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = this.obj;
          params.locationName = this.form.name;
          params.longitude = this.form.coordinate.split(',')[0];
          params.latitude = this.form.coordinate.split(',')[1];
          params.dataExtendList[0].valueContent = this.form.households;
          params.dataExtendList[1].valueContent = this.form.pople;
          params.dataExtendList[2].valueContent = this.form.addrs;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible = false;
              params.coordinateStatus = 0;
            });
        } else {
          return false;
        }
      });
    },
    resetFormpk (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    // 修改6号数据
    modify6 (scope) {
      this.resetFormpk('form');
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
          },
          {
            extendId: scope.row.dataExtendList[3].extendId,
            dataId: scope.row.dataExtendList[3].dataId,
            contentName: scope.row.dataExtendList[3].contentName,
            valueContent: scope.row.dataExtendList[3].valueContent,
            valueUnit: scope.row.dataExtendList[3].valueUnit,
            serialNumber: scope.row.dataExtendList[3].serialNumber
          }
        ],
        coordinateStatus: scope.row.coordinateStatus,
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      this.form.name = this.obj.locationName;
      this.form.level = this.obj.dataExtendList[0].valueContent;
      this.form.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form.teacher = this.obj.dataExtendList[1].valueContent;
      this.form.student = this.obj.dataExtendList[2].valueContent;
      this.form.addrs = this.obj.dataExtendList[3].valueContent;
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    sure6 (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = this.obj;
          params.locationName = this.form.name;
          params.longitude = this.form.coordinate.split(',')[0];
          params.latitude = this.form.coordinate.split(',')[1];
          params.dataExtendList[0].valueContent = this.form.level;
          params.dataExtendList[1].valueContent = this.form.teacher;
          params.dataExtendList[2].valueContent = this.form.student;
          params.dataExtendList[3].valueContent = this.form.addrs;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.getPlateList();
              params.coordinateStatus = 0;
            });
        } else {
          return false;
        }
      });
    },
    // 修改4号数据
    modify4 (scope) {
      this.resetFormpk('form');
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
          }
        ],
        coordinateStatus: scope.row.coordinateStatus,
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      this.form.name = this.obj.locationName;
      this.form.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form.number = this.obj.dataExtendList[0].valueContent;
      this.form.addrs = this.obj.dataExtendList[1].valueContent;
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    sure4 (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = this.obj;
          params.locationName = this.form.name;
          params.longitude = this.form.coordinate.split(',')[0];
          params.latitude = this.form.coordinate.split(',')[1];
          params.dataExtendList[1].valueContent = this.form.addrs;
          params.dataExtendList[0].valueContent = this.form.number;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.getPlateList();
              params.coordinateStatus = 0;
            });
        } else {
          return false;
        }
      });
    },
    // 修改3号数据
    modify3 (scope) {
      this.resetFormpk('form');
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
          }
        ],
        coordinateStatus: scope.row.coordinateStatus,
        dataId: scope.row.dataId,
        dataTypeId: scope.row.dataTypeId,
        iconType: scope.row.iconType,
        latitude: scope.row.latitude,
        locationName: scope.row.locationName,
        locationTag: scope.row.locationTag,
        longitude: scope.row.longitude
      };
      console.log(this.obj);
      this.form.name = this.obj.locationName;
      this.form.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form.addrs = this.obj.dataExtendList[0].valueContent
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    sure3 (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = this.obj;
          params.locationName = this.form.name;
          params.longitude = this.form.coordinate.split(',')[0];
          params.latitude = this.form.coordinate.split(',')[1];
          params.dataExtendList[0].valueContent = this.form.addrs;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.getPlateList();
              params.coordinateStatus = 0;
            });
        } else {
          return false;
        }
      });
    },
    // 修改块数据
    modifyk3 (scope) {
      this.resetFormk('form2');
      this.dialogFormVisible2 = true;
      this.obj = {
        dataExtendList: [
          {
            extendId: scope.row.dataExtendList[0].extendId,
            dataId: scope.row.dataExtendList[0].dataId,
            contentName: scope.row.dataExtendList[0].contentName,
            valueContent: scope.row.dataExtendList[0].valueContent,
            valueUnit: scope.row.dataExtendList[0].valueUnit,
            serialNumber: scope.row.dataExtendList[0].serialNumber
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
      console.log(this.obj);
      this.form2.name = this.obj.locationName;
      this.form2.coordinate = this.obj.longitude + ',' + this.obj.latitude;
      this.form2.addrs = this.obj.dataExtendList[0].valueContent
      if (this.form.coordinate === 'null,null') {
        this.form.coordinate = ''
      }
    },
    resetFormk (formRef) {
      if (this.$refs[formRef]) {
        this.$refs[formRef].resetFields();
      }
    },
    surek3 (form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          let params = this.obj;
          params.locationName = this.form2.name;
          params.longitude = this.form2.coordinate.split(',')[0];
          params.latitude = this.form2.coordinate.split(',')[1];
          params.dataExtendList[0].valueContent = this.form2.addrs;
          this.axios.put('/mapServices/datas', params)
            .then(res => {
              this.dialogFormVisible2 = false;
              this.getPlateList();
            });
        } else {
          return false;
        }
      });
    },
    // 删除数据
    shchu (scope) {
      this.dialogVisible = true;
      console.log(scope.row.dataId);
      this.shchuId = scope.row.dataId
    },
    qued () {
      this.dialogVisible = false;
      this.axios.delete('/mapServices/data/' + this.shchuId)
        .then(res => {
          this.getPlateList();
        });
    },
    // 添加贫困村数据
    addTopk (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjpk.locationName = this.form1.name;
          this.Tobjpk.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjpk.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjpk.dataExtendList[0].valueContent = this.form1.households;
          this.Tobjpk.dataExtendList[1].valueContent = this.form1.pople;
          this.Tobjpk.dataExtendList[2].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjpk)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加规上工业企业数据
    addTogsgy (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjgsgy.locationName = this.form1.name;
          this.Tobjgsgy.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjgsgy.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjgsgy.dataExtendList[1].valueContent = this.form1.households;
          this.Tobjgsgy.dataExtendList[0].valueContent = this.form1.pople;
          this.Tobjgsgy.dataExtendList[2].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjgsgy)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加规上建筑企业数据
    addTogsjz (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjgsjz.locationName = this.form1.name;
          this.Tobjgsjz.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjgsjz.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjgsjz.dataExtendList[1].valueContent = this.form1.households;
          this.Tobjgsjz.dataExtendList[0].valueContent = this.form1.pople;
          this.Tobjgsjz.dataExtendList[2].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjgsjz)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加规上商贸企业数据
    addTogssm (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjgssm.locationName = this.form1.name;
          this.Tobjgssm.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjgssm.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjgssm.dataExtendList[1].valueContent = this.form1.households;
          this.Tobjgssm.dataExtendList[0].valueContent = this.form1.pople;
          this.Tobjgssm.dataExtendList[2].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjgssm)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加医疗资源数据
    addToylzy (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjylzy.locationName = this.form1.name;
          this.Tobjylzy.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjylzy.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjylzy.dataExtendList[0].valueContent = this.form1.level;
          this.Tobjylzy.dataExtendList[1].valueContent = this.form1.teacher;
          this.Tobjylzy.dataExtendList[2].valueContent = this.form1.student;
          this.Tobjylzy.dataExtendList[3].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjylzy)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加教育资源数据
    addTojyzy (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjjyzy.locationName = this.form1.name;
          this.Tobjjyzy.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjjyzy.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjjyzy.dataExtendList[1].valueContent = this.form1.pople;
          this.Tobjjyzy.dataExtendList[0].valueContent = this.form1.level;
          this.Tobjjyzy.dataExtendList[2].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjjyzy)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加停车场数据
    addTotcc (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjtcc.locationName = this.form1.name;
          this.Tobjtcc.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjtcc.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjtcc.dataExtendList[1].valueContent = this.form1.addrs;
          this.Tobjtcc.dataExtendList[0].valueContent = this.form1.number;
          this.axios.post('/mapServices/data', this.Tobjtcc)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加养老机构数据
    addToyljg (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjyljg.locationName = this.form1.name;
          this.Tobjyljg.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjyljg.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjyljg.dataExtendList[1].valueContent = this.form1.addrs;
          this.Tobjyljg.dataExtendList[0].valueContent = this.form1.number;
          this.axios.post('/mapServices/data', this.Tobjyljg)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加扶贫项目数据
    addTofpxm (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjfpxm.locationName = this.form1.name;
          this.Tobjfpxm.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjfpxm.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjfpxm.dataExtendList[1].valueContent = this.form1.addrs;
          this.Tobjfpxm.dataExtendList[0].valueContent = this.form1.number;
          this.axios.post('/mapServices/data', this.Tobjfpxm)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加空气监测站点数据
    addTokq (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjkq.locationName = this.form1.name;
          this.Tobjkq.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjkq.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjkq.dataExtendList[0].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjkq)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加水位监测站点数据
    addTosw (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjsw.locationName = this.form1.name;
          this.Tobjsw.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjsw.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjsw.dataExtendList[0].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjsw)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加文化旅游数据
    addTowh (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjwh.locationName = this.form1.name;
          this.Tobjwh.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjwh.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjwh.dataExtendList[0].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjwh)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加政务部门数据
    addTozw (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjzw.locationName = this.form1.name;
          this.Tobjzw.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjzw.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjzw.dataExtendList[0].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjzw)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加重点监控污染企业数据
    addTozdjk (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjzdjk.locationName = this.form1.name;
          this.Tobjzdjk.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjzdjk.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjzdjk.dataExtendList[0].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjzdjk)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 添加公共汽车站数据
    addToggcz (form1) {
      this.$refs[form1].validate((valid) => {
        if (valid) {
          this.Tobjggcz.locationName = this.form1.name;
          this.Tobjggcz.longitude = this.form1.coordinate.split(',')[0];
          this.Tobjggcz.latitude = this.form1.coordinate.split(',')[1];
          this.Tobjggcz.dataExtendList[0].valueContent = this.form1.addrs;
          this.axios.post('/mapServices/data', this.Tobjggcz)
            .then(res => {
              this.getPlateList();
              this.dialogFormVisible1 = false;
            });
        } else {
          return false;
        }
      });
    },
    // 导入数据
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (response, file, fileList) {
      console.log(response);
      if (response.code === '00000000') {
        let _this = this;
        _this.$msgbox({
          title: '提示',
          message: '上传成功',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        });
      } else if (response.viewMsg === '地图数据类型不匹配') {
        let _this = this;
        _this.$msgbox({
          title: '提示',
          message: response.viewMsg,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        });
      } else {
        let _this = this;
        _this.$msgbox({
          title: '提示',
          message: '上传失败',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        });
      }
      this.getPlateList();
    },
    handleExceed (files, fileList) {
    },
    beforeRemove (file, fileList) {
    }
  },
  destroyed () {
    clearInterval(this.time)
  }
}
</script>
<style lang="scss" scoped>
  .vis-bg-plate {
    padding: 20px 20px 20px 20px;
    height: 100%;
    overflow: auto;
  }
  .bg-plate-bd {
    border-bottom: 1px solid #E3E3E3;
    padding: 2px 0 18px 2px;
  }
  .bg-plate-sf {
    padding-top: 20px;
    position: relative;
    height: 71px;
    .add-plate-btn {
      position: absolute; top: 22px; right: 195px;
      background: linear-gradient(to top, #0785FD, #07BAFD);
    }
    .add-plate-btnf{
      position: absolute; top: 22px; right: 95px
    }
    .add-plate-btns{
      position: absolute; top: 28px; right: 25px;
      border: none;
      display: inline-block;
    }
    .add-plate-btnh{
      position: absolute; top: 22px; right: 280px;
      background: linear-gradient(to top, #0785FD, #07BAFD);
    }
    .add-plate-btnsh{
      position: absolute; top: 30px; right: 390px;
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
  .el-select-dropdown__item.hover {
    color:#fff;
    background: -webkit-linear-gradient(#07BAFD, #0785FD); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#07BAFD, #0785FD); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#07BAFD, #0785FD); /* Firefox 3.6 - 15 */
    background: linear-gradient(#07BAFD, #0785FD); /* 标准的语法 */
  }
</style>
