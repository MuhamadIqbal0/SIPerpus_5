<template>
 <form @submit.prevent="simpanBuku" class="form-buku">
 <!-- TEXT INPUT — sinkron setiap keystroke -->
 <div class="field">
 <label>Judul Buku *</label>
 <input v-model="form.judul" type="text" placeholder="Masukkan judul
buku" />
 <span class="counter">{{ form.judul.length }}/200 karakter</span>
 </div>
 <!-- .trim — hapus spasi di awal dan akhir otomatis -->
 <div class="field">
 <label>Penulis *</label>
 <input v-model.trim="form.penulis" placeholder="Nama penulis" />
 </div>
 <!-- .lazy — sinkron saat blur (pindah fokus), bukan setiap ketik -->
 <!-- Lebih hemat untuk validasi berat atau panggilan API -->
 <div class="field">
 <label>ISBN</label>
 <input v-model.lazy="form.isbn" placeholder="Contoh: 9780132350884" />
 </div>
 <!-- .number — konversi string ke number otomatis -->
 <div class="field">
 <label>Tahun Terbit</label>
 <input v-model.number="form.tahun" type="number" min="1900" />
 </div>
 <!-- TEXTAREA -->
 <div class="field">
 <label>Sinopsis</label>
 <textarea v-model.trim="form.sinopsis" rows="5"></textarea>
 </div>
 <!-- SELECT dropdown -->
 <div class="field">
 <label>Kategori *</label>
 <select v-model="form.kategori">
 <option value="">-- Pilih Kategori --</option>
 <option v-for="kat in daftarKategori" :key="kat" :value="kat">
 {{ kat }}
 </option>
 </select>
 </div>
 <!-- CHECKBOX single — boolean -->
 <div class="field">
 <label class="checkbox-label">
 <input type="checkbox" v-model="form.tersedia" />
 Buku tersedia untuk dipinjam
 </label>
 </div>
 <!-- CHECKBOX multiple — array -->
 <div class="field">
 <label>Tag/Label</label>
 <div class="checkbox-group">
 <label v-for="tag in daftarTag" :key="tag" class="checkbox-label">
 <input type="checkbox" v-model="form.tags" :value="tag" />
 {{ tag }}
 </label>
 </div>
 </div>
 <!-- RADIO button -->
 <div class="field">
 <label>Kondisi Buku</label>
 <div class="radio-group">
 <label><input type="radio" v-model="form.kondisi" value="baru" />
Baru</label>
 <label><input type="radio" v-model="form.kondisi" value="baik" />
Baik</label>
 <label><input type="radio" v-model="form.kondisi" value="rusak" />
Rusak</label>
 </div>
 </div>
 <!-- Preview data real-time berkat reaktivitas -->
 <div class="preview" v-if="form.judul">
 <h4>Preview:</h4>
 <p><strong>{{ form.judul }}</strong> oleh {{ form.penulis }}</p>
 <p>Kategori: {{ form.kategori }} | Kondisi: {{ form.kondisi }}</p>
 <p>Tag: {{ form.tags.join(', ') || 'Belum dipilih' }}</p>
 </div>
 <button type="submit" :disabled="!isFormValid" class="btn-submit">
 Simpan Buku
 </button>
 </form>
</template>
<script setup>
import { reactive, computed } from 'vue'
const form = reactive({
 judul: '',
 penulis: '',
 isbn: '',
 tahun: new Date().getFullYear(),
 sinopsis: '',
 kategori: '',
 tersedia: true,
 tags: [],
 kondisi: 'baru',
})
const daftarKategori = ['Fiksi', 'Non-Fiksi', 'Sains', 'Teknologi',
 'Sejarah', 'Bisnis', 'Seni', 'Agama']
const daftarTag = ['Rekomendasi', 'Buku Baru', 'Populer', 'Langka',
'Referensi']
const isFormValid = computed(() =>
 form.judul.trim().length >= 3 &&
 form.penulis.trim().length >= 3 &&
 form.kategori !== ''
)
function simpanBuku() {
 console.log('Data buku:', JSON.parse(JSON.stringify(form)))
 // Bab 5: kirim ke backend Express.js via Axios
}
</script>
<style scoped>
.form-buku {
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

/* Field */
.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #334155;
}

/* Input, select, textarea */
input,
select,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #CBD5F5;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

/* Counter */
.counter {
  font-size: 0.75rem;
  color: #64748B;
  margin-top: 4px;
  display: block;
  text-align: right;
}

/* Checkbox & radio */
.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #475569;
}

/* Preview */
.preview {
  background: #F1F5F9;
  padding: 16px;
  border-radius: 10px;
  margin-top: 20px;
}

.preview h4 {
  margin-bottom: 8px;
  color: #1E293B;
}

/* Button */
.btn-submit {
  width: 100%;
  padding: 12px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-submit:hover {
  background: #1D4ED8;
}

.btn-submit:disabled {
  background: #94A3B8;
  cursor: not-allowed;
}
</style>
