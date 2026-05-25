import('./lib/prisma.js').then(async ({ prisma }) => {
  try {
    console.log('Connecting to DB...');
    await prisma.$connect();
    console.log('Connected. Running test query...');
    const v = await prisma.$queryRaw`SELECT 1 as ok`;
    console.log('Query result:', v);
  } catch (e) {
    console.error('Prisma connect/query failed:', e);
    process.exitCode = 1;
  } finally {
    try { await prisma.$disconnect(); } catch {};
  }
}).catch(err => { console.error('Import failed', err); process.exitCode = 1; });