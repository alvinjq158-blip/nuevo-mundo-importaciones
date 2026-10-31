$(document).ready(function () {
  renderCartDropdown();
  const firstCard = document.querySelector(".category-card"); // primer div
  if (firstCard) {
    cambiarSucursal(0, firstCard, ""); // envías el elemento real
  }
  let sucursalGuardada = localStorage.getItem("sucursalSeleccionada");
  if (sucursalGuardada) {
    $("#sucursal").val(sucursalGuardada);
  }
  cambiarDatosSucursal();
  //vaciarCarrito();
});
function guardarSucursal() {
  let sucursalNueva = $("#sucursal").val();
  let sucursalActual = localStorage.getItem("sucursalSeleccionada");
  // Si es la misma sucursal no hacer nada
  if (String(sucursalNueva) === String(sucursalActual)) {
    return;
  }
  Swal.fire({
    title: "¿Cambiar sucursal?",
    text: "Si cambias de sucursal se perderán los productos cargados en el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cambiar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      let sucursal = $("#sucursal").val();
      localStorage.setItem("sucursalSeleccionada", sucursal);
      cambiarDatosSucursal();
      localStorage.removeItem("carritoTienda");
      localStorage.setItem("carritoTienda", JSON.stringify([]));
      renderCartDropdown();
      // Mensaje éxito
      Swal.fire({
        icon: "success",
        title: "Sucursal actualizada",
        text: "Se cargaron los productos de la nueva sucursal.",
        timer: 1800,
        showConfirmButton: false,
      });
    } else {
      // Restaurar sucursal anterior
      $("#sucursal").val(sucursalActual);
    }
  });
}
function vaciarCarrito() {
  localStorage.removeItem("carritoTienda"); // Borra todo el carrito
  renderCarritoDetalle(); // Actualiza el dropdown
  document.querySelector(".cart-count").innerText = "0"; // Actualiza contador
  // Mensaje tipo toast
  mostrarMensajeCarrito("Carrito vacío", "success");
}
function cambiarDatosSucursalNombre(valor) {
  const firstCard = document.querySelector(".category-card"); // primer div
  if (firstCard) {
    cambiarSucursal(0, firstCard, valor); // envías el elemento real
  }
}
function cambiarDatosSucursal() {
  const firstCard = document.querySelector(".category-card"); // primer div
  if (firstCard) {
    cambiarSucursal(0, firstCard, ""); // envías el elemento real
  }
}
function cambiarDatosMarca(selectElement) {
  const codmarca = selectElement.value || 0; // Valor del select
  const valor = $("#searchProduct").val() || ""; // Si también quieres conservar el texto de búsqueda

  // Obtener la categoría actualmente seleccionada
  const activeCard = document.querySelector(".category-card.active");

  if (activeCard) {
    // Extraer el codfamilia desde el onclick o dataset
    const codfamilia =
      activeCard.getAttribute("onclick")?.match(/\d+/)?.[0] || 0;

    // Llamar a la función manteniendo la categoría actual
    cambiarSucursal(codfamilia, activeCard, valor, codmarca);
  }
}

function cambiarSucursal(codfamilia, el, valor = "", codmarca = 0) {
  // Quitar "active" de todas las categorías
  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.remove("active");
  });

  // Marcar la categoría actual
  el.classList.add("active");

  const sucursal = $("#sucursal").val();

  cargarsubfamilias(sucursal, codfamilia);

  $.ajax({
    url:
      "listarDatos/productosTodos.php?sucursal=" +
      sucursal +
      "&codfamilia=" +
      codfamilia +
      "&codmarca=" +
      codmarca +
      "&valor=" +
      valor,
    beforeSend: function () {
      $("#cargaProductosTodos").html(`
        <div class="text-center text-muted p-3">
          <i class="fa fa-spinner fa-spin fa-2x mb-2"></i><br>
          Cargando productos, espere un momento...
        </div>
      `);
    },
    success: function (data) {
      $("#cargaProductosTodos").fadeOut(200, function () {
        $(this).html(data).fadeIn(400);
      });
    },
    error: function () {
      $("#cargaProductosTodos").html(
        `<div class="alert alert-danger">⚠ Error al cargar los productos.</div>`,
      );
    },
  });
}
function cargarsubfamilias(sucursal, codfamilia) {
  $.ajax({
    url:
      "listarDatos/productosSubfamilias.php?sucursal=" +
      sucursal +
      "&codfamilia=" +
      codfamilia,
    beforeSend: function () {
      $("#cargaSubfamilias").html(`
        <div class="text-center text-muted p-3">
          <i class="fa fa-spinner fa-spin fa-2x mb-2"></i><br>
          Cargando datos, espere un momento...
        </div>
      `);
    },
    success: function (data) {
      $("#cargaSubfamilias").fadeOut(200, function () {
        $(this).html(data).fadeIn(400);
      });
    },
    error: function () {
      $("#cargaSubfamilias").html(
        `<div class="alert alert-danger">⚠ Error al cargar los productos.</div>`,
      );
    },
  });
}
function mostrarDatos(el, codsubfamilia, codfamilia, valor) {
  // Quitar "active" de todas las categorías
  document.querySelectorAll(".categoria-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  // Marcar la categoría actual
  el.classList.add("active");
  var sucursal = $("#sucursal").val();
  $.ajax({
    url:
      "listarDatos/productosTodosSub.php?sucursal=" +
      sucursal +
      "&codfamilia=" +
      codfamilia +
      "&valor=" +
      valor +
      "&codsubfamilia=" +
      codsubfamilia,
    beforeSend: function () {
      $("#cargaProductosTodos").html(`
        <div class="text-center text-muted p-3">
          <i class="fa fa-spinner fa-spin fa-2x mb-2"></i><br>
          Cambiando de sucursal, espere un momento...
        </div>
      `);
    },
    success: function (data) {
      $("#cargaProductosTodos").fadeOut(200, function () {
        $(this).html(data).fadeIn(400);
      });
    },
    error: function () {
      $("#cargaProductosTodos").html(
        `<div class="alert alert-danger">⚠ Error al cargar los productos.</div>`,
      );
    },
  });
}

//abrir y cerrar modal de whatsapp
// Abrir modal al hacer clic en el botón flotante
document
  .getElementById("whatsappFloatingBtn")
  .addEventListener("click", function () {
    var myModal = new bootstrap.Modal(document.getElementById("whatsappModal"));
    myModal.show();
  });

// Enviar mensaje a WhatsApp
document.getElementById("sendWhatsapp").addEventListener("click", function () {
  var message = encodeURIComponent(
    document.getElementById("whatsappMessage").value.trim(),
  );
  if (message.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Mensaje vacío",
      text: "Escribe un mensaje primero.",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  var url = `https://wa.me/591${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
  // Cerrar modal
  var modalEl = document.getElementById("whatsappModal");
  var modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
  // Limpiar textarea
  document.getElementById("whatsappMessage").value = "";
});
//script apra loging loguearse en el sistema
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const tipo = document.getElementById("tipo").value;
  const notification = document.getElementById("loginNotification");
  const loader = document.getElementById("loginLoader");
  const message = document.getElementById("loginMessage");

  // Mostrar loader
  message.textContent = "Verificando tus datos, espere un momento...";
  loader.style.display = "block";
  notification.className = "login-notification";
  notification.style.display = "block";
  notification.style.opacity = "1";

  fetch("loginHandler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password,
    )}&tipo=${encodeURIComponent(tipo)}`,
  })
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";
      message.textContent = data.message;
      notification.className =
        "login-notification " +
        (data.status === "success" ? "success" : "error");

      if (data.status === "success") {
        setTimeout(() => {
          // Cerrar modal
          const loginModal = bootstrap.Modal.getInstance(
            document.getElementById("authModal"),
          );
          if (loginModal) loginModal.hide();

          // Actualizar nav
          const navItem = document.getElementById("navUserMenu");
          navItem.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person"></i> ${data.message.split(" ")[1]}
            </a>
            <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="mis-pedidos.php">Mis pedidos</a></li>
                <li><a class="dropdown-item" href="mi-cuenta.php">Mi cuenta</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="logout.php">Cerrar sesión</a></li>
            </ul>
        `;
          setTimeout(() => {
            location.reload();
          }, 500);
        }, 1500);
      } else {
        setTimeout(() => {
          notification.style.opacity = "0";
          setTimeout(() => (notification.style.display = "none"), 500);
        }, 2500);
      }
    })
    .catch((err) => console.error(err));
});
//SCRIPTA PARA EL COROUSEL DE CATEGORIAS
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("categorySlider");
  const prevBtn = document.getElementById("prevCategories");
  const nextBtn = document.getElementById("nextCategories");

  // Ancho de cada categoría + gap
  const categoryWidth = 110 + 12; // 110px width + 12px gap

  // Número de categorías visibles según el ancho de la pantalla
  function getVisibleCategories() {
    const containerWidth = slider.parentElement.offsetWidth;
    return Math.floor(containerWidth / categoryWidth);
  }

  // Desplazamiento del slider
  function scrollSlider(direction) {
    const visibleCategories = getVisibleCategories();
    const scrollAmount = categoryWidth * visibleCategories * direction;
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  // Event listeners para los botones
  prevBtn.addEventListener("click", () => scrollSlider(-1));
  nextBtn.addEventListener("click", () => scrollSlider(1));

  // Actualizar estado de los botones según la posición del scroll
  function updateButtonStates() {
    const scrollPosition = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    prevBtn.classList.toggle("disabled", scrollPosition <= 0);
    nextBtn.classList.toggle("disabled", scrollPosition >= maxScroll);
  }

  // Inicializar estado de los botones
  updateButtonStates();

  // Actualizar estado de los botones durante el scroll
  slider.addEventListener("scroll", updateButtonStates);

  // Actualizar en redimensionamiento de ventana
  window.addEventListener("resize", updateButtonStates);
});
// Iniciar carousel automático en todas las resoluciones
var recommendedCarousel = document.querySelector("#recommendedCarousel");
var carousel = new bootstrap.Carousel(recommendedCarousel, {
  interval: 3000,
  wrap: true,
});
function actualizarCantidadCarrito(index, nuevaCantidad) {
  let carrito = JSON.parse(localStorage.getItem("carritoTienda")) || [];

  if (index >= 0 && index < carrito.length) {
    // Validar cantidad
    nuevaCantidad = parseInt(nuevaCantidad) || 1;

    if (nuevaCantidad < 1) {
      nuevaCantidad = 1;
    }

    if (nuevaCantidad > carrito[index].existencia) {
      Swal.fire({
        title: "Stock insuficiente",
        text: `Solo quedan ${carrito[index].existencia} unidades disponibles.`,
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      nuevaCantidad = carrito[index].existencia;
    }

    // Actualizar cantidad en carrito
    carrito[index].cantidad = nuevaCantidad;

    // Si cantidad es 0, eliminar del carrito
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(index);
      return;
    }

    localStorage.setItem("carritoTienda", JSON.stringify(carrito));

    // Actualizar UI del producto en la página principal
    if (typeof actualizarUIProductoDesdeCarrito === "function") {
      actualizarUIProductoDesdeCarrito(carrito[index]);
    }

    // Re-renderizar dropdown (sin cerrarlo)
    renderCartDropdown();
  }
}
function renderCartDropdown() {
  const carrito = JSON.parse(localStorage.getItem("carritoTienda")) || [];
  const container = document.getElementById("cart-items-container");
  container.innerHTML = "";

  if (carrito.length === 0) {
    container.innerHTML = `<p class='text-center mb-0 py-3'>El carrito está vacío.</p>`;
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    const precioConDescuento = item.precioventa - (item.descuento || 0);
    const subtotal = precioConDescuento * item.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add(
      "cart-item",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "mb-2",
      "p-2",
      "rounded",
      "shadow-sm",
    );
    div.style.background = "#fff";

    div.innerHTML = `
      <img src="sistema/fotos/tienda/${item.foto}" alt="${item.producto}" 
           class="rounded" style="width:50px; height:50px; object-fit:cover;">
      <div class="ms-2 me-auto" style="font-size: 14px;">
        <div class="fw-bold">${item.producto} ${
          item.codvariacion ? " | " + item.nombreVariacion : ""
        }</div>
        <div class="d-flex align-items-center mt-1" style="font-size:12px; color:#555;">
          <span class="me-2">Cantidad:</span>
          <div class="input-group input-group-sm" style="width: 90px;">
            <button type="button" class="btn btn-outline-secondary btn-cart-minus" 
                    data-index="${index}">-</button>
            <input type="text" class="form-control text-center cart-qty-input" 
                   min="1" value="${item.cantidad}" data-index="${index}">
            <button type="button" class="btn btn-outline-secondary btn-cart-plus" 
                    data-index="${index}">+</button>
          </div>
          <span class="ms-2">x ${precioConDescuento.toFixed(2)}</span>
        </div>
      </div>
      <div class="text-end" style="font-size: 14px; font-weight:bold;" id="subtotal-${index}">
        ${subtotal.toFixed(2)}
      </div>
      <button type="button" class="btn btn-sm btn-outline-danger ms-2 btn-cart-remove" 
              data-index="${index}" title="Eliminar">
        <i class="bi bi-trash"></i>
      </button>
    `;
    container.appendChild(div);
  });

  // Footer con total y botón
  const footer = document.createElement("div");
  footer.classList.add("cart-footer", "mt-2", "pt-2", "border-top");
  footer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="fw-bold">Total:</span>
      <span class="fw-bold">${total.toFixed(2)}</span>
    </div>
    <div class="d-grid gap-2">
      <button class="btn btn-success btn-cart-checkout">
        <i class="bi bi-cart-check"></i> Proceder al detalle
      </button>
    </div>
  `;
  container.appendChild(footer);

  // Configurar eventos después de crear el HTML
  configurarEventosCarrito();
}
function configurarEventosCarrito() {
  // Eventos para botones + y -
  document.querySelectorAll(".btn-cart-plus").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const index = parseInt(this.getAttribute("data-index"));
      const input = this.parentElement.querySelector(".cart-qty-input");
      const cantidadActual = parseInt(input.value) || 1;

      actualizarCantidadCarrito(index, cantidadActual + 1);
    });
  });

  document.querySelectorAll(".btn-cart-minus").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const index = parseInt(this.getAttribute("data-index"));
      const input = this.parentElement.querySelector(".cart-qty-input");
      const cantidadActual = parseInt(input.value) || 1;

      if (cantidadActual > 1) {
        actualizarCantidadCarrito(index, cantidadActual - 1);
      }
    });
  });

  // Evento para cambios manuales en el input
  document.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const index = parseInt(this.getAttribute("data-index"));
      const nuevaCantidad = parseInt(this.value) || 1;

      actualizarCantidadCarrito(index, nuevaCantidad);
    });

    // También prevenir que se cierre al hacer clic en el input
    input.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  // Evento para botón eliminar
  document.querySelectorAll(".btn-cart-remove").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const index = parseInt(this.getAttribute("data-index"));
      eliminarDelCarrito(index);
    });
  });

  // Evento para vaciar todo
  const btnClear = document.querySelector(".btn-cart-clear");
  if (btnClear) {
    btnClear.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      vaciarCarritoCompleto();
    });
  }

  // Evento para proceder al detalle
  const btnCheckout = document.querySelector(".btn-cart-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      irDetalleCarrito();
    });
  }

  // Prevenir que se cierre el dropdown al hacer clic dentro
  const cartContainer = document.getElementById("cart-items-container");
  if (cartContainer) {
    cartContainer.addEventListener("click", function (e) {
      // Solo si se hace clic en botones o inputs dentro
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "INPUT" ||
        e.target.closest("button") ||
        e.target.closest("input")
      ) {
        e.stopPropagation();
      }
    });
  }
}
// Función para eliminar un item
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carritoTienda")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carritoTienda", JSON.stringify(carrito));
  renderCartDropdown();
  actualizarContadores(); // actualizar contador del icono
}
// Función de ejemplo para ir al detalle del carrito
function irDetalleCarrito() {
  window.location.href = "carrito.php"; // Cambia a tu ruta
}
// Actualizar al cargar página
document.addEventListener("DOMContentLoaded", function () {
  renderCartDropdown();
});
// Actualizar cuando se agrega al carrito
function actualizarContadores() {
  renderCartDropdown(); // Actualizar dropdown
  // Actualizar icono
  let carrito = JSON.parse(localStorage.getItem("carritoTienda")) || [];
  document.querySelector(".cart-count").innerText = carrito.reduce(
    (sum, p) => sum + p.cantidad,
    0,
  );
}
function likeProducto(codproducto) {
  fetch("agregargusta.php?product_id=" + encodeURIComponent(codproducto))
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        let btn = document.querySelector("#btn-like-" + codproducto);

        if (btn) {
          // Cambiar a estilo "Liked"
          btn.classList.remove("btn-outline-primary");
          btn.classList.add("btn-primary");
          btn.innerHTML = '<i class="fa fa-thumbs-up mr-1"></i> Liked';

          // 🔥 Animación notoria
          btn.classList.add("btn-like-anim");

          // Eliminar animación después de ejecutarse (para poder reutilizarla si hace unlike/like)
          setTimeout(() => {
            btn.classList.remove("btn-like-anim");
          }, 500);
        }
      } else {
        console.log("Error al agregar el producto a gusta");
      }
    })
    .catch((error) => console.error("Error al agregar a gusta:", error));
}
