document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');

    document.getElementById('productId').value = productId;
    document.getElementById('productName').value = productName;

    window.supermercado.requestVendorsForProduct(productId);
});

window.supermercado.onVendorsForProductFetched((event, vendors) => {
    console.log('Vendors: ', vendors);
    const suplierSelect = document.getElementById('supplier');
    suplierSelect.innerHTML = '';

    vendors.forEach(vendor => {
        const option = document.createElement('option');
        option.value = vendor.supplier;
        option.textContent = vendor.supplier;
        suplierSelect.appendChild(option);
    });
});

window.supermercado.onVendorsFetchError((event, errorMessage) => {
    console.error('Error fetching vendors:', errorMessage);
})


const form = document.querySelector('form');
const errorMessage = document.getElementById('error-message')

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const productId = document.getElementById('productId').value;
    const supplier = document.getElementById('supplier').value;
    const quantity = document.getElementById('quantity').value;
    let order = {
        valid: false,
        errorMessage: null,
        details: {
            productId: productId,
            supplier: supplier,
            quantity: quantity
        }
    };

    supermercado.checkOrders(productId, supplier);
    supermercado.orderExists((event, alreadyExists) => {
        console.log(alreadyExists)
        console.log(isNaN(order.details.quantity))
        if (isNaN(order.details.quantity) || order.details.quantity === "") {
            order.errorMessage = "Por favor, ingrese una cantidad.";
        } else if (order.details.quantity <= 0 && !order.errorMessage) {
            order.errorMessage = "Para hacer un pedido la cantidad debe ser mayor a 0.";
        } else if (alreadyExists && !order.errorMessage) {
            order.errorMessage = "ya existe un pedido para este producto con proveedor " + supplier;
        } else {
            order.valid = true;
            console.log(order);
        }
        errorMessage.textContent = '';
        
        
        if (!order.valid) {
            errorMessage.textContent = order.errorMessage
            console.log(order.errorMessage)
        } else if (confirm("¿Estás seguro de enviar el pedido?")) {
            errorMessage.textContent = "Su orden esta siendo procesada. Por favor, espera mientras regresamos a la pantalla anterior..."
            setTimeout(() => {
                confirmOrder(order);
                window.location.href = 'pantallaDos.html'
            }, 5000);
        }
    });
});


const returnButton = document.getElementById('returnButton')

returnButton.addEventListener('click', function (event) {
    errorMessage.textContent = "Regresando a pantalla anterior"
    setTimeout(() => {
        window.location.href = 'pantallaDos.html'
    }, 2000);
})

async function verifyOrder() {

}



function confirmOrder(order) {
    const userID = window.localStorage.getItem('userID'); // Retrieve stored user ID
    window.supermercado.saveOrder(order.details.productId, order.details.supplier, order.details.quantity, userID);
}

