<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import axios from 'axios'
  import { useStore } from '@/store/main'

  const store = useStore()
  store.setCart()

  axios.interceptors.request.use(function (config) {
      // alert('request')
      store.setLoading(true)
      return config;
    }, function (error) {
      return Promise.reject(error);
  });

  axios.interceptors.response.use(function (config) {
    store.setLoading(false)
    // alert('response')
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
</script>

<template>
  <div id="wrapper" :class="{'overlay': store.isLoading}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          Toko Buku
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :class="{'active': $route.params.category_slug === 'novel'}" to="/novel">Novel</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{'active': $route.params.category_slug === 'manga'}" to="/manga">Manga</router-link>
            </li>
          </ul>
          <form class="d-flex" method="GET" action="/search">
            <input class="form-control me-2" type="search" placeholder="Search" name="q" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul class="navbar-nav ms-sm-auto mb-2 mb-lg-0 align-items-sm-end">
            <li class="nav-item">
              <router-link v-if="!store.isAuthenticated" to="/login" class="btn btn-primary">Masuk</router-link>
              <router-link v-else to="/my-order" class="btn btn-primary">Akun Saya</router-link>
            </li>
            <li class="nav-item ms-sm-2 me-sm-2">
              <router-link to="/cart" class="btn btn-success">Keranjang ({{ store.cartCount }})</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section>
      <div class="overlay__inner" v-if="store.isLoading">
        <div class="overlay__content"><span class="spinner"></span> </div>
      </div>
      <RouterView />
    </section>
  </div>
</template>

<style>
  .overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: white;
}

.overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.05);
    border-top-color: black;
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>