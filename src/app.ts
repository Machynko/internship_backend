import express from 'express'

const app = epress()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/api/v1/users',)

export default app