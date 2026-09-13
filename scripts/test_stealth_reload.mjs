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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

ws.onopen = async () => {
  try {
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        window.chrome = { runtime: {} };
      `
    });
    await send('Page.navigate', { url: 'https://airbnb-clone-umber-two.vercel.app/' });
    await sleep(4000);

    const info = await send('Runtime.evaluate', {
      expression: '({ title: document.title, bodyLength: document.body.innerHTML.length, text: document.body.innerText.substring(0, 300) })',
      returnByValue: true
    });
    console.log('Result:', JSON.stringify(info.result.value, null, 2));
    ws.close();
  } catch (err) {
    console.error(err);
    ws.close();
  }
};
