const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

async function request(url, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(baseUrl + url, {
    ...options, headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function get(url) {
  return await request(url);
}

export async function post(url, data) {
  return await request(url, {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(data),
  });
}

export async function put(url, data) {
  return await request(url, {
    method: 'PUT', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(data),
  });
}

export async function patch(url, data) {
  return await request(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function del(url) {
  return await request(url, {
    method: 'DELETE',
  });
}
