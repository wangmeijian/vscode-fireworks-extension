# VSCode Fireworks 🎆

一个有趣的 VSCode 扩展,在编辑器中放烟花庆祝!

> 此项目完全由 AI 生成,不包含任何人工编写的代码。

<img width="800" alt="2b24c599886f195060f07d19c46cc1cd" src="https://github.com/user-attachments/assets/cc2219b1-252a-4c01-9d19-f5fcdcfee8fc" />

## 功能特性

- 🎆 **全屏 Canvas 烟花动画**: 在当前编辑器标签页显示精美的 Canvas 烟花效果
- 🎨 **彩色烟花粒子**: 随机颜色的烟花和粒子动画,带发光特效
- ⭐ **物理引擎**: 粒子具有速度、加速度、重力、摩擦力和透明度衰减
- ⌨️ **快捷键支持**: `Ctrl+Shift+F` (Mac: `Cmd+Shift+F`)
- 🎉 **自动恢复**: 5秒后自动关闭并返回到原来的代码文件
- 💫 **炫酷文字**: 金色发光的"🎉 恭喜! 🎉"文字动画
- 🌈 **半透明背景**: 深色半透明背景营造夜空氛围

## 使用方法

### 方式 1: 命令面板
1. 按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) 打开命令面板
2. 输入 "Fireworks" 并选择 "🎆 Fireworks: 放烟花庆祝!"

### 方式 2: 快捷键
- Windows/Linux: `Ctrl+Shift+F`
- Mac: `Cmd+Shift+F`

烟花动画会持续 5 秒后自动关闭。

## 开发和调试

### 前置要求
- Node.js (推荐 v18+)
- Visual Studio Code

### 安装依赖
```bash
cd vscode-fireworks-extension
npm install
```

### 编译
```bash
npm run compile
```

### 调试
1. 在 VSCode 中打开 `vscode-fireworks-extension` 文件夹
2. 按 `F5` 启动扩展开发主机
3. 在新窗口中测试扩展功能

### 打包
```bash
# 安装 vsce (VSCode Extension Manager)
npm install -g @vscode/vsce

# 打包扩展
vsce package
```

这将生成一个 `.vsix` 文件,可以手动安装到 VSCode 中。

### 安装 .vsix 文件
1. 在 VSCode 中打开扩展面板
2. 点击 "..." 菜单
3. 选择 "从 VSIX 安装..."
4. 选择生成的 `.vsix` 文件

## 技术实现

- **TypeScript**: 扩展主逻辑
- **Canvas API**: 烟花粒子动画
- **Webview API**: VSCode 网页视图集成

## 烟花效果说明

烟花动画使用 Canvas 2D 上下文实现,包含:
- 火箭发射阶段(从底部升起)
- 爆炸阶段(生成 100 个粒子)
- 粒子物理(重力、摩擦力、衰减)
- 随机颜色(HSL 色彩空间)

## 自定义

你可以在 `src/extension.ts` 文件中修改:
- `setTimeout` 的时间来调整显示时长
- `particleCount` 来改变烟花粒子数量
- 颜色范围、速度参数等

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request!

---

**享受编码的乐趣! 🎉**
