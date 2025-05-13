// Импорты
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Главный компонент
import './index.css'; // Глобальные стили (если есть)

// Создание корневого элемента
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);