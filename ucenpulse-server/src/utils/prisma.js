
/**
 * Prisma Client Instance
 *
 * Initialises and exports a single Prisma client for database access.
 * This instance is reused across the application to interact with the database.
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;