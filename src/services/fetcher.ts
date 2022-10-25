import axios from 'axios';

export function getCategories() {
  return axios({
    method: 'GET',
    url: 'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories',
  });
}

export function getBooks(params: any) {
  return axios({
    method: 'GET',
    url: 'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books',
    params,
  });
}
