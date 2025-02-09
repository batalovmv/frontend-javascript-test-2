# Используем Node.js 18
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта (node_modules исключается через .dockerignore)
COPY . .

# Запускаем сборку
RUN npm run build

# Используем nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем билд Vite-приложения в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]