  <div class="container-fluid">
      <div class="row dua">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div class="card bg-d">
            <div class="card-body">
              <h1 class="text-white text-center my-4 JudulLogin">Login</h1>
              <form @submit.prevent="login">
                <div class="form-group mb-5 mt-5">
                  <input 
                    v-model="email" 
                    class="form-control form-control-lg lima" 
                    required autocomplete="off" 
                    type="email" name="email" 
                    id="email" />
                  <label class="label" for="email">Email</label>
                </div>
                <div class="form-group mb-5">
                  <input
                    v-model="password"
                    class="form-control form-control-lg lima"
                    type="password"
                    placeholder="Masukkan Password"
                  />
                </div>
                <div class="d-grid gap-2 mb-5 tiga">
                  <button
                    type="submit"
                    class="btn btn-warning btn-lg text-white empat"
                  >
                    Masuk
                  </button>
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
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");
  
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
.form-group {
  font-size: 1.25rem;
  position: relative;
  --primary: #2196f3;
}
.form-control {
  background-color: #c0b9b9e2;
  all: unset;
  color: #fefefe;
  padding: 1rem;
  border: 1px solid #9e9e9e;
  border-radius: 10px;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #d4d4d4;
  pointer-events: none;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.form-control:focus {
  border: 1px solid var(--primary);
}

.form-control:is(:focus, :valid) ~ label {
  transform: translateY(-120%) scale(0.7);
  background-color: #1a1a1a;
  padding-inline: 0.3rem;
  color: var(--primary);
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
</style>
