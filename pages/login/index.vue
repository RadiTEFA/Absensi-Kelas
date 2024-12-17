<template>
  <div class="bg satu">
    <div class="container-fluid">
      <div class="row dua">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-3">
          <div class="card bg-d">
            <div class="card-body">
              <h1 class="text-white text-center my-4 JudulLogin">Login</h1>
              <form @submit.prevent="login">
                <div class="form-group mb-5 mt-5">
                  <input v-model="email" class="form-control form-control-lg lima" type="email" placeholder="Masukkan email" />
                  <div class="eye-password">
                    <i class="bi bi-person-fill" aria-hidden="true" id="person-icon"></i>
                  </div>
                </div>
                <div class="form-group mb-5 password">
                  <input v-model="password" class="form-control form-control-lg lima" type="password" placeholder="Masukkan Password" id="password-input" />
                  <div class="eye-password">
                    <i class="bi bi-eye-fill" aria-hidden="true" id="eye-icon"></i>
                  </div>
                </div>
                <div class="d-grid gap-2 mb-5 tiga">
                  <button type="submit" class="btn btn-warning btn-lg text-white empat">Masuk</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

definePageMeta({
  layout: "login",
  middleware: "auth",
});

let supabase = useSupabaseClient();
let email = ref();
let password = ref();

async function login() {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (data) {
    console.log(data);
    navigateTo("/");
  }
  if (error) throw error;
}
let eye;

onMounted(() => {
  const input = document.querySelector("#password-input"); // pastikan input memiliki ID
  eye = document.querySelector("#eye-icon");

  eye.addEventListener("click", () => {
    input.type === "password" ? (input.type = "text") : (input.type = "password");
  });
});
</script>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background-color: #e5b844;
}

.card.bg-d {
  background-color: #5e5c5ce8;
}

.card {
  border-radius: 10px;
}

.img {
  display: flex;
}

.img-smk {
  opacity: calc(0.5);
  position: absolute;
  top: 0;
  left: 0;
}
.img-dkv {
  position: absolute;
  top: 0;
  right: 0;
}

.btn-warning {
  background-color: #e5b844 !important;
}

.form-control {
  background-color: #c0b9b9e2;
}

::placeholder {
  color: #fff;
}
.satu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dua {
  display: flex;
  justify-content: center;
  align-items: center;
}
.JudulLogin {
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: 50px;
  font-family: "Times New Roman", Times, serif;
}
.empat {
  font-size: 25px;
}
.lima {
  font-family: "Times New Roman", Times, serif;
}
input {
  color: white;
  outline: none;
}
input:focus {
  color: white;
  outline: none;
}
.btn {
  text-decoration: none;
  border: none;
  padding: 12px 40px;
  font-size: 16px;
  background-color: green;
  color: #fff;
  border-radius: 5px;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
}
.btn:active {
  transform: scale(0.98);
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
.form-group {
  position: relative;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}
.eye-password {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#eye-icon {
  font-size: 20px;
  color: #777;
  transition: 0.2s ease;
}

#person-icon {
  font-size: 20px;
  color: #777;
  transition: 0.2s ease;
}

#eye-icon:hover {
  cursor: pointer;
}
</style>
