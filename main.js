const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
class orders {
  constructor(
    number,
    startDate = new Date(),
    endDate = new Date(),
    device,
    issue,
    description,
    client,
    status,
    master,
    comments = []
  ) {
    this.number = number;
    this.startDate = startDate;
    this.device = device;
    this.issue = issue;
    this.description = description;
    this.client = client;
    this.status = status;
    this.master = master;
    this.comments = comments;
  }
}
const CompletedOrders = [];

function calculateAverageCompletionTime() {
  const completedOrders = repositoryList.filter(
    (order) => order.status === "Completed"
  );

  if (completedOrders.length === 0) {
    return 0;
  }

  const totalCompletionTime = completedOrders.reduce((total, order) => {
    const startTime = new Date(order.startDate).getTime();
    const endTime = new Date(order.endDate).getTime();
    const timeDifference = endTime - startTime;
    return total + timeDifference;
  }, 0);

  const averageCompletionTime = totalCompletionTime / completedOrders.length;

  const averageCompletionTimeInDays =
    averageCompletionTime / (1000 * 60 * 60 * 24);
  return averageCompletionTimeInDays;
}

const repositoryList = [
  new orders(
    1,
    new Date("2022-01-01"),
    new Date("2022-01-10"),
    "iPhone 12",
    "Software Bug",
    "Crash on launch",
    "John Doe",
    "Completed",
    "John Doe",
    ["123", 123, 123]
  ),
  new orders(
    2,
    new Date("2022-01-01"),
    new Date("2022-01-10"),
    "iPad Pro",
    "Hardware Issue",
    "Battery drains quickly",
    "Jane Smith",
    "Completed",
    "Jane Smith",
    ["123", 123, 123]
  ),
  new orders(
    3,
    new Date("2022-01-01"),
    new Date("2022-01-10"),
    "Samsung Galaxy S21",
    "Software Update",
    "Performance issues",
    "Mike Johnson",
    "Completed",
    "Mike Johnson",
    ["123", 123, 123]
  ),
];

app.post("/addOrder", (req, res) => {
  const newOrder = new orders(
    repositoryList.length + 1,
    req.body.startDate,
    req.body.device,
    req.body.issue,
    req.body.description,
    req.body.client,
    req.body.status,
    req.body.master,
    req.body.comments.map((comment) => ({ text: comment }))
  );
  repositoryList.push(newOrder);
});

app.put("/editOrder", (req, res) => {
  const dto = repositoryList.findIndex(
    (order) => order.number === parseInt(req.body.number)
  );
  if (dto === -1) {
    return res.status(404).send("Order not found");
  }
  const order = repositoryList[dto];
  dto.status = order.status;
  dto.description = order.description;
  dto.master = order.master;
  dto.comments = [...dto.comments, ...req.body.comments];

  res.send(order);
});

app.get("/orders", (req, res) => {
  res.send(repositoryList);
});

app.get("/order/:number", (req, res) => {
  const order = repositoryList.find(
    (o) => o.number === parseInt(req.params.number)
  );
  if (!order) {
    return res.status(404).send("Order not found");
  }
  res.send(order);
});

app.get("/completedOrders", (req, res) => {
  const completedOrders = repositoryList.filter(
    (order) => order.status === "Completed"
  );
  res.send(completedOrders);
});

app.get("/averageCompletionTime", (req, res) => {
  const averageCompletionTime = calculateAverageCompletionTime();
  res.send(`Среднее время завершения заказов: ${averageCompletionTime} дня`);
});

app.get("/objectIssues", (req, res) => {
  const issuesStats = {};
  repositoryList.forEach((order) => {
    if (issuesStats[order.issue]) {
      issuesStats[order.issue] += 1;
    } else {
      issuesStats[order.issue] = 1;
    }
  });
  res.send(issuesStats);
});

app.listen(3000, () => {
  console.log("запущен на http://localhost:3000/");
});
