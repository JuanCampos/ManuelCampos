let productos = [];

fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


// Suponiendo que tienes una lista de productos cargados
const producto = [
    { id: 'abrigo-01', titulo: 'Amoladora', imagen: './img/electro/amoladora.jpeg' },
    { id: 'pantalon-05', titulo: 'Número y Letra', imagen: './img/libro/cuentos.jpeg' },
    // Más productos...
  ];
  
  // Simulación de búsqueda
  const inputSearch = document.getElementById('inputSearch');
  const searchResults = document.getElementById('searchResults');
  
  inputSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const resultados = productos.filter((producto) =>
      producto.titulo.toLowerCase().includes(query)
    );
  
    // Mostrar los resultados
    searchResults.innerHTML = resultados
      .map(
        (producto) => `
        <div class="product-card" data-id="${producto.id}">
          <img src="${producto.imagen}" alt="${producto.titulo}">
          <p>${producto.titulo}</p>
        </div>
      `
      )
      .join('');
  
    // Agregar evento de clic para cada producto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => {
      card.addEventListener('click', () => {
        abrirProducto(card.dataset.id);
      });
    });
  });
  
  // Función para manejar la acción al abrir el producto
  function abrirProducto(id) {
    // Aquí defines qué pasa cuando seleccionas un producto
    alert(`Abriste el producto con ID: ${id}`);
    // O rediriges a otra página:
    // window.location.href = `producto.html?id=${id}`;
  }
  
  // Función para manejar la acción al abrir el producto
function abrirProducto(id) {
    // Encuentra el producto por su ID
    const producto = productos.find((p) => p.id === id);
  
    if (producto) {
      // Cargar los detalles en el modal
      const modalDetails = document.getElementById('modalDetails');
      modalDetails.innerHTML = `
        <h2>${producto.titulo}</h2>
        <img src="${producto.imagen}" alt="${producto.titulo}" style="width: 100%; max-height: 300px; object-fit: cover; margin: 10px 0;">
        <p>${producto.descripcion}.</p>
      `;
  
      // Mostrar el modal
      const modal = document.getElementById('productModal');
      modal.style.display = 'block';
    }
  }
  
  // Cerrar el modal
  const modal = document.getElementById('productModal');
  const closeModal = document.querySelector('.close');
  
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Cerrar el modal al hacer clic fuera de él
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  