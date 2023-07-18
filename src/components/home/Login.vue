<template>
  <a-modal v-model:visible="store.showLoginModal" :footer="null" width="600px" centered :closable="false"
    :bodyStyle="{ 'padding': '0', 'border-radius': '16px' }">
    <div :class="'owl' + state.owlStyle" id="owl">
      <div class="hand"></div>
      <div class="hand hand-r"></div>
      <div class="arms">
        <div class="arm"></div>
        <div class="arm arm-r"></div>
      </div>
    </div>
    <div class="form-container">
      <div class="pic-left">
      </div>
      <div class="form-right">
        <div class="form-header">
          <h3>{{ state.currentTabIndex == 1 ? '🥤登录🍔' : state.currentTabIndex == 2 ? '🍺注册🦞' : '☕重置密码🍩' }}</h3>
        </div>
        <div class="form-body">
          <a-form name="custom-validation" :model="state.formState" :rules="rules" @finish="" autocomplete="off"
            ref="formRef">
            <a-form-item name="username" :colon="false">
              <a-auto-complete v-model:value="state.formState.username" :options="state.options" placeholder="请输入邮箱"
                @search="onSearch" :bordered="false" allowClear />
            </a-form-item>
            <a-form-item name="validcode" :colon="false" v-if="state.currentTabIndex != 1">
              <div class="flex-sb">
                <a-input :bordered="false" v-model:value="state.formState.validcode" placeholder="请输入验证码" />
                <a-button type="primary" @click="sendCode(state.formState.username, state.currentTabIndex)" :disabled="state.sendFlag">
                  {{ state.sendBtnText }}</a-button>
              </div>
            </a-form-item>
            <a-form-item :bordered="false" name="password" :colon="false">
              <a-input-password v-model:value="state.formState.password" autocomplete="off" placeholder="请输入密码"
                :bordered="false" @focus="showOwl" @blur="hideOwl" />
            </a-form-item>
            <a-form-item style="text-align: center">
              <a-button type="primary" html-type="submit" style="width: 100%" @click="submit">
                {{ state.currentTabIndex == 1 ? '登陆' : '确认' }}
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="form-footer">
          <div v-if="state.currentTabIndex == 1">
            <div class="forget-register">
              <a @click="switchTab(3)">忘记密码?</a>
              <a @click="switchTab(2)">立即注册</a>
            </div>
          </div>
          <div style="text-align: center" v-else>
            <a @click="switchTab(1)">已有账号?点击登录</a>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang='ts' setup>
import { useStore } from "@/stores"
import { reactive, ref } from "vue";
import { successTips, errTips } from "@/utils";
import { checkEmail } from "@/utils";
import request from "@/api/request";

const store = useStore();
const state = reactive({
  owlStyle: "",
  currentTabIndex: 1, // 1 登录 2 注册 3 找回密码
  formState: {
    username: "",
    password: "",
    validcode: "",
  },
  options: [] as any,
  sendBtnText: '获取验证码',
  sendFlag: false,
  timeCount: 60,
})

// 提交按钮
const submit = ()=>{
  // 登录逻辑
  if(state.currentTabIndex == 1){
    request({
      method:"POST",
      url: "/user/login",
      params: {
        email: state.formState.username,
        password: state.formState.password
      }
    }).then((resp)=>{
      if(resp.data == 1){
        successTips("登录成功！");
        getUserInfo(state.formState.username);
        store.showLoginBox(false);
      }
      else if(resp.data == 2){
        errTips("用户密码错误!");
      }
      else if(resp.data == 3){
        errTips("该邮箱尚未注册!");
      }
    }).catch((err)=>{
      errTips("未知错误!")
    })
  }
  // 注册逻辑
  else if(state.currentTabIndex == 2){
    request({
      method: "POST",
      url: "/user/register",
      params: {
        email: state.formState.username,
        password: state.formState.password,
        code: state.formState.validcode
      }
    }).then((resp)=>{
      if(resp.data == 1){
        successTips("注册成功!");
        getUserInfo(state.formState.username);
        store.showLoginBox(false);
      }      
      else if(resp.data == -1){
        errTips("该邮箱已被注册！");
      }
      else if(resp.data == -2){
        errTips("验证码错误！");
      }
    }).then((err)=>{
      errTips("未知错误");
    })
  }
  // 忘记密码逻辑
  else if(state.currentTabIndex == 3){
    request({
      method: "POST",
      url: "/user/modifyPassword",
      params: {
        email: state.formState.username,
        newPassword: state.formState.password,
        code: state.formState.validcode
      }
    }).then((resp)=>{
      if(resp.data == 1){
        successTips("密码修改成功!");
        state.currentTabIndex = 1;
      }
      else if(resp.data == -1){
        errTips("验证码错误！");
      }
    }).catch((err)=>{
      errTips("未知错误")
    })
  }
}

// 登录成功后加载用户信息
const getUserInfo = (email:string)=>{
  request({
    method:"GET",
    url:"/user/getUserInfo",
    params:{email:email}
  }).then((resp)=>{
    store.setUserInfo(resp.data.id, resp.data.name, resp.data.email, resp.data.avatar);
  })
}

// 向后端服务器发送验证码 model: 2时为注册请求， model： 3时为找回密码请求
const sendCode = (email: string, model: number) => {
  if (checkEmail(email)) {
    countDown(60);
    request({
      method: "GET",
      url: "/code/getCode",
      params: {
        email: email,
        model: model,
      }
    }).then((resp) => {
      if (resp.data == 1) {
        successTips("验证码发送成功");
      }
      else if(resp.data == -3){
        errTips("邮箱尚未注册");
      }
      else if(resp.data == -2){
        errTips("该邮箱已被注册");
      }
    }).catch((err) => {
      errTips("验证码发送失败");
    })
  }
  else {
    errTips("邮箱格式错误,请检查后再次尝试!")
  }

}
//验证码倒计时
const countDown = (time : number) => {
  state.sendFlag = true;
  let timer = setInterval(() => {
    state.timeCount--;
    state.sendBtnText = state.timeCount + "s";
    if (state.timeCount <= 0) {
      clearInterval(timer);
      state.sendBtnText = "发送";
      state.timeCount = time;
      state.sendFlag = false;
    }
  }, 1000);
};
//验证码规则
let validateCode = async (_rule: any, value: any) => {
  if (value === "") {
    return Promise.reject("验证码不能为空");
  }

  if (value.length != 6) {
    return Promise.reject("验证码的长度为6");
  } else {
    return Promise.resolve();
  }
};
const mockVal = (str: string, suffix: string) => {
  return {
    value: str + suffix
  };
};
const onSearch = (searchText: any) => {
  state.options = !searchText ? [] :
    [mockVal(searchText, "@qq.com"), mockVal(searchText, "@163.com"), mockVal(searchText, "@sina.com"),
    mockVal(searchText, "@foxmail.com"), mockVal(searchText, "@gmail.com"), mockVal(searchText, "@126.com")];
};
//邮箱验证规则
let validateUsername = async (_rule: any, value: any) => {
  if (value === "") {
    return Promise.reject("邮箱不能为空");
  }
  if (!checkEmail(value)) {
    return Promise.reject("请输入正确格式的邮箱");
  } else {
    return Promise.resolve();
  }
};
//密码验证规则
let validatePassword = async (_rule: any, value: any) => {
  if (value === "") {
    return Promise.reject("密码不能为空");
  }
  if (value.length < 6 || value.length > 16) {
    return Promise.reject("密码的长度必须在6-16位之间");
  } else {
    return Promise.resolve();
  }
};
// 表单验证规则
const rules = {
  username: [
    {
      validator: validateUsername,
      //trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatePassword,
      trigger: "change",
    },
  ],
  validcode: [
    {
      validator: validateCode,
      trigger: "change",
    },
  ],
};
const switchTab = (key: number) => {
  state.currentTabIndex = key
  //清空表单
  resetForm();
};
const formRef = ref();
const resetForm = () => {
  formRef.value.resetFields();
};
// 猫头鹰样式
const showOwl = () => {
  state.owlStyle = ' password'
}
const hideOwl = () => {
  state.owlStyle = ''
}
</script>

<style lang="less" scoped>
/* 接下来是猫头鹰的样式 */
.owl {
  width: 211px;
  height: 108px;
  /* 背景图片 */
  background: url("/images/OwlStyle.png") no-repeat;
  /* 绝对定位 */
  position: absolute;
  top: -100px;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.owl .hand {
  width: 34px;
  height: 34px;
  border-radius: 40px;
  background-color: #472d20;
  /* 绝对定位 */
  position: absolute;
  left: 12px;
  bottom: -8px;
  /* 沿Y轴缩放0.6倍（压扁） */
  transform: scaleY(0.6);
  /* 动画过渡 */
  transition: 0.3s ease-out;
}

.owl .hand.hand-r {
  left: 170px;
}

.owl.password .hand {
  transform: translateX(42px) translateY(-15px) scale(0.7);
}

.owl.password .hand.hand-r {
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}

.owl .arms {
  position: absolute;
  top: 58px;
  width: 100%;
  height: 41px;
  overflow: hidden;
}

.owl .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background: url("/images/owlHand.png") no-repeat;
  transform: rotate(-20deg);
  transition: 0.3s ease-out;
}

.owl .arms .arm.arm-r {
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}

.owl.password .arms .arm {
  transform: translateY(-40px) translateX(40px);
}

.owl.password .arms .arm.arm-r {
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}

.form-container {
  display: flex;

  .pic-left {
    z-index: 1;
    position: relative;
    width: 250px;
    height: 400px;
    overflow: hidden;
    background: url("/images/anya.jpg") center no-repeat;
    background-size: cover;
  }

  .form-right {
    width: 350px;
    padding: 16px;

    .form-header {
      color: #303133;
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 24px;
      text-align: center;
    }

    .form-footer {

      display: flex;
      flex-direction: column;

      .forget-register {
        display: flex;
        justify-content: space-between;
      }

      .social-login {
        display: flex;
        justify-content: space-between;
        margin: 0 96px;
      }

      .test-account {
        text-align: center;
        margin-top: 12px;
      }
    }
  }

}
</style>
