# Imagen oficial ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json server.js ./
COPY public ./public

# Crear carpeta para almacenamiento de mensajes
RUN mkdir -p /app/data

# Exponer el puerto requerido (8888)
EXPOSE 8888

# Comando para iniciar el servidor
CMD ["node", "server.js"]