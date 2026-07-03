const API_URL = 'https://chamabebidas.com.br/api';

export async function getOrders() {
  try {
    const response = await fetch(`${API_URL}/orders`);

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateOrder(id, data) {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
