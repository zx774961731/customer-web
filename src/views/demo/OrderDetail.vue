<template>
  <section class="detail-container clearfix">
    <section class="left-container f_l">
      <section class="order-detail-container clearfix">
        <h2 class="t_c order-title">
          <n-icon size="40" class="f_l back-icon" @click="onBack">
            <ArrowBackOutline />
          </n-icon>
          {{ query.orderId }} 工单处理详情
        </h2>
        <NDivider />
        <h3>工单详情</h3>
        <section class="m_l_50 clearfix">
          <section class="left-detail-container f_l">
            <section class="clearfix">
              <section class="w_30_p f_l">产品：</section>
              <section class="w_60_p f_l">{{ state.orderDetail.product }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">紧急程度：</section>
              <section class="w_60_p f_l">{{ onHandleEmergency(state.orderDetail.emergencyDegree) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">提交时间：</section>
              <section class="w_60_p f_l">{{ onHandleTime(state.orderDetail.gmtCreate) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">通知方式：</section>
              <section class="w_60_p f_l">{{ onHandleContactType(state.orderDetail.contactType) }}</section>
            </section>
            <section class="clearfix">
              <template v-if="state.orderDetail.contactType == '1'">
                <section class="w_30_p f_l">邮箱地址：</section>
              </template>
              <template v-if="state.orderDetail.contactType == '2'">
                <section class="w_30_p f_l">联系电话：</section>
              </template>
              <section class="w_60_p f_l">{{ state.orderDetail.contactInfo }}</section>
            </section>
          </section>
          <section class="right-detail-container f_l">
            <section class="clearfix">
              <section class="w_30_p f_l">问题分类：</section>
              <section class="w_60_p f_l">{{ onHandleQuestionType(state.orderDetail.questionType) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">工单提交人：</section>
              <section class="w_60_p f_l">{{ state.orderDetail.customerUserName }}</section>
            </section>
            <section v-if="state.orderDetail.status === 2 || state.orderDetail.status === 3" class="clearfix">
              <section class="w_30_p f_l">处理完成时间：</section>
              <section class="w_60_p f_l">{{ onHandleTime(state.orderDetail.gmtModified) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">工单状态：</section>
              <section class="w_60_p f_l">{{ onHandleStatus(state.orderDetail.status) }}</section>
            </section>
          </section>
          <section class="f_l w_100_p clearfix">
            <section class="w_15_p f_l">问题描述：</section>
            <section class="w_80_p f_l" style="max-height:113px;overflow:auto;">
              {{ state.orderDetail.description }}
            </section>
          </section>
          <section class="f_l w_100_p clearfix">
            <section class="w_15_p f_l" style="margin-bottom: 0">附件：</section>
            <section class="w_80_p f_l" style="margin-bottom: 0">
              <span v-for="(item, index) in state.orderDetail.fileAddressArray" :key="index" class="file">
                {{ item }}
              </span>
            </section>
          </section>
        </section>
        <section v-if="state.orderDetail.status === 2" class="watermark-container">
          <section class="text">已完结</section>
        </section>
        <section v-if="state.orderDetail.status === 3" class="watermark-container">
          <section class="text">已撤销</section>
        </section>
      </section>
      <template v-if="state.orderDetail.status === 2">
        <NDivider />
        <section class="order-handle-container clearfix">
          <h3>处理结果</h3>
          <section class="m_l_50 clearfix">
            <section class="f_l w_100_p clearfix">
              <section class="w_15_p f_l" style="margin-bottom: 0">处理结果：</section>
              <section class="w_80_p f_l" style="max-height:113px;overflow:auto;">
                {{ state.orderDetail.result }}
              </section>
            </section>
          </section>
        </section>
      </template>
    </section>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {} from 'naive-ui'
import { queryOrderDetail } from '@/api'
import dayjs from 'dayjs'
import { ArrowBackOutline } from '@vicons/ionicons5'

const route = useRoute()
const router = useRouter()
const state = reactive({
  orderDetail: {},
})
const { query } = route
console.log('query value: ' + JSON.stringify(query))

onQueryOrderDetail()
function onQueryOrderDetail() {
  queryOrderDetail({ ticketId: query.orderId })
    .then((res) => {
      state.orderDetail = res || {}
    })
    .catch((err) => {
      console.log(err)
      window.$message.error('查询工单详情失败')
    })
}
function onBack() {
  router.back()
}
function onHandleQuestionType(type) {
  switch (type) {
    case 1:
      return '问题咨询'
    case 2:
      return '报障'
    case 3:
      return '解决方案'
    case 4:
      return '投诉'
  }
}
function onHandleContactType(type) {
  switch (type) {
    case 1:
      return '邮箱'
    case 2:
      return '电话'
  }
}
function onHandleStatus(status) {
  switch (status) {
    case 1:
      return '处理中'
    case 2:
      return '已完结'
    case 3:
      return '已撤销'
  }
}
function onHandleEmergency(type) {
  switch (type) {
    case 1:
      return '一般'
    case 2:
      return '较紧急'
    case 3:
      return '非常紧急'
  }
}
function onHandleTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style lang="less" scoped>
.detail-container {
  font-size: 14px;
  // position: relative;
  .order-title {
    height: 40px;
    line-height: 40px;
  }
  .left-container {
    width: 100%;
    padding: 20px;
    .order-detail-container {
      width: 100%;
      padding: 0 20px;
      position: relative;
      .back-icon {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      .left-detail-container {
        width: 50%;
      }
      .right-detail-container {
        width: 50%;
      }
      .file {
        color: blue;
        cursor: pointer;
        margin-right: 20px;
        display: inline-block;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .order-handle-container {
      width: 100%;
      padding: 0 20px 20px;
      .left-detail-container {
        width: 50%;
      }
    }
  }
  .watermark-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    .text {
      pointer-events: none;
      width: 300px;
      height: 50px;
      line-height: 50px;
      font-size: 56px;
      transform: rotateZ(45deg);
      color: rgba(128, 128, 128, 0.3);
      text-align: center;
      position: absolute;
      left: calc(50% - 106px);
      top: 64%;
    }
  }
}
</style>
