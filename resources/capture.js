// capture.js — Apple Keynote 宣传片帧抓取脚本
// 用法: node capture.js [startFrame] [endFrame]
// 分两段跑：node capture.js 0 539 && node capture.js 540 1079

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// ========== 配置 ==========
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; // Windows
// const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // macOS
// const CHROME = '/usr/bin/google-chrome'; // Linux

const HTML = 'file:///' + path.resolve(__dirname, 'template.html').replace(/\\/g, '/');
const FRAMES = path.join(__dirname, 'frames');
const FPS = 30;
const DUR = 36; // 秒

const start = parseInt(process.argv[2] || '0', 10);
const end   = parseInt(process.argv[3] || String(FPS * DUR - 1), 10);

(async () => {
  fs.mkdirSync(FRAMES, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: [
      '--hide-scrollbars',
      '--disable-gpu',
      '--no-sandbox',
      '--force-color-profile=srgb'
    ]
  });

  const page = await browser.newPage();
  await page.goto(HTML, { waitUntil: 'load' });

  // 等图片加载完
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img =>
      img.complete ? 0 : new Promise(r => { img.onload = img.onerror = r; })
    ));
  });
  await new Promise(r => setTimeout(r, 300));

  const t0 = Date.now();
  for (let i = start; i <= end; i++) {
    await page.evaluate(`setTime(${(i / FPS).toFixed(4)})`);
    await page.screenshot({
      path: path.join(FRAMES, `f${String(i).padStart(5, '0')}.jpg`),
      type: 'jpeg',
      quality: 90
    });
    if (i % 90 === 0) {
      process.stdout.write(`\r${i}/${end}  ${((Date.now() - t0) / 1000).toFixed(1)}s   `);
    }
  }

  await browser.close();
  console.log('\ndone', start, '->', end);
})().catch(e => { console.error(e); process.exit(1); });
