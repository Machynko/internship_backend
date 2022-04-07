import {Request, Response} from 'express'
import v1 from './api/v1'

const app = express()
const express = require('express')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req: Request, res:Response) =>{
    res.send("Currently in app.ts")
}
// Register router
app.use('/api/v1', v1())

export default app