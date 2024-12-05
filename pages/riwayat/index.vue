<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="text-center Riwayat">RIWAYAT KEHADIRAN</h2>
        <div class="d-flex">
          <div class="p-2 w-100">
            <input @input="setCari" type="search" class="form-control rounded-3 bgo" placeholder="Cari Nama">
          </div>
          <div class="p-2 flex-shrink-1">
            <input type="date" class="form-control rounded-3 bga" @input="setSchedule">
            <!-- {{ schedule }} -->
          </div>
        </div>
        </div>
        <div class="text-muted JudulMR">Menampilkan {{ kehadiran.length }} dari {{ totalKehadiran }}</div>
        <div class="Table1">
          <table class="table table-striped table-hover">
            <thead class="bold-text">
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
</template>

<script setup>

const supabase = useSupabaseClient()
const keyword = ref('')
const date = ref('')
const totalKehadiran = ref(0);
const kehadiran = ref([]);

function setCari(event) {
  console.log(event.target.value)
  keyword.value = event.target.value
  getCari()
}

function setSchedule(event) {
  console.log(event.target.value)
  date.value = event.target.value;
  getSchedule()
}

const getSchedule = async () => {
  if(date.value != '') {
  let { data, error } = await supabase
    .from('kehadiran')
    .select(`
      *,
      siswa ( * ),
      keterangan ( * )
    `)
    .eq('tanggal', date.value); // Filter berdasarkan tanggal
    if (error) throw error
    if (data) {
      data = data.map(data => {
        const { data : { publicUrl } } = supabase.storage.from('presensi').getPublicUrl(data.foto)
        return {
          ...data,
          foto: publicUrl
        }
      })
      kehadiran.value = data;
    } 
  } else {
    getKehadiran()
  }
};

async function getKehadiran() {
  let { data, error } = await supabase
    .from('kehadiran')
    .select(`
      *,
      siswa!inner ( * ),
      keterangan ( * )
    `)
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

const getCari = async () => {
  // console.log(event.target.value)
  let { data, error } = await supabase
    .from('kehadiran')
    .select(`
      *,
      siswa!inner( * ),
      keterangan ( * )
    `).order('id', {ascending:false})
    .ilike('siswa.nama', `%${keyword.value}%`)
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

onMounted(() => {
  getKehadiran()
  getTotalKehadiran()
  getCari()
  getSchedule();
})

</script>


<style scoped>
input{
  text-align: center;
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
  width: 1500px;
}
.bgr{
  display: flex;
  background-color: aliceblue;
  width: 1400px;
}
.bga{
  display: flex;
  background-color: antiquewhite;
  width: 330px;
  text-align: center;
}
.bgo{
  display: flex;
  background-color: antiquewhite;
  text-align: center;
}
.bgo::-webkit-input-placeholder {
    color: black; /* Warna teks placeholder */
    opacity: 1;   /* Pastikan placeholder terlihat penuh */
}
.Table1{
  padding-left: 2%;
  padding-right: 2%;
  font-family: 'Times New Roman', Times, serif;
}
.bold-text {
  font-weight: bold;
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
input[type="date"]{
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
