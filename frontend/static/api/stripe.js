async function getStripeSessionBySessionId(sessionId) {
  const response = await fetch(
    `/api/stripe/checkout-session?sessionId=${sessionId}`
  );
  const data = await response.json();
  return data;
}

const fetchCheckoutSession = async ({ quantity, bookId, phone, name }) => {
  const { sessionId } = await fetch("/api/stripe/create-checkout-session", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity, bookId, phone, name }),
  }).then((res) => res.json());
  return sessionId;
};

async function fetchConfig() {
  // Fetch config from our backend.
  const { publicKey } = await fetch("/api/stripe/config").then((res) =>
    res.json()
  );
  return publicKey;
}

export { getStripeSessionBySessionId, fetchConfig, fetchCheckoutSession };
