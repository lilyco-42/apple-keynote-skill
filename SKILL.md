---
name: apple-keynote-video
description: 把任意产品/项目/工作成果做成苹果发布会风格的宣传短片。适用于"帮我做一个产品宣传片""模仿苹果风格做个视频""给我的项目做个介绍视频"等需求。核心：浅灰白背景 + 产品特写居中 + 底部字幕 + 慢节奏高级感。输出 1920x1080 / 30fps / H.264 mp4。
---

# Apple Keynote Video Skill

把任何产品、项目、工作成果，做成苹果发布会风格的宣传短片。

## 核心认知（先读，别跳过）

**苹果发布会风格 ≠ 黑底白字快切。** 真正的苹果风是：

| 维度 | 错误做法 | 正确做法 |
|---|---|---|
| 背景 | 纯黑 | **浅灰白** `#f5f5f7`，带径向渐变 |
| 构图 | 大字金句塞满全屏 | **产品特写居中漂浮**，底部字幕 |
| 画幅 | 竖屏 9:16 | **横屏 16:9**（苹果发布会比例） |
| 节奏 | 硬切快切 | **慢节奏**，每镜 4 秒，cross-fade 0.4s |
| 字幕位置 | 居中 | **底部**，像歌词一句一句砸 |
| 字重 | 800 粗体 | **600 大标题 + 300 副标题** |
| 字距 | 宽松 | **大字紧字距** `-0.03em` |
| 强调色 | 亮蓝 `#2997FF` | **苹果精确蓝** `#0071e3` |
| 缓动 | 线性 / ease-in | **cubic-bezier(0.16, 1, 0.3, 1)**（Apple expo-out） |

## 何时使用

- 用户说"帮我做个产品宣传片"
- 用户说"模仿苹果风格做个视频"
- 用户说"给我的项目/仓库/产品做个介绍视频"
- 用户给了参考视频（B 站/YouTube），让"学习这个风格"

**不要用于**：
- 用户明确要竖屏短视频（小红书/抖音 9:16）—— 改 `defaultViewport` 和尺寸即可
- 用户要快节奏卡点 MV（那是另一种风格）
- 用户要真人出镜实拍

## 工作流（7 步，严格按顺序）

### 1. 读产品真实内容（最关键，别跳过）

**先读用户的产品 README / 仓库 / 文档，搞清楚到底是什么。** 不要瞎猜产品定位。

```bash
# 读 GitHub README
curl -s https://raw.githubusercontent.com/<user>/<repo>/main/README.md
```

**教训**：v1-v3 全错，因为没读 README，把"AI Agent 预研技能"当成了"跨平台 CLI 框架"。内容错了，风格再好也没用。

### 2. 真看参考视频（别瞎猜风格）

**不要凭"我觉得苹果风是什么样"就开做。** 真开浏览器，抓 3-5 个关键帧：

```python
# 用 computer_use_tool 或 puppeteer 打开视频，跳到 0:07 / 0:30 / 1:00 / 2:00 截图
import seed_browser_use as bu
bu.navigate('https://www.bilibili.com/video/BVxxxxxx/')
# 跳到关键时间点，截图
```

**观察清单**：
- 背景色是什么？（浅灰？纯白？纯黑？渐变？）
- 产品在画面什么位置？（居中？占满？小图标？）
- 字幕在哪？（居中？底部？顶部？）
- 节奏快还是慢？（每镜几秒？）
- 有没有转场特效？（光线？模糊？缩放？）

### 3. 设计分镜（8 镜 × 4 秒 = 32 秒，留 4 秒收尾 = 36 秒）

每镜要有：
- **画面**：什么内容（产品特写 / 终端窗口 / logo / 数据）
- **底部字幕**：一句话，关键词加粗
- **情绪**：前奏 / 推进 / 高潮 / 收尾

**推荐 8 镜结构**：

| # | 时间 | 画面 | 字幕示例 |
|---|---|---|---|
| 1 | 0-4s | 开场金句（大字） | "Don't build what's already built." |
| 2 | 4-8s | 安装命令终端窗口 | "One command. Every agent." |
| 3 | 8-12s | 核心流程图（OODA / 步骤） | "A military loop for your code." |
| 4 | 12-16s | 5 步工作流卡片 | "Five steps. Twelve lines." |
| 5 | 16-20s | 生态/兼容性网格 | "Works with every agent you use." |
| 6 | 20-24s | 金句（原则/态度） | "If it's 80% covered, don't build it." |
| 7 | 24-28s | 品牌 logo（彩虹渐变） | "Research before building." |
| 8 | 28-36s | GitHub 链接 / 收尾 | "github.com/<user>/<repo>" |

### 4. 写 HTML（纯静态，JS 驱动时间线）

**模板见 `resources/template.html`。** 核心结构：

```html
<!-- 浅灰白背景 -->
<div id="stage" style="background: radial-gradient(ellipse at 50% 40%, #fff, #f5f5f7 60%, #e8e8ed);">

  <!-- 每个分镜一个 layer -->
  <div class="layer" id="s1">...产品特写...</div>
  <div class="layer" id="s2">...终端窗口...</div>
  ...

  <!-- 底部字幕 -->
  <div class="lyric" id="l1">...</div>
  ...
</div>

<script>
// setTime(t) 驱动所有动画
function render(t) {
  // cross-fade: 0.4s 入场，0.4s 出场
  // scale: 0.985 → 1.0
}
window.setTime = render;
</script>
```

**关键 CSS**：
```css
.layer { position: absolute; inset: 0; opacity: 0; }
.lyric { position: absolute; bottom: 130px; width: 100%; text-align: center;
  font-size: 60px; font-weight: 300; letter-spacing: -0.015em; }
.hero { font-size: 150px; font-weight: 600; letter-spacing: -0.03em; }
.blue { color: #0071e3; }
.rainbow { background: linear-gradient(90deg, #ff2d55, #ff9500, #ffcc00, #34c759, #0a84ff, #af52de);
  -webkit-background-clip: text; color: transparent; }
```

### 5. 逐帧截图（puppeteer-core）

**用 puppeteer-core 连本机 Chrome，headless 逐帧截图。** 模板见 `resources/capture.js`。

```javascript
const puppeteer = require('puppeteer-core');
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  defaultViewport: { width: 1920, height: 1080 }
});
// 每帧调用 setTime(t)，截图
for (let i = 0; i < 1080; i++) {
  await page.evaluate(`setTime(${i/30})`);
  await page.screenshot({ path: `frames/f${String(i).padStart(5,'0')}.jpg`, quality: 90 });
}
```

**注意**：
- 1080 帧（36s × 30fps），分两段跑（每段 540 帧），防止 Chrome 挂
- 用 `start end` 参数模式，方便断点续跑

### 6. ffmpeg 合成 mp4

```bash
ffmpeg -y -framerate 30 -i frames/f%05d.jpg \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium \
  -movflags +faststart output.mp4
```

### 7. 压 BGM（可选）

```bash
# 截取 36 秒，压进去
ffmpeg -y -i video.mp4 -ss 0 -t 36 -i bgm.mp3 \
  -c:v copy -c:a aac -b:a 192k -shortest video_music.mp4
```

## 视觉规范（速查表）

| 属性 | 值 |
|---|---|
| 背景 | `radial-gradient(ellipse at 50% 40%, #ffffff 0%, #f5f5f7 60%, #e8e8ed 100%)` |
| 强调蓝 | `#0071e3` |
| 文字主色 | `#1d1d1f` |
| 文字次要 | `#86868b` |
| 大标题 | `font-size: 150px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;` |
| 副标题 | `font-size: 60px; font-weight: 300; letter-spacing: -0.015em;` |
| 底部字幕 | `position: absolute; bottom: 130px; text-align: center;` |
| 产品卡片 | `border-radius: 20px; box-shadow: 0 40px 100px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.04);` |
| 终端窗口 | `background: #1d1d1f; border-radius: 20px;`（红黄绿灯按钮） |
| 彩虹渐变 | `linear-gradient(90deg, #ff2d55, #ff9500, #ffcc00, #34c759, #0a84ff, #af52de)` |
| 缓动函数 | `cubic-bezier(0.16, 1, 0.3, 1)`（或 JS 的 `1 - Math.pow(2, -10*x)`） |
| 转场时长 | 0.4s cross-fade |
| 每镜时长 | 4s（最后一镜 8s 收尾） |

## 常见错误（别再犯）

1. **纯黑底** → 错。苹果发布会是浅灰白。
2. **竖屏** → 错。苹果风是横屏 16:9。
3. **大字金句塞满全屏** → 错。产品特写居中，字幕在底部。
4. **硬切快切** → 错。慢节奏 cross-fade。
5. **字重 800** → 错。600 就够了。
6. **字距宽松** → 错。大字要紧字距 -0.03em。
7. **没读 README 瞎猜产品** → 错。先读真实内容。
8. **没真看参考视频** → 错。抓 3-5 个关键帧再开做。

## 输出

- `output.mp4`：1920×1080，30fps，H.264，36 秒，~2MB
- `output_music.mp4`：带 BGM 版本（如果用户提供了音频）
- `output_cn.mp4`：中文版（如果用户要求多语言）

## 参考

- [emilkowalski/skills - apple-design](https://github.com/emilkowalski/skills/tree/main/skills/apple-design) —— 17 条苹果设计原则
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) —— 官方设计指南
- [参考视频："Only apple can do" / 3 Strikes](https://www.bilibili.com/video/BV1dBpRzsEsd/) —— B 站苹果二创风格
