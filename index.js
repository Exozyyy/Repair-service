const table = document.querySelector("table");
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
