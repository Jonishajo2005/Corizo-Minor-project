let orders = []; 
let editIndex = null;

function renderOrders() {
    const orderTable = document.getElementById("order-table");
    orderTable.innerHTML = "";

    orders.forEach((order, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.item}</td>
            <td>${order.quantity}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td class="action">
                <button onclick="editOrder(${index})">Edit</button>
                <button onclick="deleteOrder(${index})">Delete</button>
            </td>`;
        
        orderTable.appendChild(row);
    });
}

function createOrder() {
    const id = document.getElementById("order-id").value.trim();
    const customer = document.getElementById("customer-name").value.trim();
    const item = document.getElementById("item-name").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value.trim());
    const total = parseFloat(document.getElementById("total-price").value.trim());

    if (!id || !customer || !item || isNaN(quantity) || isNaN(total)) {
        return alert("All fields are required!");
    }

    if (editIndex === null) {
        orders.push({ id, customer, item, quantity, total });
    } else {
        orders[editIndex] = { id, customer, item, quantity, total };
        editIndex = null;
    }

    document.getElementById("order-id").value = "";
    document.getElementById("customer-name").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("total-price").value = "";

    saveToLocalStorage();
    renderOrders();
}

function editOrder(index) {
    document.getElementById("order-id").value = orders[index].id;
    document.getElementById("customer-name").value = orders[index].customer;
    document.getElementById("item-name").value = orders[index].item;
    document.getElementById("quantity").value = orders[index].quantity;
    document.getElementById("total-price").value = orders[index].total;
    editIndex = index;
}

function deleteOrder(index) {
    orders.splice(index, 1);
    saveToLocalStorage();
    renderOrders();
}

function saveToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

function loadFromLocalStorage() {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) orders = JSON.parse(storedOrders);
}

loadFromLocalStorage();
renderOrders();