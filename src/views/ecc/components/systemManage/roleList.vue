<template>
  <div class="role-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>角色管理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="clearfix search">
      <el-form :inline="true" :model='selectForm' ref='selectForm' class="demo-form-inline" size="small">
        <el-form-item>
          <el-input placeholder='请输入角色名称搜索' style="width: 250px;" v-model='selectForm.roleName'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='selectBtn btnClass' @click="selectData">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="add-depart-box">
        <el-button class='selectBtn add-depart' @click="showAddDialog">创建角色</el-button>
      </div>
    </div>
    <el-table style="width: 100%" :data='roleList' class='event-table'>
      <el-table-column fixed label="序号" type="index" align='center'></el-table-column>
      <el-table-column label="角色名称" prop='roleName' align='center'></el-table-column>
      <el-table-column label="描述" prop='roleDesc' align='center'></el-table-column>
      <el-table-column label="创建时间" prop='createTime' align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.createTime | moment}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <img title="查看权限" src="../../../../assets/img/temp/select.png" @click="onSeeLimit(scope.row)" />
          <img title="编辑角色" src="../../../../assets/img/temp/edit.png" @click="onEditRole(scope.row)" />
          <img title="配置权限" src="../../../../assets/img/temp/config.png" @click="onEditLimit(scope.row)" />
          <img title="删除角色" src="../../../../assets/img/temp/delete.png" @click="deleteList(scope.row)" />
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
    <!-- 删除角色弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteRoleDialog"
      width="340px"
      height='205px'
      center>
      <span style='text-align:center;color:#333333;font-size:14px'>是否确定删除该角色及关联信息?</span>
      <p style='text-align:center;color:#999999;font-size:12px;margin-top:10px'>删除后数据不可恢复</p>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='onConfirmDelete'>确认</el-button>
        <el-button class='noSureBtn' @click="deleteRoleDialog = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 创建角色弹框 -->
    <el-dialog title="创建角色" :visible.sync="dialogFormVisible" center width='400px' class="new-department">
      <el-form class='add-depart-form' :model='addForm' ref="addForm">
        <el-form-item label="角色名称" label-width='85px' prop='roleName'>
          <el-input type="text" placeholder='请输入角色名称' style='width: 98%' v-model='addForm.roleName'></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width='85px' prop="roleDesc">
          <el-input type="textarea" rows="5" placeholder='请简要描述角色' style='width: 98%' v-model='addForm.roleDesc'></el-input>
        </el-form-item>
        <el-form-item label-width='85px' v-show="isShowError">
          <div class="error-msg">
            <i class="el-icon-error"></i>
            <span>{{errorMsg}}</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="cancelAdd">取 消</el-button>
        <el-button class='noSureBtn' type="primary" @click="submitAddData">确认</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色弹框 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible" center width='400px' class="new-department">
      <el-form class='add-depart-form' :model='editForm' ref="editForm">
        <el-form-item label="角色名称" label-width='85px' prop="roleName">
          <el-input type="text" placeholder='请输入角色名称' style='width: 98%' v-model='editForm.roleName'></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width='85px' prop="roleDesc">
          <el-input type="textarea" rows="5" placeholder='请简要描述角色' style='width: 98%' v-model='editForm.roleDesc'></el-input>
        </el-form-item>
        <el-form-item label-width='85px' v-show="isShowError">
          <div class="error-msg">
            <i class="el-icon-error"></i>
            <span>{{errorMsg}}</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="cancelEdit">取 消</el-button>
        <el-button class='noSureBtn' type="primary" @click="onConfirmEditRole">确认</el-button>
      </div>
    </el-dialog>
    <!-- 查看权限弹框 -->
    <el-dialog
      class="limit-dialog"
      title="查看权限"
      :visible.sync="seeLimitDialogVisible"
      width="410px"
      center>
      <div class="content">
        <div class="title">{{seeLimitItem.roleName}}</div>
        <div class="tree-list">
          <el-tree
            class="filter-tree"
            :data="seeLimitObj.A"
            default-expand-all
            node-key="resourceName"
            ref="trees"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onGoEditLimitDialog">配置权限</el-button>
      </span>
    </el-dialog>
    <!-- 配置权限弹框 -->
    <el-dialog
      class="limit-dialog"
      title="配置权限"
      :visible.sync="editLimitDialogVisible"
      width="410px"
      center>
      <div class="content">
        <div class="title">角色名称{{defaultKeys}}</div>
        <div class="tree-list">
          <el-tree
            class="filter-tree"
            :data="allLimitObj.A"
            show-checkbox
            default-expand-all
            node-key="resourceName"
            ref="tree"
            :default-checked-keys="defaultKeys"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="background: #fff;color:#666666" @click="editLimitDialogVisible = false">取消</el-button>
        <el-button style="background: #0785FD" @click="onConfirmEditLimit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      seeLimitObj: { A: [], B: [], C: [], D: [], E: [] },
      allLimitObj: { A: [], B: [], C: [], D: [], E: [] },
      defaultKeys: [], // 配置权限中默认选中的节点
      seeLimitItem: {}, // 查看权限对象
      deleteRoleDialog: false, // 删除角色
      dialogFormVisible: false, // 创建角色
      editFormVisible: false, // 编辑角色
      seeLimitDialogVisible: false, // 查看权限
      editLimitDialogVisible: false, // 配置权限
      selectForm: {
        roleName: ''
      },
      pagination: { total: 0, pageSize: 10, pageNum: 1 },
      roleList: [],
      selectLimitItem: {},
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        roleName: '',
        uid: '',
        roleDesc: ''
      },
      errorMsg: '',
      isShowError: false,
      deleteId: '' // 要删除的角色id
    }
  },
  mounted () {
    this.getAuthorityList();
    this.getRoleList();
  },
  methods: {
    getAuthorityList () { // 获取权限列表
      this.allLimitObj.A = [];
      this.allLimitObj.B = [];
      this.allLimitObj.C = [];
      this.allLimitObj.D = [];
      this.allLimitObj.E = [];
      this.axios.get('A2/authServices/authResources')
        .then(res => {
          if (res) {
            res.data.forEach(item => {
              if (item.resourceLayer === 1) {
                this.allLimitObj.A.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  children: []
                });
              }
              if (item.resourceLayer === 2) {
                this.allLimitObj.B.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  children: []
                });
              }
              if (item.resourceLayer === 3) {
                this.allLimitObj.C.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  children: []
                });
              }
              if (item.resourceLayer === 4) {
                this.allLimitObj.D.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  children: []
                });
              }
              if (item.resourceLayer === 5) {
                this.allLimitObj.E.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType
                });
              }
            });
            // console.log(this.allLimitObj);
            // 2
            this.allLimitObj.A.forEach(a => {
              this.allLimitObj.B.forEach(b => {
                if (a.uid === b.parentUid) {
                  a.children.push(b);
                }
              })
            })
            // 3
            this.allLimitObj.A.forEach(a => {
              if (a.children && a.children.length > 0) {
                a.children.forEach(b => {
                  this.allLimitObj.C.forEach(c => {
                    if (b.uid === c.parentUid) {
                      b.children.push(c);
                    }
                  })
                })
              }
            })
            // 4
            this.allLimitObj.A.forEach(a => {
              if (a.children && a.children.length > 0) {
                a.children.forEach(b => {
                  if (b.children && b.children.length > 0) {
                    b.children.forEach(c => {
                      this.allLimitObj.D.forEach(d => {
                        if (c.uid === d.parentUid) {
                          c.children.push(d);
                        }
                      })
                    })
                  }
                })
              }
            })
            // 5
            this.allLimitObj.A.forEach(a => {
              if (a.children && a.children.length > 0) {
                a.children.forEach(b => {
                  if (b.children && b.children.length > 0) {
                    b.children.forEach(c => {
                      if (c.children && c.children.length > 0) {
                        c.children.forEach(d => {
                          this.allLimitObj.E.forEach(e => {
                            if (d.uid === e.parentUid) {
                              d.children.push(e);
                            }
                          })
                        })
                      }
                    })
                  }
                })
              }
            })
            // console.log('111', this.allLimitObj.A);
          }
        })
        .catch(() => {})
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getRoleList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getRoleList();
    },
    getRoleList () { // 分页获取角色列表
      if (!this.selectForm.roleName) {
        this.selectForm.roleName = null;
      }
      const params = {
        'where.roleName': this.selectForm.roleName,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      this.axios.get('A2/authServices/userRoles', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.roleList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {})
    },
    selectData () { // 查询
      this.getRoleList();
    },
    onSeeLimit (obj) { // 查看权限
      // console.log(obj)
      this.seeLimitObj.A = [];
      this.seeLimitObj.B = [];
      this.seeLimitObj.C = [];
      this.seeLimitObj.D = [];
      this.seeLimitObj.E = [];
      this.seeLimitItem = Object.assign({}, obj);
      obj.roleAuthList.forEach(item => {
        if (item.resourceLayer === 1) {
          this.seeLimitObj.A.push({
            uid: item.uid,
            resourceName: item.resourceName,
            isShow: false,
            children: []
          });
        }
        if (item.resourceLayer === 2) {
          this.seeLimitObj.B.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isShow: false,
            children: []
          });
        }
        if (item.resourceLayer === 3) {
          this.seeLimitObj.C.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isShow: false,
            children: []
          });
        }
        if (item.resourceLayer === 4) {
          this.seeLimitObj.D.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isShow: false,
            children: []
          });
        }
        if (item.resourceLayer === 5) {
          this.seeLimitObj.E.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName
          });
        }
      });
      // 2
      this.seeLimitObj.A.forEach(a => {
        this.seeLimitObj.B.forEach(b => {
          if (a.uid === b.parentUid) {
            a.children.push(b);
          }
        })
      })
      // 3
      this.seeLimitObj.A.forEach(a => {
        if (a.children && a.children.length > 0) {
          a.children.forEach(b => {
            this.seeLimitObj.C.forEach(c => {
              if (b.uid === c.parentUid) {
                b.children.push(c);
              }
            })
          })
        }
      })
      // 4
      this.seeLimitObj.A.forEach(a => {
        if (a.children && a.children.length > 0) {
          a.children.forEach(b => {
            if (b.children && b.children.length > 0) {
              b.children.forEach(c => {
                this.seeLimitObj.D.forEach(d => {
                  if (c.uid === d.parentUid) {
                    c.children.push(d);
                  }
                })
              })
            }
          })
        }
      })
      // 5
      this.seeLimitObj.A.forEach(a => {
        if (a.children && a.children.length > 0) {
          a.children.forEach(b => {
            if (b.children && b.children.length > 0) {
              b.children.forEach(c => {
                if (c.children && c.children.length > 0) {
                  c.children.forEach(d => {
                    this.seeLimitObj.E.forEach(e => {
                      if (d.uid === e.parentUid) {
                        d.children.push(e);
                      }
                    })
                  })
                }
              })
            }
          })
        }
      })
      // console.log(this.seeLimitObj.A);
      this.seeLimitDialogVisible = true;
    },
    onEditRole (obj) { // 编辑角色
      this.editFormVisible = true;
      this.editForm.roleName = obj.roleName;
      this.editForm.roleDesc = obj.roleDesc;
      this.editForm.uid = obj.uid;
      this.isShowError = false;
      this.errorMsg = '';
    },
    // 编辑角色确认
    onConfirmEditRole () {
      if (!this.editForm.roleName) {
        this.isShowError = true;
        this.errorMsg = '必填项不能为空';
        return false;
      }
      this.axios.put('A2/authServices/userRole', this.editForm)
        .then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.getRoleList();
            this.editFormVisible = false;
          }
        })
    },
    showAddDialog () { // 创建角色
      this.dialogFormVisible = true;
    },
    cancelAdd () { // 取消添加
      this.isShowError = false;
      this.errorMsg = '';
      this.addForm = {};
      this.dialogFormVisible = false;
    },
    cancelEdit () { // 取消编辑
      this.isShowError = false;
      this.errorMsg = '';
      this.editForm = {};
      this.editFormVisible = false;
    },
    submitAddData () { // 创建角色确认
      if (!this.addForm.roleName) {
        this.isShowError = true;
        this.errorMsg = '此项内容不可为空';
        return;
      }
      this.axios.post('A2/authServices/userRole', this.addForm)
        .then((res) => {
          if (res) {
            this.$message.success('创建成功');
            this.dialogFormVisible = false;
            this.getRoleList();
          }
        })
        .catch(() => {});
    },
    deleteList (obj) { // 删除角色
      this.deleteRoleDialog = true;
      this.deleteId = obj.uid;
    },
    onConfirmDelete () { // 删除角色确认
      this.axios.delete('A2/authServices/userRole/' + this.deleteId)
        .then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.deleteRoleDialog = false;
            this.getRoleList();
          } else {
            this.$message.error('删除失败，您暂无删除角色的权限');
          }
        })
      this.deleteRoleDialog = false;
    },
    onGoEditLimitDialog () {
      this.seeLimitDialogVisible = false;
      this.onEditLimit(this.seeLimitItem);
    },
    onEditLimit (obj) { // 配置权限
      let keysArr = [];
      // this.defaultKeys = [];
      // if (!obj.roleAuthList) {
      //   obj.roleAuthList = [];
      // }
      if (obj.roleAuthList && obj.roleAuthList.length > 0) {
        obj.roleAuthList.forEach(item => {
          this.allLimitObj.A.forEach(a => {
            if (a.children && a.children.length > 0) {
              a.children.forEach(b => {
                if (item.resourceName === b.resourceName) {
                  keysArr.push(b.resourceName);
                }
                if (b.children && b.children.length > 0) {
                  b.children.forEach(c => {
                    if (item.resourceName === c.resourceName) {
                      keysArr.push(c.resourceName);
                    }
                    if (c.children && c.children.length > 0) {
                      c.children.forEach(d => {
                        if (item.resourceName === d.resourceName) {
                          keysArr.push(d.resourceName);
                        }
                        if (d.children && d.children.length > 0) {
                          d.children.forEach(f => {
                            if (item.resourceName === f.resourceName) {
                              keysArr.push(f.resourceName);
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        })
      }
      this.defaultKeys = JSON.parse(JSON.stringify(keysArr));
      console.log(this.defaultKeys)
      this.selectLimitItem = Object.assign({}, obj);
      this.editLimitDialogVisible = true;
    },
    onConfirmEditLimit () { // 配置权限确认
      let arr = [];
      let addArr = [];
      let deleteArr = [];
      const treeList = this.$refs.tree.getCheckedNodes();
      const parentList = this.$refs.tree.getHalfCheckedNodes();
      if (treeList.length > 0) {
        treeList.map((item) => {
          arr.push(item);
        });
      }
      if (parentList.length > 0) {
        parentList.map((item) => {
          arr.push(item);
        });
      }
      if (this.selectLimitItem.roleAuthList && this.selectLimitItem.roleAuthList.length > 0) {
        for (let i = 0; i < this.selectLimitItem.roleAuthList.length; i++) {
          let flag = false;
          if (arr && arr.length > 0) {
            for (let j = 0; j < arr.length; j++) {
              if (this.selectLimitItem.roleAuthList[i].resourceName === arr[j].resourceName) {
                flag = true;
                break;
              }
            }
          }
          if (!flag) {
            deleteArr.push(this.selectLimitItem.roleAuthList[i]);
          }
        }
      }
      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          let fg = false;
          if (this.selectLimitItem.roleAuthList && this.selectLimitItem.roleAuthList.length > 0) {
            for (let j = 0; j < this.selectLimitItem.roleAuthList.length; j++) {
              if (arr[i].resourceName === this.selectLimitItem.roleAuthList[j].resourceName) {
                fg = true;
                break;
              }
            }
          }
          if (!fg) {
            addArr.push(arr[i]);
          }
        }
      }
      // console.log('d', deleteArr)
      // console.log('a', addArr)
      let params = {
        uid: this.selectLimitItem.uid,
        authResourceList: []
      }
      addArr.forEach(a => {
        params.authResourceList.push({
          opType: 1,
          uid: a.uid
        })
      })
      deleteArr.forEach(b => {
        params.authResourceList.push({
          opType: 3,
          uid: b.uid
        })
      })
      if (params.authResourceList && params.authResourceList.length > 0) {
        this.axios.post('A2/authServices/roleAuthBatch', params)
          .then(res => {
            if (res) {
              this.$message.success('配置成功');
              this.editLimitDialogVisible = false;
              this.getRoleList();
            }
          })
      } else {
        this.editLimitDialogVisible = false;
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .role-list {
    padding: 20px;
    .header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .search {
      position: relative;
      width: 100%;
      background: #fff;
      display: flex;
      height: 90px;
      line-height: 90px;
      margin-top: 20px;
      margin-bottom: 1%;
      .demo-form-inline {
        float: left;
        padding-left: 1%;
        padding-top: 30px;
        width:100%;
        height: 45px;
      }
    }
    .btnClass {
      width: 80px;
    }
    .selectBtn {
      background-color: #0785FD;
    }
    /deep/ .el-table thead th {
      background-color: #FAFAFA !important;
    }
    /deep/ .hover-row>td {
      background-color: #E6F7FF !important;
    }
    .add-depart-box {
      margin-right: 20px;
      .add-depart {
        color: #fff;
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
      padding: 10px 25px 10px;
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
    .new-department {
      .add-depart-form {
        width: 100%;
        /deep/ .el-form-item__label {
          text-align: left;
          line-height: 32px;
        }
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        /deep/ .el-form-item {
          margin-bottom: 20px;
        }
        /deep/ .el-form-item:first-child label:after {
          content: '*';
          color: #f56c6c;
          margin-left: 4px;
        }
        .error-msg {
          width: 98%;
          height:32px;
          line-height: 32px;
          text-align: left;
          background: #FFF6F6;
          padding-left: 10px;
          border: 1px solid #FDC9C9;
          border-radius: 3px;
          i {
            color: #FF0000;
          }
          span {
            color: #FF0000;
            font-size: 12px;
          }
        }
      }
    }
    .limit-dialog {
      .content {
        .tree-list {
          border: 1px solid #E7EAEC;
          width: 100%;
          height: 300px;
          padding: 0 20px;
          overflow: auto;
          /deep/ .el-tree {
            padding-top: 10px;
          }
        }
      }
      .title {
        text-align: left;
        padding: 10px 0;
      }
      /deep/ .el-button {
        background: #0785FD;
        color: #fff;
      }
      /deep/ .el-icon-caret-right:before {
        content: '';
      }
      /deep/ .el-tree-node__expand-icon.is-leaf {
        background: none;
      }
      /deep/ .el-tree-node__expand-icon {
        background: url('../../../../assets/img/temp/expand.png') no-repeat;
      }
      /deep/ .el-tree-node__expand-icon.expanded {
        background: url('../../../../assets/img/temp/takeup.png') no-repeat;
        transform: none;
      }
      /deep/ .el-tree-node__label {
        margin-left: 5px;
      }
      /deep/ .el-checkbox__inner {
        margin-left: 5px;
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
</style>
