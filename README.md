# QuantOS 📈

**Natural Language Algorithmic Backtesting Engine**

QuantOS is a full-stack, enterprise-grade financial technology application. It allows quantitative traders to write trading strategies in plain English. The platform uses Natural Language Processing (NLP) to extract mathematical parameters and executes deterministic backtests against years of live Wall Street data in milliseconds.

## 🚀 Key Features

- **NLP Parameter Extraction:** Parses human-readable strategy prompts (e.g., _"Buy QQQ with a 1.5% take profit"_) into strict JSON execution variables.
- **Live Market Integration:** Directly queries the Yahoo Finance API (`yfinance`) to pull accurate, historical OHLCV data for ETFs, Forex, Commodities, and Crypto.
- **Deterministic Pandas Engine:** A high-speed, custom-built Python backtesting engine utilizing `pandas` and `numpy` for sub-millisecond mathematical execution.
- **Enterprise UI/UX:** A fully responsive Next.js frontend featuring state-based routing, dark/light mode context, and a command-palette asset search tool.

## 🛠️ System Architecture

QuantOS is built on a decoupled microservice architecture:

**Frontend (Next.js / React)**

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Icons: Lucide React
- Deployment: Netlify

**Backend (Python / FastAPI)**

- Framework: FastAPI & Uvicorn
- Data Processing: Pandas & NumPy
- Market Data: Yahoo Finance API (`yfinance`)
- Parsing: Regular Expressions / OpenAI API
- Deployment: Render

## 💻 Local Development Setup

To run this project locally, you will need to start both the Python backend and the Next.js frontend.

### 1. Backend Setup

Navigate into the backend directory, activate your virtual environment, and install the dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate
pip install -r requirements.txt
```
