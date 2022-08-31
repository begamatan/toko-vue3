<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useStore } from '@/store/main'

const store = useStore()
store.setCart()
</script>

<template>
  <div id="wrapper">
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
      <RouterView />
    </section>
  </div>
</template>