import { connect, connection } from 'mongoose'

export const connectDatabase = async () => {
  await connect(process.env.MONGO_CONNECTION_URI as string)

  connection.on('connected', () => {
    console.log('Mongoose connection successfully opened!')
  })

  connection.on('err', err => {
    console.error(`Mongoose connection error:\n${err.stack}`)
  })

  connection.on('disconnected', () => {
    console.log('Mongoose connection terminated.')
  })
}
