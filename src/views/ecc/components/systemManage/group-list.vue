<template>
  <div class="pm-main">
    <div class="clearfix search">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item>
          <el-input placeholder='请输入组名搜索' style="width: 250px;" v-model="filter['where.groupName']"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()" class='selectBtn btnClass'>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="add-depart-box">
        <el-button class='selectBtn add-depart' @click="onCreateGroup">创建组</el-button>
      </div>
    </div>
    <el-table
      class="ar-table"
      :data="listData.list"
      header-row-class-name="table-header">
      <el-table-column
        type="index"
        width="50px"
        fixed
        label="序号"
        align="center"
        :show-overflow-tooltip="true"
        />
      <el-table-column
        prop="groupName"
        label="组名"
        align="center"
        :show-overflow-tooltip="true"/>
      <el-table-column
        prop="opUserName"
        label="创建者"
        align="center"
        :show-overflow-tooltip="true"/>
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
        prop="userCount"
        label="成员数"
        align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span style="color: #FF5722;">{{scope.row.userCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="roleList"
        label="角色配置"
        align="center"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.roleList" :key="index + 't'" v-if="index < scope.row.roleList[scope.row.roleList.length - 1].allgroup">{{item.roleName}}</p>
          <p v-if="scope.row.roleList[scope.row.roleList.length - 1].isShowAllGroup && scope.row.roleList.length > 4" class="expand" @click="onOpenAll(scope.row)">展开全部<i class="el-icon-arrow-down"></i></p>
          <p v-if="!scope.row.roleList[scope.row.roleList.length - 1].isShowAllGroup && scope.row.roleList.length > 4" class="expand" @click="onCloseAll(scope.row)">收起<i class="el-icon-arrow-up"></i></p>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        align="center"
        width="200px"
        class-name="operate">
        <template slot-scope="scope">
          <i class="icon-chakan- icon-hover" @click="onWatchNumber(scope.row)" title="查看组成员"></i>
          <i class="icon-xiugai-1 icon-hover" @click="onEditInfo(scope.row)" title="编辑"></i>
          <i class="icon-guanlichengyuan- icon-hover" @click="onAdminNumer(scope.row)" title="管理成员"></i>
          <i class="icon-peizhiquanxian- icon-hover" @click="onEditRoles(scope.row)" title="配置角色"></i>
          <i class="icon-shanchu- icon-hover" @click="deleteList(scope.row)" title="删除"></i>
          <!-- <img title="查看组成员" src="../../../../assets/img/temp/select.png" @click="onWatchNumber(scope.row)" />
          <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="onEditInfo(scope.row)" />
          <img title="管理成员" src="../../../../assets/img/temp/managementMembers.png" @click="onAdminNumer(scope.row)" />
          <img title="配置角色" src="../../../../assets/img/temp/config.png" @click="onEditRoles(scope.row)" />
          <img title="删除" src="../../../../assets/img/temp/delete.png" @click="deleteList(scope.row)" /> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right; padding-top: 10px;">
      <template v-if="pagination.total > 0">
        <el-pagination
          background
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page.sync="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </template>
    </div>
    <!-- 查看弹框 -->
    <el-dialog
      class="watch-dialog"
      title="查看组成员"
      :visible.sync="watchDialogVisible"
      width="370px"
      :append-to-body="true">
      <div class="content">
        <div class="watch-title">{{watchItem.groupName}}</div>
        <ul class="watch-list">
          <li v-for="item in watchItem.userList" :key="item.uid">{{item.userName}}</li>
        </ul>
      </div>
    </el-dialog>
    <!-- 新增用户组 -->
    <el-dialog
      title="创建用户组"
      :visible.sync="newGroupDialogVisible"
      width="340px"
      center>
      <div class="content">
        <div class="line-input">
          <span class="line-input-title">用户组名称</span>
          <el-input @change="onNewGroupNameChange" v-model="newGroupData.groupName" placeholder="请输入用户组名称"/>
        </div>
        <div v-if="isCurrentlyGroupName" class="error-msg">
          <i class="el-icon-error"></i>
          <span>{{newGroupErrorMsg}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer double-btn-80">
        <el-button class="sureBtn" @click="newGroupDialogVisible = false">取 消</el-button>
        <el-button class="noSureBtn" @click="onConfirmNewGroup">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户组 -->
    <el-dialog
      title="编辑用户组"
      :visible.sync="editGroupDialogVisible"
      width="340px"
      center>
      <div class="content">
        <div class="line-input">
          <span class="line-input-title">用户组名称</span>
          <el-input @change="onEditGroupNameChange" v-model="editGroupItem.groupName" placeholder="请输入用户组名称"/>
        </div>
        <div v-if="isCurrentlyEditGroupName" class="error-msg">
          <i class="el-icon-error"></i>
          <span>{{editGroupErrorMsg}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="sureBtn" @click="editGroupDialogVisible = false">取消</el-button>
        <el-button class="noSureBtn" @click="onConfirmEditGroup">保存</el-button>
      </span>
    </el-dialog>
    <!-- 管理成员弹框 -->
    <el-dialog
      class="edit-group-dialog"
      title="管理成员"
      :visible.sync="adminNumberdialogVisible"
      width="520px"
      :append-to-body="true">
      <div class="content edit-group">
        <div class="left">
          <div class="title">当前成员</div>
          <el-checkbox-group v-model="checkOutNumbers" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in selectNumbers" :key="index + 'role'" :label="item">{{item.userName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onOutSelectNumber">移出所选成员</div>
        </div>
        <div class="right">
          <div class="title">可选成员</div>
          <el-input class="fuzzy" placeholder="请输入成员名"  @input="onChangeNumbersName"/>
          <el-checkbox-group v-model="checkInNumbers" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in allNumbers" :key="index + 'rolea'" :label="item">{{item.userName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onAddSelectNumber">添加所选成员</div>
        </div>
      </div>
    </el-dialog>
    <!-- 配置组角色弹框 -->
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
          <el-input class="fuzzy" placeholder="请输入角色名"  @input="onChangeRolesName"/>
          <el-checkbox-group v-model="checkInRoles" class="middle" @change="onChange">
            <el-checkbox v-for="(item, index) in allRoles" :key="index + 'rolea'" :label="item">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
          <div class="bottom-btn" @click="onAddSelectRole">添加所选角色</div>
        </div>
      </div>
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
export default {
  data () {
    return {
      userName: '',
      selectForm: {
        organName: ''
      },
      listData: {},
      loading: true,
      watchDialogVisible: false, // 查看组成员弹框
      watchItem: {},
      editGroupDialogVisible: false, // 编辑组名弹框
      editGroupItem: {},
      isCurrentlyEditGroupName: false,
      editGroupErrorMsg: null,
      newGroupDialogVisible: false, // 新建组名弹框
      isCurrentlyGroupName: false,
      newGroupErrorMsg: null,
      adminNumberdialogVisible: false, // 管理成员弹框
      checkOutNumbers: [], // 选中需要移除的成员
      checkInNumbers: [], // 选中需要移入的成员
      selectNumbers: [], // 当前所选成员
      allNumbers: [], // 当前可选成员
      newRoledialogVisible: false, // 配置角色弹框
      checkOutRoles: [], // 选中需要移除的配置角色
      checkInRoles: [], // 选中需要移入的配置角色
      selectRoles: [], // 当前已配角色
      allRoles: [], // 当前可配角色
      roleUserId: null, // 当前用户id
      numberUserId: null, // 当前用户组id
      newGroupData: {
        groupName: null
      },
      deletedialogVisible: false, // 删除提示
      deleteItem: {},
      filter: {
        'where.groupName': null
      },
      pagination: { total: 0, pageSize: 10, pageNum: 1 },
      currentPage: 1,
      closeShow: false
    }
  },
  created () {
    this.getList();
  },
  methods: {
    onChange (val) {
      console.log(val);
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getList();
    },
    // 获取列表数据
    getList () {
      let params = Object.assign({}, this.filter, this.pagination);
      this.axios.get('A2/authServices/userGroups', {params})
        .then(res => {
          if (res) {
            res.data.list.forEach(obj => {
              if (obj.roleList) {
                obj.roleList[obj.roleList.length] = {
                  allgroup: 3,
                  isShowAllGroup: true
                }
              }
            });
            this.listData = res.data;
            this.pagination.total = res.data.total;
            this.loading = false;
          }
        })
        .catch(() => {});
    },
    onOpenAll (obj) {
      obj.roleList[obj.roleList.length - 1].allgroup = 99999;
      obj.roleList[obj.roleList.length - 1].isShowAllGroup = false;
    },
    onCloseAll (obj) {
      obj.roleList[obj.roleList.length - 1].allgroup = 3;
      obj.roleList[obj.roleList.length - 1].isShowAllGroup = true;
    },
    // 创建组
    onCreateGroup () {
      this.newGroupData.groupName = null;
      this.isCurrentlyGroupName = false;
      this.newGroupDialogVisible = true;
    },
    onConfirmNewGroup () {
      if (!this.newGroupData.groupName) {
        this.isCurrentlyGroupName = true;
        this.newGroupErrorMsg = '用户组名称不能为空';
        return false;
      }
      this.axios.post('A2/authServices/userGroup', this.newGroupData)
        .then(res => {
          if (res) {
            this.$message.success('创建成功');
            this.newGroupDialogVisible = false;
            this.getList();
          }
        })
        .catch(() => {});
    },
    onNewGroupNameChange (val) {
      let params = {
        groupName: val
      }
      this.axios.get('A2/authServices/userGroupRename', {params})
        .then(res => {
          if (res) {
            this.isCurrentlyGroupName = res.data;
            this.newGroupErrorMsg = '该用户组已存在';
          }
        })
        .catch(() => {});
    },
    // 查看组成员
    onWatchNumber (obj) {
      this.watchItem = obj;
      this.watchDialogVisible = true;
    },
    // 编辑信息
    onEditInfo (obj) {
      this.isCurrentlyEditGroupName = false;
      this.editGroupItem = JSON.parse(JSON.stringify(obj));
      this.editGroupDialogVisible = true;
    },
    onConfirmEditGroup () {
      if (!this.editGroupItem.groupName) {
        this.isCurrentlyEditGroupName = true;
        this.editGroupErrorMsg = '用户名不能为空';
        return false;
      }
      let params = {
        uid: this.editGroupItem.uid,
        groupName: this.editGroupItem.groupName
      }
      this.axios.put('A2/authServices/userGroup', params)
        .then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.editGroupDialogVisible = false;
            this.getList();
          }
        })
        .catch(() => {});
    },
    onEditGroupNameChange (val) {
      let params = {
        groupName: val
      }
      this.axios.get('A2/authServices/userGroupRename', {params})
        .then(res => {
          if (res) {
            this.isCurrentlyEditGroupName = res.data;
            this.editGroupErrorMsg = '该用户组已存在';
          }
        })
        .catch(() => {});
    },
    // 管理成员
    onAdminNumer (obj) {
      this.numberUserId = obj.uid;
      this.selectNumbers = [];
      this.checkOutNumbers = [];
      this.allNumbers = [];
      this.checkInNumbers = [];
      obj.userList.forEach(item => {
        this.selectNumbers.push({
          uid: item.uid,
          userName: item.userName
        })
      });
      let params = {
        pageSize: 999999
      };
      this.axios.get('A2/authServices/users', {params})
        .then(res => {
          if (res) {
            this.selectNumbers.forEach(aa => {
              res.data.list.forEach((bb, index) => {
                if (aa.userName === bb.userName) {
                  res.data.list.splice(index, 1);
                }
              })
            })
            console.log(res.data.list);
            res.data.list.forEach(zz => {
              this.allNumbers.push({
                uid: zz.uid,
                userName: zz.userName
              })
            })
          }
        })
        .catch(() => {});
      this.adminNumberdialogVisible = true;
    },
    onChangeNumbersName (val) {
      this.allNumbers.forEach(aa => {
        if (aa.userName === val) {
          this.allNumbers = [{
            uid: aa.uid,
            userName: aa.userName
          }]
        }
      });
      if (val === '') {
        this.allNumbers = []
        let params = {
          pageSize: 999999
        };
        this.axios.get('A2/authServices/users', {params})
          .then(res => {
            if (res) {
              this.selectNumbers.forEach(aa => {
                res.data.list.forEach((bb, index) => {
                  if (aa.userName === bb.userName) {
                    res.data.list.splice(index, 1);
                  }
                })
              })
              console.log(res.data.list);
              res.data.list.forEach(zz => {
                this.allNumbers.push({
                  uid: zz.uid,
                  userName: zz.userName
                })
              })
            }
          })
          .catch(() => {});
      }
    },
    // 加入当前成员
    onAddSelectNumber () {
      let params = {
        uid: this.numberUserId,
        uids: []
      }
      this.checkInNumbers.forEach(cc => {
        params.uids.push(cc.uid);
      })
      this.axios.post('A2/authServices/userGroupBatch', params)
        .then(res => {
          if (res) {
            this.checkInNumbers.forEach((aa, i) => {
              this.allNumbers.forEach((bb, index) => {
                if (aa.userName === bb.userName) {
                  this.allNumbers.splice(index, 1);
                }
              })
            })
            this.selectNumbers.splice(this.selectNumbers.length, 0, ...this.checkInNumbers);
            this.checkInNumbers = [];
            this.getList();
            this.adminNumberdialogVisible = false;
          }
        })
        .catch(() => {});
    },
    // 移出当前成员
    onOutSelectNumber () {
      let params = {
        groupId: this.numberUserId,
        userIdList: []
      }
      this.checkOutNumbers.forEach(cc => {
        params.userIdList.push(cc.uid);
      })
      this.axios.delete('A2/authServices/userGroupBatch', {data: params})
        .then(res => {
          if (res) {
            this.checkOutNumbers.forEach((aa, i) => {
              this.selectNumbers.forEach((bb, index) => {
                if (aa.userName === bb.userName) {
                  this.selectNumbers.splice(index, 1);
                }
              })
            })
            this.allNumbers.splice(this.allNumbers.length, 0, ...this.checkOutNumbers);
            this.checkOutNumbers = [];
            this.getList();
            this.adminNumberdialogVisible = false;
          }
        })
        .catch(() => {});
    },
    // 配置组角色
    onEditRoles (obj) {
      this.roleUserId = obj.uid;
      this.selectRoles = [];
      this.checkOutRoles = [];
      this.allRoles = [];
      this.checkInRoles = [];
      obj.roleList.forEach(item => {
        if (item.uid && item.roleName) {
          this.selectRoles.push({
            uid: item.uid,
            roleName: item.roleName
          })
        }
      })
      this.axios.get('A2/authServices/userRoles')
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
        .catch(() => {});
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
        this.axios.get('A2/authServices/userRoles')
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
    // 加入配置角色
    onAddSelectRole () {
      let params = {
        groupId: this.roleUserId,
        roleIdList: []
      }
      this.checkInRoles.forEach(cc => {
        params.roleIdList.push(cc.uid);
      })
      this.axios.post('A2/authServices/groupBatchRole', params)
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
            this.newRoledialogVisible = false;
          }
        })
        .catch(() => {})
    },
    // 移出配置角色
    onOutSelectRole () {
      let params = {
        groupId: this.roleUserId,
        roleIdList: []
      }
      this.checkOutRoles.forEach(cc => {
        params.roleIdList.push(cc.uid);
      })
      this.axios.delete('A2/authServices/groupBatchRole', {data: params})
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
            this.newRoledialogVisible = false;
          }
        })
        .catch(() => {});
    },
    // 删除成员
    deleteList (obj) {
      this.deleteItem = obj;
      this.deletedialogVisible = true;
    },
    onConfirmDelete () {
      this.axios.delete('A2/authServices/userGroup/' + this.deleteItem.uid)
        .then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.deletedialogVisible = false;
            this.getList();
          }
        })
        .catch(() => {});
      this.deletedialogVisible = false;
    },
    // 输入框查询
    onSearch () {
      this.getList();
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
  .create-btn {
    display: inline-block;
    width: 98px; height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
    background: #0785FD;
    color: #FFF;
    cursor: pointer;
  }
  .ar-table {
    margin-top: 20px;
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
        width: 185px;
        i {
          margin-left: 10px;
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
  /deep/ .el-pagination {
    text-align: center;
  }
  /deep/ .el-table thead th {
    background-color: #FAFAFA !important;
  }
  /deep/ .hover-row>td {
    background-color: #E6F7FF !important;
  }
  .icon-hover {
    font-size: 30px !important;
    color: #BBBBBB !important;
  }
  .icon-hover:hover {
    color: #0785FD !important;
  }
}
.watch-dialog {
  /deep/ .el-dialog__header {
    background: #F0F0F0 !important;
    text-align: left !important;
    color: #555555;
    font-weight: bold;
    font-size: 16px;
  }
  /deep/ .el-dialog__body {
    padding: 0 20px 10px 15px;
  }
  .content {
    .watch-title {
      font-size: 14px;
      color: #333;
      height: 50px; line-height: 50px;
    }
    .watch-list {
      background: #FAFAFA;
      width: 342px; min-height: 197px;
      > li {
        height: 40px; line-height: 40px;
        padding-left: 20px;
      }
    }
  }
}
.line-input {
  display: flex;
  align-items: center;
  padding-top: 5px;
  .line-input-title {
    width: 105px;
  }
}
.error-msg {
  width: 205px;height: 30px;
  line-height: 30px;
  border: 1px solid #FDC9C9;
  border-radius: 3px;
  color: #FF0000;
  background: #FFF6F6;
  padding-left: 16px;
  margin-left: 75px;
  margin-top: 10px;
  text-align: left;
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
