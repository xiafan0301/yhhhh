<template>
  <div class="authority-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>权限管理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="body">
      <div class="nothing"  v-show="allLimitObj.A.length === 0">
        <img src="../../../../assets/img/temp/nothing.png" />
        <p>亲爱的主人，您暂无权限哦!</p>
        <div class="create-authority" @click="createFirstLimit">创建权限</div>
      </div>
      <div class="body-content" v-show="allLimitObj.A.length > 0">
        <p class="title">权限管理</p>
        <div class="body-detail">
          <el-tree
            :data="allLimitObj.A"
            node-key="uid"
            default-expand-all
            draggable
            :props="defaultProps"
            @node-drag-start="handleDragStart"
            @node-drop="handleDrop"
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.resourceName }}</span>
              <span class="operation">
                <i class="icon-tuodong- icon-hover" @click="canDragNode(data)" title="拖动变换顺序"></i>
                <i class="icon-xinzeng- icon-hover" @click="onAddLimit(data)" title="添加"></i>
                <i class="icon-xiugai-1 icon-hover" @click="onEditRole(data)" title="编辑"></i>
                <i class="icon-shanchu- icon-hover" @click="onDeleteLimit(data)" title="删除"></i>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 添加权限弹框 -->
    <el-dialog
      title="创建权限"
      class="new-department"
      :visible.sync="addLimitDialogVisible"
      width="400px"
      center>
      <el-form class='add-depart-form'>
        <el-form-item label="权限名称" label-width='85px' :model="addForm">
          <el-input type="text" v-model="addForm.resourceName" placeholder='请输入权限名称' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item label="权限类型" label-width='85px'>
          <el-select placeholder="请选择权限类型" style='width: 98%' v-model="addForm.resourceType">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-depart-form-normal" label="访问路径" label-width='85px'>
          <el-input type="text" v-model="addForm.path" placeholder='请输入访问路径' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item class="add-depart-form-normal" label="样式" label-width='85px'>
          <el-input type="text" v-model="addForm.style" placeholder='请输入样式' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item label-width='85px' v-show="isShowError">
          <div class="error-msg">
            <i class="el-icon-error"></i>
            <span>{{errorMsg}}</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer double-btn-80">
        <el-button class="sureBtn" @click="addLimitDialogVisible = false">取 消</el-button>
        <el-button class="noSureBtn" :loading="isAddLoading" @click="onConfirmAddLimit">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑权限弹框 -->
    <el-dialog
      title="编辑权限"
      class="new-department"
      :visible.sync="editLimitDialogVisible"
      width="400px"
      center>
      <el-form class='add-depart-form'>
        <el-form-item label="权限名称" label-width='85px'>
          <el-input type="text" v-model="editLimitItem.resourceName" placeholder='请输入权限名称' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item label="权限类型" label-width='85px'>
          <el-select placeholder="请选择权限类型" style='width: 98%' v-model="editLimitItem.resourceType">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="add-depart-form-normal" label="访问路径" label-width='85px'>
          <el-input type="text" v-model="editLimitItem.path" placeholder='请输入访问路径' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item class="add-depart-form-normal" label="样式" label-width='85px'>
          <el-input type="text" v-model="editLimitItem.style" placeholder='请输入样式' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item label-width='85px' v-show="isShowError">
          <div class="error-msg">
            <i class="el-icon-error"></i>
            <span>{{errorMsg}}</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer double-btn-80">
        <el-button class="sureBtn" @click="editLimitDialogVisible = false">取 消</el-button>
        <el-button class="noSureBtn" :loading="isEditLoading" @click="onConfirmEditLimit">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 删除权限弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteLimitdialogVisible"
      width="340px"
      center>
      <span style='text-align:center;color:#333333;font-size:14px'>是否确定删除该权限?</span>
      <p style='text-align:center;color:#999999;font-size:12px;margin-top:10px'>删除后数据不可恢复</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="noSureBtn" :loading="isDeleteLoading" @click="onConfirmDelete">确 认</el-button>
        <el-button class="sureBtn" @click="deleteLimitdialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isAddLoading: false, // 添加权限加载中
      isDeleteLoading: false, // 删除权限加载中
      isEditLoading: false, // 编辑权限加载中
      allLimitObj: { A: [], B: [], C: [], D: [], E: [] },
      deleteLimitdialogVisible: false, // 删除权限
      editLimitDialogVisible: false, // 编辑权限
      addLimitDialogVisible: false, // 创建权限
      addForm: {
        resourceName: null,
        resourceType: null,
        path: '',
        style: '',
        parentUid: null
      },
      isShowError: false,
      errorMsg: '',
      editLimitItem: {},
      deleteItem: {},
      limitDataList: [], // 所有的权限数据
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      },
      isDrag: false,
      params: {},
      checkedResource: null // 可以拖动的节点名称
    }
  },
  mounted () {
    this.getAuthorityList();
  },
  methods: {
    handleDragStart (node, ev) {
      console.log('拖动的节点', node.data);
      this.params.uid = node.data.uid;
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('拖拽成功完成', dropNode.data, dropType);
      this.params.parentUid = dropNode.data.parentUid;
      if (dropType === 'before') {
        this.params.resourceNumber = dropNode.data.resourceLeft - 1;
        if (dropNode.data.resourceLayer === 1) {
          if (this.params.resourceNumber === 1) {
            this.params.resourceNumber = null;
          }
        }
        if (dropNode.data.resourceLayer === 2) {
          this.allLimitObj.A.forEach(item => {
            if (this.params.resourceNumber === item.resourceLeft) {
              this.params.resourceNumber = null;
            }
          })
        }
        if (dropNode.data.resourceLayer === 3) {
          this.allLimitObj.B.forEach(item => {
            if (this.params.resourceNumber === item.resourceLeft) {
              this.params.resourceNumber = null;
            }
          })
        }
        if (dropNode.data.resourceLayer === 4) {
          this.allLimitObj.C.forEach(item => {
            if (this.params.resourceNumber === item.resourceLeft) {
              this.params.resourceNumber = null;
            }
          })
        }
        if (dropNode.data.resourceLayer === 5) {
          this.allLimitObj.D.forEach(item => {
            if (this.params.resourceNumber === item.resourceLeft) {
              this.params.resourceNumber = null;
            }
          })
        }
      } else if (dropType === 'after') {
        this.params.resourceNumber = dropNode.data.resourceRight;
      }
      console.log(this.params);
      this.axios.put('A2/authServices/authResource', this.params)
        .then(res => {
          if (res) {
            this.getAuthorityList();
          }
        })
        .catch(() => {});
    },
    allowDrag (node) { // 判断该节点是否允许拖动
      // console.log(node)
      if (this.checkedResource) {
        if (node.data.resourceName === this.checkedResource) {
          return true;
        }
      }
    },
    canDragNode (data) { // 拖动节点
      this.checkedResource = data.resourceName;
    },
    createFirstLimit () {
      this.addForm.resourceName = null;
      this.addForm.resourceType = null;
      this.addLimitDialogVisible = true;
    },
    onConfirmDelete () { // 确认删除权限
      if (this.deleteItem.uid) {
        this.isDeleteLoading = true;
        this.axios.delete('A2/authServices/authResource?uid=' + this.deleteItem.uid)
          .then(res => {
            if (res) {
              this.$message.success('删除成功');
              this.getAuthorityList();
              this.deleteLimitdialogVisible = false;
              this.isDeleteLoading = false;
            } else {
              this.isDeleteLoading = false;
            }
          })
          .catch(() => {});
      }
    },
    onConfirmEditLimit () { // 确认编辑权限
      if (!this.editLimitItem.resourceName) {
        this.isShowError = true;
        this.errorMsg = '此项内容不可为空';
        return false;
      }
      this.isEditLoading = true;
      let params = {
        resourceName: this.editLimitItem.resourceName,
        resourceType: this.editLimitItem.resourceType,
        path: this.editLimitItem.path,
        style: this.editLimitItem.style,
        uid: this.editLimitItem.uid
      }
      this.axios.put('A2/authServices/authResource', params)
        .then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.getAuthorityList();
            this.editLimitDialogVisible = false;
            this.isEditLoading = false;
          } else {
            this.isEditLoading = false;
          }
        })
        .catch(() => {})
    },
    onConfirmAddLimit () { // 确认添加权限
      if (!this.addForm.resourceName) {
        this.isShowError = true;
        this.errorMsg = '此项内容不可为空';
        return false;
      } else {
        this.isShowError = false;
        this.errorMsg = '';
      }
      if (!this.addForm.resourceType) {
        this.isShowError = true;
        this.errorMsg = '此项内容不可为空';
        return false;
      } else {
        this.isShowError = false;
        this.errorMsg = '';
      }
      this.isAddLoading = true;
      this.axios.post('A2/authServices/authResource', this.addForm)
        .then(res => {
          if (res) {
            this.$message.success('新增成功');
            this.getAuthorityList();
            this.addLimitDialogVisible = false;
            this.isAddLoading = false;
          } else {
            this.isAddLoading = false;
          }
        })
        .catch(() => {})
    },
    getAuthorityList () { // 获取权限列表
      this.allLimitObj.A = [];
      this.allLimitObj.B = [];
      this.allLimitObj.C = [];
      this.allLimitObj.D = [];
      this.allLimitObj.E = [];
      this.axios.get('A2/authServices/authResources')
        .then(res => {
          if (res) {
            this.limitDataList = res.data;
            console.log('data', res.data)
            res.data.forEach(item => {
              if (item.resourceLayer === 1) {
                this.allLimitObj.A.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  resourceLeft: item.resourceLeft,
                  resourceRight: item.resourceRight,
                  path: item.path,
                  style: item.style,
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
                  resourceLeft: item.resourceLeft,
                  resourceRight: item.resourceRight,
                  path: item.path,
                  style: item.style,
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
                  resourceLeft: item.resourceLeft,
                  resourceRight: item.resourceRight,
                  path: item.path,
                  style: item.style,
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
                  resourceLeft: item.resourceLeft,
                  resourceRight: item.resourceRight,
                  path: item.path,
                  style: item.style,
                  isShow: true,
                  children: []
                });
              }
              if (item.resourceLayer === 5) {
                this.allLimitObj.E.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  resourceLeft: item.resourceLeft,
                  resourceRight: item.resourceRight,
                  path: item.path,
                  style: item.style
                });
              }
            });
            console.log(this.allLimitObj);
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
            console.log(this.allLimitObj.A)
          }
        })
        .catch(() => {})
        // console.log('A', this.allLimitObj.A)
    },
    onAddLimit (obj) { // 添加权限
      this.addForm.resourceName = null;
      this.addForm.resourceType = null;
      this.addForm.path = null;
      this.addForm.style = null;
      this.addLimitDialogVisible = true;
      this.isShowError = false;
      this.errorMsg = '';
      if (obj.uid) {
        this.addForm.parentUid = obj.uid;
      }
    },
    onEditRole (obj) { // 编辑权限
      this.editLimitDialogVisible = true;
      this.isShowError = false;
      this.errorMsg = '';
      this.editLimitItem = Object.assign({}, obj);
    },
    onDeleteLimit (obj) { // 删除权限
      this.deleteItem = Object.assign({}, obj);
      this.deleteLimitdialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
  .authority-list {
    padding: 20px;
    height: 100%;
    .header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .body {
      width: 100%;
      background: #fff;
      min-height: 95%;
      position: relative;
      overflow: auto;
      .nothing {
        position: absolute;
        text-align: center;
        left: 45%;
        top: 35%;
        p {
          color: #999999;
          font-size: 14px;
          margin: 20px 0;
        }
        .create-authority {
          color: #fff;
          background: #0785FD;
          width: 100px;
          height: 40px;
          line-height: 40px;
          margin: 0 auto;
          border-radius: 2px;
          cursor: pointer;
        }
      }
      .body-content {
        padding: 40px;
        .title {
          font-size: 16px;
          color: #333333;
          margin-bottom: 15px;
        }
        .body-detail {
          border: 1px solid #E7EAEC;
          width: 410px;
          padding: 30px;
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
          /deep/ .custom-tree-node {
            margin-left: 8px;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            >span {
              color: #333333;
              font-size: 14px;
            }
          }
          /deep/ .el-tree-node__content {
            height: 32px;
            line-height: 32px;
            // padding-left: 5px !important;
          }
          /deep/ .el-tree-node__content>.el-tree-node__expand-icon {
            margin-left: 6px;
          }
          /deep/ .el-tree-node__content:hover {
            background: #E6F7FF;
            .operation {
              display: block;
            }
          }
          .operation {
            margin-right: 30px;
            display: none;
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
    .new-department {
      .add-depart-form {
        width: 100%;
        /deep/ .el-form-item__label {
          text-align: right;
          line-height: 32px;
        }
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        /deep/ .el-form-item {
          margin-bottom: 10px;
        }
        /deep/ .el-form-item label:after {
          content: '*';
          color: #f56c6c;
          margin-left: 4px;
        }
        /deep/ .add-depart-form-normal.el-form-item label:after {
          content: '';
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
    .icon-hover {
      font-size: 30px;
      color: #BBBBBB;
    }
    .icon-hover:hover {
      color: #0785FD;
    }
  }
</style>
