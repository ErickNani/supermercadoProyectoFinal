const saveButton = document.getElementById('saveButton')
const dbMessage = document.getElementById('db-message')

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const supplier = urlParams.get('supplier');
    const category = urlParams.get('category');
    const description = urlParams.get('description');
    const stock = urlParams.get('stock');

    document.getElementById('productId').value = productId;
    document.getElementById('productName').value = productName;
    document.getElementById('productProvider').value = supplier;
    document.getElementById('productDescription').value = description;
    document.getElementById('productCategory').value = category;
    document.getElementById('productStock').value = stock;

    document.getElementById('productId').dataset.originalValue = productId;
    document.getElementById('productName').dataset.originalValue = productName;
    document.getElementById('productProvider').dataset.originalValue = supplier;
    document.getElementById('productDescription').dataset.originalValue = description;
    document.getElementById('productCategory').dataset.originalValue = category;
    document.getElementById('productStock').dataset.originalValue = stock;
});

function resetChanges() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const supplier = urlParams.get('supplier');
    const category = urlParams.get('category');
    const description = urlParams.get('description');
    const stock = urlParams.get('stock');

    document.getElementById('productId').value = productId;
    document.getElementById('productName').value = productName;
    document.getElementById('productProvider').value = supplier;
    document.getElementById('productDescription').value = description;
    document.getElementById('productCategory').value = category;
    document.getElementById('productStock').value = stock;
}

saveButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const supplier = document.getElementById('productProvider').value;
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const stock = document.getElementById('productStock').value;

    const originalProductId = document.getElementById('productId').dataset.originalValue;
    const originalProductName = document.getElementById('productName').dataset.originalValue;
    const originalSupplier = document.getElementById('productProvider').dataset.originalValue;
    const originalCategory = document.getElementById('productCategory').dataset.originalValue;
    const originalDescription = document.getElementById('productDescription').dataset.originalValue;
    const originalStock = document.getElementById('productStock').dataset.originalValue;

    console.log('Parameters:', productId, productName, supplier, category, description, stock);

    if (productId === originalProductId &&
        productName === originalProductName &&
        supplier === originalSupplier &&
        category === originalCategory &&
        description === originalDescription &&
        stock === originalStock) {
            dbMessage.textContent = "No hay cambios registrados";
        return;
    }

    dbMessage.textContent = '';

    try {
        await window.supermercado.saveChanges(productId, productName, supplier, category, description, stock);

        await window.supermercado.onChangesSaved(() => {
            dbMessage.textContent = "Los cambios en el producto se guardaron exitosamente. Por favor, espera mientras regresamos a la pantalla anterior...";
            setTimeout(() => {
                window.location.href = 'pantallaDos.html';
            }, 5000);         
        });
    } catch (error) {
        dbMessage.textContent = "Error updating product:";
    }
})

function returnPage() {
    window.location.href = 'pantallaDos.html'
}
