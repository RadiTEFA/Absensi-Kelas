<template>
  <div class="container-fluid">
    <h2 class="JudulFormAbsensi text-center">Form Absensi</h2>
    <form @submit.prevent="kirimData">
      <div class="Inputan">
        <div>
          <label>Nama : </label>
          <div style="padding-top: 10px;">
            <select v-model="form.siswa" class="form-control form-select" style="width:450px;">
              <option disabled :value="null">Pilih siswa</option>
              <option v-for="student in students" :value="student.id">{{ student.id }} - {{ student.nama }}</option>
            </select>
          </div>
        </div>
        <br>
        <label>Poto : </label>
        <div style="padding-top: 10px;">
          <input @change="handleFileInput" type="file" accept="image/*">
          <p class="fst-italic">Poto wajib menggunakan Watermark Waktu!</p>
        </div>
        <div style="padding-top: 10px;">
          <label>Keterangan : </label>
          <div style="padding-top: 10px;">
            <select v-model="form.keterangan" class="form-control form-select" style="width:450px;">
              <option disabled :value="null">Masukan Keterangan</option>
              <option v-for="(item, i) in objectives" :key="i" :value="item.id">{{ item.keterangan }}</option>
            </select>
          </div>
        </div>
        <div class="d-md-flex justify-content-md-end mt-5 button">
          <button type="submit" class="btn btn-primary">Kirim</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const objectives = ref([]);
const students = ref([]);
const file = ref(null);
const form = ref({
  siswa: null,
  keterangan: null
});

const getKeterangan = async () => {
  const { data, error } = await supabase.from("keterangan").select("*")
  if (data) objectives.value = data
};

const getSiswa = async () => {
  const { data, error } = await supabase.from("siswa").select("*").eq("level",2).order('id', { ascending: true })
  if (data) students.value = data
};

// upload foto
const handleFileInput = (event) => {
  file.value = event.target.files[0];
};

const kirimData = async () => {
  if (!file.value) {
    alert("Pilih file terlebih dahulu!");
    return;
  }
  try {
    let d = new Date()
    let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    const { error } = await supabase.storage.from("presensi").upload(`public/${date}/${file.value.name}`, file.value);
    if (error) {
      throw error;
    }
    const { error: insertError } = await supabase.from("kehadiran").insert([{ foto: `public/${date}/${file.value.name}`, ...form.value }]);
    if (insertError) {
      throw insertError;
    }
    else {
      alert("berhasil dikirim!");
      navigateTo('/riwayat')
    }
  } catch (error) {
    console.error("Error uploading file:", error.message);
    // alert("Gagal mengupload file.");
  }
};
// end


onMounted(() => {
  getKeterangan();
  getSiswa();
});

</script>

<style scoped>
.JudulFormAbsensi {
  font-size: 50px;
  font-family: 'Times New Roman', Times, serif;
}

.Inputan {
  margin-top: 7%;
  margin-left: 37%;
}

.KolomKirim {
  padding-top: 100px;
  padding-right: 1%;
}

.button {
  margin-right: 62%;
  ;
}

p {
  font-size: 12px;
}
</style>
