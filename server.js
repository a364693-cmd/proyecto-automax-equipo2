const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 8888;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'mensajes.txt');

// Asegurar que exista la carpeta data/ para almacenar los mensajes
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Formulario de contacto (POST /contacto)
    if (req.method === 'POST' && pathname === '/contacto') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const datos = querystring.parse(body);
            const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Chihuahua' });

            const registro = [
                '========================================',
                `Fecha:    ${fecha}`,
                `Nombre:   ${datos.nombre || 'No especificado'}`,
                `Correo:   ${datos.correo || 'No especificado'}`,
                `Teléfono: ${datos.telefono || 'No especificado'}`,
                `Mensaje:  ${datos.mensaje || 'Sin mensaje'}`,
                '========================================\n'
            ].join('\n');

            fs.appendFile(MESSAGES_FILE, registro, 'utf8', (err) => {
                if (err) {
                    console.error('Error al guardar el mensaje:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('Error interno al guardar la solicitud de contacto.');
                }

                // Redirigir con éxito para mostrar mensaje de confirmación
                res.writeHead(302, { 'Location': '/contacto.html?enviado=true' });
                res.end();
            });
        });
        return;
    }

    //  Mapeo de rutas  y archivos estáticos 
    if (req.method === 'GET') {
        let rutaArchivo = pathname;

        if (rutaArchivo === '/') {
            rutaArchivo = '/index.html';
        } else if (rutaArchivo === '/nosotros') {
            rutaArchivo = '/nosotros.html';
        } else if (rutaArchivo === '/contacto') {
            rutaArchivo = '/contacto.html';
        }

        const filePath = path.normalize(path.join(PUBLIC_DIR, rutaArchivo));

        // Prevenir acceso fuera de la carpeta public
        if (!filePath.startsWith(PUBLIC_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Acceso denegado.');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>404 - Página o recurso no encontrado</h1><a href="/">Volver al inicio</a>');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Error interno del servidor.');
                }
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
        return;
    }

    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Método HTTP no permitido.');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Automax ejecutándose en http://localhost:${PORT}`);
});