const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Connected to database successfully!')
    // Test query to verify connection
    const result = await prisma.$queryRaw`SELECT current_database()`
    console.log('Connected to database:', result)
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()