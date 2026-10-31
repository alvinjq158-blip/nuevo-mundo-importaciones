# 🛍️ NUEVO MUNDO IMPORTACIONES - Tienda Digital

Plataforma de comercio electrónico para importadora y distribuidora mayorista y minorista ubicada en **El Alto - La Paz, Bolivia**.

![Estado](https://img.shields.io/badge/Estado-Listo%20para%20Producci%C3%B3n-success?style=for-the-badge)
![Bolivia](https://img.shields.io/badge/Mercado-Bolivia%20%F0%9F%87%A7%F0%9F%87%B4-red?style=for-the-badge)
![Pagos](https://img.shields.io/badge/Pagos-QR%20Simple%20Bolivia-blue?style=for-the-badge)

---

## 🚀 Características Principales

- **📱 Sistema de Pagos con QR Simple Bolivia:**
  - Cálculo dinámico del total con flete según departamento.
  - Generación de código QR Simple compatible con todos los bancos de Bolivia (Banco Unión, BCP, BNB, Banco FIE, Banco Sol, Mercantil Santa Cruz, Bisa, Económico, Tigo Money).
  - Glosa de pago individualizada (`PEDIDO-NM-XXXX`) y botones de un solo toque para copiar monto y glosa.
  - Opción para subir la imagen real del QR del banco del negocio desde el panel admin.
- **⚙️ Panel de Administración para el Emprendedor:**
  - Acceso con PIN de seguridad (por defecto: `1234`).
  - **Subida de productos:** Permite cargar fotos desde el celular o computadora (conversión a Base64 automática sin requerir servidor backend).
  - Control de inventario en tiempo real con botones rápidos de ajuste `+` y `-`.
  - Registro de pedidos recibidos con filtros de estado (*Pendiente, Pagado, Entregado, Cancelado*) y botón para chatear directamente por WhatsApp con el cliente.
  - Copias de seguridad automáticas en formato `.json` (exportar/importar).
- **❤️ Lista de Favoritos (Wishlist):**
  - Guarda artículos preferidos y pásalos al carrito de compras con un clic.
- **🔥 Ofertas Flash con Contador Regresivo:**
  - Sección de promociones con cuenta regresiva para aumentar la conversión.
- **🏬 Sucursal Física Matriz en El Alto:**
  - Ubicación física en **Av. Franco Valle, Calle 5, El Alto - La Paz**.
- **📦 Soporte de Envíos Nacionales:**
  - Envíos locales en El Alto / La Paz y encomiendas a terminal para el resto de los departamentos de Bolivia.

---

## 🛠️ Tecnologías

- **Frontend:** HTML5 Semántico, CSS3 Moderno (Custom Properties, Flexbox, CSS Grid, Glassmorphism).
- **Interactividad:** JavaScript ES6+ Vanilla reactivo sin dependencias pesadas.
- **Persistencia:** `localStorage` local para sincronización de catálogo, carrito, favoritos y pedidos.
- **Generación QR:** Integración con `QRCode.js` + fallback dinámico.
- **Impresión:** Hojas de estilo `@media print` para tickets de venta digitales.
- **Despliegue:** Optimizado para Vercel (`vercel.json` incluido).

---

## 💻 Despliegue en Vercel

1. Sube este repositorio a tu cuenta de GitHub.
2. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New... > Project"** y selecciona este repositorio.
4. Presiona **"Deploy"** (no requiere comandos de build ni configuración adicional).
5. ¡Tu tienda estará online con HTTPS y dominio gratuito `.vercel.app`!

---

© 2026 **Nuevo Mundo Importaciones** · El Alto, Bolivia.
