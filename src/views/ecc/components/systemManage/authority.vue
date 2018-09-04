<template>
  <div class="authority-list">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>权限管理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="body">
      <div class="nothing">
        <img src="../../../../assets/img/temp/nothing.png" />
        <p>亲爱的主人，您暂无权限哦!</p>
        <div class="create-authority">创建权限</div>
      </div>
      <div class="body-content">
        <p class="title">权限管理</p>
        <div class="body-detail">
          <el-tree
            :data="data5"
            node-key="id"
            draggable
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="operation">
                <img title="拖动变换顺序" src="../../../../assets/img/temp/drag.png" @click="onEditRole(scope.row)" />
                <img title="添加" src="../../../../assets/img/temp/ecc-add.png" @click="onEditRole(scope.row)" />
                <img title="编辑" src="../../../../assets/img/temp/edit.png" @click="onEditRole(scope.row)" />
                <img title="删除" src="../../../../assets/img/temp/delete.png" @click="onEditRole(scope.row)" />
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
        <el-form-item label="权限名称" label-width='85px'>
          <el-input type="text" placeholder='请输入权限名称' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item label="权限类型" label-width='85px'>
          <el-select placeholder="请选择权限类型" style='width: 98%'>
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
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
        <el-button class="noSureBtn" @click="onConfirmAddLimit">保 存</el-button>
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
          <el-input type="text" placeholder='请输入权限名称' style='width: 98%'></el-input>
        </el-form-item>
        <el-form-item label="权限类型" label-width='85px'>
          <el-select placeholder="请选择权限类型" style='width: 98%'>
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
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
        <el-button class="noSureBtn" @click="onConfirmEditLimit">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 删除权限弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteLimitdialogVisible"
      width="340px"
      center>
      <span style='text-align:center;color:#333333;font-size:14px'>是否确认删除此部门?</span>
      <p style='text-align:center;color:#999999;font-size:12px;margin-top:10px'>删除后数据不可恢复</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="noSureBtn" @click="onConfirmDelete">确 认</el-button>
        <el-button class="sureBtn" @click="deleteLimitdialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data5: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 4,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 5,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 6,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      deleteLimitdialogVisible: false, // 删除权限
      editLimitDialogVisible: false, // 编辑权限
      addLimitDialogVisible: false, // 创建权限
      addObj: {
        resourceName: null,
        resourceType: null,
        parentUid: null,
        proKey: this.$store.state.proKey
      },
      isShowError: false,
      errorMsg: '',
      editLimitItem: {}
    }
  },
  methods: {
    onConfirmDelete () {},
    onConfirmEditLimit () {},
    onConfirmAddLimit () {},
    onNewLimitChange () {}
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
        display: none;
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
          text-align: left;
          line-height: 32px;
        }
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        /deep/ .el-form-item {
          margin-bottom: 10px;
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
  }
</style>
