# QuantClass Smart

AI 智能助手浏览器扩展 — 网页摘要、PDF 分析、AI 聊天、知识库管理。

## 版本

| 组件 | 版本 |
|------|------|
| 前端 (Chrome Extension) | v0.2.2 |
| 后端 (FastAPI) | v0.2.4 |

## 项目结构

```
.
├── extension/          # Chrome 浏览器扩展 (前端)
│   ├── manifest.json   # 扩展配置 (Manifest V3)
│   ├── build/          # 构建产物 (popup, content, service-worker)
│   └── icons/          # 扩展图标
├── backend/            # FastAPI 后端服务
│   ├── main.py         # 应用入口
│   ├── config.py       # 配置管理 (支持多 LLM 提供商)
│   ├── routers/        # API 路由 (auth, chat, knowledge, search, PDF, agent 等)
│   ├── models/         # 数据模型
│   ├── database/       # SQLite 数据库
│   ├── llm/            # LLM 适配层
│   ├── skills/         # 技能文件
│   └── tests/          # 测试
```

## 快速开始

### 后端

```bash
cd backend
pip install -e .
uvicorn main:app --host 127.0.0.1 --port 8700
```

### 前端 (Chrome 扩展)

1. 打开 Chrome，访问 `chrome://extensions/`
2. 启用「开发者模式」
3. 点击「加载已解压的扩展程序」，选择 `extension/` 目录

## 配置

后端配置文件位于 `~/.quantclass/config.yaml`，支持配置多个 LLM 提供商：

- Anthropic (Claude)
- OpenAI (GPT)
- Google Gemini
- DeepSeek
- Kimi (月之暗面)
- Qwen (通义千问)
- GLM (智谱 AI)
- MiniMax
