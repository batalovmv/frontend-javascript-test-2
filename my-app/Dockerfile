# Используем Node.js 18
FROM node:18-alpine AS BUILD_IMAGE

# Устанавливаем рабочую директорию
WORKDIR /app/react-app

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package.json .

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта (node_modules исключается через .dockerignore)
COPY . .

# Запускаем сборку
RUN npm run build



FROM node:18-alpine as PRODUCTION_IMAGE
# Устанавливаем рабочую директорию
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/dist /app/react-app/dist/
# Используем nginx для раздачи статических файлов
EXPOSE 8080
COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
CMD ["npm","run","preview"]

