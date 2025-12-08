<template>
  <div class="product-page">
    <button @click="$router.back()" class="back-button">← Назад к каталогу</button>

    <div v-if="product" class="product-detail">
      <div class="product-image">
        <img :src="product.image_url" :alt="product.name" class="product-img">
      </div>
      
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        
        
        <div v-if="product.description" class="description-section">
         
          <p class="description">{{ product.description }}</p>
        </div>
        
        <button 
          v-if="product.purchase_url" 
          @click="goToPurchase" 
          class="buy-button"
        >
          Купить на официальном сайте
        </button>
        
        <div v-else class="archive-notice">
          <p class="archive-text">для ознакомления</p>
        </div>
      </div>
    </div>

    <div v-if="loading">Загрузка товара...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

export default {
  name: 'Product',
  setup() {
    const product = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const route = useRoute()

     console.log('ProductPage mounted')
    console.log('Route params:', route.params)
    console.log('Product ID:', route.params.id)

    const fetchProduct = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .eq('id', route.params.id)
          .single()

        if (supabaseError) throw supabaseError
        product.value = data
      } catch (err) {
        error.value = 'Товар не найден'
      } finally {
        loading.value = false
      }
    }

    const goToPurchase = () => {
      if (product.value?.purchase_url) {
        window.open(product.value.purchase_url, '_blank')
      }
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      product,
      loading,
      error,
      goToPurchase
    }
  }
}
</script>

<style scoped>
.description-section {
  margin-bottom: 20px;
}


.description { 
  line-height: 1.6;
  color: #727272;
  white-space: pre-line;
}

.product-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  font-family: "Zen_Kaku_Gothic_New";
  color: #646464;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px 0;
  transition: transform 0.3s ease;
}

.back-button:hover {
  color: #333;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;
}

.product-image {
  width: 100%;
}

.product-img { 
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  object-fit: cover; 
}

.product-info {
    padding: 40px;
    border-radius: 16px;
    background: linear-gradient(
    to bottom, 
    rgba(42, 42, 42, 0.4) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
}

.product-info h1 {
  font-size: 26px;
  color: #ffffff;
  margin-bottom: 15px;
  font-family: "Zen_Kaku_Gothic_New";
  font-weight: 300;
}

.buy-button { 
  background: #000000;
  color: white;
  font-family: "Zen_Kaku_Gothic_New";
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;
}

.buy-button:hover {
  background: #1a1a1a;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

.archive-notice {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.archive-text {
  color: #b0b0b0;
  font-family: "Zen_Kaku_Gothic_New";
  font-size: 18px;
  font-style: italic;
  margin: 0;
}
</style>