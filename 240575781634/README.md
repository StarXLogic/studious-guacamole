# 宜宾竹文化博物馆互动应用

## 项目概述
这是一个展示宜宾竹文化的互动网站，包含AR绘画、社区画廊、文化学习和廉洁文化四大功能模块。

## 开发环境搭建

### 必需工具
1. [Node.js](https://nodejs.org/) (建议v18+)
2. 代码编辑器（如[VS Code](https://code.visualstudio.com/)）
3. [Git](https://git-scm.com/)（可选）

### 安装步骤
1. 克隆仓库：
   ```bash
   git clone <仓库地址>
   ```
2. 安装依赖：
   ```bash
   pnpm install
   ```
3. 启动开发服务器：
   ```bash
   pnpm dev
   ```

## 项目结构
- `src/` - 源代码目录
  - `components/` - 可复用组件
  - `pages/` - 页面组件
  - `lib/` - 工具函数和常量
- `public/` - 静态资源

## 技术栈
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Three.js (AR功能)

## 部署说明
1. 构建生产版本：
   ```bash
   pnpm build
   ```
2. 将`dist`目录上传至任意静态网站托管服务

## 使用说明
- 直接在浏览器中访问即可使用所有功能
- AR绘画功能需要设备支持摄像头和WebGL
