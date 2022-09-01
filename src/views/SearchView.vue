<!-- <script setup>
  import { RouterLink } from 'vue-router'
</script> -->

<template>
    <div class="container">
      <div class="row">
        <div class="col mt-3">
          <p>Search result for keyword <strong>{{ q }}</strong> (Total: {{ products.length }})</p>
          <div class="row">
            <div class="col-sm-3 mt-3 mt-sm-0" v-for="product in products" :key="product.id">
              <product-card :product="product"></product-card>
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
          products: [],
          q: ''
        }
      },
      mounted() {
        this.q = this.$route.query.q
        this.search()
      },
      methods: {
        search() {
          axios.get(`/product/list?search=${this.q}`)
            .then(({data}) => {
              this.products = data
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  </script>