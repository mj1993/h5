<!-- 
// 示例
<submit-button :text="'芝麻信用查询'"  :width="2.6" :height=".44"/>
【text】 ： 按钮内的文字
【width】和【height】 ： 按钮的高度，宽度(传入的是数字，显示单位是rem)

Tip:本组件自动水平居中，所占空间高度为height的长度
// -->

<template>
<div style="display: flex;flex-direction:column;align-items:center;">
  <div :class="['button',reverse ? 'button_reverse' :'' , disabled ? 'button_disabled' : '' , !reverse && !disabled ? 'button_active' : '']" :style="{ width: width + 'rem',height : height + 'rem' }">
    <div style="margin:auto" v-if="subText">
      <div :class="[ reverse ? 'button_sm_text_reverse' : 'button_sm_text' ]" style="font-size:.16rem;text-align:center" :style="{fontWeight: isBold ? 'bold' : 'normal' }">{{ text }}</div>
      <!-- <div :class="[ reverse ? 'button_sm_text_reverse' : 'button_sm_text' ]" style="font-size:.16rem;text-align:center;font-weight:bold">{{ text }}</div> -->
      <div :class="[ reverse ? 'button_sm_text_reverse' : 'button_sm_text' ]" style="font-size:.11rem;text-align:center">{{ subText }}</div>
    </div>
    <div :class="[ reverse ? 'button_text_reverse' : 'button_text' ]" style="text-align:center" v-else>{{ text }}</div>    
  </div>
</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "支付"
    },
    width: {
      type: Number,
      default: 1.3
    },
    height: {
      type: Number,
      default: 0.44
    },
    reverse: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    subText: {
      type: String,
      default: ""
    },
    isBold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleObject: {
        width: this.width,
        height: this.height
      }
    };
  }
};
</script>

<style scoped>
.button {
  display: flex;
  flex-direction: column;
  width: 1.3rem;
  height: 0.44rem;
  /* margin-top: 0.47rem;
  margin-left: 1.23rem; */
  margin: auto;
}

.button_text {
  font-family: PingFangSC-Regular;
  font-size: 0.18rem;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 0.18rem;

  margin: auto;
}

.button_sm_text {
  font-family: PingFangSC-Regular;
  color: #ffffff;
  letter-spacing: 0;
}

.button_sm_text_reverse {
  font-family: PingFangSC-Regular;
  color: #296cff;
  letter-spacing: 0;
}

.button_text_reverse {
  font-family: PingFangSC-Regular;
  font-size: 0.18rem;
  color: #296cff;
  letter-spacing: 0;
  line-height: 0.18rem;

  margin: auto;
}

.button_active {
  background: #296cff;
  box-shadow: 0 0 0.06rem 0 rgba(41, 108, 255, 0.45);
  border-radius: 0.24rem 0.24rem 0.24rem 0.24rem;
}

.button_reverse {
  background: #fff;
  border-radius: 0.24rem 0.24rem 0.24rem 0.24rem;
  border: 0.01rem solid #296cff;
}

.button_disabled {
  background: #d8d8d8;
  border-radius: 0.24rem 0.24rem 0.24rem 0.24rem;
}
</style>
