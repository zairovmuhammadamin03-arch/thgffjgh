
const cars = [
    {
        id: 1,
        brand: "Chevrolet",
        name: "Chevrolet Cobalt",
        type: "Sedan",
        year: 2024,
        fuel: "Benzin",
        price: 14000,
        description: "Kundalik foydalanish uchun qulay sedan.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        brand: "BMW",
        name: "BMW M4",
        type: "Sport",
        year: 2024,
        fuel: "Benzin",
        price: 75000,
        description: "Sport uslubi va kuchli xarakter.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        brand: "Mercedes-Benz",
        name: "Mercedes-Benz C-Class",
        type: "Sedan",
        year: 2024,
        fuel: "Benzin",
        price: 48000,
        description: "Hashamat, qulaylik va zamonaviy dizayn.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        brand: "Toyota",
        name: "Toyota Land Cruiser",
        type: "SUV",
        year: 2024,
        fuel: "Benzin",
        price: 95000,
        description: "Sayohat va uzoq yo'llar uchun qudratli SUV.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        brand: "BYD",
        name: "BYD Seal",
        type: "Elektromobil",
        year: 2025,
        fuel: "Elektr",
        price: 32000,
        description: "Zamonaviy elektr avtomobili.",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        brand: "Chevrolet",
        name: "Chevrolet Malibu",
        type: "Sedan",
        year: 2023,
        fuel: "Benzin",
        price: 26000,
        description: "Oilaviy safarlar uchun qulay avtomobil.",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        brand: "BMW",
        name: "BMW X5",
        type: "SUV",
        year: 2024,
        fuel: "Benzin",
        price: 68000,
        description: "Keng salon va kuchli dvigatel.",
        image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        brand: "BYD",
        name: "BYD Song Plus",
        type: "SUV",
        year: 2025,
        fuel: "Gibrid",
        price: 29000,
        description: "Zamonaviy krossover va qulay salon.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80"
    }
];

// Eslatma: narxlar namuna uchun berilgan.
// Ular real sotuv narxlari emas.

const carsGrid = document.getElementById("carsGrid");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const typeFilter = document.getElementById("typeFilter");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("orderForm");
const orderSummary = document.getElementById("orderSummary");

let cart = [];

// Narxni dollar ko'rinishida chiqarish
function formatPrice(price) {
    return "$" + price.toLocaleString("en-US");
}

// Mashinalarni chiqarish
function renderCars() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedType = typeFilter.value;

    const filteredCars = cars.filter(car => {
        const searchableText =
            `${car.brand} ${car.name} ${car.type}`.toLowerCase();

        const matchesSearch = searchableText.includes(searchText);
        const matchesBrand =
            selectedBrand === "all" || car.brand === selectedBrand;
        const matchesType =
            selectedType === "all" || car.type === selectedType;

        return matchesSearch && matchesBrand && matchesType;
    });

    if (filteredCars.length === 0) {
        carsGrid.innerHTML = `
            <p class="empty-message">
                Bu so'rov bo'yicha avtomobil topilmadi.
            </p>
        `;
        return;
    }

    carsGrid.innerHTML = filteredCars.map(car => `
        <article class="car-card">
            <div class="car-image">
                <img
                    src="${car.image}"
                    alt="${car.brand} ${car.name}"
                    loading="lazy"
                >
                <span class="car-type">${car.type}</span>
            </div>

            <div class="car-info">
                <h3>${car.name}</h3>
                <p class="car-description">${car.description}</p>

                <div class="car-details">
                    <span>📅 ${car.year}-yil</span>
                    <span>⛽ ${car.fuel}</span>
                </div>

                <div class="car-bottom">
                    <span class="car-price">
                        ${formatPrice(car.price)}
                    </span>

                    <button
                        class="add-button"
                        data-add="${car.id}"
                    >
                        + Savatga
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// Savatchaga mashina qo'shish
function addToCart(carId) {
    const car = cars.find(item => item.id === carId);

    if (!car) return;

    // Bitta avtomobil modelini takroran qo'shmaslik
    const alreadyAdded = cart.some(item => item.id === carId);

    if (alreadyAdded) {
        alert("Bu avtomobil allaqachon savatchada!");
        return;
    }

    cart.push(car);
    renderCart();
}

// Savatchadan mashinani olib tashlash
function removeFromCart(carId) {
    cart = cart.filter(car => car.id !== carId);
    renderCart();
}

// Jami qiymat
function getCartTotal() {
    return cart.reduce((total, car) => total + car.price, 0);
}

// Savatchani ko'rsatish
function renderCart() {
    cartCount.textContent = cart.length;
    cartTotal.textContent = formatPrice(getCartTotal());

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-message">
                Savatchangiz bo'sh. Avtomobil tanlang!
            </p>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(car => `
        <div class="cart-item">
            <div>
                <h3>${car.name}</h3>
                <p>${car.year}-yil · ${car.type}</p>
                <p>${formatPrice(car.price)}</p>
            </div>

            <button
                class="remove-button"
                data-remove="${car.id}"
            >
                O'chirish
            </button>
        </div>
    `).join("");
}

// Katalogdagi tugmalar
carsGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");

    if (!button) return;

    addToCart(Number(button.dataset.add));
});

// Savatchadagi tugmalar
cartItems.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");

    if (!button) return;

    removeFromCart(Number(button.dataset.remove));
});

// Qidiruv va filtrlar
searchInput.addEventListener("input", renderCars);
brandFilter.addEventListener("change", renderCars);
typeFilter.addEventListener("change", renderCars);

// Modal oynalar
function openModal(modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

// Savatchani ochish
cartButton.addEventListener("click", () => {
    renderCart();
    openModal(cartModal);
});

document.getElementById("closeCart").addEventListener("click", () => {
    closeModal(cartModal);
});

document.getElementById("closeOrder").addEventListener("click", () => {
    closeModal(orderModal);
});

// Tashqi maydonni bosganda oynani yopish
[cartModal, orderModal].forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

// Xarid formasiga o'tish
document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Avval savatchaga avtomobil qo'shing!");
        return;
    }

    orderSummary.textContent =
        `Tanlangan avtomobillar: ${cart.length} ta. ` +
        `Umumiy qiymati: ${formatPrice(getCartTotal())}.`;

    closeModal(cartModal);
    openModal(orderModal);
});

// Arizani yuborish — demo rejim
orderForm.addEventListener("submit", event => {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Savatchangiz bo'sh!");
        closeModal(orderModal);
        return;
    }

    const formData = new FormData(orderForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone) {
        alert("Ism va telefon raqamingizni kiriting.");
        return;
    }

    const selectedCars = cart.map(car =>
        `${car.name} — ${formatPrice(car.price)}`
    ).join("\n");

    alert(
        `Rahmat, ${name}!\n\n` +
        `Tanlangan avtomobillar:\n${selectedCars}\n\n` +
        `Umumiy summa: ${formatPrice(getCartTotal())}\n` +
        `Telefon: ${phone}\n` +
        (message ? `Izoh: ${message}\n` : "") +
        `\nArizangiz demo rejimda shakllantirildi. ` +
        `Haqiqiy sotuvchiga yuborilmadi.`
    );

    cart = [];
    renderCart();
    orderForm.reset();
    closeModal(orderModal);
});

// Boshlang'ich holat
renderCars();
renderCart();
