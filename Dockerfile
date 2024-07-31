# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start"]
