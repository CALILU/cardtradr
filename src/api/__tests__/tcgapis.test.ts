/**
 * Test de conexion a TCGAPIs.
 * Ejecutar manualmente para verificar que la API key funciona.
 *
 * NOTA: Consume 2-3 llamadas del limite diario (100/dia).
 */

const BASE_URL = 'https://api.tcgapis.com/api/v1';
const API_KEY = process.env.EXPO_PUBLIC_TCGAPIS_API_KEY || '';

async function testConnection() {
  console.log('=== Test de Conexion TCGAPIs ===\n');

  // Test 1: Health
  console.log('1. Health check...');
  try {
    const res = await fetch(`${BASE_URL}/health`, {
      headers: { 'X-API-Key': API_KEY },
    });
    const data = await res.json();
    console.log(`   OK (${res.status}) - Plan: ${data.user?.plan || 'N/A'}\n`);
  } catch (e) {
    console.error(`   ERROR: ${e}\n`);
  }

  // Test 2: Juegos
  console.log('2. Listando juegos...');
  try {
    const res = await fetch(`${BASE_URL}/games`, {
      headers: { 'X-API-Key': API_KEY },
    });
    const data = await res.json();
    const games = data.data?.games || [];
    console.log(`   Total: ${games.length} juegos`);
    games.slice(0, 5).forEach((g: { displayName: string; categoryId: number }) => {
      console.log(`   - [${g.categoryId}] ${g.displayName}`);
    });
    console.log();
  } catch (e) {
    console.error(`   ERROR: ${e}\n`);
  }

  // Test 3: Uso
  console.log('3. Uso de API...');
  try {
    const res = await fetch(`${BASE_URL}/user/usage`, {
      headers: { 'X-API-Key': API_KEY },
    });
    const data = await res.json();
    const u = data.data;
    console.log(`   Usadas hoy: ${u?.current?.daily || 'N/A'}`);
    console.log(`   Restantes: ${u?.remaining?.calls || 'N/A'}`);
    console.log(`   Limite: ${u?.limits?.calls || 'N/A'}/${u?.limits?.period || 'N/A'}\n`);
  } catch (e) {
    console.error(`   ERROR: ${e}\n`);
  }

  console.log('=== Test completado ===');
}

testConnection().catch(console.error);
