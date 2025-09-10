<template>
  <div class="Login">
    <div class="Form-box">
      <h1>Login</h1>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/index';

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
  display: flex;
  justify-content: center;
  align-items: center;

  .Form-box {
    width: 400px;
    height: 500px;
    padding: 1rem;
    box-sizing: border-box;
    background-color: #2d3441;
    border-radius: 6px;

    display: flex;
    flex-direction: column;

    input {
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
</style>