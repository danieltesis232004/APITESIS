import express from 'express'
import cors from 'cors'
import usuarioRoutes from './routes/usuarios.routes.js'
import RecuperacionRoutes from './routes/Recuperacion.routes.js'
import tipoContactoRoutes from './routes/tipoContacto.routes.js'
import tipoEventoRoutes from './routes/tipoEvento.routes.js'
import contactoEmergenciaRoutes from './routes/contactoEmergencia.routes.js'
import eventosRoutes from './routes/eventos.routes.js'
import recorridoRoutes from './routes/recorridos.routes.js'
const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', usuarioRoutes)
app.use('/api', RecuperacionRoutes)
app.use('/api', tipoContactoRoutes)
app.use('/api', tipoEventoRoutes)
app.use('/api', contactoEmergenciaRoutes)
app.use('/api', recorridoRoutes)
app.use('/api', eventosRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'PÁGINA NO ENCONTRADA'
  })
})

export default app;
