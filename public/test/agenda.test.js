// Teste de carga com K6
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 2,           
  duration: '30s',  // Definição de duração
  thresholds: {
    http_req_duration: ['p(95)<1000'], // Máximo 1000ms
    http_req_failed: ['rate<0.01'],   // Falha < 1%
  }
};

function gerarData(min = 30) {
  const d = new Date();
  d.setMinutes(d.getMinutes() + min);
  return {
    data: d.toISOString().split('T')[0],
    hora: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  };
}

export default function() {
  const baseUrl = 'http://localhost:3000';
  
  const { data, hora } = gerarData(60);
  const payload = JSON.stringify({ date: data, time: hora });
  
  const res = http.post(`${baseUrl}/schedule`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  check(res, {
    'sucesso': (r) => r.status === 200 && r.json().message.includes('agendado')
  });
  
  sleep(1);
}