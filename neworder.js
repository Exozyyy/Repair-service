const device = document.getElementById("device");
const issue = document.getElementById("issue");
const description = document.getElementById("description");
const client = document.getElementById("client");
const submitReq = document.getElementById("submitReq");

submitReq.onclick = async (event) => {
  event.preventDefault();
  if (
    device.value === "" ||
    issue.value === "" ||
    description.value === "" ||
    client.value === ""
  ) {
    alert("Заполните все поля");
    return;
  }

  const newOrder = {
    dateStarted: new Date(),
    device: device.value,
    issue: issue.value,
    description: description.value,
    client: client.value,
    status: "pending",
    master: null,
    comments: [],
  };
  try {
    const response = await fetch("http://localhost:3000/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке заявки");
    }

    alert("Заявка отправлена!");
    device.value = "";
    issue.value = "";
    description.value = "";
    client.value = "";
  } catch (error) {
    alert("Ошибка при отправке заявки");
    console.error(error);
  }
};
