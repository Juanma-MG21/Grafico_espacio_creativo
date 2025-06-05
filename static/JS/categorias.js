// MODAL
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalMaterials = document.getElementById("modal-materials");
const modalMeasures = document.getElementById("modal-measures");
const thumbnailsContainer = document.getElementById("thumbnails");

// MODAL VISOR
const modalVisor = document.getElementById("modal-visor");
const visorImg = document.getElementById("visor-img");

let currentImageIndex = 0;
let allImages = [];

function openModal(imageSrc, title, description, materials, measures, thumbnails = []) {
    modal.style.display = "flex";
    modalImg.src = imageSrc;
    modalTitle.textContent = title || '';
    modalDescription.textContent = description || '';
    modalMaterials.textContent = materials || '';
    modalMeasures.textContent = measures || '';

    // Mostrar u ocultar según haya contenido
    const materialsWrapper = document.getElementById('materials-wrapper');
    const measuresWrapper = document.getElementById('measures-wrapper');

    if (materials && materials.trim() !== '') {
        modalMaterials.innerHTML = `<strong>Materiales:</strong> ${materials}`;
        materialsWrapper.style.display = 'block';
    } else {
        modalMaterials.textContent = '';
        materialsWrapper.style.display = 'none';
    }

    if (measures && !measures.includes("None")) {
        modalMeasures.innerHTML = `<strong>Medidas(CM):</strong> ${measures}`;
        measuresWrapper.style.display = 'block';
    } else {
        modalMeasures.textContent = '';
        measuresWrapper.style.display = 'none';
    }

    // Galería de imágenes secundarias
    allImages = [imageSrc, ...thumbnails.filter(t => t !== imageSrc)];
    currentImageIndex = 0;
    thumbnailsContainer.innerHTML = "";

    thumbnails.forEach((thumbSrc, i) => {
        const thumb = document.createElement("img");
        thumb.src = thumbSrc;
        thumb.classList.add("thumbnail");

        thumb.onclick = () => {
            const currentMain = modalImg.src;
            modalImg.src = thumb.src;
            thumb.src = currentMain;
            currentImageIndex = allImages.indexOf(modalImg.src);
            toggleArrows();
        };

        thumbnailsContainer.appendChild(thumb);
    });

    toggleArrows();
}

function closeModal() {
    modal.style.display = "none";
}

function openVisorModal() {
    modalVisor.style.display = "flex";
    visorImg.src = allImages[currentImageIndex];
    resetZoomAndPan();
}

function closeVisorModal() {
    modalVisor.style.display = "none";
    resetZoomAndPan();
}

function nextImage() {
    if (allImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    visorImg.src = allImages[currentImageIndex];
    resetZoomAndPan();
}

function prevImage() {
    if (allImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    visorImg.src = allImages[currentImageIndex];
    resetZoomAndPan();
}

function toggleArrows() {
    const leftArrow = document.querySelector(".arrow-left-thumb");
    const rightArrow = document.querySelector(".arrow-right-thumb");

    if (allImages.length <= 5) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'block';
    }
}

function handleGalleryClick(element) {
    const id = element.dataset.id;
    const img = element.dataset.img;
    const title = element.dataset.title;
    const description = element.dataset.description;
    const materials = element.dataset.materials;
    const measures = element.dataset.measures;

    // Verificar que los botones existen antes de asignarles valores
    const updateBtn = document.getElementById("update-button");
    const deleteForm = document.getElementById("delete-form");

    if (updateBtn && deleteForm) {
        updateBtn.href = `/actualizar/${id}`;
        deleteForm.action = `/eliminar_obra/${id}`;
    } else {
        console.warn("Botones de actualizar/eliminar no encontrados en el DOM.");
    }

    fetch(`/imagenes_secundarias/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log("Secundarias recibidas:", data);
            openModal(img, title, description, materials, measures, data || []);
        })
        .catch(err => {
            console.error("Error al obtener imágenes secundarias:", err);
            openModal(img, title, description, materials, measures, []);
        });
}

function scrollThumbnails(direction) {
    const scrollAmount = 150;
    thumbnailsContainer.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}

// ----------------------------
// ZOOM Y ARRASTRE EN VISOR
// ----------------------------
let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

const minScale = 1;
const maxScale = 3;

function applyTransform() {
    visorImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    updateCursor();
}

function updateCursor() {
    if (scale > 1) {
        visorImg.style.cursor = isDragging ? 'grabbing' : 'grab';
    } else {
        visorImg.style.cursor = 'default';
    }
}

function zoomIn() {
    if (scale < maxScale) {
        scale += 0.2;
        applyTransform();
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.2;
        if (scale <= 1) {
            scale = 1;
            translateX = 0;
            translateY = 0;
        }
        applyTransform();
    }
}

visorImg.addEventListener("mousedown", (e) => {
    if (scale <= 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    updateCursor();
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    applyTransform();
});

window.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        updateCursor();
    }
});

function resetZoomAndPan() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
}
    