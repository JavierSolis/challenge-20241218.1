# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package.json tsconfig.json ./
COPY app/ ./app
COPY test/ ./test

# Instala las dependencias del proyecto
RUN npm install --include=dev

# Compila el código TypeScript a JavaScript
RUN npm run compile

# Define el comando por defecto para ejecutar las pruebas
# CMD ["npx", "mocha"]
