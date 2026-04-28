import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

export const globals = `
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --background: ${colors.background};
    --card: ${colors.card};
    --text: ${colors.text};
    --text-light: ${colors.textLight};
    --border: ${colors.border};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --error: ${colors.error};
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--background);
    color: var(--text);
  }

  /* 移动端优先响应式设计 */
  .container {
    max-width: 480px;
    margin: 0 auto;
    padding: ${spacing.md}px;
    min-height: 100vh;
  }

  @media (min-width: 768px) {
    .container {
      max-width: 600px;
    }
  }

  /* 卡片样式 */
  .card {
    background: var(--card);
    border-radius: 12px;
    padding: ${spacing.md}px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  /* 按钮样式 */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: ${spacing.lg}px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }

  .btn-primary:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  /* 安全区域适配（iOS底部） */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .safe-bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }

  /* 动画 */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  /* PWA 隐藏地址栏效果 */
  @media (display-mode: standalone) {
    body {
      padding-top: env(safe-area-inset-top);
    }
  }
`