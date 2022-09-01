<!-- <script setup>
  import { RouterLink } from 'vue-router'
</script> -->

<template>
  <div class="container">
    <div class="row">
      <div class="col mt-3">
        <h3>Latest Products</h3>
        <div class="row">
          <div class="col-sm-3 mt-3 mt-sm-0" v-for="product in latestProducts" :key="product.id">
            <product-card :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ProductCard from '../components/ProductCard.vue'

  export default {
    components: {
      ProductCard
    },
    data() {
      return {
        latestProducts: []
      }
    },
    mounted() {
      this.getLatestProducts()
      document.title = 'Toko Buku'
    },
    methods: {
      getLatestProducts() {
        axios.get('/product/latest-products')
          .then(({data}) => {
            this.latestProducts = data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>