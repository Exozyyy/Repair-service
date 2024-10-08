const table = document.querySelector("table");

const foundOrder = document.getElementById("searchInput");
const clickFindOrder = document.getElementById("searchbtn");

clickFindOrder.addEventListener("click", async () => {
  const searchValue = foundOrder.value.toLowerCase();
  if (searchValue) {
    await searchOrder(searchValue);
  }
});

async function searchOrder(orderId) {
  try {
    const response = await fetch(`http://localhost:3000/order/${orderId}`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    table.innerHTML = `
              <tr>
                <td>${data.number}</td>
                <td>${data.startDate}</td>
                <td>${data.endDate}</td>
                <td>${data.device}</td>
                <td>${data.issue}</td>
                <td>${data.description}</td>
                <td>${data.client}</td>
                <td>${data.status}</td>
                <td>${data.master}</td>
                <td>${data.comments}</td>
              </tr>
            `;
  } catch (error) {
    console.error(error);
  }
}
async function orders() {
  try {
    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json();
    let rows = "";
    data.forEach((order) => {
      rows += `
              <tr>
                <td>${order.number}</td>
                <td>${order.startDate}</td>
                <td>${order.endDate}</td>
                <td>${order.device}</td>
                <td>${order.issue}</td>
                <td>${order.description}</td>
                <td>${order.client}</td>
                <td>${order.status}</td>
                <td>${order.master}</td>
                <td>${order.comments}</td>
              </tr>
            `;
    });
    table.innerHTML += rows;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
}
orders();
