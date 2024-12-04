<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="text-center Riwayat">RIWAYAT KEHADIRAN</h2>
        <div class="my-3">
          <form @submit.prevent="getCari">
            <div class="input-icon">
              <input v-model="keyword" type="search" class="form-control rounded-5 bgi" placeholder="Search...">
              <i class="bi bi-search"></i>
            </div>
          </form>
        </div>
        <div class="text-muted JudulMR">Menampilkan {{ kehadiran.length }} dari {{ totalKehadiran }}</div>
        <div class="Table1">
          <table class="table">
            <thead>
              <tr>
                <td>ID</td>
                <td>NAMA</td>
                <td>JENIS KELAMIN</td>
                <td>KELAS</td>
                <td>TANGGAL</td>
                <td>KETERANGAN</td>
                <td>FOTO</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(attendance,i) in kehadiran" :key="i">
                <td>{{ i+1 }}.</td>
                <td>{{ attendance.siswa.nama }}</td>
                <td>{{ attendance.siswa.jk }}</td>
                <td>{{ attendance.siswa.kelas }}</td>
                <td>{{ attendance.tanggal }}</td>
                <td>{{ attendance.keterangan.keterangan }}</td>
                <td><img :src="attendance.foto" width="75" height="100"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <NuxtLink to="/">
      <button class="btn btn-dark btn-lg rounded-5 px-5 tulisan">Kembali</button>
    </NuxtLink>
  </div>
</template>

<script setup>

const supabase = useSupabaseClient()
const keyword = ref('')
const totalKehadiran = ref(0);
const kehadiran = ref([]);

async function getKehadiran() {
  let { data, error } = await supabase
    .from('kehadiran')
    .select(`
      *,
      siswa ( * ),
      keterangan ( * )
    `).order('id', {ascending:false})
  if (error) throw error
  if (data) {
    data = data.map(data => {
      const { data: { publicUrl } } = supabase.storage.from('presensi').getPublicUrl(data.foto)
      return {
        ...data,
        foto: publicUrl
      }
    })
    kehadiran.value = data
  }
}
const getTotalKehadiran = async () => {
  const { count, error } = await supabase.from("kehadiran").select("*, keterangan(*)", { count: 'exact', head: true});
  if (error) throw error
  if (count) totalKehadiran.value = count;
};

// const getCari = async () => {
//     const { data, error } = await supabase
//     .from('kehadiran')
//     .select(`
//       *,
//       siswa ( * )
//     `)
//     .ilike('kehadiran.siswa', `%${keyword.value}%`)
//     .or(`siswa.nama.ilike.%${keyword.value}%`)
//     if(data) kehadiran.value = data
// }
const getCari = async () => {
  const { data, error } = await supabase
    .from('kehadiran')
    .select(`*, siswa!inner(*), keterangan(*)`)
    .ilike('siswa.nama', `%${keyword.value}%`)
  if (data) kehadiran.value = data;
}
onMounted(() => {
  getKehadiran()
  getTotalKehadiran()
  getCari()
})

</script>


<style scoped>
input{
  text-align: center;
}
.input-icon {
    position: relative;
    display: flex;
    justify-content: center; /* Mengatur agar elemen anak berada di tengah secara horizontal */
    align-items: center; /* Mengatur agar elemen anak berada di tengah secara vertikal (jika tinggi ditentukan) */
}

.input-icon input {
    padding-left: 30px; /* Memberikan ruang untuk ikon */
}

.input-icon i {
    position: absolute;
    right: 120px; /* Posisi ikon di sebelah kanan */
    top: 50%;
    transform: translateY(-50%); /* Mengatur posisi vertikal ikon */
}

hr {
    border: none;
    height: 1px;
    color: #333; 
    background-color: #333;
    width: 30%;
    justify-content: center;
    align-items: center;
}
.pencarian {
  align-items: center;
  justify-content: center;
}
.isi1{
  display: flex;
  justify-content: center;
  align-items: center;
}
.bgi{
  display: flex;
  background-color: aliceblue;
  width: 1700px;
}
.Table1{
  padding-left: 2%;
  padding-right: 2%;
}
.JudulMR{
  padding-left: 2%;
  padding-right: 2%;
  margin: 30px 0px 30px 0px;
}
.Riwayat{
  font-size: 50px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
