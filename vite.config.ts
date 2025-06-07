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
        target: 'http://3.34.186.27:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/profanity/, '/mask'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('🚨 [욕설 필터링 프록시 에러]', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('📤 [욕설 필터링 프록시 요청]', req.method, req.url);
            
            // 🔑 기존 VITE_AUTH_TOKEN을 프록시 요청에 자동 추가
            const authToken = process.env.VITE_AUTH_TOKEN;
            if (authToken) {
              proxyReq.setHeader('Authorization', `Bearer ${authToken}`);
              console.log('🔑 [욕설 필터링] Authorization 헤더 추가됨');
            } else {
              console.warn('⚠️ [욕설 필터링] VITE_AUTH_TOKEN이 없음');
            }
            
            // Content-Type 확인 및 설정
            if (!proxyReq.getHeader('Content-Type')) {
              proxyReq.setHeader('Content-Type', 'application/json');
            }
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 [욕설 필터링 프록시 응답]', proxyRes.statusCode, req.url);
            if (proxyRes.statusCode !== 200) {
              console.log('🚨 [욕설 필터링 응답 에러]', {
                status: proxyRes.statusCode,
                statusMessage: proxyRes.statusMessage,
                headers: proxyRes.headers
              });
            }
          });
        },
      },

      // 기존 WebSocket 프록시 유지
      '/ws-proxy': {
        target: 'http://52.78.192.251:8080', // http로 시작
        ws: true,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const newPath = path.replace(/^\/ws-proxy/, '/ws-booking-messaging');
          console.log('🔄 프록시 경로 변환:', path, '→', newPath);
          return newPath;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReqWs', (proxyReq, req, socket, head) => {
            console.log('📡 WebSocket 프록시 요청 수신:', req.url);
                         
            // 간단한 헤더 설정
            try {
              const url = new URL(req.url || '', 'http://localhost');
              const token = url.searchParams.get('token');
              const userId = url.searchParams.get('userId');
              const chatRoomId = url.searchParams.get('chatRoomId');
              const name = url.searchParams.get('name');
                             
              console.log('📋 파라미터 추출:', { userId, chatRoomId, name, tokenExists: !!token });
                             
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
              console.error('❌ 헤더 설정 실패:', error);
            }
          });
                     
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('📡 HTTP 프록시:', req.url);
          });
                     
          proxy.on('error', (err, req, res) => {
            console.error('❌ 프록시 에러:', err.message);
          });
                     
          proxy.on('proxyReqWs', (proxyReq, req, socket, head) => {
            console.log('🔗 WebSocket 프록시 연결 시도');
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