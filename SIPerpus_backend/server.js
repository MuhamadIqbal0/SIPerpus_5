// backend/server.js — Entry point 
require('dotenv').config() // Muat .env sebelum apapun 
const app = require('./src/app')

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => { 
console.log(`🚀 Server SiPerpus berjalan di http://localhost:${PORT}`) 
console.log(`📊 Environment: ${process.env.NODE_ENV}`) 
})