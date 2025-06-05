document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll(".imagen-secundaria");
    const inputOculto = document.getElementById("imagenes_a_eliminar");

    let imagenesMarcadas = new Set();

    imagenes.forEach(div => {
        div.addEventListener("click", () => {
            const id = div.dataset.id;

            if (imagenesMarcadas.has(id)) {
                imagenesMarcadas.delete(id);
                div.classList.remove("marcada");
            } else {
                imagenesMarcadas.add(id);
                div.classList.add("marcada");
            }

            inputOculto.value = Array.from(imagenesMarcadas).join(",");
        });
    });
});
