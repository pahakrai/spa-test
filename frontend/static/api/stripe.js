async function getStripeSessionBySessionId(sessionId) {
  const response = await fetch(
    `/api/orders/checkout-session?sessionId=${sessionId}`
  );
  const data = await response.json();
  console.log(data, "session here");
  return data;
}

const fetchCheckoutSession = async ({ quantity, bookId }) => {
  const { sessionId } = await fetch("/api/orders/create-checkout-session", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    // mode: "cors",
    // cache: "default",
    body: JSON.stringify({ quantity, bookId }),
  }).then((res) => res.json());
  return sessionId;
};

async function fetchConfig() {
  // Fetch config from our backend.
  const { publicKey } = await fetch("/api/orders/config").then((res) =>
    res.json()
  );
  return publicKey;
}

export { getStripeSessionBySessionId, fetchConfig, fetchCheckoutSession };
