import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index'

// 薪资管理
import payManage from 'components/pay/payManage'
import payRecord from 'components/pay/payRecord'
import payWages from 'components/pay/payWages'
import payAdjust from 'components/pay/payAdjust'
import payStubs from 'components/pay/payStubs'

// 权限
import jurAccredit from 'components/jur/jurAccredit'
import jurRole from 'components/jur/jurRole'

// 工作台
import oa from 'components/oa/oaIndex'
import oaReport from 'components/oa/oaReport'
import oaApproval from 'components/oa/oaApproval'
import oaTask from 'components/oa/oaTask'
import oaNotice from 'components/oa/oaNotice'

// 组织人事
import orgMaintain from 'components/org/orgMaintain'
import orgStaff from 'components/org/orgStaff'
import orgDuty from 'components/org/orgDuty'

// 考勤管理
import attendance from 'components/attendance/attendance'
import attendanceTj from 'components/attendance/attendanceTj'
import myAttendance from 'components/attendance/myAttendance'
import abnormal from 'components/attendance/abnormal'

//个人中心
import personal from 'components/personal/personal'

//公司文化
import usercare from 'components/culture/usercare'
import gocare from 'components/culture/goCare'
import caredetail from 'components/culture/caredetail'
import carefenxiang from 'components/culture/carefenxiang'

// 状态
import nopower from 'components/status/nopower'

//招聘
import employset from 'components/employ/employset'
import pool from 'components/employ/pool'
import talentpool from 'components/employ/talentpool'
import gooffer from 'components/employ/gooffer'
import come from 'components/employ/comeposition'
import confirmjoin from 'components/employ/confirmjoin'
import recruitment from "components/recruitment/recruitment"
import edit from "components/recruitment/edit"

//面试
import interviewSet from "components/interview/set"
import talents from "components/interview/talents"
import newResume from "components/interview/newResume"
import notice from "components/interview/notice"
import alternative from "components/interview/alternative"
import library from "components/interview/library"
import hire from "components/interview/hire"
import enterprise from "components/interview/enterprise"
import rating from "components/interview/rating"
import evaluate from "components/interview/evaluate"
import eliminate from "components/interview/eliminate"

import interviewInit from "components/interview/init"
import interviewPass from "components/interview/pass"
import interviewWeedOut from "components/interview/weedout"
import interviewHire from "components/interview/hire"
import resume from "components/interview/resume"
import editResume from "components/interview/editResume"

//微招聘
import publishPosition from "components/recruit/publishPosition"
import publishList from "components/recruit/publishList"
import publishDetail from "components/recruit/publishDetail"
import sRecruit from 'components/s_recruit/recruit'
import recommend from "components/s_recruit/recommend"
import tinyActivity from "components/s_recruit/tinyActivity"
import addActivity from "components/s_recruit/addActivity"
import recommendPost from "components/s_recruit/recommendPost"
import MicroWebsite from 'components/s_recruit/MicroWebsite'
import internalRecommend from "components/s_recruit/internalRecommend"
import recommendList from "components/s_recruit/recommendList"
import recommendSet from "components/s_recruit/recommendSet"
import activityCount from "components/s_recruit/activityCount"
import channelSet from 'components/recruit/channelSet';
import emailToLead from 'components/recruit/emailToLead';
import creatMiniWeb from "components/s_recruit/creatMiniWeb"


//SCRM
import qrCode from 'components/scrm/qrCode';
import material from 'components/scrm/material';
import customMenu from 'components/scrm/customMenu';
import materialImagetext from 'components/scrm/material_imagetext';
import envelopeMain from 'components/scrm/envelopeMain';
import systemTemp from 'components/scrm/systemTemp';
import xcx from 'components/scrm/xcx';

//小程序
import miniIndex from 'components/miniprogram/miniIndex';

//图片上传
import imgUpload from 'components/imgUpload.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/manage/index',
      name: 'index',
      component: index
    },
    {
      path: '/recruit/index',
      name: 'index',
      component: index
    },
    {
      path: '/manage/pay/payManage',
      name: 'payManage',
      component: payManage
    },
    {
      path: '/manage/pay/payRecord',
      name: 'payRecord',
      component: payRecord
    },
    {
      path: '/manage/pay/payWages',
      name: 'payWages',
      component: payWages
    },
    {
      path: '/manage/pay/payAdjust',
      name: 'payAdjust',
      component: payAdjust
    },
    {
      path: '/pay/payStubs',
      name: 'payStubs',
      component: payStubs
    },
    {
      path:'/manage/org/orgMaintain',
      name:'orgMaintain',
      component:orgMaintain
    },
    {
      path: '/manage/org/orgStaff',
      name: 'orgStaff',
      component: orgStaff
    },
    {
      path:'/manage/org/orgDuty',
      name:'orgDuty',
      component:orgDuty
    },
    {
      path: '/manage/jur/Accredit',
      name: 'jurAccredit',
      component: jurAccredit
    },
    {
      path: '/manage/jur/role',
      name: 'jurRole',
      component: jurRole
    },
    {
      path: '/oa/report',
      name: 'oaReport',
      component: oaReport
    },
    {
      path: '/oa/approval',
      name: 'oaApproval',
      component: oaApproval
    },
    {
      path: '/oa/task',
      name: 'oaTask',
      component: oaTask
    },
    {
      path: '/oa/notice',
      name: 'oaNotice',
      component: oaNotice
    },
    {
      path:'/manage/attendance',
      name:'attendance',
      component:attendance
    },
    {
      path:'/manage/attendanceTj',
      name:'attendanceTj',
      component:attendanceTj
    },
    {
      path:'/personal',
      name:'personal',
      component:personal
    },
    {
      path:'/manage/usercare',
      name:'usercare',
      component:usercare
    },
    {
      path:'/manage/gocare',
      name:"gocare",
      component:gocare
    },
    {
      path:'/manage/caredetail',
      name:"caredetail",
      component:caredetail,
      params:{id:null}
    },
    {
      path:'/nopower',
      name:"nopower",
      component:nopower
    },
    {
      path:'/carefenxiang',
      name:"carefenxiang",
      component:carefenxiang
    },
    {
      path:"/attendance/my",
      name:'myAttendance',
      component:myAttendance
    },
    {
      path:'/manage/attendance/abnormal',
      name:'abnormal',
      component:abnormal
    },
    {
      path:'/ATS/employset',
      name:'employset',
      component:employset
    },
    {
      path:'/manage/pool',
      name:'pool',
      component:pool
    },
    {
      path:'/manage/gooffer',
      name:'gooffer',
      component:gooffer,
      params:{active:null,hireEmployerId:null}
    },
    {
      path:'/manage/come',
      name:'come',
      component:come
    },
    {
      path:'/manage/confirmjoin',
      name:'confirmjoin',
      component:confirmjoin,
      params:{hireEmployerId:null}
    },
    {
      path:'/ATS/interviewSet',
      name:'interviewSet',
      component:interviewSet
    },
    {
      path:'/ATS/talents',
      name:"talents",
      component:talents,
      children:[{
        path:'/ATS/talents/newResume',
        name:'newResume',
        component:newResume
      },
      {
        path:'/ATS/talents/alternative',
        name:'alternative',
        component:alternative
      },
      {
        path:'/ATS/talents/library',
        name:'library',
        component:library
      },
      {
        path:"/ATS/talents/hire",
        name:'hire',
        component:hire
      },
      {
        path:'/ATS/talents/eliminate',
        name:'eliminate',
        component:eliminate
      },
      {
        path:'/ATS/pool/talentpool',
        name:'talentpool',
        component:talentpool
      }]
    },
    {
      path:'/ATS/talents/enterprise',
      name:'enterprise',
      component:enterprise
    },
    // {
    //   path:'/ATS/talents/newResume',
    //   name:'newResume',
    //   component:newResume
    // },
    // {
    //   path:'/ATS/talents/alternative',
    //   name:'alternative',
    //   component:alternative
    // },
    // {
    //   path:'/ATS/talents/library',
    //   name:'library',
    //   component:library
    // },
    // {
    //   path:"/ATS/talents/hire",
    //   name:'hire',
    //   component:hire
    // },
    // {
    //   path:'/ATS/talents/enterprise',
    //   name:'enterprise',
    //   component:enterprise
    // },
    {
      path:'/ATS/notice',
      name:'notice',
      component:notice
    },
    {
      path:'/ATS/rating',
      name:'rating',
      component:rating
    },
    {
      path:'/ATS/evaluate',
      name:'evaluate',
      params:null,
      component:evaluate
    },
    {
      path:'/ATS/interviewInit',
      name:'interviewInit',
      component:interviewInit
    },
    {
      path:'/ATS/interviewPass',
      name:'interviewPass',
      component:interviewPass
    },
    {
      path:'/ATS/interviewWeedOut',
      name:'interviewWeedOut',
      component:interviewWeedOut
    },
    {
      path:'/ATS/interviewHire',
      name:'interviewHire',
      component:interviewHire
    },
    {
      path:'/ATS/resume',
      name:'resume',
      component:resume
    },
    {
      path:'/ATS/recruit/list',
      name:'publishList',
      component:publishList
    },
    {
      path:'/ATS/recruit/post',
      name:'publishPosition',
      component:publishPosition
    },
    {
      path:'/ATS/recruit/detail',
      name:'publishDetail',
      component:publishDetail
    },
    {
      path:'/ATS/recruit',
      name:'recruit',
      component:sRecruit
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: qrCode
    },
    {
      path: '/material',
      name: 'material',
      component: material
    },
    {
      path: '/xcx',
      name:'xcx',
      component: xcx
    },
    {
      path: '/customMenu',
      name: 'customMenu',
      component: customMenu
    },
    {
      path: '/materialImagetext',
      name: 'materialImagetext',
      component: materialImagetext
    },
    {
      path: '/systemTemp',
      name: 'systemTemp',
      component: systemTemp
    },
    {
      path: '/envelopeMain',
      name: 'envelopeMain',
      component: envelopeMain
    },
    {
      path:'/ATS/recruitment',
      name:'recruitment',
      component:recruitment
    },
    {
      path:'/ATS/edit',
      name:'edit',
      component:edit
    },
    {
      path:'/ATS/editResume',
      name:'editResume',
      component:editResume
    },
    {
      path:'/ATS/recommend',
      name:'recommend',
      component:recommend
    },
    {
      path:'/ATS/tinyActivity',
      name:'tinyActivity',
      component: tinyActivity
    },
    {
      path:'/ATS/creatMiniWeb',
      name:'creatMiniWeb',
      component: creatMiniWeb
    },
    {
      path:'/ATS/addActivity',
      name:'addActivity',
      component:addActivity
    },
    {
      path:'/ATS/recommendPost',
      name:'recommendPost',
      component:recommendPost
    },
    {
      path:'/ATS/MicroWebsite',
      name:'MicroWebsite',
      component:MicroWebsite
    },
    {
      path:'/ATS/internalRecommend',
      name:'internalRecommend',
      component:internalRecommend
    },
    {
      path:'/imgUpload',
      name:'imgUpload',
      component:imgUpload
    },
    {
      path:'/ATS/recommendList',
      name:'recommendList',
      component:recommendList
    },
    {
      path:'/ATS/recommendSet',
      name:'recommendSet',
      component:recommendSet
    },
    {
      path:'/ATS/activityCount',
      name:'activityCount',
      component:activityCount
    },
    {
      path:'/channelSet',
      name:'channelSet',
      component:channelSet
    },
    {
      path:'/miniIndex',
      name:'miniIndex',
      component:miniIndex
    },{
      path:'/emailToLead',
      name:'emailToLead',
      component:emailToLead
    }
  ]
})

