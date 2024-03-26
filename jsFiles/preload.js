const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('supermercado', {
    getCredentials: (userID, passwordEntered) => { ipcRenderer.send('get-credentials', userID, passwordEntered); },
    onValidationSuccess: (callback) => { ipcRenderer.on('validation-successful', callback); },
    onValidationError: (callback) => { ipcRenderer.on('validation-error', callback); },
    requestProducts: () => ipcRenderer.send('get-products'),
    onProductsFetched: (callback) => ipcRenderer.on('products-fetched', callback),
    saveChanges: (productId, productName, supplier, category, description, stock) => ipcRenderer.send('save-changes', productId, productName, supplier, category, description, stock),
    onChangesSaved: (callback) => ipcRenderer.on('changes-saved', callback),
    requestVendorsForProduct: (productId) => ipcRenderer.send('get-vendors-for-product', productId),
    onVendorsForProductFetched: (callback) => ipcRenderer.on('vendors-for-product-fetched', callback),
    onVendorsFetchError: (callback) => ipcRenderer.on('vendors-fetch-error', callback),
    saveOrder: (productId, supplier, quanity, userID) => ipcRenderer.send('save-order', productId, supplier, quanity, userID),
    checkOrders: (productId, supplier) => ipcRenderer.send('get-duplicate-orders', productId, supplier),
    orderExists: (callback) => { ipcRenderer.on('order-exists', callback); }
});