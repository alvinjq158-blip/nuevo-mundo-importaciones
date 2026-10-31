const session_id = localStorage.getItem("session_id") || Date.now();
localStorage.setItem("session_id", session_id);

function registrarDetalle(btn) {
  const producto = btn.getAttribute("data-id");
  const key = `click_${producto}`;
  const lastClick = localStorage.getItem(key);
  const now = Date.now();

  localStorage.setItem(key, now);

  fetch("track_interaccion.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      producto: producto,
      evento: "detalle",
      session_id: session_id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ RESPUESTA:", data);

      if (data.status === "ok") {
        console.log("✔ Guardado correctamente");
      } else {
        console.warn("⚠ Error:", data.msg);
      }
    })
    .catch((error) => {
      console.error("❌ ERROR FETCH:", error);
    });
}

function registrarDetalleMas(btn) {

    const producto = btn.getAttribute("data-id");
    const url = btn.getAttribute("data-url");

    const key = `click_${producto}`;
    const now = Date.now();

    localStorage.setItem(key, now);

    fetch("track_interaccion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            producto: producto,
            evento: "click",
            session_id: session_id
        }),
    })
    .then(res => res.json())
    .then(data => {

        console.log("✅ RESPUESTA:", data);

        // Redireccionar aunque haya error de guardado
        window.open(url, "_blank");

    })
    .catch(error => {

        console.error("❌ ERROR FETCH:", error);

        // Igual abrir el detalle
        window.open(url, "_blank");

    });
}