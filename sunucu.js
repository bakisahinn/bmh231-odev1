
const http = require("http");
const dayjs = require("dayjs");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.method !== "GET") {
    res.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      Allow: "GET",
    });
    res.end("Bu HTTP metodu desteklenmiyor.");
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <!DOCTYPE html>
      <html lang="tr">
        <head><meta charset="UTF-8"><title>Ana Sayfa</title></head>
        <body>
          <h1>Web Programlama Ödev 1</h1>
          <p>Node.js HTTP sunucuma hoş geldiniz.</p>
          <a href="/hakkimda">Hakkımda</a>
        </body>
      </html>
    `);
    return;
  }

  if (req.url === "/hakkimda") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <!DOCTYPE html>
      <html lang="tr">
        <head><meta charset="UTF-8"><title>Hakkımda</title></head>
        <body>
          <h1>Hakkımda</h1>
          <p>Bilgisayar mühendisliği öğrencisiyim ve web geliştirme öğreniyorum.</p>
          <a href="/">Ana sayfaya dön</a>
        </body>
      </html>
    `);
    return;
  }

  if (req.url === "/api/ders") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      kod: "BMH231",
      ad: "Web Programlama",
      gun: "Cuma"
    }));
    return;
  }

  if (req.url === "/api/agep") {
    const deadline = dayjs("2026-11-01");
    const today = dayjs().startOf("day");
    const remainingDays = deadline.diff(today, "day");

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      sonTarih: "01.11.2026",
      kalanGun: remainingDays
    }));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Sayfa bulunamadı");
});

server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
