const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CAPTURAS_DIR = path.join(__dirname, 'capturas');

// Crear directorio si no existe
if (!fs.existsSync(CAPTURAS_DIR)) {
  fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
}

async function takeScreenshot(page, name, width, height) {
  await page.setViewportSize({ width, height });
  const filename = `${name}_${width}x${height}.png`;
  const filepath = path.join(CAPTURAS_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`✓ ${filename}`);
}

async function runTest() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navegar a la app
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

    // PANTALLA 1: Gancho
    console.log('\n=== Pantalla 1: Gancho ===');
    await takeScreenshot(page, '01-gancho', 390, 844);
    await takeScreenshot(page, '01-gancho', 440, 956);

    // Click "Hacer mi diagnóstico"
    await page.click('[data-action="start-diagnosis"]');
    await page.waitForTimeout(400);

    // PANTALLA 2: Tu situación
    console.log('\n=== Pantalla 2: Tu situación ===');
    await takeScreenshot(page, '02-situacion', 390, 844);
    await takeScreenshot(page, '02-situacion', 440, 956);

    // Llenar pantalla 2
    const opts2_1 = await page.$$('[data-question="2.1"] .option');
    await opts2_1[2].click(); // 2 personas
    await page.waitForTimeout(100);

    const opts2_2 = await page.$$('[data-question="2.2"] .option');
    await opts2_2[0].click(); // Hipotecario
    await page.waitForTimeout(100);

    const opts2_3 = await page.$$('[data-question="2.3"] .option');
    await opts2_3[0].click(); // Sí, totalmente
    await page.waitForTimeout(200);

    // Click Continuar
    await page.click('[data-footer="2"] [data-action="continue"]');
    await page.waitForTimeout(400);

    // PANTALLA 3: Tu respaldo
    console.log('\n=== Pantalla 3: Tu respaldo ===');
    await takeScreenshot(page, '03-respaldo', 390, 844);
    await takeScreenshot(page, '03-respaldo', 440, 956);

    // Llenar pantalla 3
    const opts3_1 = await page.$$('[data-question="3.1"] .option');
    await opts3_1[1].click(); // Entre 3 y 6
    await page.waitForTimeout(100);

    const opts3_2 = await page.$$('[data-question="3.2"] .option');
    await opts3_2[0].click(); // Seguro del crédito
    await page.waitForTimeout(200);

    await page.click('[data-footer="3"] [data-action="continue"]');
    await page.waitForTimeout(400);

    // PANTALLA 4: Tu prioridad
    console.log('\n=== Pantalla 4: Tu prioridad ===');
    await takeScreenshot(page, '04-prioridad', 390, 844);
    await takeScreenshot(page, '04-prioridad', 440, 956);

    // Llenar pantalla 4
    const opts4_1 = await page.$$('[data-question="4.1"] .option');
    await opts4_1[1].click(); // Ingresos
    await page.waitForTimeout(200);

    await page.click('[data-footer="4"] [data-action="continue"]');
    await page.waitForTimeout(400);

    // PANTALLA 5: Tu perfil
    console.log('\n=== Pantalla 5: Tu perfil ===');
    await takeScreenshot(page, '05-perfil', 390, 844);
    await takeScreenshot(page, '05-perfil', 440, 956);

    // Llenar pantalla 5
    const opts5_1 = await page.$$('[data-question="5.1"] .option');
    await opts5_1[1].click(); // Independiente
    await page.waitForTimeout(100);

    const opts5_2 = await page.$$('[data-question="5.2"] .option');
    await opts5_2[3].click(); // Más de $15M
    await page.waitForTimeout(200);

    await page.click('[data-footer="5"] [data-action="view-result"]');
    await page.waitForTimeout(400);

    // PANTALLA 6: Autorización
    console.log('\n=== Pantalla 6: Autorización ===');
    await takeScreenshot(page, '06-autorizacion', 390, 844);
    await takeScreenshot(page, '06-autorizacion', 440, 956);

    // Marcar checkbox
    await page.click('#consent-check');
    await page.waitForTimeout(200);

    await page.click('[data-footer="6"] [data-action="show-result"]');
    await page.waitForTimeout(400);

    // PANTALLA 7: Resultado
    console.log('\n=== Pantalla 7: Resultado ===');
    await takeScreenshot(page, '07-resultado', 390, 844);
    await takeScreenshot(page, '07-resultado', 440, 956);

    // Scroll para ver el contenido completo
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await takeScreenshot(page, '07-resultado-scroll', 390, 844);
    await takeScreenshot(page, '07-resultado-scroll', 440, 956);

    // Click "Agendar 30 min"
    await page.click('[data-footer="7"] [data-action="schedule-call"]');
    await page.waitForTimeout(400);

    // PANTALLA TRANSICIÓN
    console.log('\n=== Pantalla Transición ===');
    await takeScreenshot(page, '08-transicion', 390, 844);
    await takeScreenshot(page, '08-transicion', 440, 956);

    // Click "Ver vista del asesor"
    await page.click('[data-action="go-to-asesor"]');
    await page.waitForTimeout(400);

    // PANTALLA A: Alerta
    console.log('\n=== Pantalla A: Alerta ===');
    await takeScreenshot(page, '09-alerta', 390, 844);
    await takeScreenshot(page, '09-alerta', 440, 956);

    // Click en notificación
    await page.click('[data-action="go-to-ficha"]');
    await page.waitForTimeout(400);

    // PANTALLA B: Ficha
    console.log('\n=== Pantalla B: Ficha ===');
    await takeScreenshot(page, '10-ficha', 390, 844);
    await takeScreenshot(page, '10-ficha', 440, 956);

    // Scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await takeScreenshot(page, '10-ficha-scroll', 390, 844);
    await takeScreenshot(page, '10-ficha-scroll', 440, 956);

    // Click "Ver preparación"
    await page.click('[data-action="go-to-prep"]');
    await page.waitForTimeout(400);

    // PANTALLA C: Preparación
    console.log('\n=== Pantalla C: Preparación ===');
    await takeScreenshot(page, '11-preparacion', 390, 844);
    await takeScreenshot(page, '11-preparacion', 440, 956);

    console.log('\n✅ Todas las capturas completadas');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

runTest();
