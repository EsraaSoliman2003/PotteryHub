# Next.js E-Commerce Store 🛒

A simple, clean e-commerce store built with **Next.js (App Router)** and **Tailwind CSS**.  
This project is designed as a **portfolio-ready template** and a solid starting point for a real online shop.

---

## ✨ Features

- Home page with:
  - Hero section
  - Featured products
  - Categories
  - Call-to-action section
- Products listing page
- Product details page (`/products/[id]`)
- Shopping cart page
- Profile page with demo user info & orders
- Auth pages:
  - Login
  - Register
- Shared UI components (Button, Input, Select, Loader, EmptyState, etc.)
- Clean layout with header & footer
- Responsive design using Tailwind CSS
- Demo data (no real backend) – easy to connect to an API later

---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/) – App Router
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- JavaScript (no TypeScript in this setup)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nextjs-store.git
cd nextjs-store
```

*(Change the URL to your real GitHub repo if you host it online.)*

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The app will reload automatically as you edit the code.

---

## 📁 Project Structure

```text
src/
  app/
    layout.jsx              # Root layout (HTML & <body>)
    page.jsx                # Home page

    about/
      page.jsx              # About page

    contact/
      page.jsx              # Contact page

    products/
      page.jsx              # Products listing page
      [id]/
        page.jsx            # Product details page

    cart/
      page.jsx              # Cart page

    profile/
      page.jsx              # Profile page

    auth/
      login/
        page.jsx            # Login page
      register/
        page.jsx            # Register page

  components/
    layout/
      Header.jsx
      Footer.jsx
      MainLayout.jsx

    home/
      HeroSection.jsx
      FeaturedProducts.jsx
      CategoriesSection.jsx
      CTASection.jsx

    products/
      ProductsList.jsx
      ProductCard.jsx
      ProductFilters.jsx
      ProductGrid.jsx

    product-details/
      ProductImagesGallery.jsx
      ProductInfo.jsx
      ProductActions.jsx
      RelatedProducts.jsx

    cart/
      CartItem.jsx
      CartSummary.jsx
      CartList.jsx

    profile/
      ProfileInfo.jsx
      OrdersList.jsx
      AddressBook.jsx

    auth/
      LoginForm.jsx
      RegisterForm.jsx

    shared/
      Button.jsx
      Input.jsx
      Select.jsx
      SectionTitle.jsx
      Loader.jsx
      EmptyState.jsx
```

---

## 🧪 Available Scripts

In the project directory, you can run:

```bash
npm run dev
```

Runs the app in development mode.  
Open `http://localhost:3000` to view it in the browser.

```bash
npm run build
```

Builds the app for production.

```bash
npm start
```

Runs the production build.

```bash
npm run lint
```

Runs ESLint to check for code issues.

---

## 🔗 Routing Overview

- `/` – Home
- `/about` – About
- `/contact` – Contact
- `/products` – Products list
- `/products/[id]` – Product details
- `/cart` – Cart
- `/profile` – Profile (demo)
- `/auth/login` – Login
- `/auth/register` – Register

---

## 🧩 Demo Data

This project uses **static demo data** inside components such as:

- `ProductsList.jsx`
- `CartList.jsx`
- `ProfileInfo.jsx`
- `OrdersList.jsx`

You can replace this with:

- API calls (REST/GraphQL)
- A real database (Prisma, MongoDB, etc.)
- A headless CMS (Strapi, Sanity, Contentful…)

---

## 🎨 Styling

All styling is handled with **Tailwind CSS**.

Global Tailwind setup lives in:

- `tailwind.config.js`
- `postcss.config.js`
- `src/app/globals.css` (or similar)

You can customize colors, typography, and spacing directly in `tailwind.config.js`.

---

## 🛠 How to Customize

- **Change branding (logo/name):**
  - Edit `Header.jsx`, `Footer.jsx`, and text in `HeroSection.jsx`.
- **Change featured products:**
  - Update the `dummyFeatured` array in `FeaturedProducts.jsx`.
- **Change demo products:**
  - Edit `DEMO_PRODUCTS` in `ProductsList.jsx`.
- **Change demo cart items:**
  - Edit `DEMO_CART` in `CartPage` and `CartList.jsx`.
- **Change demo user & orders:**
  - Edit data in `ProfileInfo.jsx` and `OrdersList.jsx`.

---

## ✅ Next Steps / Ideas

- Connect products to a real API or database.
- Add authentication (NextAuth, JWT, etc.).
- Persist cart data using localStorage or a backend.
- Add checkout and payment integration.
- Add admin dashboard to manage products and orders.

---

## 📄 License

This project can be used as a learning resource, portfolio template, or base for your own e-commerce app.  
Feel free to modify and extend it as you like.
