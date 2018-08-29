<template>
  <div class="main">
    <!-- 一级菜单 -->
    <ul v-if="allLimitObj.A.length > 0" class="box">
      <li
        class="list"
        v-for="(item, index) in allLimitObj.A"
        :key="index + 'r'"
        v-dragging="{ item: item, list: allLimitObj.A, group: 'item'}">
        <div class="left" @click="item.isShow = !item.isShow">
          <i v-if="!item.isShow && item.sonList.length > 0" class="iconfont">&#xe6c1;</i>
          <i v-if="item.isShow && item.sonList.length > 0" class="iconfont">&#xe6b4;</i>
          <span>{{item.resourceName}}</span>
          <div class="operate">
            <i class="iconfont" @click.stop="onAddLimit(item)">&#xe612;</i>
            <i class="iconfont" @click.stop="onEditLimit(item)">&#xe6cb;</i>
            <i class="iconfont drag">&#xe6eb;</i>
            <i class="iconfont" @click.stop="onDeleteLimit(item)">&#xe6af;</i>
          </div>
        </div>
        <!-- 二级菜单 -->
        <ul class="list-second" v-show="item.isShow">
          <div v-if="item.sonList.length > 0">
            <li class="more-li" v-for="(a, b) in item.sonList" :key="b + 'a'" v-dragging="{ item: a, list: item.sonList, group: 'itemA'}">
              <div class="left" :class="{'m20': a.sonList.length <= 0}" @click="a.isShow = !a.isShow">
                <i v-if="!a.isShow && a.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                <i v-if="a.isShow && a.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                <span style="margin-left: 8px;">{{a.resourceName}}</span>
                <div class="operate">
                  <i class="iconfont" @click.stop="onAddLimit(a)">&#xe612;</i>
                  <i class="iconfont" @click.stop="onEditLimit(a)">&#xe6cb;</i>
                  <i class="iconfont drag">&#xe6eb;</i>
                  <i class="iconfont" @click.stop="onDeleteLimit(a)">&#xe6af;</i>
                </div>
              </div>
              <!-- 三级菜单 -->
              <ul class="list-second" v-show="a.isShow">
                <div v-if="a.sonList.length > 0">
                  <li class="more-li" v-for="(c, d) in a.sonList" :key="d + 'c'" v-dragging="{ item: c, list: a.sonList, group: 'itemB'}">
                    <div class="left" :class="{'m20': c.sonList.length <= 0}" @click="c.isShow = !c.isShow">
                      <i v-if="!c.isShow && c.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                      <i v-if="c.isShow && c.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                      <span style="margin-left: 8px;">{{c.resourceName}}</span>
                      <div class="operate">
                        <i class="iconfont" @click.stop="onAddLimit(c)">&#xe612;</i>
                        <i class="iconfont" @click.stop="onEditLimit(c)">&#xe6cb;</i>
                        <i class="iconfont drag">&#xe6eb;</i>
                        <i class="iconfont" @click.stop="onDeleteLimit(c)">&#xe6af;</i>
                      </div>
                    </div>
                    <!-- 四级菜单 -->
                    <ul class="list-second" v-show="c.isShow">
                      <div v-if="c.sonList.length > 0">
                        <li class="more-li" v-for="(e, f) in c.sonList" :key="f + 'e'" v-dragging="{ item: e, list: c.sonList, group: 'itemC'}">
                          <div class="left" :class="{'m20': e.sonList.length <= 0}" @click="e.isShow = !e.isShow">
                            <i v-if="!e.isShow && e.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                            <i v-if="e.isShow && e.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                            <span style="margin-left: 8px;">{{e.resourceName}}</span>
                            <div class="operate" @click.native.stop>
                              <i class="iconfont" @click.stop="onAddLimit(e)">&#xe612;</i>
                              <i class="iconfont" @click.stop="onEditLimit(e)">&#xe6cb;</i>
                              <i class="iconfont drag">&#xe6eb;</i>
                              <i class="iconfont" @click.stop="onDeleteLimit(e)">&#xe6af;</i>
                            </div>
                          </div>
                          <!-- 五级菜单 -->
                          <ul class="list-second" v-show="e.isShow">
                            <div v-if="e.sonList.length > 0">
                              <li class="more-li" v-for="(g, h) in e.sonList" :key="h + 'g'" v-dragging="{ item: g, list: e.sonList, group: 'itemD'}">
                                <div class="left m20">
                                  <span style="margin-left: 8px;">{{g.resourceName}}</span>
                                  <div class="operate">
                                    <i class="iconfont" style="font-size: 18px;" @click.stop="onEditLimit(g)">&#xe6cb;</i>
                                    <i class="iconfont drag" style="font-size: 16px;">&#xe6eb;</i>
                                    <i class="iconfont" @click.stop="onDeleteLimit(g)">&#xe6af;</i>
                                  </div>
                                </div>
                              </li>
                            </div>
                          </ul>
                        </li>
                      </div>
                    </ul>
                  </li>
                </div>
              </ul>
            </li>
          </div>
        </ul>
      </li>
    </ul>
    <!-- 无数据空白页 -->
    <div v-else class="no-limit">
      <div class="img"></div>
      <div class="text">暂无权限</div>
      <div class="btn" @click="createFirstLimit">创建权限</div>
    </div>
    <!-- 添加权限弹框 -->
    <el-dialog
      class="project-dialog"
      title="新建权限"
      :visible.sync="addLimitDialogVisible"
      width="400px"
      :append-to-body="true">
      <div class="content">
        <div class="line">
          <span class="line-title red-color-star">权限名称</span>
          <el-input v-model="addObj.resourceName" @change="onNewLimitChange" size="small" placeholder="请输入权限名称"/>
        </div>
        <div class="line">
          <span class="line-title">权限类型</span>
          <el-select v-model="addObj.resourceType" size="small" style="width: 250px;" placeholder="请选择权限类型">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
        </div>
        <div v-if="errorShow" class="error-msg">
          <i class="el-icon-error"></i>
          <span>{{errorMsg}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer double-btn-80">
        <el-button @click="addLimitDialogVisible = false">取 消</el-button>
        <el-button @click="onConfirmAddLimit">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑权限弹框 -->
    <el-dialog
      class="project-dialog"
      title="编辑权限"
      :visible.sync="editLimitDialogVisible"
      width="400px"
      :append-to-body="true">
      <div class="content">
        <div class="line">
          <span class="line-title red-color-star">权限名称</span>
          <el-input v-model="editLimitItem.resourceName" @change="onNewLimitChange" size="small" placeholder="请输入权限名称"/>
        </div>
        <div class="line">
          <span class="line-title">权限类型</span>
          <el-select v-model="editLimitItem.resourceType" size="small" style="width: 250px;" placeholder="请选择权限类型">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
          </el-select>
        </div>
        <div v-if="errorShow" class="error-msg">
          <i class="el-icon-error"></i>
          <span>{{errorMsg}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer double-btn-80">
        <el-button @click="editLimitDialogVisible = false">取 消</el-button>
        <el-button @click="onConfirmEditLimit">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 删除权限弹框 -->
    <el-dialog
      class="project-dialog"
      title="删除权限"
      :visible.sync="deleteLimitdialogVisible"
      width="340px"
      :append-to-body="true">
      <div class="content" style="text-align: center;">
        <p class="text two-line-tip">是否确定删除该权限？</p>
        <p class="text two-line-warning"><i class="el-icon-warning"></i>删除后数据不可恢复</p>
      </div>
      <span slot="footer" class="dialog-footer double-btn-80">
        <el-button @click="onConfirmDelete">确 认</el-button>
        <el-button @click="deleteLimitdialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allLimitObj: { A: [], B: [], C: [], D: [], E: [] },
      addLimitDialogVisible: false, // 新增权限提示
      addLimitItem: {},
      addObj: {
        resourceName: null,
        resourceType: null,
        parentUid: null,
        proKey: this.$store.state.proKey
      },
      editLimitDialogVisible: false, // 编辑权限提示
      editLimitItem: {},
      deleteLimitdialogVisible: false, // 删除提示
      deleteItem: {},
      errorShow: false,
      errorMsg: null
    }
  },
  mounted () {
    this.getAllLimit();
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item);
      console.log(value.list);
      console.log(value);
    })
    this.$dragging.$on('dragend', () => {
    })
  },
  methods: {
    // 根据项目获取其所有权限
    getAllLimit () {
      this.allLimitObj.A = [];
      this.allLimitObj.B = [];
      this.allLimitObj.C = [];
      this.allLimitObj.D = [];
      this.allLimitObj.E = [];
      this.axios.get('S2/auth/authServices/authResources?proKey=' + this.$store.state.proKey)
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
                  sonList: []
                });
              }
              if (item.resourceLayer === 2) {
                this.allLimitObj.B.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  sonList: []
                });
              }
              if (item.resourceLayer === 3) {
                this.allLimitObj.C.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  sonList: []
                });
              }
              if (item.resourceLayer === 4) {
                this.allLimitObj.D.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  resourceType: item.resourceType,
                  isShow: true,
                  sonList: []
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
            console.log(this.allLimitObj);
            // 2
            this.allLimitObj.A.forEach(a => {
              this.allLimitObj.B.forEach(b => {
                if (a.uid === b.parentUid) {
                  a.sonList.push(b);
                }
              })
            })
            // 3
            this.allLimitObj.A.forEach(a => {
              if (a.sonList && a.sonList.length > 0) {
                a.sonList.forEach(b => {
                  this.allLimitObj.C.forEach(c => {
                    if (b.uid === c.parentUid) {
                      b.sonList.push(c);
                    }
                  })
                })
              }
            })
            // 4
            this.allLimitObj.A.forEach(a => {
              if (a.sonList && a.sonList.length > 0) {
                a.sonList.forEach(b => {
                  if (b.sonList && b.sonList.length > 0) {
                    b.sonList.forEach(c => {
                      this.allLimitObj.D.forEach(d => {
                        if (c.uid === d.parentUid) {
                          c.sonList.push(d);
                        }
                      })
                    })
                  }
                })
              }
            })
            // 5
            this.allLimitObj.A.forEach(a => {
              if (a.sonList && a.sonList.length > 0) {
                a.sonList.forEach(b => {
                  if (b.sonList && b.sonList.length > 0) {
                    b.sonList.forEach(c => {
                      if (c.sonList && c.sonList.length > 0) {
                        c.sonList.forEach(d => {
                          this.allLimitObj.E.forEach(e => {
                            if (d.uid === e.parentUid) {
                              d.sonList.push(e);
                            }
                          })
                        })
                      }
                    })
                  }
                })
              }
            })
            console.log(this.allLimitObj.A);
          }
        })
    },
    createFirstLimit () {
      this.addObj.resourceName = null;
      this.addObj.resourceType = null;
      this.addLimitDialogVisible = true;
    },
    onAddLimit (obj) {
      this.addObj.resourceName = null;
      this.addObj.resourceType = null;
      this.addObj.parentUid = null;
      this.addLimitItem = Object.assign({}, obj);
      this.addLimitDialogVisible = true;
    },
    onConfirmAddLimit () {
      if (!this.addObj.resourceName) {
        this.errorShow = true;
        this.errorMsg = '此项内容不可为空';
        return false;
      }
      if (this.addLimitItem.uid) {
        this.addObj.parentUid = this.addLimitItem.uid;
      }
      this.axios.post('S2/auth/authServices/authResource', this.addObj)
        .then(res => {
          if (res) {
            this.$message.success('新增成功');
            this.getAllLimit();
            this.addLimitDialogVisible = false;
          }
        })
      this.addLimitDialogVisible = false;
    },
    onEditLimit (obj) {
      this.editLimitDialogVisible = true;
      this.editLimitItem = Object.assign({}, obj);
      console.log(obj);
    },
    onConfirmEditLimit () {
      if (!this.editLimitItem.resourceName) {
        this.errorShow = true;
        this.errorMsg = '此项内容不可为空';
        return false;
      }
      let params = {
        proKey: this.$store.state.proKey,
        parentUid: this.editLimitItem.parentUid,
        resourceName: this.editLimitItem.resourceName,
        resourceType: this.editLimitItem.resourceType,
        uid: this.editLimitItem.uid
      }
      this.axios.put('S2/auth/authServices/authResource', params)
        .then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.getAllLimit();
            this.editLimitDialogVisible = false;
          }
        })
    },
    onDeleteLimit (obj) {
      this.deleteItem = Object.assign({}, obj);
      this.deleteLimitdialogVisible = true;
      console.log(obj);
    },
    onConfirmDelete () {
      this.axios.delete('S2/auth/authServices/authResource?uid=' + this.deleteItem.uid + '&proKey=' + this.$store.state.proKey)
        .then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.getAllLimit();
            this.deleteLimitdialogVisible = false;
          }
        })
    },
    onNewLimitChange () {}
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #FFF;
  margin-top: 15px;
  .box {
    border-radius: 2px;
    padding: 25px 0 50px 30px;
    .list {
      line-height: 30px;
      color: #555;
      &:hover {
        .drag {
          color: red;
        }
      }
      .operate {
        display: none;
        margin-left: 10px;
        i:nth-child(2) {
          font-size: 18px;
        }
      }
      .left {
        display: inline-block;
        cursor: pointer;
        &:hover {
          .operate {
            display: inline-block;
          }
        }
      }
      .m20 {
        margin-left: 20px;
      }
      .list-second {
        li {
          color: #666;
          font-size: 14px;
        }
        li.more-li { padding-left: 35px; }
      }
    }
  }
  .no-limit {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      width: 131px; height: 88px;
      background: url('../../../../../assets/img/no_limit.png') no-repeat;
      background-size: 131px 88px;
    }
    .text {
      font-size: 18px;
      color: #666;
      margin-top: 10px;
    }
    .btn {
      width:186px; height:52px;
      background:#1AB394;
      border-radius:4px;
      line-height: 52px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      margin-top: 20px;
    }
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
  .red-color-star:after {
    content: '*';
    color: #f56c6c;
    margin-left: 4px;
  }
  .line-name {
    color: #333;
  }
}
.error-msg {
  width: 250px;height: 36px;
  line-height: 36px;
  border: 1px solid #FDC9C9;
  border-radius: 3px;
  color: #FF0000;
  background: #FFF6F6;
  padding-left: 16px;
  margin-left: 80px;
}
@media screen and (min-width:321px) and (max-width:1400px){.main{min-height: 470px;}}
@media screen and (min-width:1400px){.main{min-height: 780px;}}
</style>
