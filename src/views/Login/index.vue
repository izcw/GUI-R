<template>
  <!-- <div @click="dialogVisible = true">dialogVisible</div> -->
  <!-- <ptn-dialog v-model="dialogVisible" title="HTML 1" width="400px" height="200px" :closable="true">
    <div>
      你好
    </div>
    <template #footer>
      <button @click="dialogVisible = false">取消</button>
      <button @click="dialogVisible = false">确定</button>
    </template>
</ptn-dialog> -->
  <!-- <ptn-dialog v-model="dialogVisible" width="400px" height="200px" center>
    Please enter TriggerName before selecting command.
  </ptn-dialog> -->

  <div class="Login">
    <div class="Login-box">
      <div class="title">
        <h1>LOGIN</h1>
      </div>
      <div class="Form-box">
        <div>
          <input type="text" class="username" v-model="UserName" placeholder="User Name" @blur="validate('username')"
            :class="{ error: errors.username }">
          <input type="password" class="password" v-model="Password" placeholder="Password" @blur="validate('password')"
            :class="{ error: errors.password }">
        </div>
        <button @click="LoginSubmit">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/index';
//
import ptnDialog from '@/components/Element-PTN/Dialog/index.vue'
const dialogVisible = ref(true); const color = ref('#409EFF')
//

const authStore = useAuthStore();

const UserName = ref<string>(''); // 用户名
const Password = ref<string>(''); // 密码
const errors = ref<any>({
  username: '',
  password: ''
});

// 验证规则
const rules: any = {
  username: {
    required: true,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: '用户名只能包含字母、数字和下划线'
  },
  password: {
    required: true,
    minLength: 6,
    message: '密码长度不能少于6位'
  }
};

// 验证函数
const validate = (field: string) => {
  const value = field === 'username' ? UserName.value : Password.value;
  const rule = rules[field];

  if (rule.required && !value) {
    errors.value[field] = `${field === 'username' ? '用户名' : '密码'}不能为空`;
  } else if (rule.pattern && !rule.pattern.test(value)) {
    errors.value[field] = rule.message;
  } else if (rule.minLength && value.length < rule.minLength) {
    errors.value[field] = rule.message;
  } else {
    errors.value[field] = '';
  }
};

// 登录提交
const LoginSubmit = () => {
  validate('username');
  validate('password');
  if (!errors.value.username && !errors.value.password) {
    let loginData = {
      role: 'user',
      username: UserName.value,
      password: Password.value
    };
    authStore.Login(loginData);
  } else {
    console.log('请检查输入信息');
  }
};
</script>

<style scoped lang="scss">
.Login {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
  overflow: auto;

  .Login-box {
    width: 420px;
    height: 500px;
    min-width: 420px;
    min-height: 500px;
    background-color: #2d3441;
    border-radius: 6px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      height: 100px;
      min-height: 100px;
      background-color: #424954;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .Form-box {
      width: 300px;
      height: 100%;
      padding: 60px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      input {
        width: 100%;
        margin-bottom: 2rem;
        padding: 12px 12px 12px 40px;
        border: none;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-position: 8px center;
        background-size: 24px;

        &.username {
          background-image: url('@/assets/icon/common/user.png');
        }

        &.password {
          background-image: url('@/assets/icon/common/lock.png');
        }
      }

      button {
        width: 100%;
        border: none;
        padding: 10px;
      }


    }
  }
}
</style>