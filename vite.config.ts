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
      // ✅ 수정된 욕설 필터링 API 프록시
      '/api/profanity': {
        target: 'https://filter.opensourcebooking.xyz', // 🔧 도메인만 설정
        changeOrigin: true,
        secure: true, // 🔧 HTTPS이므로 secure: true
        rewrite: (path) => path.replace(/^\/api\/profanity/, '/mask'), // 🔧 올바른 path 변환
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('욕설 필터링 프록시 오류:', err);
          });
          
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('욕설 필터링 프록시 요청:', req.method, req.url, '→', proxyReq.path);
            
            // 🔑 기존 VITE_AUTH_TOKEN을 프록시 요청에 자동 추가
            const authToken = process.env.VITE_AUTH_TOKEN;
            if (authToken) {
              proxyReq.setHeader('Authorization', `Bearer ${authToken}`);
              console.log('인증 토큰 헤더 추가됨');
            }
            
            // Content-Type 확인 및 설정
            if (!proxyReq.getHeader('Content-Type')) {
              proxyReq.setHeader('Content-Type', 'application/json');
            }
            
            // 🔧 CORS 헤더 추가
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          });
          
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('욕설 필터링 프록시 응답:', proxyRes.statusCode, req.url);
            
            // 🔧 응답 헤더에 CORS 추가
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
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
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('API 프록시 오류:', err);
          });
        }
      }
    }
  },
  
  // 🔧 환경변수 정의 추가
  define: {
    'process.env': process.env
  },
  
  // 🔧 빌드 설정 개선
  build: {
    sourcemap: true, // 디버깅을 위한 소스맵 생성
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          emotion: ['@emotion/react', '@emotion/styled']
        }
      }
    }
  }
});