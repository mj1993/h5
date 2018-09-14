<!--
  移动端dialog
  props:
    type: 弹窗类型 alert 单确定按钮 用于信息确认   confirm 确定/取消 用于确认执行回调
    isVisible: 用于控制dialog显示/隐藏
    title: 提示语
    content: 提示说明
    confirmText/cancelText: 确认/取消文案
  event:
    enterAction: 点击确认触发父组件enterAction函数
    完整示例：
    <dialog type="confirm" title="消息提示" content="消息详细说明" confirmText="确定吗" cancelText="取消吗" @enterAction="method" @close="method"></dialog>
-->
<template>
  <div class="incar-dialog" v-if="isVisible">
    <div class="incar-dg-cover"></div>
    <div class="incar-dg-body">
      <div class="transition" :class="{'incar-dialog-show': isVisible}">
        <div class="incar-dg-icon">
          <img :src="warningIcon">
        </div>
        <div class="incar-dg-title" v-if="title">{{ title }}</div>
        <div class="incar-dg-content" v-if="content.length > 0">
          <p v-if="isCenter" v-html="content" class="align-center"></p>
          <p v-else class="normal">{{ content }}</p>
        </div>
      </div>
      <div class="incar-dg-btns" v-if="type === 'alert'">
        <span class="incar-alert-btn" @click="close">{{ confirmText }}</span>
      </div>
      <div class="incar-dg-btns" v-else>
        <span class="incar-confirm-btn" @click="enterAction">{{ confirmText }}</span>
        <span class="incar-cancel-btn" @click="close">{{ cancelText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import warningIcon from '@/assets/images/warning-icon.png'
  export default {
    props: {
      type: {
        type: String,
        default: 'confirm'
      },
      isVisible: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      isCenter: {
        type: Boolean,
        default: false
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      }
    },
    data () {
      return {
        warningIcon: warningIcon
      }
    },
    methods: {
      enterAction () {
        this.$emit('enterAction')
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
  .incar-dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    // background-color: transparent;
    background-color: rgba(0, 0, 0, .65);
    .incar-dg-body {
      border: 1px solid #ddd;
      border-radius:.08rem;
      width: 3rem;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .incar-dg-icon {
        width: .68rem;
        height: .68rem;
        margin: .37rem 1.16rem .2rem;
        overflow: hidden;
        & > img {
          width: 100%;
        }
      }

      .incar-dg-title {
        padding: .1rem .12rem;
        text-align: center;
        /*white-space: nowrap;*/
        font-size: .16rem;
        color: #0E193A;
      }

      .incar-dg-content {
        width: 2.84rem;
        margin: 0 auto;
        padding: .1rem .12rem;
        text-align: center;
        & > p {
          color: #0E193A;
          font-size: .14rem;
        }
        .normal {
          width: auto;
          display: inline-block;
          text-align: left;
        }
        .align-center {
          text-align: center;
        }
      }

      .incar-dg-btns {
        height: .42rem;
        margin-top: .24rem;
        border-top: 1px solid #ebebeb;
        box-sizing: border-box;

        & span {
          display: inline;
          width: 50%;
          line-height: .42rem;
          font-size: .14rem;
          color: #666;
          text-align: center;
          float: left;
          box-sizing: border-box;

          &:first-child {
            border-right: 1px solid #ebebeb;
          }
        }

        .incar-alert-btn {
          width: 100%;
          border-right: none;
        }
      }
    }
  }
  .incar-dialog-show {
    animation: dialog-zoom .4s;
  }
  @keyframes dialog-zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
