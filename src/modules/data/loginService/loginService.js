const URL_NODE_LOGIN = 'https://steyner-server-node.herokuapp.com/api/auth/login';

let userLogin = {};

export const login = async (dataLogin) => fetch(URL_NODE_LOGIN,
                                          {
                                            method: 'POST',
                                            headers: {
                                                      'Content-Type': 'application/json'
                                                      },
                                            body: JSON.stringify(dataLogin)
                                          })
  .then(response => {
    return response.json();
  })
  .then(result => {
    userLogin = result;
    return result;
  })
  .catch(err => {
    console.error(err);
    throw new Error('No response from server');
  });

export const token = () => userLogin?.token;

export const user = () => userLogin?.usuario;