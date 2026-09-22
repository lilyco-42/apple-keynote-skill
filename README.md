# apple-keynote-skill

> 把任何产品、项目、工作成果，做成**苹果发布会风格**的宣传短片。

仿 [`lyco-skill`](https://github.com/lilyco-42/lyco-skill) 结构，给 AI Agent 用的设计经验 Skill。

## 这个 Skill 干什么

输入：你的产品 README / 仓库 / 项目介绍
输出：1920×1080 / 30fps / H.264 / 36 秒 / ~2MB 的苹果发布会风格宣传片 mp4

**核心风格**：
- 浅灰白背景（`#f5f5f7`），不是纯黑
- 产品特写居中漂浮，底部字幕跟着节奏走
- 横屏 16:9，慢节奏高级感
- 苹果精确蓝 `#0071e3`，字重 600 大标题 + 300 副标题

## 为什么有这个 Skill

做宣传片最容易踩的坑：
1. **没读产品 README，瞎猜产品定位** → 内容全错
2. **没真看参考视频，凭"我觉得苹果风"瞎做** → 风格全错
3. **纯黑底 + 大字金句 + 硬切快切** → 这是 MV 风，不是苹果风

这个 Skill 把这些坑全部列出来，让 AI 一次做对。

## 安装

### Windows（PowerShell 原生，无 bash 依赖）

```powershell
# 一行安装（推荐）
git clone https://github.com/lilyco-42/apple-keynote-skill.git $env:USERPROFILE\.agents\skills\apple-keynote

# 装到所有 agent（需 node/npm）
git clone https://github.com/lilyco-42/apple-keynote-skill.git $env:USERPROFILE\.agents\skills\apple-keynote ; npx skills@latest add lilyco-42/apple-keynote-skill
```

### Linux / macOS（bash）

```bash
# 一键安装到全局技能目录
git clone https://github.com/lilyco-42/apple-keynote-skill.git ~/.agents/skills/apple-keynote

# 全支持模式：装到所有 agent（内部用 vercel-labs/skills CLI）
npx skills@latest add lilyco-42/apple-keynote-skill
```

### 全支持原理

- **Universal agents**（Codex / Gemini CLI / GitHub Copilot / OpenCode / Kimi / Amp / Replit）原生读取 `~/.agents/skills/`——装一次即全通
- **其余 30+ agent**（Claude Code / Cursor / Windsurf / Qwen / Cline / Roo 等）由 `skills` CLI 从 canonical 源建 junction/symlink 打通
- 更新技能只需改 `~/.agents/skills/apple-keynote` 一处，所有 agent 同步生效

### 依赖

- `git`（安装用）
- `node` + `npm`（跑 puppeteer-core 截图用）
- `ffmpeg`（合成 mp4 用）
- 本机 Chrome（puppeteer-core 连接用）

## 快速开始

### 1. 读产品真实内容

```bash
curl -s https://raw.githubusercontent.com/<you>/<repo>/main/README.md
```

### 2. 真看参考视频（别跳过）

用浏览器打开参考视频，跳 3-5 个关键时间点截图观察：
- 背景色？产品位置？字幕位置？节奏快慢？

### 3. 用模板

直接改 `resources/template.html`：
- 8 个分镜，每镜 4 秒
- 改文案、改产品截图、改 logo

### 4. 逐帧截图

```bash
npm install puppeteer-core
node resources/capture.js 0 539
node resources/capture.js 540 1079
```

### 5. ffmpeg 合成

```bash
ffmpeg -y -framerate 30 -i frames/f%05d.jpg \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium \
  -movflags +faststart output.mp4
```

### 6. （可选）压 BGM

```bash
ffmpeg -y -i output.mp4 -ss 0 -t 36 -i bgm.mp3 \
  -c:v copy -c:a aac -b:a 192k -shortest output_music.mp4
```

## 文件结构

```
apple-keynote-skill/
├── SKILL.md                        # 主 Skill：何时使用 + 7 步工作流 + 视觉规范
└── resources/
    ├── principles.md               # 17 条苹果设计原则（来源 emilkowalski/skills）
    ├── template.html               # 完整 HTML 模板（8 分镜，直接改文案）
    └── capture.js                  # puppeteer-core 逐帧截图脚本
```

## 视觉规范速查

| 属性 | 值 |
|---|---|
| 背景 | `radial-gradient(ellipse at 50% 40%, #fff, #f5f5f7 60%, #e8e8ed)` |
| 强调蓝 | `#0071e3` |
| 大标题 | `150px / 600 / -0.03em / 1.1` |
| 副标题 | `60px / 300 / -0.015em` |
| 产品卡片 | `border-radius: 20px; box-shadow: 0 40px 100px rgba(0,0,0,.12)` |
| 转场 | 0.4s cross-fade |
| 每镜 | 4 秒（最后一镜 8 秒收尾） |
| 总时长 | 36 秒 |
| 画幅 | 1920×1080（16:9） |

## 常见错误

| 错误 | 正确 |
|---|---|
| 纯黑底 | 浅灰白 `#f5f5f7` |
| 竖屏 9:16 | 横屏 16:9 |
| 大字金句塞满全屏 | 产品特写居中，底部字幕 |
| 硬切快切 | 慢节奏 cross-fade |
| 字重 800 | 字重 600 |
| 字距宽松 | 大字紧字距 -0.03em |
| 没读 README 瞎猜 | 先读真实内容 |
| 没真看参考视频 | 抓 3-5 个关键帧 |

## 参考

- [emilkowalski/skills - apple-design](https://github.com/emilkowalski/skills/tree/main/skills/apple-design) —— 17 条苹果设计原则
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) —— 官方设计指南
- [lyco-skill](https://github.com/lilyco-42/lyco-skill) —— 本 Skill 结构模仿的对象

## License

MIT
