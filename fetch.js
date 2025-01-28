let productos = []; // Array vacío para almacenar productos

// Cargar productos desde un archivo JSON
fetch("productos.json") // Asegúrate de colocar el archivo JSON en la misma ubicación o ajustar la ruta
  .then((response) => response.json())
  .then((data) => {
    productos = data.productos; // Asigna los productos obtenidos al array
    console.log("Productos cargados:", productos); // Para verificar en la consola
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

// Escuchar los cambios en el buscador
document.getElementById("inputSearch").addEventListener("input", function (event) {
  const query = event.target.value.toLowerCase();
  const filteredProducts = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(query)
  );
  displayResults(filteredProducts);
});

// Función para mostrar los resultados
function displayResults(filteredProducts) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = ""; // Limpia resultados previos

  if (filteredProducts.length === 0) {
    resultsContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  filteredProducts.forEach((producto) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" />
      <p>${producto.titulo}</p>
    `;

    resultsContainer.appendChild(productCard);
  });
}
