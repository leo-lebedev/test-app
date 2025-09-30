# Test Order App (Vue 3 + TS)

Simple order detail form with edit/view modes, built with Vue 3, Vite, Pinia, Vue Router, and FSD-like structure.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Tech
- Vue 3, Composition API + Options API allowed (core uses Composition)
- TypeScript
- Pinia for state with localStorage persistence
- Vue Router
- Vite

## Structure (FSD-inspired)
```
src/
  pages/
    order/
      ui/OrderPage.vue
      index.ts
  widgets/
    order-form/OrderForm.vue
    order-view/OrderView.vue
  shared/
    lib/router/index.ts
    model/orderStore.ts
    style.css
```

## Features
- Toggle between Edit and View
- Required fields validation (title, city)
- Extra validation (title <= 100, weight <= 10000)
- Cancel resets unsaved changes
- Save persists to localStorage

## Notes
- Styles are minimal but grid/flex layout matches the mock roughly.
- Extend entities/validators inside `shared/model/`.
