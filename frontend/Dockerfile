# frontend/Dockerfile

# Usar una imagen oficial de Node.js como base
FROM node:18.17.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación de React usando Vite
RUN npm run build

# Usar una imagen de Nginx para servir los archivos estáticos
FROM nginx:stable-alpine

# Copiar los archivos construidos a la carpeta donde Nginx los servirá
COPY --from=0 /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Arrancar Nginx
CMD ["nginx", "-g", "daemon off;"]
