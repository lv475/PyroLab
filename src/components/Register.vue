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
            
            <div class="input-group">
              <div class="input-wrapper">
                <label>Имя пользователя</label>
                <div class="input-field">
                  <input type="text" placeholder="Введите имя пользователя" disabled>
                </div>
              </div>
              
              <div class="input-wrapper">
                <label>Email:</label>
                <div class="input-field">
                  <input type="email" placeholder="Введите ваш email" disabled>
                </div>
              </div>
              
              <div class="input-wrapper">
                <label>Пароль:</label>
                <div class="input-field">
                  <input type="password" placeholder="Введите пароль" disabled>
                </div>
              </div>
              
              <div class="input-wrapper">
                <label>Подтвердите пароль</label>
                <div class="input-field">
                  <input type="password" placeholder="Повторите пароль" disabled>
                </div>
              </div>
              
              <div class="checkbox-wrapper">
                <input type="checkbox" id="policy">
                <label for="policy" class="checkbox-label">
                  Я принимаю <a href="#" class="policy-link">Политику конфиденциальности</a>
                </label>
              </div>
              
              <button class="submit-btn" disabled>
                Зарегистрироваться
              </button>
              
              <div class="login-link">
                <p>Уже есть аккаунт? <a href="#" class="login-text">Войти</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage'
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
  gap: 8px;
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
  color: #ffffff;
}

.input-field input:disabled {
  cursor: not-allowed;
  color: #666;
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
  opacity: 0.7;
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
  cursor: not-allowed;
  opacity: 0.7;
  transition: all 0.3s ease;
  box-shadow: 0px 8px 32px rgba(117, 11, 11, 0.3);
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0px 12px 40px rgba(216, 69, 69, 0.4);
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