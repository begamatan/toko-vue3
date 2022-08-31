<!-- <script setup>
  import { RouterLink } from 'vue-router'
</script> -->

<template>
  <div class="container">
    <div class="row">
      <div class="col mt-3">
        <h3>Latest Products</h3>
        <div class="row">
          <div class="col-3" v-for="product in latestProducts" :key="product.id">
            <div class="card" style="width: 18rem;">
              <img :src="product.get_image" class="card-img-top" :alt="product.title">
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <router-link :to="product.get_absolute_url">
                  <button class="btn btn-primary">
                    Detail
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import useStore from '@store/main'

  export default {
    // setup() {
    //   const store = useStore();
    //   return {store}
    // },
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