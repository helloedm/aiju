<template>
    <div>
        <el-popover ref="popover" :placement="treePosition" width="400" trigger="click" @hide="treeCallback()">
            <el-input placeholder="输入关键字进行过滤" v-model="treeFilter" class="tree_filter"></el-input>
            <el-tree :data="treeData" ref="tree" show-checkbox node-key="id" :props="treeDataProps" :default-expanded-keys="[treeFirstData]"
                :filter-node-method="treeFilterNode" :check-strictly="treeSupportSelect" @check-change="treeMoreSelect" class="tree_max_height">
            </el-tree>
        </el-popover>
        <el-button v-popover:popover class="tree_btn">{{treeMyBtnName}}</el-button>
    </div>
</template>
<script>
    import Util from '../script/util.js';
    export default {
        props: {
            //new
            treeBtnName: String,
            treeType: Number, // 0部门和人员 1部门 2人员
            treeSupportSelect: Boolean, // false多选 true单选
            treeSelectData: {
                keys: Array, // 已选数组
                names: String // 已选名称
            },
            treePosition: String, // 弹框位置
            hrmRoleId: {// 筛选角色 ,不传默认为不筛选;1,管理员;2,员工;3,财务专员;4,招聘专员;5,面试官;6,人事
              type: Number,
              defult: null
            }
        },
        data() {
            return {

                // new
                treeData: [],
                treeDataProps: {
                    children: 'children',
                    label: 'name'
                },
                treeFilter: '',
                treeMyBtnName: this.treeBtnName,
                treeInitBtnName: this.treeBtnName,
                treeMyBtnNameArr: [],
                TreeMyposition: this.treePosition ? this.treePosition : 'rigth',
                treeFirstData: '',
            }
        },
        mounted: function () {
            this.treeAjax();
        },
        watch: {
            treeFilter: function (val) {
                this.$refs.tree.filter(val);
            },
            treeBtnName:function(val){
                this.treeMyBtnName = val;
            }
        },
        methods: {
            // 人员树
            treeAjax: function () {
                var self = this;
                var method = "user/getNewUsers";
                var param = JSON.stringify({hrmRoleId: this.hrmRoleId});
                var successd = function (res) {

                    var arr = res.data.data.nodeList;
                    var result = []; // 返回转换后的数组
                    var ifpid = [];
                    var str = {}; // push进去的数据

                    self.treeFirstData = arr[0].id;
                    // 确定id存在后查找对应id并且插入str
                    function GetSubJson(
                        // 三个值分别是循环对应数组，对应id值，str
                        jsonData, destID, str
                    ) {
                        for (var i = 0; i < jsonData.length; i++) {
                            if (jsonData[i].id == destID) {
                                jsonData[i].children.push(str);
                                ifpid[str.id] = true;
                            }
                            else {
                                if (jsonData[i].children.length > 0) {
                                    GetSubJson(jsonData[i].children, destID, str);
                                }
                            }
                        }
                    }
                    for (var i = 0; i < arr.length; i++) {
                        // 1.提取数据
                        str = {
                            id: arr[i].id,
                            name: arr[i].name,
                            isGroup: arr[i].isGroup,
                            children: [],
                            level: arr[i].level,
                        }
                        // 2.判断pid是否存在
                        if (self.treeType == 0) {
                            if (ifpid[arr[i].parentDeptId]) {
                                // 将str放到对于id函数中
                                GetSubJson(result, arr[i].parentDeptId, str)
                            } else {
                                // 创建pid
                                result.unshift(str);
                                ifpid[str.id] = true;
                            }
                        } else if (self.treeType == 1 && str.isGroup == 2) {
                            if (ifpid[arr[i].parentDeptId]) {
                                // 将str放到对于id函数中
                                GetSubJson(result, arr[i].parentDeptId, str)
                            } else {
                                // 创建pid
                                result.unshift(str);
                                ifpid[str.id] = true;
                            }
                        } else if (self.treeType == 2 && str.isGroup == 1) {
                            result.unshift(str);
                        }
                    };
                    self.treeData = result;
                }
                this.$http(method, param, successd);
            },
            // 过滤器
            treeFilterNode: function (value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            // 默认选择值
            setChecked: function () {
                if (this.treeSelectData) {
                    this.$refs.tree.setCheckedKeys(this.treeSelectData.keys);
                    this.treeMyBtnName = this.treeSelectData.names == null ? '点击选择' : this.treeSelectData.names;
                }
            },
            // 完成选择后回调
            treeCallback: function () {
                // 筛选全选数据 只显示最上级父级数据
                var treeValNodes = this.$refs.tree.getCheckedNodes(),
                    arr = [],
                    num = '',
                    treeArr = [],
                    treeObj = {
                        dept: [],
                        person: [],
                    },
                    treeName = [];

                function GetCheckAllJson(jsonArr, arr) {
                    for (var i = 0; i < jsonArr.length; i++) {
                        arr[jsonArr[i].id] = true;
                        if (jsonArr[i].children != 0) {
                            GetCheckAllJson(jsonArr[i].children, arr)
                        }
                    }
                }
                for (var i = 0; i < treeValNodes.length; i++) {
                    GetCheckAllJson(treeValNodes[i].children, arr)
                    num = treeValNodes[i].id;
                    if (arr[num] == true) {
                    } else if (this.treeType == 0 && treeValNodes[i].isGroup == 2) {

                        treeName.push(treeValNodes[i].name)
                        treeObj.dept.push(treeValNodes[i].id)
                    } else if (this.treeType == 0 && treeValNodes[i].isGroup == 1) {
                        treeName.push(treeValNodes[i].name)
                        treeObj.person.push(treeValNodes[i].id)
                    } else {
                        treeName.push(treeValNodes[i].name)
                        treeArr.push(treeValNodes[i].id)
                    }
                }
                if (treeArr.length > 0) {
                    this.$emit('treeAssign', treeArr)
                    if (treeName.length == 0　&&　this.treeInitBtnName != null) {
                        this.treeMyBtnName = this.treeInitBtnName
                    }else{
                        this.treeMyBtnName = treeName.join("，")
                    }
                } else {
                    this.$emit('treeAssign', treeObj)
                    if (treeName.length > 0 && treeName != null) {
                        this.treeMyBtnName = treeName.join("，")
                    } else if (this.treeInitBtnName != null) {
                        this.treeMyBtnName = this.treeInitBtnName
                    }
                }
            },
            // 审批多选排序
            treeMoreSelect(data, node) {
                if (this.treeSupportSelect && node) {
                    this.$refs.tree.setCheckedKeys([]);
                    this.$refs.tree.setCheckedKeys([data.id]);
                }
                this.$emit('treeOrderAssign', {
                    "id": data.id,
                    "checked": node,
                    "name": data.name
                });
                if (node) {
                    this.treeMyBtnNameArr.push(data.name);
                } else {
                    for (var i = 0; i < this.treeMyBtnNameArr.length; i++) {
                        if (this.treeMyBtnNameArr[i] == data.name) {
                            this.treeMyBtnNameArr.splice(i, 1);
                        }
                    }
                }
                if (this.treeMyBtnNameArr != null) {
                    this.treeMyBtnName = this.treeMyBtnNameArr.join(" , ");
                }

            }
        }
    }

</script>
<style scoped>
    .tree_filter {
        margin-bottom: 10px;
    }

    .tree_btn {
        max-width: 420px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .tree_max_height{
        max-height: 420px;
        overflow: auto;
    }
</style>
