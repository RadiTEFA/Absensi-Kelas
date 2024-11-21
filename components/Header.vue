<template>
      <nav class="navbar header fixed-top" id="myHeader" style="background-color: #E5B844; height: 10vh;">
            <div class="container-fluid dua">
               <div type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                  <i style="font-size: 40px" class="bi bi-list"></i>
               </div>
               <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
               <div class="offcanvas-header">
                  <div type="butoon" style="height: 70px" data-bs-dismiss="offcanvas" aria-label="Menu">
                     <i style="font-size: 40px" class="bi bi-list ps-3"></i>
                  </div>
                  <div class="Text-Menu offcanvas-title" id="staticBackdropLabel">
                     <p><b>Menu</b></p>
                  </div>
               </div>
               <div class="offcanvas-body">
                  <div class="isimenu">
                     <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item ps-3">
                           <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item ps-3">
                           <a class="nav-link active" aria-current="page" href="#">Riwayat</a>
                        </li>
                        <li class="nav-item ps-3">
                           <a class="nav-link active" aria-current="page" href="#">Profile</a>
                        </li>
                     </ul>
                  </div>
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
   padding-right: 40%;
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
.isimenu li a{
   font-size: 20px;
}
</style>
