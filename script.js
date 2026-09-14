const products = [
  {
    name: "250 Hydraulic Cold Saw",
    category: "Pipe / Bar Cutting",
    desc: "Heavy-duty hydraulic cold saw designed for precise cutting of steel tubes, pipes, solid bars and structural sections.",

    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "Hydraulic Cold Saw"],
      ["Maximum Round Cutting Capacity", "Ø 80 mm"],
      ["Maximum Square Cutting Capacity", "65 × 65 mm"],
      ["Maximum Rectangular Cutting Capacity", "100 × 50 mm"],
      ["Saw Blade Diameter", "250 mm"],
      ["Blade Bore", "32 mm"],
      ["Spindle Speed", "3000 RPM"],
      ["Main Motor Power", "3 HP"],
      ["Hydraulic Motor Power", "1 HP"],
      ["Material", "Mild Steel / Stainless Steel"],
      ["Cutting Angle", "90°"],
      ["Coolant System", "Flood Cooling"],
      ["Machine Weight", "Approx. 720 kg"]
    ]
  },

  {
    name: "400 Heavy Duty Circular Saw",
    category: "Heavy Duty Cutting",
    desc: "Industrial circular saw built for continuous production cutting of heavy steel pipes, bars and fabricated sections.",

    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "Heavy Duty Circular Saw"],
      ["Maximum Round Cutting Capacity", "Ø 130 mm"],
      ["Maximum Square Cutting Capacity", "110 × 110 mm"],
      ["Maximum Rectangular Cutting Capacity", "160 × 100 mm"],
      ["Saw Blade Diameter", "400 mm"],
      ["Blade Bore", "40 mm"],
      ["Spindle Speed", "1800 RPM"],
      ["Main Motor Power", "7.5 HP"],
      ["Vice Type", "Hydraulic"],
      ["Cutting Angle", "90°"],
      ["Coolant System", "Automatic Flood Cooling"],
      ["Material", "MS / SS / Alloy Steel"],
      ["Machine Weight", "Approx. 1350 kg"]
    ]
  },

  {
    name: "350 CNC Automatic Tube Cutting System",
    category: "CNC Cutting",
    desc: "CNC-controlled tube cutting system offering automated feeding, positioning and batch cutting for high-volume manufacturing.",

    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092335397-9fa3414b3a5c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "CNC Automatic Tube Cutting"],
      ["Maximum Tube Diameter", "Ø 100 mm"],
      ["Maximum Square Tube", "80 × 80 mm"],
      ["Maximum Material Length", "6000 mm"],
      ["Minimum Cut Length", "10 mm"],
      ["Saw Blade Diameter", "350 mm"],
      ["Blade Bore", "40 mm"],
      ["Main Motor Power", "5 HP"],
      ["Feeding Motor", "Servo Motor"],
      ["Positioning Accuracy", "±0.05 mm"],
      ["Repeatability", "±0.03 mm"],
      ["Control System", "CNC + HMI"],
      ["Coolant System", "Flood Cooling"],
      ["Machine Weight", "Approx. 1600 kg"]
    ]
  },

  {
    name: "500 Twin Column Band Saw",
    category: "Band Sawing",
    desc: "Twin-column horizontal band saw developed for stable and accurate cutting of large diameter pipes, bars and metal sections.",

    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "Twin Column Horizontal Band Saw"],
      ["Maximum Round Capacity", "Ø 500 mm"],
      ["Maximum Square Capacity", "500 × 500 mm"],
      ["Blade Size", "41 × 1.3 mm"],
      ["Blade Length", "5200 mm"],
      ["Blade Speed Range", "20 – 80 m/min"],
      ["Main Motor Power", "7.5 HP"],
      ["Hydraulic Motor", "2 HP"],
      ["Vice Type", "Hydraulic"],
      ["Blade Tension", "Hydraulic"],
      ["Coolant System", "Flood Cooling"],
      ["Control", "PLC Controlled"],
      ["Machine Weight", "Approx. 3200 kg"]
    ]
  },

  {
    name: "320 Aluminium Profile Saw",
    category: "Aluminium Cutting",
    desc: "High-speed precision saw for cutting aluminium profiles, extrusion sections and non-ferrous components with clean finishes.",

    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "High Speed Aluminium Profile Saw"],
      ["Maximum Round Cutting", "Ø 110 mm"],
      ["Maximum Square Cutting", "90 × 90 mm"],
      ["Maximum Profile Width", "180 mm"],
      ["Saw Blade Diameter", "320 mm"],
      ["Blade Bore", "30 mm"],
      ["Spindle Speed", "3200 RPM"],
      ["Main Motor Power", "5 HP"],
      ["Cutting Angle", "90° / 45°"],
      ["Clamping", "Pneumatic"],
      ["Coolant System", "Mist Lubrication"],
      ["Material", "Aluminium / Brass / Copper"],
      ["Machine Weight", "Approx. 780 kg"]
    ]
  },

  {
    name: "100 Hydraulic Pipe End Chamfering Machine",
    category: "Chamfering",
    desc: "Hydraulic pipe end chamfering machine designed for fast and consistent preparation of tube and pipe ends before welding or assembly.",

    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "Hydraulic Pipe End Chamfering"],
      ["Pipe Diameter Range", "Ø 25 – 100 mm"],
      ["Maximum Wall Thickness", "10 mm"],
      ["Chamfer Type", "External / Internal"],
      ["Chamfer Angle", "30° – 45°"],
      ["Number of Cutting Heads", "2"],
      ["Spindle Speed", "2200 RPM"],
      ["Main Motor Power", "5 HP"],
      ["Hydraulic Motor", "2 HP"],
      ["Clamping", "Hydraulic"],
      ["Operation", "Semi Automatic"],
      ["Material", "MS / SS / Alloy Steel"],
      ["Machine Weight", "Approx. 950 kg"]
    ]
  },

  {
    name: "65 Compact Tube Chamfering Machine",
    category: "Chamfering",
    desc: "Compact production chamfering machine for economical and repeatable finishing of small and medium diameter tubes.",

    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "Semi Automatic Tube Chamfering"],
      ["Pipe Diameter Range", "Ø 12 – 65 mm"],
      ["Maximum Wall Thickness", "6 mm"],
      ["Chamfer Type", "External"],
      ["Chamfer Angle", "30° – 60°"],
      ["Spindle Speed", "3000 RPM"],
      ["Motor Power", "3 HP"],
      ["Clamping", "Pneumatic"],
      ["Operation", "Semi Automatic"],
      ["Material", "MS / SS / Aluminium"],
      ["Lubrication", "Manual / Optional Mist"],
      ["Machine Weight", "Approx. 420 kg"]
    ]
  },

  {
    name: "40 Tube End Notching Machine",
    category: "Notching",
    desc: "Production tube notching machine for preparing accurate saddle and end profiles used in tubular fabrication and furniture applications.",

    image: "https://images.unsplash.com/photo-1581092335397-9fa3414b3a5c?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1581092335397-9fa3414b3a5c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "Tube End Notching Machine"],
      ["Maximum Tube Diameter", "Ø 40 mm"],
      ["Minimum Tube Diameter", "Ø 10 mm"],
      ["Maximum Tube Wall Thickness", "3 mm"],
      ["Notching Width", "Up to 40 mm"],
      ["Notching Depth", "Up to 20 mm"],
      ["Spindle Speed", "2800 RPM"],
      ["Motor Power", "2 HP"],
      ["Clamping", "Pneumatic"],
      ["Operation", "Semi Automatic"],
      ["Material", "MS / SS / Aluminium"],
      ["Application", "Furniture / Fabrication / Frames"],
      ["Machine Weight", "Approx. 350 kg"]
    ]
  },

  {
    name: "FiberTube 3015 CNC Laser Cutting Machine",
    category: "Laser Cutting",
    desc: "CNC fiber laser system for precision cutting of tubes and profiles, suitable for fabrication, automotive components and industrial production.",

    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=900&q=82",

    images: [
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=90"
    ],

    specifications: [
      ["Machine Type", "CNC Fiber Laser Tube Cutter"],
      ["Maximum Round Tube Diameter", "Ø 150 mm"],
      ["Maximum Square Tube", "100 × 100 mm"],
      ["Maximum Tube Length", "6000 mm"],
      ["Laser Source", "Fiber Laser"],
      ["Laser Power", "3 kW"],
      ["Laser Wavelength", "1070 nm"],
      ["Positioning Accuracy", "±0.03 mm"],
      ["Repeatability", "±0.02 mm"],
      ["Maximum Cutting Speed", "Up to 60 m/min"],
      ["Chuck Type", "Pneumatic Rotary Chuck"],
      ["Drive System", "Servo Drive"],
      ["Control System", "CNC Controller"],
      ["Material", "MS / SS / Aluminium"],
      ["Machine Weight", "Approx. 2800 kg"]
    ]
  }
];

const grid = document.getElementById("productGrid");
const loadMore = document.getElementById("loadMore");
let visibleProducts = 6;

function renderProducts() {
  grid.innerHTML = products.slice(0, visibleProducts).map((p, i) => `
    <article id="product_${i}" class="relative product-card reveal ${i % 3 === 1 ? 'delay-1' : i % 3 === 2 ? 'delay-2' : ''}">
      <div class="relative overflow-hidden">
        <img class="product-img" src="${p.image}" alt="${p.name} placeholder photo" loading="lazy">
        <div class="product-overlay"></div>
        <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <span class="product-tag">${p.category}</span>
          </div>
          <span class="glass-badge">PRIME</span>
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-display text-lg font-extrabold leading-snug text-slate-900">${p.name}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-500">${p.desc}</p>
        <button onClick="showProductDetails(${i})" class="bg-PRIME-500 text-white border border-2 border-PRIME-700 rounded-lg py-2 px-4 transition-all ease-in-out duration-200 hover:border-PRIME-500 hover:bg-PRIME-400 hover:text-white hover:-translate-y-1 hover:scale-[1.05] active:text-white active:border-PRIME-900 active:bg-PRIME-600 active:scale-[0.9] active:-rotate-2">
          See Details
        </button>
      </div>
      </article>

      <div id="productDetail_${i}" class="hidden fixed inset-0 z-[200] items-center justify-center
           opacity-0 pointer-events-none scale-95
           transition-all duration-300 ease-out
           bg-white w-[90vw] h-[75vh] ml-[5vw] mt-[12.5vh]
           border-4 border-PRIME-500 rounded-[2.5%]">

        <div class="flex flex-row text-black justify-between border-b-4 border-PRIME-500 py-2 px-4">
          <div>
            <span class="text-slate-700 text-lg font-bold">
              FULL DETAILS 
            </span>
          </div>
          <button  onClick="closeProductDetails(${i})" >
            <span class="bg-white">
              <i class="fa-solid fa-xmark text-red-500 text-2xl transition-all ease-in-out duration-200 hover:scale-[1.5] hover:-translate-y-1 hover:text-red-700 active:scale-[0.9] active:-rotate-2 active:text-red-900"></i>
            </span>
          </button>
        </div>

        <div class="m-5 h-[calc(75vh-100px)] overflow-y-auto">

          <div>
            <h1 class="font-display text-center text-xl font-extrabold leading-snug text-slate-900">${p.name}</h1>
            <!-- IMAGE ALBUM -->
            <div class="mt-5">

              <div 
                id="gallery_${i}"
                class="relative w-full rounded-2xl overflow-hidden
                      bg-slate-100 border-2 border-slate-200
                      shadow-sm"
              >

                <!-- IMAGE VIEWPORT -->
                <div 
                  class="relative w-full h-[45vh] min-h-[280px] max-h-[600px]
                        flex items-center justify-center overflow-hidden"
                >

                  <!-- IMAGE -->
                  <img
                    id="galleryImage_${i}"
                    src="${p.images[0]}"
                    alt="${p.name} image 1"
                    class="max-w-full max-h-full object-contain
                          select-none transition-transform duration-300 ease-out
                          cursor-zoom-in"
                    draggable="false"
                  >

                  <!-- PREVIOUS BUTTON -->
                  <button
                    id="galleryPrev_${i}"
                    onclick="galleryPrevious(${i})"
                    class="absolute left-3 top-1/2 -translate-y-1/2
                          w-11 h-11 sm:w-12 sm:h-12
                          rounded-full
                          bg-white/90 backdrop-blur-sm
                          text-slate-800 shadow-lg
                          flex items-center justify-center
                          transition-all duration-200
                          hover:bg-PRIME-500 hover:text-white
                          hover:scale-110
                          active:scale-90
                          disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Previous image"
                  >
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>


                  <!-- NEXT BUTTON -->
                  <button
                    id="galleryNext_${i}"
                    onclick="galleryNext(${i})"
                    class="absolute right-3 top-1/2 -translate-y-1/2
                          w-11 h-11 sm:w-12 sm:h-12
                          rounded-full
                          bg-white/90 backdrop-blur-sm
                          text-slate-800 shadow-lg
                          flex items-center justify-center
                          transition-all duration-200
                          hover:bg-PRIME-500 hover:text-white
                          hover:scale-110
                          active:scale-90
                          disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Next image"
                  >
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>


                  <!-- IMAGE COUNTER -->
                  <div
                    id="galleryCounter_${i}"
                    class="absolute top-3 right-3
                          px-3 py-1.5
                          rounded-full
                          bg-black/60 backdrop-blur-md
                          text-white text-xs font-semibold"
                  >
                    1 / ${p.images.length}
                  </div>


                  <!-- DOTS -->
                  <div
                    id="galleryDots_${i}"
                    class="absolute bottom-3 left-1/2
                          -translate-x-1/2
                          flex items-center gap-2
                          px-3 py-2
                          rounded-full
                          bg-black/50 backdrop-blur-md"
                  >

                    ${p.images.map((_, imageIndex) => `
                      <button
                        onclick="galleryGoTo(${i}, ${imageIndex})"
                        aria-label="Go to image ${imageIndex + 1}"
                        class="gallery-dot-${i}
                              w-2 h-2 rounded-full
                              bg-white/50
                              transition-all duration-300
                              hover:bg-white hover:scale-125
                              ${imageIndex === 0 ? 'w-5 bg-white' : ''}"
                      ></button>
                    `).join("")}

                  </div>

                </div>


                <!-- TOOLBAR -->
                <div
                  class="flex flex-wrap items-center justify-center
                        gap-2 p-3
                        bg-white border-t border-slate-200"
                >

                  <!-- ZOOM OUT -->
                  <button
                    onclick="galleryZoomOut(${i})"
                    class="gallery-tool-btn"
                    title="Zoom out"
                    aria-label="Zoom out"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>


                  <!-- ZOOM LEVEL -->
                  <span
                    id="galleryZoom_${i}"
                    class="min-w-[55px] text-center
                          text-sm font-semibold text-slate-600"
                  >
                    100%
                  </span>


                  <!-- ZOOM IN -->
                  <button
                    onclick="galleryZoomIn(${i})"
                    class="gallery-tool-btn"
                    title="Zoom in"
                    aria-label="Zoom in"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>


                  <!-- RESET -->
                  <button
                    onclick="galleryReset(${i})"
                    class="gallery-tool-btn px-4"
                    title="Reset view"
                    aria-label="Reset view"
                  >
                    <i class="fa-solid fa-rotate-left mr-1"></i>
                    <span class="hidden sm:inline">Reset</span>
                  </button>


                  <!-- FULLSCREEN -->
                  <button
                    onclick="galleryFullscreen(${i})"
                    class="gallery-tool-btn"
                    title="Fullscreen"
                    aria-label="Fullscreen"
                  >
                    <i class="fa-solid fa-expand"></i>
                  </button>

                </div>

              </div>

            </div>
            <p class="mt-3 text-md leading-6 text-slate-700">
              <span class="font-bold">
                Machine Descripton: 
              </span>
              ${p.desc}
            </p>
            <p class="mt-3 text-md leading-6 text-slate-700">
              <span class="font-bold">
                Machine Category: 
              </span>
              ${p.category}
            </p>
          </div>

          <table class="mt-5 mx-auto w-full bg-white text-center
             border-2 border-PRIME-200 rounded-xl overflow-hidden
             border-separate border-spacing-0">

            <thead>
              <tr>
                <th class="border-b border-r border-PRIME-200 bg-PRIME-50 font-bold p-3">
                  PROPERTY
                </th>

                <th class="border-b border-PRIME-200 bg-PRIME-50 font-bold p-3">
                  VALUE
                </th>
              </tr>
            </thead>

            <tbody>
              ${p.specifications.map(([property, value], rowIndex) => `
                <tr class="${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}">

                  <td class="border-b border-r border-PRIME-200 p-3 font-medium">
                    ${property}
                  </td>

                  <td class="border-b border-PRIME-200 p-3">
                    ${value}
                  </td>

                </tr>
              `).join("")}
            </tbody>

          </table>
        </div>
      </div>
  `).join("");
  requestAnimationFrame(observeReveals);

  if (visibleProducts >= products.length) {
    loadMore.style.display = "none";
  }
}
renderProducts();


loadMore.addEventListener("click", () => {
  visibleProducts = products.length;
  renderProducts();
});

function showProductDetails(index) {
    const detail = document.getElementById(`productDetail_${index}`);

    if (!detail) return;

    // Initialize gallery
    initializeGallery(index);

    // First make the element exist
    detail.classList.remove("hidden");

    requestAnimationFrame(() => {
      detail.classList.remove(
        "opacity-0",
        "scale-95",
        "pointer-events-none"
      );
      
      detail.classList.add(
        "opacity-100",
        "scale-100",
        "pointer-events-auto"
      );
    });

    document.body.classList.add("overflow-hidden");
}

function closeProductDetails(index) {
    const detail = document.getElementById(`productDetail_${index}`);

    if (!detail) return;

    detail.classList.remove(
        "opacity-100",
        "scale-100",
        "pointer-events-auto"
    );

    detail.classList.add(
        "opacity-0",
        "scale-95",
        "pointer-events-none"
    );

    document.body.classList.remove("overflow-hidden");

    // Wait for the fade-out to finish
    setTimeout(() => {
        detail.classList.add("hidden");
    }, 300);
}

const galleryStates = {};

function initializeGallery(index) {
  const product = products[index];

  galleryStates[index] = {
    currentImage: 0,
    zoom: 1,
    images: product.images || [product.image]
  };

  updateGallery(index);
}


function updateGallery(index) {
  const state = galleryStates[index];

  if (!state) return;

  const image = document.getElementById(`galleryImage_${index}`);
  const counter = document.getElementById(`galleryCounter_${index}`);
  const zoomLabel = document.getElementById(`galleryZoom_${index}`);
  const prevButton = document.getElementById(`galleryPrev_${index}`);
  const nextButton = document.getElementById(`galleryNext_${index}`);

  if (!image) return;


  // Update image
  image.src = state.images[state.currentImage];

  image.alt = `${products[index].name} image ${state.currentImage + 1}`;


  // Apply zoom
  image.style.transform = `scale(${state.zoom})`;

  image.style.cursor =
    state.zoom > 1
      ? "zoom-out"
      : "zoom-in";


  // Counter
  if (counter) {
    counter.textContent =
      `${state.currentImage + 1} / ${state.images.length}`;
  }


  // Zoom percentage
  if (zoomLabel) {
    zoomLabel.textContent =
      `${Math.round(state.zoom * 100)}%`;
  }


  // Previous
  if (prevButton) {
    prevButton.disabled =
      state.currentImage === 0;
  }


  // Next
  if (nextButton) {
    nextButton.disabled =
      state.currentImage === state.images.length - 1;
  }


  // Dots
  const dots =
    document.querySelectorAll(`.gallery-dot-${index}`);

  dots.forEach((dot, dotIndex) => {

    if (dotIndex === state.currentImage) {

      dot.classList.remove("w-2");
      dot.classList.remove("bg-white/50");

      dot.classList.add("w-5");
      dot.classList.add("bg-white");

    } else {

      dot.classList.remove("w-5");
      dot.classList.remove("bg-white");

      dot.classList.add("w-2");
      dot.classList.add("bg-white/50");

    }

  });
}

function galleryPrevious(index) {

  const state = galleryStates[index];

  if (!state) return;

  if (state.currentImage > 0) {

    state.currentImage--;

    state.zoom = 1;

    updateGallery(index);
  }
}


function galleryNext(index) {

  const state = galleryStates[index];

  if (!state) return;

  if (state.currentImage < state.images.length - 1) {

    state.currentImage++;

    state.zoom = 1;

    updateGallery(index);
  }
}


function galleryGoTo(index, imageIndex) {

  const state = galleryStates[index];

  if (!state) return;

  if (
    imageIndex < 0 ||
    imageIndex >= state.images.length
  ) {
    return;
  }

  state.currentImage = imageIndex;

  state.zoom = 1;

  updateGallery(index);
}

function galleryZoomIn(index) {

  const state = galleryStates[index];

  if (!state) return;

  state.zoom = Math.min(
    state.zoom + 0.25,
    3
  );

  updateGallery(index);
}


function galleryZoomOut(index) {

  const state = galleryStates[index];

  if (!state) return;

  state.zoom = Math.max(
    state.zoom - 0.25,
    0.5
  );

  updateGallery(index);
}


function galleryReset(index) {

  const state = galleryStates[index];

  if (!state) return;

  state.zoom = 1;

  updateGallery(index);
}

function galleryFullscreen(index) {

  const gallery =
    document.getElementById(`gallery_${index}`);

  if (!gallery) return;

  if (!document.fullscreenElement) {

    gallery.requestFullscreen().catch(() => {});

  } else {

    document.exitFullscreen();

  }
}

document.addEventListener("keydown", (event) => {

  // Find currently visible product detail popup
  const openModal =
    document.querySelector(
      '[id^="productDetail_"]:not(.hidden)'
    );

  if (!openModal) return;


  const match =
    openModal.id.match(/productDetail_(\d+)/);

  if (!match) return;


  const index =
    Number(match[1]);


  if (!galleryStates[index]) return;


  switch (event.key) {

    case "ArrowLeft":
      galleryPrevious(index);
      break;

    case "ArrowRight":
      galleryNext(index);
      break;

    case "+":
    case "=":
      galleryZoomIn(index);
      break;

    case "-":
      galleryZoomOut(index);
      break;

    case "0":
      galleryReset(index);
      break;

  }

});



const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden");
  menuBtn.setAttribute("aria-expanded", String(!open));
});
document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

const header = document.getElementById("siteHeader");
const progressBar = document.getElementById("progressBar");
const backTop = document.getElementById("backTop");

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("shadow-sm", y > 10);
  backTop.classList.toggle("hidden", y < 600);

  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${Math.min(100, Math.max(0, y / total * 100))}%`;

  const sections = [...document.querySelectorAll("main section[id]")];
  let current = "home";
  sections.forEach(section => {
    if (y >= section.offsetTop - 150) current = section.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

let observed = new WeakSet();
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

function observeReveals() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (!observed.has(el)) {
      observed.add(el);
      revealObserver.observe(el);
    }
  });
}
observeReveals();

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = "1";
    const target = Number(entry.target.dataset.target);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = Math.floor(target * eased).toLocaleString("en-IN") + (target >= 250 ? "+" : "");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, {threshold:0.7});
counters.forEach(c => counterObserver.observe(c));

document.getElementById("quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  const message = document.getElementById("formMessage");
  message.textContent = "Thanks — your enquiry has been captured in this demo. Connect the form to your backend/email service for production.";
  message.classList.remove("hidden");
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

