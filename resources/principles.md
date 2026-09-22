# Apple Keynote 视觉原则（17 条精简版）

来源：[emilkowalski/skills - apple-design](https://github.com/emilkowalski/skills/tree/main/skills/apple-design)（GitHub 10.5K 星），从 WWDC 设计演讲提炼。

## 核心认知

**苹果风不是"圆角 + 毛玻璃"，而是"界面像物理世界的物体"**——有重量、有惯性、可抓取、可打断。

## 17 条原则

### 1. 响应速度（Response）
- 按下即反馈，不要等松开
- 所有延迟都要审计（debounce / 定时器 / 300ms 点击延迟）

### 2. 直接操控（Direct Manipulation）
- 触摸和内容要 1:1 跟随
- 尊重用户抓取的位置（不要跳到中心）

### 3. 可打断性（Interruptibility）—— 最重要
- 任何动画都能中途抓取并反转
- 永远从"当前屏幕值"开始动画，不要从目标值开始
- 手势反转时要混合速度，不要硬切

### 4. 弹簧物理（Springs）
- 默认：damping 1.0（无回弹）
- 有动量的手势：damping 0.8（轻微回弹）
- 参数：damping ratio + response（不是 duration）

### 5. 速度交接（Velocity Handoff）
- 手势结束时，动画要从手指的精确速度继续

### 6. 动量投影（Momentum Projection）
- 不要从松开点吸附到最近边界
- 用速度投影到最终位置，再吸附到最近锚点

### 7. 空间一致性（Spatial Consistency）
- 入退场走同一条路
- 交互要锚定到触发元素（transform-origin）

### 8. 手势方向提示
- 中间帧要指向最终结果，不是盲目插值

### 9. 橡皮筋边界（Rubber-banding）
- 边界处渐进阻力，不是硬停

### 10. 手势细节
- 点击：按下即高亮，松开才提交
- 拖动：小阈值（~10px）确认方向，然后 1:1 跟随
- 并行检测所有可能的手势

### 11. 帧级平滑（Frame Smoothness）
- 只动 transform 和 opacity
- 每帧位移低于感知阈值
- 快速运动加运动模糊

### 12. 材质与层级（Materials & Depth）
- 半透明层用 backdrop-filter
- 大表面：更深的模糊 + 更深的阴影
- 不要把两个浅色半透明层叠在一起
- 聚焦时压暗背景，并行时用偏移保留空间关系

### 13. 多模态反馈（Motion + Sound + Haptics）
- 因果性：反馈要明显对应触发事件
- 同步性：视觉/声音/触觉要在同一帧触发
- 实用性：只在有意义的时刻加反馈

### 14. 减少动态效果（Reduced Motion）
- 尊重 prefers-reduced-motion：用 cross-fade 替代 slide/spring
- 尊重 prefers-reduced-transparency：去掉半透明

### 15. 字体排印（Typography）
- 字距要随尺寸变化：大字紧（-0.02em），小字近 0
- 行高要随尺寸反变化：大标题紧，正文松
- 用 weight + size + leading 组合建立层级，不要只靠 size

### 16. 设计基础（8 条原则）
1. **目的（Purpose）**：有意图地做，决定不做什么
2. **能动性（Agency）**：让用户保持控制，提供撤销
3. **责任（Responsibility）**：为用户利益行动，隐私/安全/预览
4. **熟悉（Familiarity）**：基于已知模式，一致的位置和行为
5. **灵活（Flexibility）**：适配不同设备和能力
6. **简洁 ≠ 极简（Simplicity）**：去掉不必要的，让核心目的发光
7. **工艺（Craft）**：每个间距/时长/对齐都是刻意选择
8. **愉悦（Delight）**：前 7 条做对了的结果，不是撒彩纸

### 17. 过程（Process）
- 交互式原型比"百万静态设计"更有价值
- 设计交互和视觉要一起做
- 用真实用户测试，慢动作/逐帧审查动画

## 宣传片应用

对于宣传片（非交互），主要用到：
- **#12 材质与层级**：产品卡片带柔和阴影，半透明终端窗口
- **#15 字体排印**：大字紧字距，600/300 字重组合
- **#16.6 简洁**：每个元素要有理由，不堆砌
- **#16.7 工艺**：每个时长/间距/对齐都刻意
