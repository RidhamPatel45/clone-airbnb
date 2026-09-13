const WebSocket = global.WebSocket;

const ws = new WebSocket('ws://127.0.0.1:9222/devtools/page/F8944E81B01C32CF9A880FD413CFD73D');

let id = 1;
function send(method, params = {}) {
  const reqId = id++;
  return new Promise((resolve, reject) => {
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === reqId) {
        ws.removeEventListener('message', handler);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: reqId, method, params }));
  });
}

ws.onopen = async () => {
  try {
    const info = await send('Runtime.evaluate', {
      expression: '({ html: document.documentElement.outerHTML.substring(0, 1000) })',
      returnByValue: true
    });
    console.log(info.result.value.html);
    ws.close();
  } catch (err) {
    console.error(err);
    ws.close();
  }
};
