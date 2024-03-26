const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const axios = require('axios');
const mysql = require('mysql2/promise');
const { ifError } = require('node:assert');
const { connect } = require('node:http2');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: true,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(app.getAppPath(), '.\\jsFiles\\preload.js')
        }

    });

    mainWindow.loadFile('.\\htmlFiles\\loginScreen.html');

};

app.whenReady().then(() => {
    ipcMain.on('get-credentials', queryEmpleados);
    ipcMain.on('get-products', retrieveProducts);
    ipcMain.on('save-changes', sendChanges);
    ipcMain.on('get-vendors-for-product', (event, productId) => { getVendors(event, productId) });
    ipcMain.on('save-order', saveOrder);
    ipcMain.on('get-duplicate-orders', getDuplicateOrders)

    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

async function saveOrder(event, productId, supplier, quantity, userID) {
    console.log('Received order details: ', productId, supplier, quantity, userID);
    const connection = await createConnection();
    try {
        const sql = 'INSERT INTO pedidos (productID, supplier, quantityOrdered, userID) VALUES (?, ?, ?, ?)';
        await connection.execute(sql, [productId, supplier, quantity, userID]);
        console.log('Order saved successfully.');
        event.sender.send('order-saved');
    } catch (error) {
        console.error('Error saving order: ', error);
    } finally {
        await connection.end();
    }
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

async function createConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Ccs3416!',
        database: 'supermercadodb'
    });
};

async function queryEmpleados(event, userID, enteredPassword) {
    const connection = await createConnection();
    try {
        const [rows, fields] = await connection.execute(
            'SELECT password FROM empleados WHERE userID = ?',
            [userID]
        );

        if (rows.length > 0 && rows[0].password === enteredPassword) {
            console.log("Password is correct. Proceeding to the next screen.");
            event.sender.send('validation-successful', userID);
        } else {
            console.log("Incorrect password.");
            event.sender.send('validation-error', 'Incorrect username/password.');
        }
    } catch (error) {
        console.error("Database Error:", error);
        event.sender.send('validation-error', 'Error during authentication.');
    } finally {
        await connection.end();
    };
};

async function retrieveProducts(event) {
    const conexion = await createConnection();
    try {
        const [result] = await conexion.query(
            'SELECT * FROM products');
        event.sender.send('products-fetched', result)
    } catch (error) {
        console.error(error);
    };
};

async function sendChanges(event, productId, productName, supplier, category, description, stock) {
    const connection = await createConnection();
    try {
        const sql = 'UPDATE products SET productName = ?, supplier = ?, category = ?, description = ?, stock = ? WHERE productID = ?';
        await connection.execute(sql, [productName, supplier, category, description, stock, productId]);
        console.log('Product updated successfully');
        event.sender.send('changes-saved');
    } catch (error) {
        console.error('Error updating product:', error);
    } finally {
        await connection.end();
    }
};

async function getVendors(event, productId) {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT supplier FROM products WHERE productID = ?', [productId]);
        console.log('Vendors for product:', rows);
        event.sender.send('vendors-for-product-fetched', rows);
    } catch (error) {
        console.error('Error fetching vendors for product: '.error);
        event.sender.send('vendors-fetch-error', error.message)
    }
}

async function getDuplicateOrders(event, productId, supplier){
    console.log("this is the product ID", productId)
    console.log("this is the supplier", supplier)
    const connection = await createConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT supplier FROM pedidos WHERE productID = ?',
            [productId]
        );
            console.log("this is what this returns", rows[0])
            const existingOrder = rows.find(order => order.supplier === supplier);
        if (existingOrder) {
            console.log("ya hay una orden existente para ese producto, con este proveedor");
            event.sender.send('order-exists', true);
        } else {
            console.log("puede procedeer");
            event.sender.send('order-exists', false);
        }
    } catch (error) {
        console.error("Database Error:", error);
    } finally {
        await connection.end();
    };
}