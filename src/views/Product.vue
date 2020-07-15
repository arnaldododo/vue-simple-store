<template>
  <div class="product">
    <Header />

    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section" id="top">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/">
                <i class="fa fa-home"></i> Home
              </router-link>
              <span>Detail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="mainImg" />
                </div>
                <div class="product-thumbs" v-if="details.galleries.length > 1">
                  <Carousel
                    class="product-thumbs-track"
                    :dots="false"
                    :items="3"
                    :nav="false"
                    :autoplay="true"
                  >
                    <div
                      v-for="thumbs in details.galleries"
                      :key="thumbs.id"
                      class="pt"
                      @click="changeImage(thumbs.photo)"
                      :class="mainImg == thumbs.photo ? 'active' : ''"
                    >
                      <img class="thumb" :src="thumbs.photo" />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details">
                  <div class="pd-title">
                    <span>{{ details.type }}</span>
                    <h3>{{ details.name }}</h3>
                  </div>
                  <div class="pd-desc">
                    <p v-html="details.description"></p>

                    <h4>${{ details.price }}</h4>
                  </div>
                  <div class="quantity">
                    <a
                      @click="addToCart(details.id, details.name, details.price, details.galleries.find(gallery => gallery.is_default === 1).photo)"
                      href="#"
                      class="primary-btn pd-cart"
                    >Add To Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->

    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Other products</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Banner Section Begin -->
    <section class="women-banner spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mt-5" v-if="products.length">
            <carousel class="product-slider" :items="3" :nav="false" :autoplay="true">
              <div class="product-item" v-for="item in products" :key="item.id">
                <div class="pi-pic">
                  <img :src="item.galleries.find(gallery => gallery.is_default === 1).photo" alt />
                  <ul>
                    <li class="w-icon active">
                      <a href="#">
                        <i class="icon_bag_alt"></i>
                      </a>
                    </li>
                    <li class="quick-view">
                      <a href="#top" @click="getTheProduct(item.id)">+ View Item</a>
                    </li>
                  </ul>
                </div>
                <div class="pi-text">
                  <div class="catagory-name">{{ item.type }}</div>
                  <a href="#top" @click="getTheProduct(item.id)">
                    <h5>{{ item.name }}</h5>
                  </a>
                  <div class="product-price">${{ item.price }}</div>
                </div>
              </div>
            </carousel>
          </div>
          <div class="col-lg-12" v-else>
            <p>Data produk belum tersedia untuk saat ini.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Banner Section End -->

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "product",
  components: {
    Header,
    Footer,
    Carousel
  },
  data() {
    return {
      details: [],
      mainImg: "",
      products: [],
      cart: []
    };
  },
  methods: {
    getTheProduct(idnya = this.$route.params.id) {
      axios
        .get(this.$api_url + "products", {
          params: {
            id: idnya
          }
        })
        .then(res => {
          const galleries = res.data.data.galleries;
          this.details = res.data.data;
          this.mainImg = galleries.find(
            gallery => gallery.is_default === 1
          ).photo;
        });
    },
    changeImage(img) {
      this.mainImg = img;
    },
    addToCart(id, name, price, photo) {
      let product = {
        id,
        name,
        price,
        photo
      };
      this.cart.push(product);
      const parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      window.location.reload();
    }
  },
  mounted() {
    this.getTheProduct();

    axios
      .get(this.$api_url + "products")
      .then(res => (this.products = res.data.data.data));

    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  }
};
</script>