const table = document.querySelector("table");

const foundOrder = document.getElementById("searchInput");
const clickFindOrder = document.getElementById("searchbtn");

const showStat = document.getElementById("stats");
const statplacement = document.getElementById("statplace");

showStat.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/statistics");
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    if (showStat.innerText.toLowerCase() === "скрыть") {
      showStat.innerHTML = `<h2>показать статистику</h2>`;
      statplacement.innerHTML = ``;
    } else {
      showStat.innerHTML = `<h2>скрыть</h2>`;
      statplacement.innerHTML = `
        <p>Завершенных заказов: ${data.completedOrdersCount}</p>
        <p>Среднее время выполнения заказа: ${
          data.averageCompletionTime
        } дней</p>
        <p>Статистика по проблемам:</p>
        <ul>
          ${Object.entries(data.issuesStats)
            .map(([issue, count]) => `<li>${issue}: ${count}</li>`)
            .join("")}
        </ul>
      `;
    }
  } catch (e) {
    console.error(e);
  }
});

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
