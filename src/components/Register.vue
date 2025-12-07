<template>
  <div class="register-page">
    <div class="page-background"></div>
    
    <div class="page-content">
      <div class="register-container">
        <div class="left-section">
          <h1 class="main-title">Создайте учетную запись</h1>
          <div class="benefits">
            <p class="benefit-title">Преимущества наличия аккаунта:</p>
            <ul class="benefits-list">
              <li>Расширенный доступ к функциям сайта</li>
              <li>Просмотр разборов треков</li>
              <li>Загрузка MP3 и MP4</li>
              <li>Возможность добавления страниц треков в избранное</li>
              <li>Персональные рекомендации</li>
              <li>История прослушиваний</li>
            </ul>
          </div>
        </div>

        <div class="right-section">
          <div class="form-container">
            <h2 class="form-title">Регистрация</h2>
            
            <form @submit.prevent="handleSubmit">
              <div class="input-group">
                <div class="input-wrapper">
                  <label>Имя пользователя</label>
                  <div class="input-field" :class="{ 'error': errors.username }">
                    <input 
                      type="text" 
                      placeholder="Введите имя пользователя" 
                      v-model="form.username"
                      @input="validateField('username')"
                    >
                  </div>
                  <div v-if="errors.username" class="error-message">
                    {{ errors.username }}
                  </div>
                </div>
                
                <div class="input-wrapper">
                  <label>Email:</label>
                  <div class="input-field" :class="{ 'error': errors.email }">
                    <input 
                      type="email" 
                      placeholder="Введите ваш email" 
                      v-model="form.email"
                      @input="validateField('email')"
                    >
                  </div>
                  <div v-if="errors.email" class="error-message">
                    {{ errors.email }}
                  </div>
                </div>
                
                <div class="input-wrapper">
                  <label>Пароль:</label>
                  <div class="input-field" :class="{ 'error': errors.password }">
                    <input 
                      type="password" 
                      placeholder="Введите пароль" 
                      v-model="form.password"
                      @input="validateField('password')"
                    >
                  </div>
                  <div v-if="errors.password" class="error-message">
                    {{ errors.password }}
                  </div>
                </div>
                
                <div class="input-wrapper">
                  <label>Подтвердите пароль</label>
                  <div class="input-field" :class="{ 'error': errors.confirmPassword }">
                    <input 
                      type="password" 
                      placeholder="Повторите пароль" 
                      v-model="form.confirmPassword"
                      @input="validateField('confirmPassword')"
                    >
                  </div>
                  <div v-if="errors.confirmPassword" class="error-message">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
                
                <div class="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id="policy" 
                    v-model="form.acceptedPolicy"
                  >
                  <label for="policy" class="checkbox-label">
                    Я принимаю <a href="#" class="policy-link">Политику конфиденциальности</a>
                  </label>
                </div>
                <div v-if="errors.acceptedPolicy" class="error-message checkbox-error">
                  {{ errors.acceptedPolicy }}
                </div>
                
                <button 
                  type="submit" 
                  class="submit-btn" 
                  :disabled="!isFormValid || submitting"
                >
                  <span v-if="submitting">Регистрация...</span>
                  <span v-else>Зарегистрироваться</span>
                </button>
                
                <div class="login-link">
                  <p>Уже есть аккаунт? <a href="#" class="login-text">Войти</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedPolicy: false
      },
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedPolicy: ''
      },
      submitting: false
    }
  },
  computed: {
    isFormValid() {
      return Object.values(this.errors).every(error => !error) &&
             this.form.username &&
             this.form.email &&
             this.form.password &&
             this.form.confirmPassword &&
             this.form.acceptedPolicy
    }
  },
  methods: {
    validateField(field) {
      this.errors[field] = ''
      
      switch(field) {
        case 'username':
          if (!this.form.username.trim()) {
            this.errors.username = 'Введите имя пользователя'
          } else if (this.form.username.length < 3) {
            this.errors.username = 'Минимум 3 символа'
          } else if (this.form.username.length > 20) {
            this.errors.username = 'Максимум 20 символов'
          }
          break
          
        case 'email':
          if (!this.form.email.trim()) {
            this.errors.email = 'Введите email'
          } else if (!this.isValidEmail(this.form.email)) {
            this.errors.email = 'Некорректный email'
          }
          break
          
        case 'password':
          if (!this.form.password) {
            this.errors.password = 'Введите пароль'
          } else if (this.form.password.length < 6) {
            this.errors.password = 'Минимум 6 символов'
          }
          break
          
        case 'confirmPassword':
          if (!this.form.confirmPassword) {
            this.errors.confirmPassword = 'Подтвердите пароль'
          } else if (this.form.password !== this.form.confirmPassword) {
            this.errors.confirmPassword = 'Пароли не совпадают'
          }
          break
          
        case 'acceptedPolicy':
          if (!this.form.acceptedPolicy) {
            this.errors.acceptedPolicy = 'Необходимо принять условия'
          }
          break
      }
    },
    
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },
    
    validateAll() {
      Object.keys(this.form).forEach(field => {
        if (field !== 'acceptedPolicy') {
          this.validateField(field)
        }
      })
      
      if (!this.form.acceptedPolicy) {
        this.errors.acceptedPolicy = 'Необходимо принять условия'
      }
    },
    
    handleSubmit() {
      this.validateAll()
      
      if (this.isFormValid) {
        this.submitting = true
        
        setTimeout(() => {
          console.log('Форма отправлена:', this.form)
          alert('Регистрация прошла успешно! (демо)')
          this.submitting = false
          
          this.form = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptedPolicy: false
          }
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.page-background {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/background-img.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: 0;
}

.page-content {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  flex: 1;
}

.register-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  min-height: 700px;
  gap: 40px;
  margin: auto;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  color: white;
}

.main-title {
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 40px;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.benefits {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.benefit-title {
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.benefits-list {
  list-style: none;
  padding: 0px;
}

.benefits-list li {
  margin-bottom: 15px;
  font-size: 18px;
  padding-left: 25px;
  position: relative;
  color: rgba(255, 255, 255, 0.9);
}

.benefits-list li:before {
  content: "✓";
  position: absolute;
  left: 0px;
  color: #4CAF50;
  font-weight: bold;
}

.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-container {
  width: 100%;
  max-width: 450px;
}

.form-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-wrapper label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 15px;
  margin-left: 5px;
}

.input-field {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.1);
  padding: 5px 15px;
  transition: all 0.3s ease;
}

.input-field:hover {
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.6);
  transform: translateY(-2px);
}

.input-field.error {
  border-color: #ff6b6b;
  box-shadow: 0px 8px 32px rgba(255, 107, 107, 0.2);
}

.input-field input {
  width: 100%;
  padding: 14px 0px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  outline: none;
  opacity: 1;
}

.input-field input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.error-message {
  color: #ff6b6b;
  font-size: 13px;
  margin-top: 4px;
  margin-left: 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.checkbox-error {
  margin-top: -10px;
  margin-bottom: 10px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 15px 0px;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.9;
}

.checkbox-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  cursor: pointer;
}

.policy-link {
  color: #911616;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 600;
}

.policy-link:hover {
  color: #a04545;
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 18px;
  background: #911616;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 8px 32px rgba(117, 11, 11, 0.3);
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0px 12px 40px rgba(216, 69, 69, 0.4);
  background: #a82626;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #6e1212;
}

.login-link {
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.login-link p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
}

.login-text {
  color: #911616;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.login-text:hover {
  color: #a04545;
  text-decoration: underline;
}
</style>