<template>
<div class="main">
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>{{plateName}}</el-breadcrumb-item>
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="pn-main">
    <div class="filter">
      <div class="filter-left">
        <el-input
          style="width: 334px;"
          size="small"
          v-model="filter['where.roleName']"
          placeholder="请输入角色名称查找"
          @keyup.enter.native="onSearch()">
          <i v-if="closeShow" slot="suffix" @click="onClear()" class="el-input__icon el-icon-close"></i>
          <i slot="suffix" @click="onSearch()" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="filter-right">
        <div @click="onCreateRole" class="create-btn">创建角色</div>
      </div>
    </div>
    <el-table
      class="ar-table"
      :data="listData.list"
      border
      v-loading="loading"
      header-row-class-name="table-header">
      <el-table-column
        type="index"
        width="50px"
        label="序号"
        align="center"
        :show-overflow-tooltip="true"
        :index="indexMethod"/>
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
        :show-overflow-tooltip="true"/>
      <el-table-column
        prop="roleDesc"
        label="描述"
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
        prop=""
        label="操作"
        align="center"
        width="200px"
        class-name="operate">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看权限" placement="bottom">
            <i class="iconfont" @click="onSeeLimit(scope.row)">&#xe6a2;</i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑角色" placement="bottom">
            <i class="iconfont" @click="onEditRole(scope.row)">&#xe68f;</i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="配置权限" placement="bottom">
            <i class="iconfont" @click="onEditLimit(scope.row)">&#xe6a5;</i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除角色" placement="bottom">
            <i class="iconfont" @click="deleteList(scope.row)">&#xe6af;</i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="listData.list && listData.list.length > 0" class="pagination-box">
      <el-pagination
        @current-change="onPageChange"
        :current-page.sync="currentPage"
        :page-size="pagination.pageSize"
        layout="prev, pager, next, jumper"
        :total="listData.total"/>
    </div>
  </div>
  <!-- 查看权限弹框 -->
  <el-dialog
    class="project-dialog limit-dialog"
    title="查看权限"
    :visible.sync="seeLimitDialogVisible"
    width="410px"
    :append-to-body="true">
    <div class="content">
      <div class="title">{{seeLimitItem.roleName}}</div>
      <!-- 一级菜单 -->
      <ul class="box">
        <li
          class="list"
          v-for="(item, index) in seeLimitObj.A"
          :key="index + 'r'">
          <div class="left" @click="item.isShow = !item.isShow">
            <i v-if="!item.isShow && item.sonList.length > 0" class="iconfont">&#xe6c1;</i>
            <i v-if="item.isShow && item.sonList.length > 0" class="iconfont">&#xe6b4;</i>
            <span>{{item.resourceName}}</span>
          </div>
          <!-- 二级菜单 -->
          <ul class="list-second" v-show="item.isShow">
            <div v-if="item.sonList.length > 0">
              <li class="more-li" v-for="(a, b) in item.sonList" :key="b + 'a'">
                <div class="left" :class="{'m20': a.sonList.length <= 0}" @click="a.isShow = !a.isShow">
                  <i v-if="!a.isShow && a.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                  <i v-if="a.isShow && a.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                  <span style="margin-left: 8px;">{{a.resourceName}}</span>
                </div>
                <!-- 三级菜单 -->
                <ul class="list-second" v-show="a.isShow">
                  <div v-if="a.sonList.length > 0">
                    <li class="more-li" v-for="(c, d) in a.sonList" :key="d + 'c'">
                      <div class="left" @click="c.isShow = !c.isShow">
                        <i v-if="!c.isShow && c.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                        <i v-if="c.isShow && c.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                        <span style="margin-left: 8px;">{{c.resourceName}}</span>
                      </div>
                      <!-- 四级菜单 -->
                      <ul class="list-second" v-show="c.isShow">
                        <div v-if="c.sonList.length > 0">
                          <li class="more-li" v-for="(e, f) in c.sonList" :key="f + 'e'">
                            <div class="left" @click="e.isShow = !e.isShow">
                              <i v-if="!e.isShow && e.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                              <i v-if="e.isShow && e.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                              <span style="margin-left: 8px;">{{e.resourceName}}</span>
                            </div>
                            <!-- 五级菜单 -->
                            <ul class="list-second" v-show="e.isShow">
                              <div v-if="e.sonList.length > 0">
                                <li class="more-li" v-for="(g, h) in e.sonList" :key="h + 'g'">
                                  <div class="left">
                                    <span style="margin-left: 8px;">{{g.resourceName}}</span>
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
    </div>
    <span slot="footer" class="dialog-footer double-btn-80">
      <el-button @click="onGoEditLimitDialog">配置权限</el-button>
    </span>
  </el-dialog>
  <!-- 编辑权限弹框 -->
  <el-dialog
    class="project-dialog limit-dialog"
    title="配置权限"
    :visible.sync="editLimitDialogVisible"
    width="410px"
    :append-to-body="true">
    <div class="content">
      <div class="title">{{selectLimitItem.roleName}}</div>
      <!-- 一级菜单 -->
      <ul class="box">
        <li
          class="list"
          v-for="(item, index) in allLimitObj.A"
          :key="index + 'r'">
          <div class="left" @click="item.isShow = !item.isShow">
            <i v-if="!item.isShow && item.sonList.length > 0" class="iconfont">&#xe6c1;</i>
            <i v-if="item.isShow && item.sonList.length > 0" class="iconfont">&#xe6b4;</i>
            <el-checkbox v-model="item.isSelect" @change="onChange"></el-checkbox>
            <span>{{item.resourceName}}</span>
          </div>
          <!-- 二级菜单 -->
          <ul class="list-second" v-show="item.isShow">
            <div v-if="item.sonList.length > 0">
              <li class="more-li" v-for="(a, b) in item.sonList" :key="b + 'a'">
                <div class="left" :class="{'m20': a.sonList.length <= 0}" @click="a.isShow = !a.isShow">
                  <i v-if="!a.isShow && a.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                  <i v-if="a.isShow && a.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                  <el-checkbox v-model="a.isSelect" @change="onChange"></el-checkbox>
                  <span style="margin-left: 8px;">{{a.resourceName}}</span>
                </div>
                <!-- 三级菜单 -->
                <ul class="list-second" v-show="a.isShow">
                  <div v-if="a.sonList.length > 0">
                    <li class="more-li" v-for="(c, d) in a.sonList" :key="d + 'c'">
                      <div class="left" @click="c.isShow = !c.isShow">
                        <i v-if="!c.isShow && c.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                        <i v-if="c.isShow && c.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                        <el-checkbox v-model="c.isSelect" @change="onChange"></el-checkbox>
                        <span style="margin-left: 8px;">{{c.resourceName}}</span>
                      </div>
                      <!-- 四级菜单 -->
                      <ul class="list-second" v-show="c.isShow">
                        <div v-if="c.sonList.length > 0">
                          <li class="more-li" v-for="(e, f) in c.sonList" :key="f + 'e'">
                            <div class="left" @click="e.isShow = !e.isShow">
                              <i v-if="!e.isShow && e.sonList.length > 0" class="iconfont">&#xe6c1;</i>
                              <i v-if="e.isShow && e.sonList.length > 0" class="iconfont">&#xe6b4;</i>
                              <el-checkbox v-model="e.isSelect" @change="onChange"></el-checkbox>
                              <span style="margin-left: 8px;">{{e.resourceName}}</span>
                            </div>
                            <!-- 五级菜单 -->
                            <ul class="list-second" v-show="e.isShow">
                              <div v-if="e.sonList.length > 0">
                                <li class="more-li" v-for="(g, h) in e.sonList" :key="h + 'g'">
                                  <div class="left">
                                    <el-checkbox v-model="g.isSelect" @change="onChange"></el-checkbox>
                                    <span style="margin-left: 8px;">{{g.resourceName}}</span>
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
    </div>
    <span slot="footer" class="dialog-footer double-btn-80">
      <el-button @click="editLimitDialogVisible = false">返 回</el-button>
      <el-button @click="onConfirmEditLimit">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 创建角色弹框 -->
  <el-dialog
    class="project-dialog"
    title="创建角色"
    :visible.sync="newRoleDialogVisible"
    width="400px"
    :append-to-body="true">
    <div class="content">
      <div class="line">
        <span class="line-title red-color-star">角色名称</span>
        <el-input v-model="newRoleData.roleName" size="small" placeholder="请输入角色名称"/>
      </div>
      <div class="line">
        <span class="line-title" style="vertical-align: top;">角色描述</span>
        <el-input class="text-area" resize="none" type="textarea" placeholder="请简要描述角色" v-model="newRoleData.roleDesc"></el-input>
      </div>
      <div v-if="errorShow" class="error-msg">
        <i class="el-icon-error"></i>
        <span>{{errorMsg}}</span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer double-btn-80">
      <el-button @click="newRoleDialogVisible = false">取 消</el-button>
      <el-button @click="onConfirmNewRole">确 认</el-button>
    </span>
  </el-dialog>
  <!-- 编辑角色弹框 -->
  <el-dialog
    class="project-dialog"
    title="编辑角色"
    :visible.sync="editRoleDialogVisible"
    width="400px"
    :append-to-body="true">
    <div class="content">
      <div class="line">
        <span class="line-title red-color-star">角色名称</span>
        <el-input v-model="editRoleItem.roleName" size="small" placeholder="请输入角色名称"/>
      </div>
      <div class="line">
        <span class="line-title" style="vertical-align: top;">角色描述</span>
        <el-input class="text-area" resize="none" type="textarea" placeholder="请简要描述角色" v-model="editRoleItem.roleDesc"></el-input>
      </div>
      <div v-if="errorShow" class="error-msg">
        <i class="el-icon-error"></i>
        <span>{{errorMsg}}</span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer double-btn-80">
      <el-button @click="editRoleDialogVisible = false">取 消</el-button>
      <el-button @click="onConfirmEditRole">确 认</el-button>
    </span>
  </el-dialog>
  <!-- 删除弹框 -->
  <el-dialog
    class="project-dialog"
    title="删除"
    :visible.sync="deletedialogVisible"
    width="340px"
    :append-to-body="true">
    <div class="content">
      <p class="text two-line-tip">是否确定删除该角色及关联信息？</p>
      <p class="text two-line-warning"><i class="el-icon-warning"></i>删除后数据不可恢复</p>
    </div>
    <span slot="footer" class="dialog-footer double-btn-80">
      <el-button @click="onConfirmDelete">确 认</el-button>
      <el-button @click="deletedialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    return {
      plateName: getCookie('plateName'),
      listData: {},
      loading: true,
      seeLimitDialogVisible: false, // 查看权限提示
      seeLimitItem: {},
      seeLimitObj: { A: [], B: [], C: [], D: [], E: [] },
      editLimitDialogVisible: false, // 配置权限提示
      selectLimitItem: {},
      allLimitObj: { A: [], B: [], C: [], D: [], E: [] },
      newRoleDialogVisible: false, // 创建角色提示
      editRoleDialogVisible: false, // 编辑角色提示
      editRoleItem: {},
      deletedialogVisible: false, // 删除提示
      deleteItem: {},
      newRoleData: {
        proKey: this.$store.state.proKey,
        roleName: null,
        roleDesc: null
      }, // 角色新增数据
      errorShow: false,
      errorMsg: null,
      filter: {
        'where.roleName': null
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        order: null
      },
      currentPage: 1,
      closeShow: false
    }
  },
  created () {
    this.getList();
    this.getAllLimit();
  },
  methods: {
    onChange (val) {
      console.log(val);
    },
    // 根据项目获取其所有权限
    getAllLimit () {
      this.axios.get('S2/auth/authServices/authResources?proKey=' + this.$store.state.proKey)
        .then(res => {
          if (res) {
            res.data.forEach(item => {
              if (item.resourceLayer === 1) {
                this.allLimitObj.A.push({
                  uid: item.uid,
                  resourceName: item.resourceName,
                  isShow: false,
                  isSelect: false,
                  sonList: []
                });
              }
              if (item.resourceLayer === 2) {
                this.allLimitObj.B.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  isShow: false,
                  isSelect: false,
                  sonList: []
                });
              }
              if (item.resourceLayer === 3) {
                this.allLimitObj.C.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  isShow: false,
                  isSelect: false,
                  sonList: []
                });
              }
              if (item.resourceLayer === 4) {
                this.allLimitObj.D.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  isShow: false,
                  isSelect: false,
                  sonList: []
                });
              }
              if (item.resourceLayer === 5) {
                this.allLimitObj.E.push({
                  uid: item.uid,
                  parentUid: item.parentUid,
                  resourceName: item.resourceName,
                  isSelect: false
                });
              }
            });
            // console.log(this.allLimitObj);
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
    // 获取列表数据
    getList () {
      if (!this.filter['where.roleName']) { this.filter['where.roleName'] = null };
      let params = Object.assign({}, this.filter, this.pagination, { 'where.proKey': this.$store.state.proKey });
      this.axios.get('S2/auth/authServices/userRoles', {params})
        .then(res => {
          if (res) {
            this.listData = res.data;
            this.loading = false;
          }
        })
    },
    // 查看权限
    onSeeLimit (obj) {
      if (!obj.roleAuthList) {
        obj.roleAuthList = [];
      }
      this.seeLimitObj.A = [];
      this.seeLimitObj.B = [];
      this.seeLimitObj.C = [];
      this.seeLimitObj.D = [];
      this.seeLimitObj.E = [];
      this.seeLimitItem = obj;
      console.log(obj);
      obj.roleAuthList.forEach(item => {
        if (item.resourceLayer === 1) {
          this.seeLimitObj.A.push({
            uid: item.uid,
            resourceName: item.resourceName,
            isShow: false,
            isSelect: false,
            sonList: []
          });
        }
        if (item.resourceLayer === 2) {
          this.seeLimitObj.B.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isShow: false,
            isSelect: false,
            sonList: []
          });
        }
        if (item.resourceLayer === 3) {
          this.seeLimitObj.C.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isShow: false,
            isSelect: false,
            sonList: []
          });
        }
        if (item.resourceLayer === 4) {
          this.seeLimitObj.D.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isShow: false,
            isSelect: false,
            sonList: []
          });
        }
        if (item.resourceLayer === 5) {
          this.seeLimitObj.E.push({
            uid: item.uid,
            parentUid: item.parentUid,
            resourceName: item.resourceName,
            isSelect: false
          });
        }
      });
      // 2
      this.seeLimitObj.A.forEach(a => {
        this.seeLimitObj.B.forEach(b => {
          if (a.uid === b.parentUid) {
            a.sonList.push(b);
          }
        })
      })
      // 3
      this.seeLimitObj.A.forEach(a => {
        if (a.sonList && a.sonList.length > 0) {
          a.sonList.forEach(b => {
            this.seeLimitObj.C.forEach(c => {
              if (b.uid === c.parentUid) {
                b.sonList.push(c);
              }
            })
          })
        }
      })
      // 4
      this.seeLimitObj.A.forEach(a => {
        if (a.sonList && a.sonList.length > 0) {
          a.sonList.forEach(b => {
            if (b.sonList && b.sonList.length > 0) {
              b.sonList.forEach(c => {
                this.seeLimitObj.D.forEach(d => {
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
      this.seeLimitObj.A.forEach(a => {
        if (a.sonList && a.sonList.length > 0) {
          a.sonList.forEach(b => {
            if (b.sonList && b.sonList.length > 0) {
              b.sonList.forEach(c => {
                if (c.sonList && c.sonList.length > 0) {
                  c.sonList.forEach(d => {
                    this.seeLimitObj.E.forEach(e => {
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
      console.log(this.seeLimitObj.A);
      this.seeLimitDialogVisible = true;
    },
    onGoEditLimitDialog () {
      this.seeLimitDialogVisible = false;
      this.onEditLimit(this.seeLimitItem);
    },
    // 配置权限
    onEditLimit (obj) {
      if (!obj.roleAuthList) {
        obj.roleAuthList = [];
      }
      // 初始化数据
      if (this.allLimitObj.A && this.allLimitObj.A.length > 0) {
        this.allLimitObj.A.forEach(a => {
          a.isSelect = false;
          a.sonList.forEach(b => {
            b.isSelect = false;
            b.sonList.forEach(c => {
              c.isSelect = false;
              c.sonList.forEach(d => {
                d.isSelect = false;
                d.sonList.forEach(e => {
                  e.isSelect = false;
                })
              })
            })
          })
        })
      }
      console.log(obj.roleAuthList);
      // 勾选已有的权限
      if (obj.roleAuthList && obj.roleAuthList.length > 0) {
        obj.roleAuthList.forEach(item => {
          this.allLimitObj.A.forEach(a => {
            if (item.resourceName === a.resourceName) {
              a.isSelect = true;
            }
            if (a.sonList && a.sonList.length > 0) {
              a.sonList.forEach(b => {
                if (item.resourceName === b.resourceName) {
                  b.isSelect = true;
                }
                if (b.sonList && b.sonList.length > 0) {
                  b.sonList.forEach(c => {
                    if (item.resourceName === c.resourceName) {
                      c.isSelect = true;
                    }
                    if (c.sonList && c.sonList.length > 0) {
                      c.sonList.forEach(d => {
                        if (item.resourceName === d.resourceName) {
                          d.isSelect = true;
                        }
                        if (d.sonList && d.sonList.length > 0) {
                          d.sonList.forEach(f => {
                            if (item.resourceName === f.resourceName) {
                              f.isSelect = true;
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
      console.log(this.allLimitObj.A);
      this.selectLimitItem = obj;
      this.editLimitDialogVisible = true;
    },
    onConfirmEditLimit () {
      let arr = [];
      let addArr = [];
      let deleteArr = [];
      this.allLimitObj.A.forEach(a => {
        if (a.isSelect) {
          arr.push(a);
        }
        a.sonList.forEach(b => {
          if (b.isSelect) {
            arr.push(b);
          }
          b.sonList.forEach(c => {
            if (c.isSelect) {
              arr.push(c);
            }
            c.sonList.forEach(d => {
              if (d.isSelect) {
                arr.push(d);
              }
              d.sonList.forEach(e => {
                if (e.isSelect) {
                  arr.push(e);
                }
              })
            })
          })
        })
      })
      console.log(arr);
      // debugger;
      for (let i = 0; i < this.selectLimitItem.roleAuthList.length; i++) {
        let flag = false;
        for (let j = 0; j < arr.length; j++) {
          if (this.selectLimitItem.roleAuthList[i].resourceName === arr[j].resourceName && arr[j].isSelect) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          deleteArr.push(this.selectLimitItem.roleAuthList[i]);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        let fg = false;
        for (let j = 0; j < this.selectLimitItem.roleAuthList.length; j++) {
          if (arr[i].resourceName === this.selectLimitItem.roleAuthList[j].resourceName) {
            fg = true;
            break;
          }
        }
        if (!fg) {
          addArr.push(arr[i]);
        }
      }
      console.log(addArr); // 新增的数据
      console.log(deleteArr); // 删除的数据
      let params = {
        uid: this.selectLimitItem.uid,
        proKey: this.$store.state.proKey,
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
      console.log(params);
      if (params.authResourceList && params.authResourceList.length > 0) {
        this.axios.post('S2/auth/authServices/roleAuthBatch', params)
          .then(res => {
            if (res) {
              this.$message.success('配置成功');
              this.editLimitDialogVisible = false;
              this.getList();
            }
          })
      } else {
        this.editLimitDialogVisible = false;
      }
    },
    // 创建角色
    onCreateRole () {
      this.newRoleData.roleName = null;
      this.newRoleData.roleDesc = null;
      this.errorShow = false;
      this.errorMsg = null;
      this.newRoleDialogVisible = true;
    },
    // 创建角色确认
    onConfirmNewRole () {
      if (!this.newRoleData.roleName) {
        this.errorShow = true;
        this.errorMsg = '必填项不能为空';
        return false;
      }
      this.axios.post('S2/auth/authServices/userRole', this.newRoleData)
        .then(res => {
          if (res) {
            this.$message.success('创建成功');
            this.getList();
            this.newRoleDialogVisible = false;
          }
        })
    },
    // 编辑角色
    onEditRole (obj) {
      this.editRoleItem = obj;
      this.errorShow = false;
      this.errorMsg = null;
      this.editRoleDialogVisible = true;
    },
    // 编辑角色确认
    onConfirmEditRole () {
      if (!this.editRoleItem.roleName) {
        this.errorShow = true;
        this.errorMsg = '必填项不能为空';
        return false;
      }
      this.editRoleItem.proKey = this.$store.state.proKey;
      this.axios.put('S2/auth/authServices/userRole', this.editRoleItem)
        .then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.getList();
            this.editRoleDialogVisible = false;
          }
        })
    },
    // 删除成员
    deleteList (obj) {
      this.deleteItem = obj;
      this.deletedialogVisible = true;
    },
    onConfirmDelete () {
      this.axios.delete('S2/auth/authServices/userRole/' + this.deleteItem.uid + '?proKey=' + this.$store.state.proKey)
        .then(res => {
          if (res) {
            this.$message.success('删除成功');
            this.deletedialogVisible = false;
            this.getList();
          } else {
            this.$message.error('删除失败，您暂无删除角色的权限');
          }
        })
      this.deletedialogVisible = false;
    },
    // 输入框查询
    onSearch () {
      this.closeShow = true;
      this.getList();
    },
    // 清除输入框
    onClear () {
      this.filter['where.roleName'] = '';
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
.main {
  .pn-main {
    background: #fff;
    padding: 20px 25px 80px 25px;
    margin-top: 3px;
    .filter {
      .create-btn {
        display: inline-block;
        width: 98px; height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 3px;
        background: #1AB394;
        color: #FFF;
        cursor: pointer;
      }
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
          color: #1AB394;
          border: 1px solid #1AB394;
          background:#F4FFFE;
          .row-insert-i {
            color: #1AB394;
          }
        }
      }
      /deep/ .el-table__empty-block {
        min-height: 200px;
        background: url(../../../../../assets/img/no_data.png) no-repeat;
        background-position: calc(50% - 3px) 34%;
        .el-table__empty-text {
          margin-top: 40px;
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
            color: #1AB394;
          }
          i:last-child:hover {
            color: #FF5722;
          }
        }
      }
    }
  }
}
.line {
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
  .text-area {
    width: 250px;
    /deep/ .el-textarea__inner { height: 72px; }
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
  margin-left: 83px;
}
.limit-dialog {
  /deep/ .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
  .content {
    .title {
      color: #333;
      font-size: 14px;
      height: 45px; line-height: 45px;
      padding-left: 5px;
    }
    .box {
      width: 370px; height: 256px;
      border-radius: 2px;
      border: 1px solid #E7EAEC;
      overflow-y: scroll;
      padding: 15px;
      .list {
        line-height: 30px;
        color: #555;
        .el-checkbox {
          padding-left: 2px;
          /deep/ .el-checkbox__inner:hover {border-color: #009688;}
          /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
          /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #009688;
            border-color: #009688;
          }
        }
        .left {
          display: inline-block;
          cursor: pointer;
        }
        .m20 {
          margin-left: 20px;
        }
        .list-second {
          li {
            color: #666;
            font-size: 14px;
          }
          li.more-li { padding-left: 30px; }
        }
      }
    }
  }
}
</style>
