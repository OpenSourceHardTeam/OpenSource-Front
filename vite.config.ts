/// <reference types="node" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths({
      projects: ["tsconfig.app.json"],
    }),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: "**/*.svg?react",
    }),
  ],
        
  // 단순화된 WebSocket 프록시 설정
  server: {
    port: 5173,
    proxy: {
      // ✅ 욕설 필터링 API 프록시 추가
      '/api/profanity': {
<
        target: 'https://filter.opensourcebooking.xyz/mask',

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/profanity/, '/mask'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // 🔑 기존 VITE_AUTH_TOKEN을 프록시 요청에 자동 추가
            const authToken = process.env.VITE_AUTH_TOKEN;
            if (authToken) {
              proxyReq.setHeader('Authorization', `Bearer ${authToken}`);
            }
                         
            // Content-Type 확인 및 설정
            if (!proxyReq.getHeader('Content-Type')) {
              proxyReq.setHeader('Content-Type', 'application/json');
            }
          });
        },
      },
       
      // 기존 WebSocket 프록시 유지
      '/ws-proxy': {
        target: 'https://opensourcebooking.xyz',
        ws: true,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ws-proxy/, '/ws-booking-messaging'),
        configure: (proxy) => {
          proxy.on('proxyReqWs', (proxyReq, req) => {
            // 간단한 헤더 설정
            try {
              const urlStr = req.url || '';
              const baseUrl = 'http://localhost';
              // ✅ globalThis.URL을 URL로 변경
              const fullUrl = new URL(urlStr, baseUrl);
                             
              const token = fullUrl.searchParams.get('token');
              const userId = fullUrl.searchParams.get('userId');
              const chatRoomId = fullUrl.searchParams.get('chatRoomId');
              const name = fullUrl.searchParams.get('name');
                                            
              if (token) {
                proxyReq.setHeader('Authorization', `Bearer ${token}`);
              }
              if (userId) {
                proxyReq.setHeader('userId', userId);
              }
              if (chatRoomId) {
                proxyReq.setHeader('chatRoomId', chatRoomId);
              }
              if (name) {
                proxyReq.setHeader('name', name);
              }
            } catch (error) {
              // 헤더 설정 실패 시 무시
            }
          });
        }
      },
                    
      // 기존 HTTP API 프록시 유지
      '/api': {
        target: 'http://52.78.192.251:8080',
        changeOrigin: true
      }
    }
  }
});