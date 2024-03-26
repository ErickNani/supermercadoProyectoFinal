
document.addEventListener('DOMContentLoaded', async () => {
    await window.supermercado.requestProducts();
    window.supermercado.onProductsFetched((event, data) => {
        console.log('Received products:', data);
        const table = document.querySelector('.container');
        const tbody = table.querySelector('tbody');

        tbody.innerHTML = "";
        console.log(data);
        data.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${product.productID}</td>
            <td>${product.productName}</td>
            <td>${product.supplier}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.description}</td>
            <td>
                <div class="button-container">
                    <button onclick="editProduct(${product.productID},'${product.productName}','${product.supplier}','${product.category}','${product.description}',${product.stock})">Editar</button>
                    <button onclick="placeOrder(${product.productID},'${product.productName}')">Solicitar Pedido</button>
                </div>
            </td>
        `;
            tbody.appendChild(tr);
        });
    });
})


function editProduct(productId, productName, supplier, category, description, stock) {
    window.location.href = `editScreen.html?id=${productId}&name=${encodeURIComponent(productName)}&supplier=${encodeURIComponent(supplier)}&category=${encodeURIComponent(category)}&description=${encodeURIComponent(description)}&stock=${encodeURIComponent(stock)}`;
}

function placeOrder(productId, productName) {
    window.location.href = `orderScreen.html?id=${productId}&name=${encodeURIComponent(productName)}`;
}

