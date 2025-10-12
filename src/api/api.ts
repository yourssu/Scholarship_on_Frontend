import ky from 'ky';

const TIMEOUT = 1000 * 30;

const apiClient = ky.create({
  prefixUrl: 'https://usaint.ddns.net/',
  timeout: TIMEOUT,
});

export default apiClient;
