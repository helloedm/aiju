<template>
    <div id="talentpool">
        <el-row :gutter="20" class="padding_top_20 el-row">
            <el-col class="el-col" :span="3" :offset="1"><ul class="talentpool_head_ul" @click="changetalentStatus(0)" :class="{'active':talentStatus==0}"><li>offer发送记录</li><li class="font_size_24">{{offerRecordsCount0}}</li></ul></el-col>
            <el-col class="el-col" :span="3"><ul class="talentpool_head_ul" @click="changetalentStatus(1)" :class="{'active':talentStatus==1}"><li>待发送offer</li><li class="font_size_24">{{offerRecordsCount1}}</li></ul></el-col>
            <el-col class="el-col" :span="3"><ul class="talentpool_head_ul" @click="changetalentStatus(5)" :class="{'active':talentStatus==5}"><li>待审批offer</li><li class="font_size_24">{{offerRecordsCount5}}</li></ul></el-col>
            <el-col class="el-col" :span="3"><ul class="talentpool_head_ul" @click="changetalentStatus(6)" :class="{'active':talentStatus==6}"><li>已审批offer</li><li class="font_size_24">{{offerRecordsCount6}}</li></ul></el-col>
            <el-col class="el-col" :span="3"><ul class="talentpool_head_ul" @click="changetalentStatus(2)" :class="{'active':talentStatus==2}"><li>待接收offer</li><li class="font_size_24">{{offerRecordsCount2}}</li></ul></el-col>
            <el-col class="el-col" :span="3"><ul class="talentpool_head_ul" @click="changetalentStatus(3)" :class="{'active':talentStatus==3}"><li>待入职</li><li class="font_size_24">{{offerRecordsCount3}}</li></ul></el-col>
            <el-col class="el-col" :span="3"><ul class="talentpool_head_ul" @click="changetalentStatus(4)" :class="{'active':talentStatus==4}"><li>offer放弃记录</li><li class="font_size_24">{{offerRecordsCount4}}</li></ul></el-col>
        </el-row>
        <div class="hrm_module">
            <div class="hrm_module_btn">
                <el-button type="primary" class="pool_fasongoffer" @click="goOffer('123','chongfa')" v-if="talentStatus==1"><i class="el-icon-plus"></i>创建offer</el-button>
            </div>
           
            <div class="hrm_module_con" v-show="talentStatus==0">
                <el-table
                :data="offerRecordsList0"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span style="cursor: pointer;" v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="userDraw"
                label="类型">
                    <template scope="scope">
                        <div v-if="scope.row.userDraw==1">正式</div>
                        <div v-if="scope.row.userDraw==2">试用</div>
                        <div v-if="scope.row.userDraw==3">兼职</div>
                        <div v-if="scope.row.userDraw==4">实习</div>
                        <div v-if="scope.row.userDraw==5">劳务派遣</div>
                        <div v-if="scope.row.userDraw==''||!scope.row.userDraw">-</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建日期">
                </el-table-column>
                <el-table-column
                label="offer状态">
                    <template scope="scope">
                        <span v-if="scope.row.joinStatus==1">待接收</span>
                        <span v-if="scope.row.joinStatus==2">待入职</span>
                        <span v-if="scope.row.joinStatus==3">入职</span>
                        <span v-if="scope.row.joinStatus==4">offer无效</span>
                        <span v-if="scope.row.joinStatus==5">放弃入职</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="senderName"
                label="发送人">
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button @click="previewOffer(scope.row.offerId)" type="text" size="small">查看offer</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
            <div class="hrm_module_con" v-show="talentStatus==1">
                <el-table
                :data="offerRecordsList1"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="userDraw"
                label="类型">
                    <template scope="scope">
                        <div v-if="scope.row.userDraw==1">正式</div>
                        <div v-if="scope.row.userDraw==2">试用</div>
                        <div v-if="scope.row.userDraw==3">兼职</div>
                        <div v-if="scope.row.userDraw==4">实习</div>
                        <div v-if="scope.row.userDraw==5">劳务派遣</div>
                        <div v-if="scope.row.userDraw=='-'||!scope.row.userDraw">-</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建日期">
                </el-table-column>
                <el-table-column
                label="offer创建进程">
                    <template scope="scope">
                        <span v-if="scope.row.processStatus==1">未完成</span>
                        <span v-if="scope.row.processStatus==2">可发送</span>
                        <el-popover
                        ref="popover1"
                        placement="top-end"
                        width="200"
                        trigger="hover">
                        <dl class="popover_ul">
                            <dt class="popover_dt">
                                <div>{{scope.row.name}}</div>
                                <h1>{{scope.row.name}}</h1>
                                <h2>到岗日期:{{scope.row.joinDate}}</h2>
                            </dt>
                            <dd class="popover_dd1">offer创建进度</dd>
                            <dd class="popover_dd2">
                                <el-steps :space="50" direction="vertical" :active="scope.row.processStatus">
                                    <el-step title="候选人信息"></el-step>
                                    <el-step title="薪酬信息"></el-step>
                                    <el-step title="发送offer"></el-step>
                                </el-steps>
                            </dd> 
                        </dl>
                        </el-popover>
                        <i class="iconfont" v-popover:popover1 v-if="scope.row.processStatus!=0"></i>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button @click="goOffer(scope.row)" type="text" size="small" v-if="scope.row.processStatus==1">继续完善</el-button>
                    <el-button @click="goOffer(scope.row)" type="text" size="small" v-else>去发offer</el-button>
                    <el-button type="text" size="small" @click="deleOffer(scope.row)" v-if="scope.row.employerFrom!=1">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
        <div class="hrm_module_con" v-show="talentStatus==2">
                <el-table
                :data="offerRecordsList2"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                label="类型">
                    <template scope="scope">
                        <div v-if="scope.row.userDraw==1">正式</div>
                        <div v-if="scope.row.userDraw==2">试用</div>
                        <div v-if="scope.row.userDraw==3">兼职</div>
                        <div v-if="scope.row.userDraw==4">实习</div>
                        <div v-if="scope.row.userDraw==5">劳务派遣</div>
                        <div v-if="scope.row.userDraw=='-'||!scope.row.userDraw">-</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建日期">
                </el-table-column>
                <el-table-column
                label="是否已读">
                    <template scope="scope">
                        <span v-if="scope.row.offerStatus==2">未读</span>
                        <span v-if="scope.row.offerStatus==3">已读</span>
                        <!--<i class="iconfont"></i>-->
                    </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button  type="text" size="small" @click="giveup(scope.row.hireEmployerId)">候选人放弃</el-button>
                    <el-button type="text" size="small" @click="previewOffer(scope.row.offerId)">查看offer</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
        <div class="hrm_module_con" v-show="talentStatus==3">
                <el-table
                :data="offerRecordsList3"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                label="类型">
                    <template scope="scope">
                        <div v-if="scope.row.userDraw==1">正式</div>
                        <div v-if="scope.row.userDraw==2">试用</div>
                        <div v-if="scope.row.userDraw==3">兼职</div>
                        <div v-if="scope.row.userDraw==4">实习</div>
                        <div v-if="scope.row.userDraw==5">劳务派遣</div>
                        <div v-if="scope.row.userDraw=='-'||!scope.row.userDraw">-</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="joinDate"
                label="到岗日期">
                </el-table-column>
                <el-table-column
                label="入职准备">
                    <template scope="scope">
                        <span>未完成</span>
                        <el-popover
                        ref="popover1"
                        placement="top-end"
                        width="200"
                        trigger="hover">
                        <dl class="popover_ul">
                            <dt class="popover_dt">
                                <div>{{scope.row.name}}</div>
                                <h1>{{scope.row.name}}</h1>
                                <h2>到岗日期:{{scope.row.joinDate}}</h2>
                            </dt>
                            <dd class="popover_dd1">员工入职进度</dd>
                            <dd class="popover_dd2">
                                <el-steps :space="50" direction="vertical" :active="scope.row.proccessStatus">
                                    <el-step title="入职登记表填写"></el-step>
                                    <el-step title="确认员工信息"></el-step>
                                    <el-step title="入职材料"></el-step>
                                    <el-step title="确认到岗"></el-step>
                                </el-steps>
                            </dd>
                        </dl>
                        </el-popover>
                        <i class="iconfont" v-popover:popover1></i>
                    </template>
                </el-table-column>
                <el-table-column
                width="200"
                label="操作">
                <template scope="scope">
                    <el-button  type="text" size="small" @click="giveup(scope.row.hireEmployerId)">候选人放弃</el-button>
                    <el-button type="text" size="small" @click="previewOffer(scope.row.offerId)">查看offer</el-button>
                    <el-button type="text" size="small" @click="confirmJoin(scope.row)">确认到岗</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
        <div class="hrm_module_con" v-show="talentStatus==4">
                <el-table
                :data="offerRecordsList4"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                label="类型">
                    <template scope="scope">
                        <div v-if="scope.row.userDraw==1">正式</div>
                        <div v-if="scope.row.userDraw==2">试用</div>
                        <div v-if="scope.row.userDraw==3">兼职</div>
                        <div v-if="scope.row.userDraw==4">实习</div>
                        <div v-if="scope.row.userDraw==5">劳务派遣</div>
                        <div v-if="scope.row.userDraw=='-'||!scope.row.userDraw">-</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="joinDate"
                label="原定到岗日期">
                </el-table-column>
                <el-table-column
                prop="reason"
                label="放弃原因">
                    <template scope="scope">
                        <span>{{scope.row.reason}}</span>
                        <el-popover
                        ref="popover1"
                        placement="top-end"
                        width="200"
                        trigger="hover">
                        {{scope.row.reasonRemark}}
                        </el-popover>
                        <i class="iconfont" v-popover:popover1></i>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <!-- <el-button  type="text" size="small" @click="resendOffer(scope.row)">重发offer</el-button> -->
                    <el-button type="text" size="small" @click="previewOffer(scope.row.offerId)">查看offer</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
         <div class="hrm_module_con" v-show="talentStatus==5">
                <el-table
                :data="offerRecordsList5"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建日期">
                     <template scope="scope">
                        {{$date(scope.row.createTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                label="试用期薪资">
                    <template scope="scope">
                          {{scope.row.salaryPre && scope.row.salaryPre != '-' ? String(scope.row.salaryPre).indexOf('.')>-1 ? scope.row.salaryPre : scope.row.salaryPre+'.00': '-'}}
                    </template>    
                </el-table-column>
                 <el-table-column
                label="转正薪资">
                    <template scope="scope">
                          {{scope.row.salary && scope.row.salary != '-' ? String(scope.row.salary).indexOf('.')>-1 ? scope.row.salary : scope.row.salary+'.00': '-'}}
                    </template>
                </el-table-column>                
                 <el-table-column
                prop="probation"
                label="试用期">
                  <template scope="scope">
                      {{scope.row.probation ? scope.row.probation + '个月' : ''}}
                  </template>
                </el-table-column>
                 <el-table-column
                label="审批人"
                width="250">
                     <template scope="scope">
                         <el-tag v-for="(item,index) in scope.row.approvalNameList" :key="item" :type="tagtypes[index%4]">{{item}}</el-tag>
                        <el-popover
                        ref="popover1"
                        placement="top-end"
                        width="300"
                        trigger="hover">
                            <div class="approval-progress">
                                <p class="title">{{scope.row.name}}审批进程</p>
                                 <ul class="ul">
                                     <li class="li" v-for="item in scope.row.offerApprovalProgresses" :key="item.id">
                                         <div class="approval-person f_l">{{item.name.length>5?item.name.substr(0,5)+'...':item.name}}</div>
                                         <div class="progress-info f_l">
                                            <div class="progress-info-content">
                                                <div class="progress-status" :style="{color:item.approvalStatus==2?'#46BE8A':item.approvalStatus==3?'#F96868':''}">{{item.approvalStatus | enumApprovalStatus}}</div>
                                                <div class="progress-time">{{$date(item.createTime,'minute')}}</div>
                                                <div class="progress-reason" v-if="item.rejectReason">拒绝理由：{{item.rejectReason}}</div>                                              
                                            </div>
                                            <span class="dot"></span>
                                         </div>
                                     </li>  
                                 </ul>
                            </div>
                        </el-popover>
                        <!-- <i class="iconfont" v-popover:popover1 ></i> -->
                        <i class="iconfont  info-circle-o" v-popover:popover1 >&#xe65e;</i>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="previewOffer(scope.row.offerId)">查看offer</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
         <div class="hrm_module_con" v-show="talentStatus==6">
                <el-table
                :data="offerRecordsList5"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                <template scope="scope">
                    <span v-if="scope.row.interviewerId==-1">{{scope.row.name}}</span>
                    <el-button type="text" v-else @click="resume(scope.row.interviewerId)">{{scope.row.name}}</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="deptName"
                label="部门">
                </el-table-column>
                <el-table-column
                prop="positionName"
                label="职位">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建日期">
                    <template scope="scope">
                        {{$date(scope.row.createTime)}}
                    </template>
                </el-table-column>
                 <el-table-column
                label="试用期薪资">
                     <template scope="scope">
                          {{scope.row.salaryPre && scope.row.salaryPre != '-' ? String(scope.row.salaryPre).indexOf('.')>-1 ? scope.row.salaryPre : scope.row.salaryPre+'.00': '-'}}
                    </template>  
                </el-table-column>
                 <el-table-column
                label="转正薪资">
                     <template scope="scope">
                          {{scope.row.salaryPre && scope.row.salaryPre != '-' ? String(scope.row.salaryPre).indexOf('.')>-1 ? scope.row.salaryPre : scope.row.salaryPre+'.00': '-'}}
                    </template>  
                </el-table-column>
                 <el-table-column
                prop="probation"
                label="试用期">
                    <template scope="scope">
                      {{scope.row.probation ? scope.row.probation + '个月' : ''}}
                    </template>
                </el-table-column>
                 <el-table-column
                label="审批结果"
                width="200">
                    <template scope="scope">
                        <el-tag v-if="scope.row.status == 2" type="success">已同意</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="danger">已拒绝</el-tag>
                        <el-popover
                        ref="popover1"
                        placement="top-end"
                        width="300"
                        trigger="hover">
                            <div class="approval-progress">
                                <p class="title">{{scope.row.name}}审批进程</p>
                                 <ul class="ul">
                                     <li class="li" v-for="item in scope.row.offerApprovalProgresses" :key="item.id">
                                         <div class="approval-person f_l">{{item.name.length>5?item.name.substr(0,5)+'...':item.name}}</div>
                                         <div class="progress-info f_l">
                                            <div class="progress-info-content">
                                                <div class="progress-status" :style="{color:item.approvalStatus==2?'#46BE8A':item.approvalStatus==3?'#F96868':''}">{{item.approvalStatus | enumApprovalStatus}}</div>
                                                <div class="progress-time">{{$date(item.createTime,'minute')}}</div>
                                                <div class="progress-reason" v-if="item.rejectReason">拒绝理由：{{item.rejectReason}}</div>                                               
                                            </div>
                                            <span class="dot"></span>
                                         </div>
                                     </li>  
                                </ul>
                            </div>
                        </el-popover>
                        <!-- <i class="iconfont" v-popover:popover1 ></i> -->
                        <i class="iconfont info-circle-o" v-popover:popover1 >&#xe65e;</i>
                    </template>  
                </el-table-column>
                <el-table-column
                label="操作"
                width="250">
                    <template scope="scope">
                        <div class="" v-if="scope.row.status == 2">
                            <el-button  type="text" size="small" @click="showSendOfferDialog(scope.row)">一键发offer</el-button>
                            <el-button type="text" size="small" @click="previewOffer(scope.row.offerId)">查看offer</el-button>
                        </div>
                        <div class="" v-if="scope.row.status == 3">
                           <el-button  type="text" size="small" @click="goOffer(scope.row,'edit')">修改offer</el-button>
                           <el-button type="text" size="small" @click="previewOffer(scope.row.offerId)">查看offer</el-button>
                           <el-button  type="text" size="small" v-if="scope.row.interviewerId != -1" @click="giveup2(scope.row)" style="color:#FF566B;">放弃</el-button>
                           <el-button  type="text" size="small" v-else @click="deleteOffer(scope.row)">删除</el-button>
                        </div>                      
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="margin_t_20"
            @size-change="changePageSize"
            @current-change="changePageNum"
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount">
            </el-pagination>
        </div>
        </div>
        <el-dialog
        title="查看offer"
        :visible.sync="previewOfferShow"
        size="small">
        <span v-html="previewOfferText"></span>
        <dl v-if="previewOfferLink">
            <dt style="font-size:16px;font-weight:500px;">附件:</dt>
            <dd v-for="file in previewOfferLink" :key="file"><i class="iconfont">&#xe63b;</i>{{file}}</dd>
        </dl>
        <span slot="footer" class="dialog-footer">
            <el-button @click="previewOfferShow = false">取 消</el-button>
            <el-button type="primary" @click="previewOfferShow = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            title="offer发送确认"
            :visible.sync="sendOfferShow"
            class="sendOfferDialog"
            width="20%"
            center>
            <div style="text-align:center;">您确定要发送该offer吗？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sendOfferShow = false">取 消</el-button>
                <el-button type="primary" @click="saveAndSendOffer">确 定</el-button>
            </span>
            </el-dialog>
        <el-dialog
        title="提示"
        :visible.sync="giveupShow"
        size="tiny">
        <el-form ref="form" :model="giveupForm" label-width="80px">
            <el-form-item label="原因">
                <el-select v-model="giveupForm.quitReason" placeholder="请选择offer放弃原因">
                    <el-option :label="item.reason" :value="item.reason" v-for="item in noAcceptReasonList" :key="item.reason"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入放弃offer备注"
                v-model="giveupForm.reasonRemark">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="giveupShow = false">取 消</el-button>
            <el-button type="primary" @click="offerRejected">确 定</el-button>
        </span>
        </el-dialog>
        <!--  放弃审批 -->
        <el-dialog title="放弃" :visible.sync="giveUpShow2" size="tiny">
        <div class="giveup_personal">
          <span class="margin_l_20">{{baseInfo.name}} </span>
          <span class="margin_l_20">{{baseInfo.positionName}}</span> 
          <span class="margin_l_20">{{baseInfo.phone}}</span>
        </div>
        <el-checkbox v-model="giveupObj.isSendEmail">向{{baseInfo.name}}（{{baseInfo.email}}）发送通知</el-checkbox>
        <el-form>
          <el-form-item label="简历移至企业人才库:" label-width="150px">
            <el-radio class="radio" v-model="giveupObj.intervewerRepo" label="1">人才储备</el-radio>
            <el-radio class="radio" v-model="giveupObj.intervewerRepo" label="2">淘汰库</el-radio>
          </el-form-item>
          <el-form-item label="放弃原因" label-width="80px">
            <el-select v-model="giveupObj.interviewerRejectReasonId" placeholder="请选择" @change="changeEliminateReason">
              <el-option
                v-for="item in eliminateReason"
                :key="item.id"
                :label="item.eliminateReason"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明" label-width="80px">
            <el-input type="textarea" v-model="giveupObj.eliminateReason"></el-input>
          </el-form-item>
          <el-form-item label="标签" label-width="80px">
            <el-button size="small" v-for="tag in tags" :key="tag.id" :class="{'el-button--primary':tag.isShow==1}" @click="tag.isShow==1?tag.isShow=0:tag.isShow=1" class="resume_tag">
              {{tag.name}}
              <i class="iconfont resume_dele" @click.stop="deleTag(tag.id)" v-if="tag.isDefaultTag!=1">&#xe612;</i>
            </el-button>
            <el-button size="small" type="warning" @click="addtagShow=true">添加</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="giveUpShow2 = false">取 消</el-button>
          <el-button type="primary" @click="giveupSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 放弃弹框加标签 -->
      <el-dialog title="添加标签" size="tiny" :visible.sync="addtagShow">
        <el-form>
          <el-form-item label="标签名字" label-width="80px">
            <el-input v-model="addtagName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addtagShow = false">取 消</el-button>
          <el-button type="primary" @click="addtag">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'talentpool',
        data(){
            return{
                talentStatus:localStorage.talentStatus-0||0,
                tableData0:[],
                tableData1:[],
                currentPage4:1,
                page:{
                    pageNum:1,
                    pageSize:10,
                    totalCount:0
                },
                offerRecordsCount0:0,
                offerRecordsList0:[],
                previewOfferText:'',
                previewOfferShow:false,
                offerRecordsCount1:0,
                offerRecordsCount2:0,
                offerRecordsCount3:0,
                offerRecordsCount4:0,
                offerRecordsCount5:0,
                offerRecordsCount6:0,
                offerRecordsList1:[],
                offerRecordsList2:[],
                offerRecordsList3:[],
                offerRecordsList4:[],
                offerRecordsList5:[],
                noAcceptReasonList:[],
                giveupShow:false,
                giveupForm:{
                    quitReason:'',
                    reasonRemark:'',
                },
                sendOfferShow:false,
                sendOfferRow:null,    //一键发offer对象
                offerId:'',//暂存offerId
                hireEmployerId:'',//暂存hireEmployerId员工id
                previewOfferLink:[],
                giveUpShow2:false,
                addtagShow:false,
                addtagName:'',
                eliminateReason:[],
                baseInfo:{},
                tags:[],
                giveupObj:{
                    interviewerId:'',
                    isSendEmail:'',
                    interviewerRejectReasonId:'',
                    eliminateReason:'',
                    tagIds:[],
                    intervewerRepo:'',
                    offerApprovalId:'',
                    offerId:''
                },
                tagtypes:['success','warning','danger','info'],
            }
        },
        mounted(){
            this.changetalentStatus(this.talentStatus);
            this.getNoAcceptReasonList();
            // this.awaitSentOfferRecords();
            // this.awaitReceiveOfferRecords();
            // this.awaitEntryOfferRecords();
            // this.abandaonOfferRecords();
            this.getcount();
        },
        methods:{
            showOffer(){//查看offer

            },
            changetalentStatus(v){
                var self=this;
                self.talentStatus=v;
                localStorage.talentStatus=v;
                self.page={
                    pageNum:1,
                    pageSize:10,
                    totalCount:0
                };
                switch (self.talentStatus) {
                    case 0:
                        self.hasSentOfferRecords();
                        break;
                    case 1:
                        self.awaitSentOfferRecords();
                        break;
                    case 2:
                        self.awaitReceiveOfferRecords();
                        break;
                    case 3:
                        self.awaitEntryOfferRecords();
                        break;
                    case 4:
                        self.abandaonOfferRecords();
                        break;
                    case 5:
                    case 6:
                        self.getApproveList();
                        break;
                    default:
                        break;
                }
            },
            goOffer(row,chongfa){
                var self=this;
                if(chongfa=="chongfa"){
                    self.$router.push({name:'gooffer'});
                }else if(chongfa == "edit"){
                    self.$router.push({name:"gooffer",params:{active:1, hireEmployerId:row.id, offerId:row.offerId, offerApprovalId:row.offerApprovalId}})
                }else{
                    self.$router.push({name:"gooffer",params:{active:row.processStatus*1+1,hireEmployerId:row.hireEmployerId}})
                }  
            },
            deleOffer(row){
                var self=this;
                self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var method="TalentPool/deleteAwaitSentOffer",
                        param=JSON.stringify({
                            offerId:row.offerId
                        }),
                        successd=function(res){
                            self.$message({
                                message:'删除成功!',
                                type:'success'
                            })
                            self.awaitSentOfferRecords();
                        };
                    self.$http(method,param,successd);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            },
            changePageSize(pageSize){
                var self = this;
                self.page.pageSize=pageSize;
                self.page.pageNum=1;
                switch (self.talentStatus) {
                    case 0:
                        self.hasSentOfferRecords();
                        break;
                    case 1:
                        self.awaitSentOfferRecords();
                        break;
                    case 2:
                        self.awaitReceiveOfferRecords();
                        break;
                    case 3:
                        self.awaitEntryOfferRecords();
                        break;
                    case 4:
                        self.abandaonOfferRecords();
                        break;
                    case 5:
                    case 6:
                        self.getApproveList();
                    default:
                        break;
                }
            },
            changePageNum(pageNum){
                var self = this;
                self.page.pageNum=pageNum;
                switch (self.talentStatus) {
                    case 0:
                        self.hasSentOfferRecords();
                        break;
                    case 1:
                        self.awaitSentOfferRecords();
                        break;
                    case 2:
                        self.awaitReceiveOfferRecords();
                        break;
                    case 3:
                        self.awaitEntryOfferRecords();
                        break;
                    case 4:
                        self.abandaonOfferRecords();
                        break;
                    case 5:
                    case 6:
                        self.getApproveList();
                    default:
                        break;
                }
            },
            hasSentOfferRecords(){//offer发放记录
                var self=this;
                var method="TalentPool/hasSentOfferRecords",
                    param=JSON.stringify({
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize
                    }),
                    successd=function(res){
                        self.offerRecordsCount0=res.data.data.count;
                        self.page=res.data.data.page;
                        self.offerRecordsList0=self.$tableNull(res.data.data.awaitSentOfferRecords);
                    };
                self.$http(method,param,successd);
            },
            previewOffer(id){//查看offer
                var self=this;
                var method="TalentPool/previewOffer",
                    param=JSON.stringify({id:id}),
                    successd=function(res){
                        if(res.data.data.offerInfo){
                            self.previewOfferShow=true;
                            self.previewOfferText=res.data.data.offerInfo;
                            self.previewOfferLink=res.data.data.offerLink;
                        }else{
                            self.$message.error("没有offer内容!");
                        }
                    };
                self.$http(method,param,successd);
            },
            awaitSentOfferRecords(){//待发送offer
                var self=this;
                var method="TalentPool/awaitSentOfferRecords",
                    param=JSON.stringify({
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize
                    }),
                    successd=function(res){
                        self.offerRecordsCount1=res.data.data.count;
                        self.page=res.data.data.page;
                        self.offerRecordsList1=self.$tableNull(res.data.data.awaitSentOfferRecords);
                    };
                self.$http(method,param,successd);
            },
            awaitReceiveOfferRecords(){//待接受offer
                var self=this;
                var method="TalentPool/awaitReceiveOfferRecords",
                    param=JSON.stringify({
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize
                    }),
                    successd=function(res){
                        self.offerRecordsCount2=res.data.data.count;
                        self.page=res.data.data.page;
                        self.offerRecordsList2=self.$tableNull(res.data.data.awaitSentOfferRecords);
                    };
                self.$http(method,param,successd);
            },
            awaitEntryOfferRecords(){//待入职
                var self=this;
                var method="TalentPool/awaitEntryOfferRecords",
                    param=JSON.stringify({
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize
                    }),
                    successd=function(res){
                        self.offerRecordsCount3=res.data.data.count;
                        self.page=res.data.data.page;
                        self.offerRecordsList3=self.$tableNull(res.data.data.awaitEntryOfferRecords);
                        self.offerRecordsList3.forEach(function(item){
                            item.proccessStatus=item.proccessStatus-3;
                        });
                    };
                self.$http(method,param,successd);
            },
            abandaonOfferRecords(){//offer放弃记录
                var self=this;
                var method="TalentPool/abandaonOfferRecords",
                    param=JSON.stringify({
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize
                    }),
                    successd=function(res){
                        self.offerRecordsCount4=res.data.data.count;
                        self.page=res.data.data.page;
                        self.offerRecordsList4=self.$tableNull(res.data.data.awaitEntryOfferRecords);
                    };
                self.$http(method,param,successd);
            },
            getApproveList(){      //offer审批记录
                var self=this;
                var method="hireEmployer/getApproveList",               
                    param=JSON.stringify({
                        approveStatus:self.talentStatus == 5 ? 1 : 2,
                        pageNum:self.page.pageNum,
                        pageSize:self.page.pageSize,
                        companyId:localStorage.companyId,
                    }),
                    successd=function(res){
                        self.page=res.data.data.page;
                        self.offerRecordsList5=self.$tableNull(res.data.data.approvalList);
                        if(self.talentStatus == 6){
                            self.offerRecordsCount6 = self.page.totalCount
                            self.$http('hireEmployer/getApproveList',JSON.stringify({
                                approveStatus:1,
                                pageNum:1,
                                pageSize:10,
                                companyId:localStorage.companyId,
                            }),function(res2){
                                 self.offerRecordsCount5 = res2.page.totalCount
                            });
                        }
                        
                    };
                self.$http(method,param,successd);
            },
            deleteOffer(row){    //删除已审批
                 var self=this;
                self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var method="sendOffer/deleteOffer",
                        param=JSON.stringify({
                            offerId:row.offerId,
                            offerApprovalId:row.offerApprovalId
                        }),
                        successd=function(res){
                            self.$message({
                                message:'删除成功!',
                                type:'success'
                            })
                            self.getApproveList();
                        };
                    self.$http(method,param,successd);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            getNoAcceptReasonList(){
                var self=this;
                var method="noAcceptReason/getNoAcceptReasonList",
                    param=JSON.stringify({
                        pageSize:100,
                        pageNum:1
                    }),
                    successd=function(res){
                        self.noAcceptReasonList=res.data.data.list;
                    };
                self.$http(method,param,successd);
            },
            giveup(offerId){
                this.hireEmployerId=offerId;
                this.giveupShow=true;
            },
            showSendOfferDialog(row){
                this.sendOfferShow = true;
                this.sendOfferRow = row;
            },
            saveAndSendOffer(row){
                var self=this; 
                var row = self.sendOfferRow           
                var method="sendOffer/saveAndSendOffer",
                    param=JSON.stringify({
                        hireEmployerId:row.id,
                        emailTheme:row.emailTheme,
                        recieveUids:row.recieveUids,
                        effectiveDate:row.effectiveDate,
                        fileIds:row.fileIds,
                        offerContent:row.offerContent
                    }),
                    successd=function(res){
                        self.sendOfferShow = false;
                        self.getApproveList()
                        self.$message({
                            message:'发送成功!',
                            type:'success'
                        });                       
                    };
                self.$http(method,param,successd);
            },
            offerRejected(){
                var self=this;
                var method="TalentPool/offerRejected",
                    param=JSON.stringify({
                        id:self.hireEmployerId,
                        quitReason:self.giveupForm.quitReason,
                        reasonRemark:self.giveupForm.reasonRemark
                    }),
                    successd=function(res){
                        self.giveupShow=false;
                        self.awaitEntryOfferRecords();
                        self.abandaonOfferRecords();
                        self.$message({
                            message:'操作成功',
                            type:'success'
                        });
                        self.awaitReceiveOfferRecords();
                    };
                self.$http(method,param,successd);
            },
            confirmJoin(row){
                this.$router.push({name:'confirmjoin',params:{hireEmployerId:row.hireEmployerId}});
            },
            resendOffer(row){
                var self=this;
                var method="sendOffer/resendOffer",
                    param=JSON.stringify({hireEmployerId:row.hireEmployerId}),
                    successd=function(res){
                        self.$router.push({name:"gooffer",params:{active:'2',hireEmployerId:row.hireEmployerId}})
                    };
                self.$http(method,param,successd);
            },
            getcount(){
                var self=this;
                var method="TalentPool/count",
                    param=JSON.stringify({}),
                    successd=function(res){
                        self.offerRecordsCount0=res.data.data.countList.count1;
                        self.offerRecordsCount1=res.data.data.countList.count2;
                        self.offerRecordsCount2=res.data.data.countList.count3;
                        self.offerRecordsCount3=res.data.data.countList.count4;
                        self.offerRecordsCount4=res.data.data.countList.count5;
                        self.offerRecordsCount5=res.data.data.countList.count7;
                        self.offerRecordsCount6=res.data.data.countList.count8;
                    };
                self.$http(method,param,successd);
            },
            resume(id){
                this.$router.push({name:'resume',query:{id:id,btnShow:5}})
            },
            /**
             * offer审批放弃,显示放弃弹框
            */
            giveup2(row){
                var self=this;
                if(row){
                    self.giveupObj.interviewerId = row.interviewerId
                    self.giveupObj.offerApprovalId = row.offerApprovalId
                    self.giveupObj.offerId = row.offerId
                }              
                var method="operateResume/getQuitBaseInfo",
                    param=JSON.stringify({
                        id:self.giveupObj.interviewerId
                    }),
                    successd=function(res){
                        self.baseInfo=res.data.data.baseInfo;
                        self.eliminateReason=res.data.data.eliminateReason;
                        self.tags=res.data.data.tags;
                        self.giveUpShow2=true;
                    };
                self.$http(method,param,successd);
            },
            deleTag(id){
                var self=this;
                var method="resumeTag/deleteInterviewerInfoResumeTag",
                    param=JSON.stringify({
                        id:id,
                        interviewerId:self.giveupObj.interviewerId
                    }),
                    successd=function(res){
                        self.giveup2();
                    };
                self.$http(method,param,successd);
            },
            addtag(){
                var self=this;
                var method="resumeTag/addResumeTagToInterviewerInfo",
                    param=JSON.stringify({
                        interviewerId:self.giveupObj.interviewerId,
                        tagName:self.addtagName
                    }),
                    successd=function(res){
                        self.addtagShow=false;
                        self.giveup2();
                       
                    };
                self.$http(method,param,successd);
            },
            changeEliminateReason(id){
                var self=this;
                self.eliminateReason.forEach(function(item){
                    if(item.id==id){
                     self.giveupObj.eliminateReason=item.remark;
                    }
                })
            },
            giveupSubmit(){
                var self=this;
                var method="operateResume/moveManyToQuitRepo";
                var param={},tagIds=[];
                param.quitList=[];
                param.quitList.push({id:self.giveupObj.interviewerId,isSend:self.giveupObj.isSendEmail?'1':'0'});
                param.interviewerRejectReasonId=self.giveupObj.interviewerRejectReasonId;
                param.eliminateReason=self.giveupObj.eliminateReason;
                param.intervewerRepo=self.giveupObj.intervewerRepo;
                param.isApproval = 1;
                param.offerId = self.giveupObj.offerId;
                param.offerApprovalId = self.giveupObj.offerApprovalId;
                self.tags.forEach(function(item) {
                    if(item.isShow==1){
                     tagIds.push(item.id);
                    }
                });
                param.tagIds=tagIds.join();
                var params=JSON.stringify({parameter:param});
                var successd=function(res){
                    self.giveUpShow2=false;
                    self.getApproveList();
                };
                self.$http(method,params,successd);
            },
        },
        filters:{
            enumApprovalStatus(val){
                switch(val){
                    case 0:
                       return '发起审批';
                    case 1:
                       return '待审核';
                    case 2:
                       return '已同意';
                    case 3:
                       return '已拒绝';
                    case 4:
                       return '已撤销';
                    default:
                       break;
                }
            },
            filterSalary(val){
               if(val.indexOf('.')>-1){
                   return val
               }else{
                   return val + '.00'
               }
            },
        }
    }
</script>

<style scoped>
    #talentpool{overflow: hidden;}
    .talentpool_head_ul{width: 100%;cursor: pointer;}
    .talentpool_head_ul.active{color: #5aa2e7;}
    .talentpool_head_ul li{width: 100%;text-align: center;height: 30px;line-height: 30px;}
    .popover_ul{width: 200px;}
    .popover_dt div{width: 50px;height: 50px;background: #5aa2e7;color: #fff;border-radius: 50%;float: left;line-height: 50px;text-align:center;}
    .popover_dt h1{margin-left: 55px;display: block;padding-top: 10px;}
    .popover_dt h2{margin-left: 55px;}
    .popover_dd1{margin-top: 20px;margin-left: 30px;}
    .popover_dd2{margin-left: 20px;margin-top: 20px;}
    .el-row{margin:9px 0 24px 0;background: #fff;padding-bottom: 20px;}
    .el-col{border-right:1px solid #e5e5e5;}
    .el-col:last-child{border-right:0;}
    .el-icon-plus{color: #fff;font-size:14px;margin-right:8px;}
    .approval-progress{padding:16px; padding-top:0;}
    .approval-progress .title{font-size: 16px;color: #1F2D3D;margin-bottom: 24px;font-weight:400;line-height:1.5;font-family: 'PingFangSC';}
    .approval-progress .li .approval-person{width:20%;font-size:14px;color:#475669;margin-right:8px; text-align: left;position: relative;top:-6px;overflow : hidden;
        text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
    .approval-progress .li .progress-info{width:70%;padding-left:10px;padding-bottom:8px;border-left:1px solid #EBEEF5;position: relative;}
    .approval-progress .li .progress-info-content{position: relative;top:-6px;}
    .approval-progress .li:last-child .progress-info{border-left: none;}
    .approval-progress .progress-info .progress-status{font-size:13px;color: #475669;}
    .approval-progress .progress-time,.progress-reason {font-size:12px;color: #98A9BF;line-height: 1.5;}
    .approval-progress .progress-info .dot{width:7px;height:7px;background:#56A6F1;border-radius: 50%;position: absolute;top:0;left:-3.5px;}
    .resume_dele{font-size: 12px;display: inline-block;background-color: #ddd;color: #fff;border-radius: 50%;padding: 2px;position: absolute;right: -8px;top: -8px;}
    .resume_tag{position: relative;}
   
</style>
<style>
 .sendOfferDialog .el-dialog{ width:20%!important; }
</style>
