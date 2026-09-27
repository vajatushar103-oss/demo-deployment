import axios from "axios";



// const api = axios.create({
//     baseURL: "http://localhost:5000",
//     withCredentials: true
// });

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
});


const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const productService = {
  
  getAll: () => request('/products'),
  getById: (id) => request(`/products/${id}`),
  create: (payload) => request('/products', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  update: (id, payload) => request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  }),
  remove: (id) => request(`/products/${id}`, {
    method: 'DELETE'
  })
};

export const createProduct = (payload) => {
  request('/products', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const enquiryService = {
  create: (payload) =>
    request('/enquiries', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};

export const userService = {
  getAll: async () =>{
    request('/admin/users')
    // await api.get("/admin/users");
  },
  create: (payload) => {
    request('/users', {method: 'POST',body: JSON.stringify(payload)})
    
  },
  update: async (id, payload) => {
    // await request(`/api/admin/updateUser/${id}`, { method: 'PATCH', body: JSON.stringify(payload)})
    await api.patch(
        `/api/admin/updateUser/${id}`,
        payload
      );
      // console.log("==========================CLIENT_CHECKPOINT==========================")
    }
};


export const userServiceUpdateUser = async (id, payload) => {
  try {

    // console.log("==================================================================================");
    // console.log(
    //   "DATA BEFORE API AT client/src/services/api.js => userServiceUpdateUser(): id:",
    //   id + " payload: " + payload
    // );

    // console.log("==================================================================================");


    const response = await api.patch(
      `/api/admin/updateUser/${id}`,
      payload
    );

    // console.log(
    //   "DATA AFTER API AT client/src/services/api.js => userServiceUpdateUser():",
    //   response.data
    // );

    // console.log("==================================================================================");


    return response.data;
  } catch (error) {
    // console.error(
    //   "ERROR AT client/src/services/api.js => userServiceUpdateUser():",
    //   error
    // );

    throw error;
  }
};

// export const userServiceUpdateUserAccess = async (id, payload) => {
//   try {
//     const response = await api.patch(
//       `/api/admin/updateUser/${id}`,
//       payload
//     );

//     // console.log(
//     //   "DATA AT client/src/services/api.js => userServiceUpdateUser():",
//     //   response.data
//     // );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "ERROR AT client/src/services/api.js => userServiceUpdateUser():",
//       error
//     );

//     throw error;
//   }
// };



