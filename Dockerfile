# Используем Node.js 18
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY my-app/package.json my-app/package-lock.json ./
RUN npm install --frozen-lockfile

# Копируем код проекта
COPY my-app ./

# Собираем проект
RUN npm run build

# Используем nginx для раздачи статических файлов
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]