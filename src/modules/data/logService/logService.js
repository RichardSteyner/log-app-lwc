const URL = 'https://conference-lwc-app.herokuapp.com/api/sessions';
const URL_LOG_GET = 'https://log-api-spring.herokuapp.com/logs/pagina?page=0&size=10';
const URL_LOG_FILTER_GET = 'https://log-api-spring.herokuapp.com/logs/filtrar/';
const URL_LOG_POST = 'https://log-api-spring.herokuapp.com/logs';

let logs = [];

export const getLogs = () => fetch(URL_LOG_GET)
  .then(response => {
    if (!response.ok) {
      throw new Error('No response from server');
    }
    //console.log(response.json());
    return response.json();
  })
  .then(result => {
    logs = result.content;
    console.log(result);
    return logs;
  });

export const getFilterLogs = (filtroKey) => fetch(`${URL_LOG_FILTER_GET}${filtroKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('No response from server');
    }
    //console.log(response.json());
    return response.json();
  })
  .then(result => {
    logs = result.content;
    console.log(result);
    return logs;
  });

export const postLog = (dataLog) => fetch(URL_LOG_POST,
                                          {
                                            method: 'POST',
                                            headers: {
                                                      'Content-Type': 'application/json',
                                                      'Content-Security-Policy': 'default-src \'self\' *.herokuapp.com'
                                                      },
                                            body: JSON.stringify(dataLog)
                                          })
  .then(response => {
    if (!response.ok) {
      throw new Error('No response from server');
    }
    //console.log(response.json());
    return response.json();
  })
  .then(result => {
    console.log(result);
    return result;
  });

export const getLog = logId => {
  return logs.find(l => {
    return l.id === logId;
  });
}