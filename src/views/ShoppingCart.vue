<template>
  <div class="shoppingcart">
    <HeaderCart />

    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/">
                <i class="fa fa-home"></i> Home
              </router-link>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th class="p-name text-center">Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="cart.length">
                      <tr v-for="item in cart" :key="item.id">
                        <td class="cart-pic first-row">
                          <img :src="item.photo" />
                        </td>
                        <td class="cart-title first-row text-center">
                          <h5>{{ item.name }}</h5>
                        </td>
                        <td class="p-price first-row">${{ item.price }}</td>
                        <td class="delete-item">
                          <a href="#" @click="removeCartItem(item.id)">
                            <i class="material-icons">close</i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4">Your cart is empty.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8">
                <h4 class="mb-4">Informasi Pembeli:</h4>
                <div class="user-checkout">
                  <form>
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
                      <input
                        type="text"
                        class="form-control"
                        id="namaLengkap"
                        aria-describedby="namaHelp"
                        placeholder="Masukan Nama"
                        autocomplete="0"
                        v-model="pembeli.nama"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                        autocomplete="0"
                        v-model="pembeli.email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
                      <input
                        type="text"
                        class="form-control"
                        id="noHP"
                        aria-describedby="noHPHelp"
                        placeholder="Masukan No. HP"
                        autocomplete="0"
                        v-model="pembeli.hp"
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                        placeholder="Ketikkan alamat anda"
                        v-model="pembeli.alamat"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout">
                  <ul>
                    <li class="subtotal">
                      Subtotal
                      <span>${{ subtotal }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Pajak
                      <span>${{ pajak }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Total Biaya
                      <span>${{ total }}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer
                      <span>Mandiri</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening (sample)
                      <span>888 333 1991</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima
                      <span>Muhammad Arnaldo</span>
                    </li>
                  </ul>
                  <a href="#" @click="paid()" class="proceed-btn">I ALREADY PAID</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->

    <Footer />
  </div>
</template>

<script>
import HeaderCart from "@/components/HeaderCart.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "ShoppingCart",
  components: {
    HeaderCart,
    Footer
  },
  data() {
    return {
      cart: [],
      pembeli: {
        nama: "",
        email: "",
        hp: "",
        alamat: ""
      }
    };
  },
  methods: {
    removeCartItem(idP) {
      let isi = this.cart.map(isi => isi.id);
      let index = isi.findIndex(id => id === idP);
      this.cart.splice(index, 1);
      this.saveCart();
    },
    saveCart() {
      const parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
    },
    paid() {
      let productIds = this.cart.map(item => {
        return item.id;
      });

      let checkoutData = {
        name: this.pembeli.nama,
        email: this.pembeli.email,
        number: this.pembeli.hp,
        address: this.pembeli.alamat,
        transaction_total: this.total,
        transaction_status: "PENDING",
        transaction_details: productIds
      };

      axios
        .post(this.$api_url + "checkout", checkoutData)
        .then(() => {
          this.$router.push("success");
        })
        .catch(err => {
          console.log(err);
          //sementara api error redirect dummy ke success
          this.$router.push("success");
        });
    }
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  computed: {
    subtotal: function() {
      return this.cart.reduce(function(acc, arr) {
        return acc + arr.price;
      }, 0);
    },
    pajak: function() {
      return this.subtotal * 0.01;
    },
    total: function() {
      return this.subtotal + this.pajak;
    }
  }
};
</script>
