<!-- <script setup>
  import { RouterLink } from 'vue-router'
</script> -->

<template>
    <div class="container">
      <div class="row">
        <div class="col mt-3">
          <h3>{{ category.title }}</h3>
          <div class="row">
            <div class="col-sm-3" v-for="product in category.products" :key="product.id">
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
          category: {
            products: []
          }
        }
      },
      mounted() {
        this.getCategory()
      },
      watch: {
        $route(to, from) {
          if (to.name === 'category_detail') {
            this.getCategory()
          }
        }
      },
      methods: {
        getCategory() {
          const categorySlug = this.$route.params.category_slug
          axios.get(`/product/${categorySlug}`)
            .then(({data}) => {
              this.category = data
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  </script>