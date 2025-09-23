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
        <input type="text" v-model="UserName" placeholder="用户名" @blur="validate('username')"
          :class="{ error: errors.username }">
        <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        <input type="password" v-model="Password" placeholder="密码" @blur="validate('password')"
          :class="{ error: errors.password }">
        <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        <button @click="LoginSubmit">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/index';
//
import ptnDialog from '@/components/Element-PTN/Dialog/index.vue'
const dialogVisible = ref(true);
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
    width: 350px;
    height: 450px;
    min-width: 350px;
    min-height: 450px;

    background-color: #2d3441;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      height: 60px;
      background-color: #424954;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-sizing: border-box;
    }

    .Form-box {
      padding: 1rem;
      box-sizing: border-box;

      input {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .error {
        border-color: red;
      }

      .error-message {
        color: red;
        font-size: 12px;
        margin-bottom: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
}
</style>