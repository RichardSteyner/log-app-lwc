/*const URL = 'https://conference-lwc-app.herokuapp.com/api/sessions';
const URL_LOG_GET = 'https://log-api-spring.herokuapp.com/logs/pagina?page=0&size=20';
const URL_LOG_FILTER_GET = 'https://log-api-spring.herokuapp.com/logs/filtrar/';
const URL_LOG_POST = 'https://log-api-spring.herokuapp.com/logs';*/

//https://steyner-server-node.herokuapp.com/api/usuarios

const URL_NODE_LOG_GET = 'https://steyner-server-node.herokuapp.com/api/logs';
const URL_NODE_LOG_FILTER_GET = 'https://steyner-server-node.herokuapp.com/api/buscar/logs/';
const URL_NODE_LOG_POST = 'https://steyner-server-node.herokuapp.com/api/logs';
const URL_NODE_LOG_PUT = 'https://steyner-server-node.herokuapp.com/api/logs';

let logs = [];

export const getLogs = () => fetch(URL_NODE_LOG_GET)
  .then(response => {
    if (!response.ok) {
      throw new Error('No response from server');
    }
    //console.log(response.json());
    return response.json();
  })
  .then(result => {
    logs = result.logs;
    return logs;
  });

export const getFilterLogs = (filtroKey) => fetch(`${URL_NODE_LOG_FILTER_GET}${filtroKey}`)
  .then(response => {
    return response.json();
  })
  .then(result => {
    logs = result.results;
    return logs;
  })
  .catch(err => {
    console.error(err);
    throw new Error('No response from server');
  });

export const postLog = ( dataLog, myToken = '' ) => fetch(URL_NODE_LOG_POST,
                                          {
                                            method: 'POST',
                                            headers: {
                                                      'Content-Type': 'application/json',
                                                      'x-token' : myToken
                                                      },
                                            body: JSON.stringify(dataLog)
                                          })
  .then(response => {
    return response.json();
  })
  .then(result => {
    return result;
  })
  .catch(err => {
    console.error(err);
    throw new Error('No response from server');
  });

export const putLog = ( dataLog, myToken = '', logId ) => fetch(`${URL_NODE_LOG_PUT}/${logId}`,
                                          {
                                            method: 'PUT',
                                            headers: {
                                                      'Content-Type': 'application/json',
                                                      'x-token' : myToken
                                                      },
                                            body: JSON.stringify(dataLog)
                                          })
  .then(response => {
    return response.json();
  })
  .then(result => {
    return result;
  })
  .catch(err => {
    console.error(err);
    throw new Error('No response from server');
  });

export const getLog = logId => {
  return logs.find(l => {
    return l._id === logId;
  });
}