const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO_PATH = path.join(__dirname, 'assets', 'logo.png');
const SIZES = [180, 192, 512];

async function createIcons() {
  try {
    // Crear fondo blanco y colocar el logo centrado
    for (const size of SIZES) {
      // Crear imagen blanca
      const white = Buffer.alloc(size * size * 4, 255);

      // Leer el logo y redimensionarlo
      const logoResized = await sharp(LOGO_PATH)
        .resize(Math.floor(size * 0.6), Math.floor(size * 0.6), {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toBuffer();

      // Crear un canvas blanco y pegar el logo centrado
      const iconPath = path.join(__dirname, 'assets', `icon-${size}.png`);

      await sharp({
        create: {
          width: size,
          height: size,
          channels: 3,
          background: '#FFFFFF'
        }
      })
      .composite([
        {
          input: logoResized,
          left: Math.floor((size - Math.floor(size * 0.6)) / 2),
          top: Math.floor((size - Math.floor(size * 0.6)) / 2)
        }
      ])
      .png()
      .toFile(iconPath);

      console.log(`✓ icon-${size}.png creado`);
    }

    console.log('✅ Todos los íconos creados exitosamente');
  } catch (error) {
    console.error('Error:', error);
  }
}

createIcons();
