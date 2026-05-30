# API Documentation - SIPerpus

## Base URL

```bash
http://localhost:3000/api
```

---

# 1. Login User

## Endpoint

```http
POST /auth/login
```

## Description

Endpoint digunakan untuk login user dan mendapatkan token JWT.

## Request Body

```json
{
  "email": "admin@siperpus.id",
  "password": "password"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "nama": "Ahmad Pustakawan",
      "email": "admin@siperpus.id",
      "role": "pustakawan"
    }
  }
}
```

## Auth Required

❌ Tidak

---

# 2. Get Semua Data Buku

## Endpoint

```http
GET /buku
```

## Description

Endpoint digunakan untuk mengambil seluruh data buku dari database.

## Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "judul": "Clean Code",
        "penulis": "Robert C. Martin",
        "kategori": "Teknologi"
      }
    ]
  }
}
```

## Auth Required

❌ Tidak

---

# 3. Search dan Filter Buku

## Endpoint

```http
GET /buku?search=vue&kategori=Teknologi
```

## Description

Endpoint digunakan untuk mencari buku berdasarkan keyword dan kategori.

## Query Parameters

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| search    | string | Keyword pencarian buku |
| kategori  | string | Filter kategori buku   |

## Example Request

```http
GET /api/buku?search=vue&kategori=Teknologi
```

## Success Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 2,
        "judul": "Vue.js 3 for Beginners",
        "penulis": "Simone Cuomo",
        "penerbit": "Packt",
        "tahun": 2024,
        "isbn": "9781803239859",
        "kategori": "Teknologi",
        "stok": 2,
        "tersedia": 1
      }
    ]
  }
}
```

## Auth Required

❌ Tidak

---

# 4. Tambah Buku

## Endpoint

```http
POST /buku
```

## Description

Endpoint digunakan untuk menambahkan data buku baru ke database.

## Headers

```http
Authorization: Bearer JWT_TOKEN
```

## Request Body

```json
{
  "judul": "Belajar Node.js",
  "penulis": "Iqbal",
  "kategori": "Teknologi"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan"
}
```

## Auth Required

✅ Ya
