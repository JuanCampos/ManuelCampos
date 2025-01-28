
document.getElementById("inputSearch").addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase();
    const filteredProducts = productos.filter((producto) =>
      producto.titulo.toLowerCase().includes(query)
    );
    displayResults(filteredProducts);
  });
  
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
  