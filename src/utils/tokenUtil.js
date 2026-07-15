export const setToken = (token) => {
  try {
	localStorage.setItem('authToken', token);
  } catch (e) {
	console.warn('Failed to set token', e);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (err) {
    console.warn('Failed to get token', err);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (err) {
    console.warn('Failed to remove token', err);
  }
};


