async function createSessionOrder(orderModel) {
  const sessionOrder = await fetch("/api/orders/create-session-order", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...orderModel }),
  }).then((res) => res.json());
  return sessionOrder;
}

export { createSessionOrder };
