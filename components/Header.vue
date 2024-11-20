<template>
      <nav class="navbar header fixed-top" id="myHeader" style="background-color: #E5B844; height: 10vh;">
            <div class="container-fluid dua">
               <div class="d-flex mb-3"></div>
               <div type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                  <div class="offcanvas-header">
                     <div data-bs-dismiss="offcanvas">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                           <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                     </div>
                  </div>
               </div>
               <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                  <div class="offcanvas-header satu">
                     <div data-bs-dismiss="offcanvas">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list Menu" viewBox="0 0 16 16">
                           <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                     </div>
                     <div class="Text-Menu ps-5" >
                        <p><b>Menu</b></p>
                     </div>
                     <hr>
                  </div>
                  <hr>
                  <div class="offcanvas-body">
                     <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item ps-3">
                           <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item ps-3">
                           <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item ps-3">
                           <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                     </ul>
                  </div>
               </div>
               <div class="p-2"><strong class="tiga">ABSENSI KELAS</strong></div>
               <div class="ms-auto p-2"><img :src="fotoProfil" width="50px" height="50px"></div>
            </div>
         </nav>
</template>


<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const fotoProfil = ref('')

const getFotoProfil = async () => {
   const { data, error } = await supabase.from('siswa').select('FotoProfil').eq('uid', user.value.id).single()
   if (error) throw error
   if (data) fotoProfil.value = data.FotoProfil
}

onMounted(() => {
   getFotoProfil()
})
</script>

<style scoped>
.Menu{
   margin-top: 25%;
   margin-right: 80%;
   padding-bottom: 1%;
}
.Text-Menu{
   display: flex;
   text-align: center;
   justify-content: center;
   align-items: center;
   margin-top: 20%;
   margin-bottom: 11%;
   margin-right: 25%;
   font-size: 30%;
}
.dua{
   font-size: 30px;
}
.tiga{
   padding-left: 10px;
   font-family: 'Montserrat', sans-serif;
}
.empat{
   padding-right: 10px;
}
img{
   border-radius: 25px;
}
</style>