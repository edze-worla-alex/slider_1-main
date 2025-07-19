# 🚗 Dynamic Carousel Guide (Vanilla JS + Tailwind CSS)

Create beautiful, responsive, and dynamic carousels for images, products, testimonials, or portfolios using **pure JavaScript** and **Tailwind CSS**.

---

## 🌟 Features

* 🎠 Multiple items carousel support
* 🖱 Clickable thumbnails
* ⏩ Next/Prev navigation
* 🔁 Infinite looping (optional)
* 🖼 Responsive & Mobile-first
* ⚡ Tailwind CSS powered
* 🔧 Easy to extend

---

## 📁 Folder Structure

```
carousel/
├── index.html
├── style.css  (Optional for customization)
└── script.js
```

---

## ⚙️ Setup

### 1. Include Tailwind CSS

Use CDN or Tailwind CLI.

**CDN (Quick Start)**

```html
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
```

### 2. HTML Markup

```html
<div class="carousel relative overflow-hidden">
  <div class="list flex transition-transform duration-500 ease-in-out">
    <div class="item flex-none w-full">
      <img src="image1.jpg" class="w-full h-64 object-cover" />
    </div>
    <div class="item flex-none w-full">
      <img src="image2.jpg" class="w-full h-64 object-cover" />
    </div>
    <!-- Add more .item as needed -->
  </div>

  <!-- Controls -->
  <button id="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2">&#10094;</button>
  <button id="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2">&#10095;</button>

  <!-- Thumbnails -->
  <div class="thumbnail flex justify-center gap-2 mt-4">
    <div class="item w-16 h-10 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500">
      <img src="image1.jpg" class="w-full h-full object-cover" />
    </div>
    <div class="item w-16 h-10 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500">
      <img src="image2.jpg" class="w-full h-full object-cover" />
    </div>
  </div>
</div>
```

---

### 3. JavaScript Functionality

```js
const list = document.querySelector('.carousel .list');
const items = document.querySelectorAll('.carousel .list .item');
const thumbnails = document.querySelectorAll('.carousel .thumbnail .item');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let activeIndex = 0;
const total = items.length;

function updateCarousel() {
  list.style.transform = `translateX(-${activeIndex * 100}%)`;
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('border-blue-500', index === activeIndex);
  });
}

// Next
next.onclick = () => {
  activeIndex = (activeIndex + 1) % total;
  updateCarousel();
};

// Prev
prev.onclick = () => {
  activeIndex = (activeIndex - 1 + total) % total;
  updateCarousel();
};

// Thumbnail Click
thumbnails.forEach((thumb, index) => {
  thumb.onclick = () => {
    activeIndex = index;
    updateCarousel();
  };
});

updateCarousel();
```

---

## 🧪 Demo

> Coming soon on CodePen or Netlify.
> Want a hosted version? Ping us!

---

## 🧰 Customization Tips

* Adjust `w-full h-64` on `.item img` for size control.
* Add text or buttons inside `.item` for slides with captions or CTAs.
* Wrap JS in a reusable `Carousel()` function for multiple instances.

---

## 📦 Optional Features

* Autoplay:

```js
setInterval(() => {
  next.click();
}, 5000);
```

* Infinite scroll: Add clones of first/last item and tweak the JS logic.

---

## 🛠️ Dependencies

* ✅ Vanilla JavaScript
* ✅ Tailwind CSS (CDN or Local)

---

## 📄 License

MIT — free to use and modify.

---

## 🙌 Credits


---

