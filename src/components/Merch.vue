<template>
  <div class="merch-page">
    <h2>Мерч</h2>
    
    <div class="catalog">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="product-card"
        @click="goToProduct(product.id)"
      >
        <div class="product-image">
          <img 
            :src="product.image_url" 
            :alt="product.name"
            @error="handleImageError"
          />
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <!-- ИСПРАВЛЕНО: Убрано описание из каталога -->
        </div>
      </div>
    </div>

    <div v-if="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

export default {
  name: 'Merch',
  setup() {
    const products = ref([])
    const loading = ref(true)
    const error = ref(null)
    const router = useRouter()

    const fetchProducts = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('id')

        if (supabaseError) throw supabaseError
        products.value = data
      } catch (err) {
        error.value = 'Ошибка загрузки товаров'
      } finally {
        loading.value = false
      }
    }

    const goToProduct = (productId) => {
      router.push(`/product/${productId}`)
    }

    const handleImageError = (event) => {
      event.target.src = '/placeholder.jpg'
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      loading,
      error,
      goToProduct,
      handleImageError
    }
  }
}
</script>

<style scoped>
.merch-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.merch-page h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 40px;
  font-family: "Zen_Kaku_Gothic_New";
}

.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.product-card {
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-3px);
}

.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #333;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .catalog {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .merch-page {
    padding: 15px;
  }
}
</style>