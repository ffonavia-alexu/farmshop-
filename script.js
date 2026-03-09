// URL IP Webcam для продавца 6 (снимок с камеры)
const IP_WEBCAM_SNAPSHOT = "http://192.168.1.5:8080/shot.jpg";

// Данные по продавцам и их товарам
// В реальном проекте это мог бы быть запрос на сервер,
// здесь используем простой объект для наглядности.

const sellers = {
    1: {
        title: "Ферма «Солнечный Утёс»",
        subtitle: "Свежие молочные продукты и яйца каждый день.",
        image: "images/seller1.jpg"
    },
    2: {
        title: "Сад «Лимонная Роща»",
        subtitle: "Сладкие фрукты, домашнее варенье и свежие соки.",
        image: "images/seller2.jpg"
    },
    3: {
        title: "Огород «Зелёная Грядка»",
        subtitle: "Хрустящие овощи и свежая зелень прямо с грядки.",
        image: "images/seller3.jpg"
    },
    4: {
        title: "Пасека «Медовый Дом»",
        subtitle: "Натуральный мёд и продукты пчеловодства.",
        image: "images/seller4.jpg"
    },
    5: {
        title: "Хлебная «Золотой Колос»",
        subtitle: "Домашний хлеб и простая выпечка на закваске.",
        image: "images/seller5.jpg"
    },
    6: {
        title: "Сыроварня «Фермерский Сыр»",
        subtitle: "Ремесленные сыры из свежего молока.",
        image: IP_WEBCAM_SNAPSHOT
    },
    7: {
        title: "Фермер «Деревенское Мясо»",
        subtitle: "Охлаждённое мясо и простые колбасы.",
        image: "images/seller7.jpg"
    },
    8: {
        title: "Травы «Лимонный Луг»",
        subtitle: "Ароматные чаи и травяные сборы.",
        image: "images/seller8.jpg"
    }
};

// Находим элементы модального окна один раз

const modal = document.getElementById("sellerModal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalShowcase = document.getElementById("modalShowcase");
const videoFrame = document.getElementById("videoFrame");

/**
 * Функция открывает модальное окно и показывает витрину выбранного продавца.
 * @param {number} sellerId - номер продавца (от 1 до 8)
 */
function openSellerModal(sellerId) {
    const seller = sellers[sellerId];

    // Если продавец не найден, ничего не делаем
    if (!seller) {
        return;
    }

    // Заголовок и подзаголовок
    modalTitle.textContent = seller.title;
    modalSubtitle.textContent = seller.subtitle;

    // Показываем изображение витрины (для продавца 6 — прямой снимок с IP Webcam)
    let imageSrc = seller.image;
    if (sellerId === 6) {
        // Добавляем параметр, чтобы браузер каждый раз загружал свежий снимок
        imageSrc = IP_WEBCAM_SNAPSHOT + "?t=" + Date.now();
    }
    videoFrame.src = imageSrc;

    // Показываем модальное окно (добавляем класс)
    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
}

/**
 * Функция закрывает модальное окно.
 */
function closeSellerModal() {
    // Сбрасываем изображение
    videoFrame.src = "";
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
}

// Вешаем обработчики событий после загрузки DOM

document.addEventListener("DOMContentLoaded", () => {
    // 1. Обработка кликов по кнопкам‑продавцам
    const sellerButtons = document.querySelectorAll(".seller-card");

    sellerButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const sellerIdString = button.getAttribute("data-seller");
            const sellerId = Number(sellerIdString);
            openSellerModal(sellerId);
        });
    });

    // 2. Закрытие по крестикам и клику по фону
    const closeElements = document.querySelectorAll("[data-close-modal]");
    closeElements.forEach((element) => {
        element.addEventListener("click", () => {
            closeSellerModal();
        });
    });

    // 3. Закрытие по клавише Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSellerModal();
        }
    });
});

