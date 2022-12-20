import mongoose from 'mongoose'

// Functions
export default async function dropDB() {
  if (mongoose.connection.readyState != 1) {
    return
  }

  mongoose.connection.db.dropDatabase()
}