
# 🚀 GitHub Repo Explorer

**GitHub Repo Explorer** – это **React-приложение**, которое позволяет искать и просматривать репозитории пользователей **GitHub**.  
Приложение использует **Redux Toolkit**, **TypeScript**, **Axios**  для удобного взаимодействия с GitHub API.

---

## 📌 **Функциональность**
- 🔍 **Поиск репозиториев GitHub по имени пользователя**  
- 📜 **Отображение списка репозиториев** (название, описание, звёзды, дата обновления)  
- 🔄 **Ленивая подгрузка** — загружает новые репозитории при прокрутке  
- 🚀 **Автоматический деплой на GitHub Pages** через **GitHub Actions и Docker**  
- ❌ **Обработка ошибок** — если пользователь введёт некорректное имя или GitHub API вернёт ошибку, отобразится сообщение  

---

## 🌍 **Демо**
Приложение развёрнуто на **GitHub Pages**:  
👉 **[GitHub Repo Explorer](https://batalovmv.github.io/frontend-javascript-test-2/)**  

---

## ⚙️ **Установка и запуск**
### **1️⃣ Клонирование проекта**
```sh
git clone https://github.com/batalovmv/frontend-javascript-test-2.git
cd frontend-javascript-test-2
cd my-app
```

### **2️⃣ Установка зависимостей**
```sh
npm install
```

### **3️⃣ Запуск локального сервера**
```sh
npm run dev
```
Приложение будет доступно по адресу **`http://localhost:5173/`**.

---

## 🚀 **Деплой на GitHub Pages**
### **Как это работает?**
1. **При пуше в `main`** → запускается **GitHub Actions**  
2. **Docker собирает Vite-приложение** и извлекает `dist/`  
3. **Файлы `dist/` загружаются в ветку `gh-pages`**  
4. **GitHub Pages разворачивает сайт**  

📜 **Файл workflow:** `.github/workflows/deploy.yml`  

---

## 🛠 **Используемые технологии**
- **React + TypeScript**
- **Redux Toolkit (RTK)**
- **React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`)**
- **Axios (запросы к GitHub API)**
- **Ленивая подгрузка репозиториев**
- **Docker + GitHub Actions (авто-деплой на GitHub Pages)**

---

## 🐳 **Docker-сборка**
Проект поддерживает **Docker**, можно запустить в контейнере:

```sh
docker build -t my-vite-app -f my-app/Dockerfile my-app/
docker run -p 8080:8080 my-vite-app
```
После этого сайт будет доступен по адресу **`http://localhost:8080/`**.

---

## 📜 **Структура проекта**
```sh
📦 frontend-javascript-test-2
├── 📂 src
│   ├── 📂 components   # UI-компоненты (RepoCard, SearchBar и др.)
│   ├── 📂 containers   # Контейнеры (SearchBarContainer)
│   ├── 📂 store        # Redux store, slices
│   ├── 📂 hooks        # Кастомные хуки (useInfiniteScroll)
│   ├── 📂 types        # TypeScript типы
│   ├── main.tsx       # Точка входа
│   ├── App.tsx        # Главный компонент
├── 📂 my-app
│   ├── Dockerfile     # Dockerfile для деплоя
│   ├── dist/          # Скомпилированные файлы для GitHub Pages
├── .github/workflows/deploy.yml  # GitHub Actions (авто-деплой)
├── package.json
├── vite.config.ts
└── README.md

📦 frontend-javascript-test-2
└── 📂 my-app
    ├── 📂 src
    │   ├── 📂 api          # Запросы к GitHub API (fetchRepos)
    │   ├── 📂 components   # UI-компоненты (RepoCard, SearchBar и др.)
    │   ├── 📂 containers   # Контейнеры (SearchBarContainer)
    │   ├── 📂 store        # Redux store, slices
    │   ├── 📂 features     # Redux slices (reposSlice, userSlice)
    │   ├── 📂 hooks        # Кастомные хуки (useInfiniteScroll)
    │   ├── 📂 types        # TypeScript типы
    │   ├── 📂 dist         # Скомпилированные файлы для GitHub Pages
    │   ├── Dockerfile         # Dockerfile для деплоя
    │   ├── package.json       # Зависимости проекта
    │   ├── vite.config.ts     # Конфигурация Vite
    │   ├── main.tsx       # Точка входа
    │   ├── App.tsx        # Главный компонент
    │
    ├── .github/workflows
    │   ├── deploy.yml     # GitHub Actions (авто-деплой на GitHub Pages)
```

---

## 📡 **API GitHub**
Приложение использует **GitHub API** для получения списка репозиториев:

```ts
axios.get(`https://api.github.com/users/${username}/repos`, {
    params: {
        per_page: 20,
        page,
        sort: 'updated',
    },
});
```
- **username** — имя пользователя GitHub  
- **per_page** — количество репозиториев на страницу  
- **page** — номер страницы  
- **sort: 'updated'** — сортировка по последним обновлениям  

---

## ⚙️ **GitHub Actions (Авто-деплой)**
При каждом пуше в `main` **GitHub Actions**:
1. **Собирает Docker-образ**
2. **Извлекает `dist/` из контейнера**
3. **Заливает `dist/` в `gh-pages`**
4. **GitHub Pages разворачивает сайт**

📜 **Файл CI/CD:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: 🚀 Checkout репозитория
        uses: actions/checkout@v3

      - name: 🛠️ Установка Docker
        uses: docker/setup-buildx-action@v2

      - name: 🏗️ Сборка Docker-образа
        run: docker build -t my-vite-app -f my-app/Dockerfile my-app/

      - name: 📦 Извлечение `dist/` из контейнера
        run: |
          CONTAINER_ID=$(docker create my-vite-app)
          docker cp $CONTAINER_ID:/app/react-app/dist ./my-app/dist
          docker rm -v $CONTAINER_ID

      - name: 🚀 Деплой на GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: my-app/dist
```

---

## 🧪 **Тестирование**
### **Как я тестировал приложение:**
1. **Ручное тестирование**  
   - Проверил поиск репозиториев для существующих и несуществующих пользователей  
   - Оценил работу бесконечной прокрутки (пагинации)  
   - Проверил отображение сообщений об ошибках  
   - Убедился, что данные обновляются корректно  
 

---

## 🤝 **Авторы**
- 👨‍💻 **[batalovmv](https://github.com/batalovmv)**  
- 📧 **Email:** batalov94@gmail.com

---

## 📜 **Лицензия**
Нет лицензий.
```

