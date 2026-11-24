# Automax — Sitio Web de Renta de Automóviles

Proyecto Integrador del Segundo Parcial **Desarrollo Basado en Plataformas** (Unidad II: Desarrollo de Aplicaciones Web), Facultad de Ingeniería, Universidad Autónoma de Chihuahua (UACH).

---

## 1. Integrantes del Equipo
* **Alisandro Mendoza espitia** — Matrícula: `364693` (GitHub: `@a364693-cmd`)
* **Andrea Dominguez Rodriguez** — Matrícula: `374234` (GitHub: `@AndyRV444`)

---

## 2. Descripción General del Proyecto
**Automax** es una aplicación web desarrollada para promocionar el servicio de renta de automóviles de la empresa, permitiendo a los clientes explorar su flotilla disponible, consultar especificaciones técnicas de modelos destacados, conocer la identidad institucional de la compañía y enviar solicitudes de contacto o reservación en línea.

El proyecto fue construido bajo una arquitectura cliente-servidor utilizando **Node.js** puro en el backend (sin frameworks externos) y **HTML5 semántico**, **CSS3 propio** (sin frameworks de estilos) y **JavaScript** en el frontend, además de estar empaquetado como contenedor mediante **Docker**.

---

## 3. Explicación del Funcionamiento del Sitio

### Arquitectura y Servidor HTTP (`server.js`)
* **Puerto de escucha:** El servidor web se inicia y atiende peticiones HTTP en el puerto **`8888`** (`http://localhost:8888`).
* **Enrutamiento y archivos estáticos:** Gestiona las rutas principales (`/`, `/nosotros`, `/contacto`) y sirve automáticamente los documentos `.html`, hojas de estilo `.css`, scripts `.js` e imágenes desde el directorio `public/`, asignando las cabeceras `Content-Type` correspondientes y protegiendo el acceso a directorios superiores.
* **Procesamiento de formularios (`POST /contacto`):** Recibe los datos enviados desde el formulario web, los formatea con fecha y hora, los guarda de manera persistente en el archivo de texto `data/mensajes.txt` dentro del servidor y redirige al usuario para mostrar una confirmación visual.

### Secciones del Sitio Web
1. **Página Principal y Catálogo (`public/index.html` y `public/js/app.js`):** Presenta a Automax y renderiza dinámicamente un catálogo de **25 vehículos** indicando marca, modelo, año y tarifa de renta por día, además de enlaces directos hacia todas las secciones.
2. **Detalle de Vehículos (`detalle-1.html`, `detalle-2.html`, `detalle-3.html`):** Páginas individuales accesibles desde los tres primeros vehículos del catálogo, mostrando fotografía, precio diario, descripción general y ficha técnica detallada (motor, transmisión, capacidad, equipamiento y seguridad).
3. **Acerca de Nosotros (`public/nosotros.html`):** Expone la descripción general de la empresa, su misión, visión y valores corporativos.
4. **Contacto y Solicitudes (`public/contacto.html`):** Muestra la dirección física, teléfonos, correo electrónico y horarios de atención, junto con el formulario funcional conectado al servidor HTTP.

---

## 4. Instrucciones para Ejecutar el Proyecto Localmente

### Requisitos previos
* Tener instalado **Node.js** (versión 18 o superior) y **Git**.

### Pasos de ejecución
1. **Clonar el repositorio público:**
   ```bash
   git clone [https://github.com/a364693-cmd/proyecto-automax-equipo2.git]
   cd proyecto-automax-equipo2
   ```

2. **Iniciar el servidor web:**
   ```bash
   node server.js
   ```
   *(También puedes iniciar con `npm start`).*

3. **Acceder al sitio web:**
   Abre tu navegador e ingresa a:
   ```text
   http://localhost:8888
   ```

4. **Verificar el almacenamiento de mensajes:**
   Al enviar una solicitud desde la sección **Contacto**, se generará automáticamente el archivo `data/mensajes.txt` en la raíz del proyecto con el registro guardado.

---

## 5. Imagen Pública en Docker Hub
La imagen oficial de esta aplicación se encuentra publicada y disponible para su descarga directa en Docker Hub en el siguiente enlace:

* **URL de Docker Hub:** https://hub.docker.com/r/alimendoza/automaxeq2

---

## 6. Instrucciones para Ejecutar el Contenedor Docker

### Requisitos previos
* Tener instalado y en ejecución **Docker Desktop** o **Docker Engine**.

### Opción A: Descargar y ejecutar desde Docker Hub (Recomendado)
1. **Descargar la imagen pública desde Docker Hub:**
   ```bash
   docker pull alimendoza/automaxeq2:latest
   ```

2. **Ejecutar el contenedor mapeando el puerto `8888`:**
   ```bash
   docker run -d -p 8888:8888 --name automax-contenedor alimendoza/automaxeq2:latest
   ```

3. **Abrir la aplicación en el navegador:**
   ```text
   http://localhost:8888
   ```

4. **Verificar los mensajes guardados dentro del contenedor (opcional):**
   ```bash
   docker exec automax-contenedor cat /app/data/mensajes.txt
   ```

### Opción B: Construir la imagen localmente desde el código fuente
Si deseas construir la imagen directamente a partir del `Dockerfile` incluido en este repositorio:
```bash
docker build -t automax-local .
docker run -d -p 8888:8888 --name automax-prueba automax-local
```