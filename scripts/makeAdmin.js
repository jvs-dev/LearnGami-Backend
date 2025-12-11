const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function makeUserAdmin(userId) {
  try {    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      return;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: 'ADMIN' },
    });

    console.log(`User ${updatedUser.name} (ID: ${updatedUser.id}) is now an ADMIN.`);
  } catch (error) {
    console.error('Error updating user role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get user ID from command line arguments
const userId = parseInt(process.argv[2]);

if (!userId) {
  console.log('Please provide a user ID as an argument.');
  console.log('Usage: node scripts/makeAdmin.js <user_id>');
  process.exit(1);
}

makeUserAdmin(userId);