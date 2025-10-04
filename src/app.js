import express from 'express'
import cors from 'cors'
import usuarioRoutes from './routes/usuarios.routes.js'



const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', usuarioRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'PÁGINA NO ENCONTRADA'
  })
})

export default app;
