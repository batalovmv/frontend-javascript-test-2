# Используем Node.js 18
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем только package.json и package-lock.json перед установкой зависимостей
COPY my-app/package.json my-app/package-lock.json ./

# Устанавливаем зависимости (используем `npm ci`, так как есть package-lock.json)
RUN npm ci

# Копируем весь исходный код проекта
COPY my-app/ ./

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