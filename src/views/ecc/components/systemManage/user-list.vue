<template>
  <div class="pm-main">
    <div class="clearfix search">
      <el-form :inline="true" :model='selectForm' ref='selectForm' class="demo-form-inline" size="small">
        <el-form-item>
          <el-select
          class="filterSelect"
          v-model="filter['where.groupId']"
          style="width: 208px;"
          clearable
          size="small"
          placeholder="全部用户组"
          @change="onSelectChange">
          <el-option v-for="(item, index) in dropDownGroupList" :key="index + 'd'" :label="item.groupName" :value="item.uid"/>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder='请输入用户名/姓名搜索' style="width: 250px;" v-model="filter['where.keyWord']"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder='请输入手机号' style="width: 250px;" v-model="filter['where.userMobile']"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass' @click="onSearch()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="add-depart-box">
        <el-button class='selectBtn add-depart' @click="onCreateProject">新建用户</el-button>
      </div>
    </div>
    <el-table
      class="ar-table"
      :data="listData.list"
      header-row-class-name="table-header">
      <el-table-column
        fixed
        type="index"
        width="50px"
        label="序号"
        align="center"
        :show-overflow-tooltip="true"/>
      <el-table-column
        prop="userMobile"
        label="账户名"
        align="center"
        :show-overflow-tooltip="true"/>
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | moment}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登陆时间"
        align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.lastLoginTime | moment}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sysUserGroupInfos"
        label="所属组"
        align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.sysUserGroupInfos" :key="index + 't'" v-if="index < scope.row.sysUserGroupInfos[scope.row.sysUserGroupInfos.length - 1].allgroup">{{item.groupName}}</p>
          <p v-if="scope.row.sysUserGroupInfos[scope.row.sysUserGroupInfos.length - 1].isShowAllGroup && scope.row.sysUserGroupInfos.length > 4" class="expand" @click="onOpenAll(scope.row)">展开全部<i class="el-icon-arrow-down"></i></p>
          <p v-if="!scope.row.sysUserGroupInfos[scope.row.sysUserGroupInfos.length - 1].isShowAllGroup && scope.row.sysUserGroupInfos.length > 4" class="expand" @click="onCloseAll(scope.row)">收起<i class="el-icon-arrow-up"></i></p>
        </template>
      </el-table-column>
      <el-table-column
        prop="sysUserRoleInfos"
        label="角色配置"
        align="center"
        width="180px"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.sysUserRoleInfos" :key="index + 't'" v-if="index < scope.row.sysUserRoleInfos[scope.row.sysUserRoleInfos.length - 1].allgroup">{{item.roleName}}</p>
          <p v-if="scope.row.sysUserRoleInfos[scope.row.sysUserRoleInfos.length - 1].isShowAllGroup && scope.row.sysUserRoleInfos.length > 4" class="expand" @click="onOpenAllT(scope.row)">展开全部<i class="el-icon-arrow-down">&#xe6c2;</i></p>
          <p v-if="!scope.row.sysUserRoleInfos[scope.row.sysUserRoleInfos.length - 1].isShowAllGroup && scope.row.sysUserRoleInfos.length > 4" class="expand" @click="onCloseAllT(scope.row)">收起<i class="el-icon-arrow-up">&#xe6b0;</i></p>
        </template>
      </el-table-column>
      <el-table-column
        prop="force"
        label="状态"
        align="center"
        width="80"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.isForce">禁用</span>
          <span v-else>启用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        type="index"
        label="操作"
        align="center"
        width="270px"
        class-name="operate">
        <template  slot-scope="scope" >
          <i class="icon-xiugai-1 icon-hover" @click="onEdit(scope.row)" title="编辑"></i>
          <i class="icon-xiugaisuoshuzu- icon-hover" @click="onEditGroups(scope.row)" title="修改所属组"></i>
          <i class="icon-peizhijiaose- icon-hover" @click="onEditRoles(scope.row)" title="配置角色"></i>
          <i class="icon-jinyong- icon-hover" @click="onForBidUser(scope.row)" title="禁用" v-if="!scope.row.isForce"></i>
          <i class="icon-qiyong- icon-hover" @click="onUpUser(scope.row)" title="启用" v-else></i>
          <i class="icon-shanchu- icon-hover" @click="deleteList(scope.row)" title="删除"></i>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="listData.list && listData.list.length > 0" class="pagination-box" style="text-align: center; padding-top: 10px;">
      <el-pagination
        background
        @current-change="onPageChange"
        :current-page.sync="currentPage"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="listData.total"/>
    </div>
    <!-- 修改所属组弹框 -->
    <el-dialog
      class="edit-group-dialog"
      title="修改所属组"
      :visible.sync="editGroupdialogVisible"
      width="520px"
      :append-to-body="true">
      <div class="content edit-group">
        <div class="left">
          <div class="title">当前所属组</div>
          <el-checkbox-group v-model="checkOutGroups" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in selectGroups" :key="index + 'group'" :label="item">{{item.groupName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onOutSelectGroup">移出所选组</div>
        </div>
        <div class="right">
          <div class="title">可选组</div>
          <el-input class="fuzzy" placeholder="请输入组名" @input="onChangeallGroupsName"/>
          <el-checkbox-group v-model="checkInGroups" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in allGroups" :key="index + 'groupa'" :label="item">{{item.groupName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onAddSelectGroup">加入所选组</div>
        </div>
      </div>
    </el-dialog>
    <!-- 配置角色弹框 -->
    <el-dialog
      class="project-dialog edit-group-dialog"
      title="配置角色"
      :visible.sync="newRoledialogVisible"
      width="520px"
      :append-to-body="true">
      <div class="content edit-group">
        <div class="left">
          <div class="title">已配角色</div>
          <el-checkbox-group v-model="checkOutRoles" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in selectRoles" :key="index + 'role'" :label="item">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onOutSelectRole">删除所选角色</div>
        </div>
        <div class="right">
          <div class="title">可选角色</div>
          <el-input class="fuzzy" placeholder="请输入角色名" @input="onChangeRolesName"/>
          <el-checkbox-group v-model="checkInRoles" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in allRoles" :key="index + 'rolea'" :label="item">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onAddSelectRole">添加所选角色</div>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑信息弹框 -->
    <el-dialog
      title="编辑信息"
      :visible.sync="editdialogVisible"
      width="480px"
      center>
       <div class="content">
        <div class="line">
          <span class="line-title">用户名</span>
          <span class="line-name">{{editItem.userMobile}}</span>
        </div>
        <div class="line">
          <span class="line-title">姓名</span>
          <el-input v-model="editItem.userName" style="width: 278px" size="small" placeholder="请输入姓名"/>
        </div>
        <div class="line">
          <span class="line-title">身份号码</span>
          <el-input v-model="editItem.userIdcard" style="width: 278px" size="small" placeholder="请输入用户身份证号码"/>
        </div>
        <div class="line">
          <span class="line-title">性别</span>
          <el-radio-group class="retire-page-radio" v-model="editItem.userSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </div>
        <div class="line">
          <span class="line-title">邮箱</span>
          <el-input v-model="editItem.userEmail" style="width: 278px" size="small" placeholder="请输入邮箱"/>
        </div>
        <div class="line">
          <span class="line-title">居住地</span>
          <el-select
            v-model="editItem.province"
            style="width: 150px;"
            clearable
            size="small"
            placeholder="请选择省份"
            @change="onProvinceChange"
            value-key="uid">
            <el-option v-for="item in citys" :key="item.adcode" :label="item.name" :value="item.name"/>
          </el-select>
          <el-select
            v-model="editItem.city"
            style="width: 120px; margin-left: 8px;"
            clearable
            size="small"
            placeholder="请选择城市">
            <el-option v-for="item in cityData" :key="item.adcode" :label="item.name" :value="item.name"/>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class='noSureBtn' @click='onConfirmEdit'>确认</el-button>
        <el-button class='sureBtn' @click="editdialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deletedialogVisible"
      width="340px"
      height='205px'
      center>
      <span style='text-align:center;color:#333333;font-size:14px'>是否确认删除该用户及相关信息?</span>
      <p style='text-align:center;color:#999999;font-size:12px;margin-top:10px'>删除后数据不可恢复</p>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='onConfirmDelete'>确认</el-button>
        <el-button class='noSureBtn' @click="deletedialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {citys} from '../../../../../static/js/citys.js';
export default {
  data () {
    return {
      citys: '',
      selectForm: {
        organName: ''
      },
      listData: {},
      loading: true,
      checkOutGroups: [], // 选中需要移除的所选组
      checkInGroups: [], // 选中需要移入的所选组
      selectGroups: [], // 当前所选组
      allGroups: [], // 当前可选组
      checkOutRoles: [], // 选中需要移除的配置角色
      checkInRoles: [], // 选中需要移入的配置角色
      selectRoles: [], // 当前已配角色
      allRoles: [], // 当前可配角色
      groupUserId: null, // 当前用户id
      roleUserId: null, // 当前用户id
      dropDownGroupList: [], // 筛选列表
      deletedialogVisible: false, // 删除提示
      deleteItem: {},
      editdialogVisible: false, // 编辑信息提示
      editItem: {},
      provinceData: [], // 省份列表
      cityData: [], // 城市列表
      editGroupdialogVisible: false, // 修改所属组弹框
      newRoledialogVisible: false, // 配置角色弹框
      filter: {
        'where.groupId': null,
        'where.keyWord': null,
        'where.userMobile': null
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        order: 'desc',
        orderBy: 'create_time'
      },
      currentPage: 1,
      closeShow: false,
      img1: require('../../../../assets/img/temp/edit.png'),
      img2: [],
      isShow: true
    }
  },
  created () {
    this.getList();
    this.getAllGroups();
    this.getProvince(); // 省份
    this.citys = citys
  },
  methods: {
    qq (scope) {
      this.img2.push(require('../../../../assets/img/temp/edit-checked.png'));
      this.isShow = false;
    },
    bb () {
      this.img1 = require('../../../../assets/img/temp/edit.png')
    },
    onCreateProject () {
      this.$router.push({name: 'user-create'});
    },
    onChange (val) {
      console.log(val);
    },
    // 获取列表数据
    getList () {
      if (!this.filter['where.groupId']) { this.filter['where.groupId'] = null }
      let params = Object.assign({}, this.filter, this.pagination);
      console.log(params)
      this.axios.get('A2/authServices/users', {params})
        .then(res => {
          if (res) {
            res.data.list.forEach(obj => {
              if (obj.sysUserGroupInfos) {
                obj.sysUserGroupInfos[obj.sysUserGroupInfos.length] = {
                  allgroup: 3,
                  isShowAllGroup: true
                }
              }
              if (obj.sysUserRoleInfos) {
                obj.sysUserRoleInfos[obj.sysUserRoleInfos.length] = {
                  allgroup: 3,
                  isShowAllGroup: true
                }
              }
            });
            this.listData = res.data;
            this.loading = false;
          }
        })
    },
    onOpenAll (obj) {
      obj.sysUserGroupInfos[obj.sysUserGroupInfos.length - 1].allgroup = 99999;
      obj.sysUserGroupInfos[obj.sysUserGroupInfos.length - 1].isShowAllGroup = false;
    },
    onCloseAll (obj) {
      obj.sysUserGroupInfos[obj.sysUserGroupInfos.length - 1].allgroup = 3;
      obj.sysUserGroupInfos[obj.sysUserGroupInfos.length - 1].isShowAllGroup = true;
    },
    onOpenAllT (obj) {
      obj.sysUserRoleInfos[obj.sysUserRoleInfos.length - 1].allgroup = 99999;
      obj.sysUserRoleInfos[obj.sysUserRoleInfos.length - 1].isShowAllGroup = false;
    },
    onCloseAllT (obj) {
      obj.sysUserRoleInfos[obj.sysUserRoleInfos.length - 1].allgroup = 3;
      obj.sysUserRoleInfos[obj.sysUserRoleInfos.length - 1].isShowAllGroup = true;
    },
    // 获取筛选列表
    getAllGroups () {
      this.axios.get('A2/authServices/userGroups', {params: {'where.uid': this.$store.state.proKey}})
        .then(res => {
          if (res) {
            this.dropDownGroupList = res.data.list;
          }
        })
    },
    deletDepart () {
    },
    onEditGroups (obj) {
      this.groupUserId = obj.uid;
      this.selectGroups = [];
      this.checkOutGroups = [];
      this.allGroups = [];
      this.checkInGroups = [];
      obj.sysUserGroupInfos.forEach(item => {
        if (item.uid && item.groupName) {
          this.selectGroups.push({
            uid: item.uid,
            groupName: item.groupName
          })
        }
      })
      this.axios.get('A2/authServices/userGroups')
        .then(res => {
          if (res) {
            this.selectGroups.forEach(aa => {
              res.data.list.forEach((bb, index) => {
                if (aa.groupName === bb.groupName) {
                  res.data.list.splice(index, 1);
                }
              })
            })
            res.data.list.forEach(zz => {
              this.allGroups.push({
                uid: zz.uid,
                groupName: zz.groupName
              })
            })
          }
        })
      this.editGroupdialogVisible = true;
    },
    onChangeallGroupsName (val) {
      this.allGroups.forEach(aa => {
        if (aa.groupName === val) {
          this.allGroups = [{
            uid: aa.uid,
            groupName: aa.groupName
          }]
        }
      });
      if (val === '') {
        this.allGroups = []
        this.axios.get('A2/authServices/userGroups')
          .then(res => {
            if (res) {
              this.selectGroups.forEach(aa => {
                res.data.list.forEach((bb, index) => {
                  if (aa.groupName === bb.groupName) {
                    res.data.list.splice(index, 1);
                  }
                })
              })
              res.data.list.forEach(zz => {
                this.allGroups.push({
                  uid: zz.uid,
                  groupName: zz.groupName
                })
              })
            }
          })
      }
    },
    onEditRoles (obj) {
      this.roleUserId = obj.uid;
      this.selectRoles = [];
      this.checkOutRoles = [];
      this.allRoles = [];
      this.checkInRoles = [];
      obj.sysUserRoleInfos.forEach(item => {
        if (item.uid && item.roleName) {
          this.selectRoles.push({
            uid: item.uid,
            roleName: item.roleName
          })
        }
      })
      let params = {
        pageSize: 0
      }
      this.axios.get('A2/authServices/userRoles', {params})
        .then(res => {
          if (res) {
            this.selectRoles.forEach(aa => {
              res.data.list.forEach((bb, index) => {
                if (aa.roleName === bb.roleName) {
                  res.data.list.splice(index, 1);
                }
              })
            })
            console.log(res.data.list);
            res.data.list.forEach(zz => {
              this.allRoles.push({
                uid: zz.uid,
                roleName: zz.roleName
              })
            })
          }
        })
      this.newRoledialogVisible = true;
    },
    onChangeRolesName (val) {
      console.log(val)
      console.log(this.allRoles)
      this.allRoles.forEach(aa => {
        if (aa.roleName === val) {
          this.allRoles = [{
            uid: aa.uid,
            roleName: aa.roleName
          }]
        }
      });
      console.log(this.allRoles)
      if (val === '') {
        this.allRoles = []
        let params = {
          pageSize: 0
        }
        this.axios.get('A2/authServices/userRoles', {params})
          .then(res => {
            if (res) {
              this.selectRoles.forEach(aa => {
                res.data.list.forEach((bb, index) => {
                  if (aa.roleName === bb.roleName) {
                    res.data.list.splice(index, 1);
                  }
                })
              })
              console.log(res.data.list);
              res.data.list.forEach(zz => {
                this.allRoles.push({
                  uid: zz.uid,
                  roleName: zz.roleName
                })
              })
            }
          })
      }
    },
    // 加入所选组
    onAddSelectGroup () {
      let params = {
        uid: this.groupUserId,
        uids: []
      }
      this.checkInGroups.forEach(cc => {
        params.uids.push(cc.uid);
      })
      this.axios.post('A2/authServices/userBatchGroup', params)
        .then(res => {
          if (res) {
            this.checkInGroups.forEach((aa, i) => {
              this.allGroups.forEach((bb, index) => {
                if (aa.groupName === bb.groupName) {
                  console.log(this.allGroups)
                  this.allGroups.splice(index, 1);
                }
              })
            })
            this.selectGroups.splice(this.selectGroups.length, 0, ...this.checkInGroups);
            this.checkInGroups = [];
            this.getList();
          }
        })
    },
    // 移出所选组
    onOutSelectGroup () {
      let params = {
        uid: this.groupUserId,
        uids: []
      }
      this.checkOutGroups.forEach(cc => {
        params.uids.push(cc.uid);
      })
      this.axios.delete('A2/authServices/userBatchGroup', {data: params})
        .then(res => {
          if (res) {
            this.checkOutGroups.forEach((aa, i) => {
              this.selectGroups.forEach((bb, index) => {
                if (aa.groupName === bb.groupName) {
                  this.selectGroups.splice(index, 1);
                }
              })
            })
            this.allGroups.splice(this.allGroups.length, 0, ...this.checkOutGroups);
            this.checkOutGroups = [];
            this.getList();
          }
        })
    },
    // 加入配置角色
    onAddSelectRole () {
      let params = {
        userId: this.roleUserId,
        roleIdList: []
      }
      this.checkInRoles.forEach(cc => {
        params.roleIdList.push(cc.uid);
      })
      this.axios.post('A2/authServices/userBatchRole', params)
        .then(res => {
          if (res) {
            this.checkInRoles.forEach((aa, i) => {
              this.allRoles.forEach((bb, index) => {
                if (aa.roleName === bb.roleName) {
                  this.allRoles.splice(index, 1);
                }
              })
            })
            this.selectRoles.splice(this.selectRoles.length, 0, ...this.checkInRoles);
            this.checkInRoles = [];
            this.getList();
          }
        })
    },
    // 移出配置角色
    onOutSelectRole () {
      let params = {
        userId: this.roleUserId,
        roleIdList: []
      }
      this.checkOutRoles.forEach(cc => {
        params.roleIdList.push(cc.uid);
      })
      this.axios.delete('A2/authServices/userBatchRole', {data: params})
        .then(res => {
          if (res) {
            this.checkOutRoles.forEach((aa, i) => {
              this.selectRoles.forEach((bb, index) => {
                if (aa.roleName === bb.roleName) {
                  this.selectRoles.splice(index, 1);
                }
              })
            })
            this.allRoles.splice(this.allRoles.length, 0, ...this.checkOutRoles);
            this.checkOutRoles = [];
            this.getList();
          }
        })
    },
    // 获取省份列表
    getProvince () {
      // let params = { parentUid: '00000000-0000-0000-0000-000000000000' }
      // this.axios.get('/usersServices/areas', {params})
      //   .then((res) => {
      //     if (res) {
      //       this.provinceData = res.data;
      //     }
      //   })
    },
    // 省份改变时
    onProvinceChange (obj) {
      // this.cityData = {};
      // this.editItem.city = null;
      // let params = { parentUid: obj.uid }
      // this.axios.get('/usersServices/areas', {params})
      //   .then((res) => {
      //     if (res) {
      //       this.cityData = res.data;
      //     }
      //   })
      this.citys.forEach(aa => {
        if (aa.name === obj) {
          this.cityData = aa.districts
        }
      })
      console.log(obj)
    },
    // 编辑信息
    onEdit (obj) {
      this.editItem = obj;
      this.editdialogVisible = true;
      this.citys.forEach(aa => {
        if (aa.name === obj.province) {
          this.cityData = aa.districts
        }
      })
    },
    // 编辑信息确认
    onConfirmEdit () {
      let obj = {
        uid: this.editItem.uid,
        userName: this.editItem.userName,
        userIdcard: this.editItem.userIdcard,
        userSex: this.editItem.userSex,
        userEmail: this.editItem.userEmail,
        province: this.editItem.province,
        city: this.editItem.city
      };
      console.log(obj);
      this.axios.put('A2/authServices/user', obj)
        .then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.editdialogVisible = false;
          }
        })
    },
    // 启用
    onUpUser (obj) {
      let params = {
        uid: obj.uid,
        // proKey: this.$store.state.proKey,
        isForce: false
      }
      this.axios.put('A2/authServices/user', params)
        .then(res => {
          if (res) {
            this.$message.success('启用成功');
            this.getList();
          }
        })
    },
    // 禁用
    onForBidUser (obj) {
      let params = {
        uid: obj.uid,
        // proKey: this.$store.state.proKey,
        isForce: true
      }
      console.log(params.uid)
      this.axios.put('A2/authServices/user', params)
        .then(res => {
          if (res) {
            this.$message.success('禁用成功');
            this.getList();
          }
        })
    },
    // 删除
    deleteList (obj) {
      this.deleteItem = obj;
      this.deletedialogVisible = true;
    },
    onConfirmDelete () {
      this.axios.delete('A2/authServices/user/' + this.deleteItem.uid) // + '?proKey=' + this.$store.state.proKey
        .then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.deletedialogVisible = false;
            this.getList();
          }
        })
    },
    // 过滤实时查询
    onSelectChange (val) {
      this.getList();
      console.log(val)
    },
    // 输入框查询
    onSearch () {
      if (this.filter['where.userMobile'] === '') {
        this.filter['where.userMobile'] = null
      }
      this.closeShow = true;
      this.getList();
    },
    // 清除输入框
    onClear () {
      this.filter['where.keyWord'] = '';
      this.filter['where.userMobile'] = '';
      this.getList();
      this.closeShow = false;
    },
    // 分页翻页
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getList();
    },
    indexMethod (index) {
      return index + 1 + 10 * (this.pagination.pageNum - 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.pm-main {
  .search {
      position: relative;
      width: 100%;
      background: #fff;
      display: flex;
      height: 90px;
      line-height: 90px;
      // margin-top: 20px;
      margin-bottom: 1%;
      .demo-form-inline {
        float: left;
        padding-left: 1%;
        padding-top: 30px;
        width:100%;
        height: 45px;
      }
      .add-depart-box {
        margin-right: 20px;
        .add-depart {
          color: #fff;
        }
      }
    }
    .btnClass {
      width: 80px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
  .create-module {
    height: 54px;
    line-height: 54px;
    border-radius: 2px;
    background: #F5F5F5;
    margin-top: 20px;
    padding: 0 20px;
    .create-btn {
      display: inline-block;
      width: 98px; height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 3px;
      background: #0785FD;
      color: #FFF;
      cursor: pointer;
      i {
        font-size: 12px;
        margin-right: 3px;
      }
    }
  }
  .ar-table {
    margin-top: 20px;
    i {
      margin: 0 10px;
    }
    .expand {
      width:86px; height:26px;
      background:#FFF;
      border-radius:12px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border: 1px solid #DBDBDB;
      cursor: pointer;
      margin: 0 auto;
      .row-insert-i {
        font-size: 12px;
        color: #999;
        margin-left: 3px;
      }
      &:hover {
        color: #0785FD;
        border: 1px solid #0785FD;
        background:#F4FFFE;
        .row-insert-i {
          color: #0785FD;
        }
      }
    }
    /deep/ .table-header th {
      background: #F5F5F5;
      font-size: 14px;
      color: #555;
      padding: 11px 0;
    }
    /deep/ .el-table__row {
      height: 54px;
    }
    /deep/ .operate {
      .cell {
        // width: 250px;
        i {
          margin-left: 5px;
          color: #666;
          font-size: 20px;
          cursor: pointer;
        }
        i:hover {
          color: #0785FD;
        }
        i:last-child:hover {
          color: #FF5722;
        }
      }
    }
  }
  /deep/ .el-table thead th {
    background-color: #FAFAFA !important;
  }
  /deep/ .hover-row>td {
    background-color: #E6F7FF !important;
  }
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  /deep/  .el-dialog--center .el-dialog__body {
    text-align: center !important;
    padding: 25px 25px 10px;
  }
  .noSureBtn {
    background:#0785FD;
    height:35px;
    color: #fff;
    line-height: 10px;
  }
  .sureBtn {
    border-color:#e5e5e5;
    height:35px;
    line-height: 10px;
    color:#666666;
  }
  .icon-hover {
    font-size: 30px !important;
    color: #BBBBBB !important;
  }
  .icon-hover:hover {
    color: #0785FD !important;
  }
}
.line {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  .el-input {
    width: 250px;
  }
  .line-title {
    width: 80px;
    color: #555;
    display: inline-block;
    font-weight: 600;
  }
  .line-name {
    color: #333;
  }
  .retire-page-datepicker {
    /deep/ .el-input__prefix {
      right: 5px;
      left: auto;
    }
    /deep/ .el-input__inner {
      padding-left: 15px;
    }
  }
  .retire-page-radio {
    margin-left: 15px;
    /deep/ .el-radio__input.is-checked .el-radio__inner {
      border-color: #0785FD;
      background: #0785FD;
    }
    /deep/ .el-radio__input.is-checked+.el-radio__label {
      color: #606266;
    }
    /deep/ .el-radio__inner:hover {
      border-color: #0785FD;
    }
  }
}
.edit-group-dialog {
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px 40px 20px;
  }
  .edit-group {
    display: flex;
    .left {
      width: 210px;
      border-right: 4px solid #E5E5E5;
      .title {
        color: #666;
        font-size: 14px;
        height: 30px; line-height: 30px;
        margin-left: 15px;
      }
      .middle {
        width: 190px; height:241px;
        border: 1px solid #E5E5E5;
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        overflow-y: scroll;
        /deep/ .el-checkbox+.el-checkbox {
          margin-left: 0;
        }
        /deep/ .el-checkbox {
          height: 30px; line-height: 30px;
          padding-left: 15px;
        }
        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
        /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #0785FD;
          border-color: #0785FD;
        }
        /deep/ .el-checkbox__input.is-checked+.el-checkbox__label { color: #606266; }
        /deep/ .el-checkbox__inner:hover { border-color: #0785FD; }
      }
      .bottom-btn {
        width: 120px; height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 16px;
        background: #E1F2FF;
        color: #0785FD;
        margin: 20px 0 0 20px;
        cursor: pointer;
      }
    }
    .right {
      width: 258px;
      margin-left: 20px;
      .title {
        color: #666;
        font-size: 14px;
        height: 30px; line-height: 30px;
      }
      .fuzzy {
        /deep/ .el-input__inner {
          height: 36px; line-height: 36px;
        }
      }
      .middle {
        width: 258px; height:200px;
        border: 1px solid #E5E5E5;
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        margin-top: 5px;
        overflow-y: scroll;
        /deep/ .el-checkbox+.el-checkbox {
          margin-left: 0;
        }
        /deep/ .el-checkbox {
          height: 30px; line-height: 30px;
          padding-left: 15px;
        }
        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
        /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #0785FD;
          border-color: #0785FD;
        }
        /deep/ .el-checkbox__input.is-checked+.el-checkbox__label { color: #606266; }
        /deep/ .el-checkbox__inner:hover { border-color: #0785FD; }
      }
      .bottom-btn {
        width: 110px; height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
        background: #0785FD;
        color: #FFF;
        margin: 20px 0 0 70px;
        cursor: pointer;
      }
    }
  }
}

</style>
