# 외부 접속 배포 가이드

## 🚀 배포 방법 (추천 순서)

### 방법 1: Vercel (가장 추천 ⭐)

**장점:**
- Next.js 제작사가 만든 플랫폼
- 무료 플랜 제공
- 자동 배포 및 HTTPS 지원
- 매우 간단한 배포 과정

**동시 접속자 수:**
- **무료 플랜**: 월 100GB 대역폭, 서버리스 아키텍처
- **실제 동시 접속**: 수백~수천 명 가능 (서버리스이므로 자동 확장)
- **제한**: 주로 대역폭과 함수 실행 시간 (일반적으로 충분함)

**배포 단계:**

1. **GitHub에 코드 업로드**
   ```bash
   # Git 초기화 (아직 안 했다면)
   git init
   git add .
   git commit -m "Initial commit"
   
   # GitHub에 새 저장소 생성 후
   git remote add origin https://github.com/사용자명/저장소명.git
   git push -u origin main
   ```

2. **Vercel 배포**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - Framework Preset: Next.js (자동 감지)
     - Root Directory: `./` (기본값)
   - "Deploy" 클릭
   - 약 2-3분 후 배포 완료
   - 자동으로 `https://프로젝트명.vercel.app` URL 생성

3. **커스텀 도메인 (선택사항)**
   - Vercel 대시보드 → Settings → Domains
   - 원하는 도메인 추가

---

### 방법 2: Netlify

**장점:**
- 무료 플랜 제공
- 간단한 배포
- 좋은 성능

**동시 접속자 수:**
- **무료 플랜**: 월 100GB 대역폭
- **실제 동시 접속**: 수백 명 가능

**배포 단계:**

1. **GitHub에 코드 업로드** (위와 동일)

2. **Netlify 배포**
   - [netlify.com](https://netlify.com) 접속
   - GitHub 계정으로 로그인
   - "Add new site" → "Import an existing project"
   - GitHub 저장소 선택
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - "Deploy site" 클릭

---

### 방법 3: Railway

**장점:**
- 무료 크레딧 제공
- 간단한 배포

**동시 접속자 수:**
- 무료 크레트로 시작, 사용량에 따라 과금
- 수백 명 동시 접속 가능

---

### 방법 4: 자체 서버 (VPS)

**필요한 것:**
- VPS 서버 (예: AWS, DigitalOcean, Linode 등)
- 도메인 (선택사항)

**배포 단계:**

1. **서버에 Node.js 설치**
   ```bash
   # Ubuntu/Debian 예시
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **프로젝트 배포**
   ```bash
   # 서버에 프로젝트 클론
   git clone https://github.com/사용자명/저장소명.git
   cd 저장소명
   npm install
   npm run build
   ```

3. **PM2로 실행 (백그라운드)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "sgiyouthtest" -- start
   pm2 save
   pm2 startup
   ```

4. **Nginx 리버스 프록시 설정** (포트 3000을 80/443으로)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📊 동시 접속자 수 상세 정보

### Vercel (무료 플랜)

| 항목 | 제한 |
|------|------|
| 월 대역폭 | 100GB |
| 함수 실행 시간 | 10초 (Hobby 플랜) |
| 동시 함수 실행 | 제한 없음 (자동 확장) |
| **실제 동시 접속자** | **500~2000명** (대역폭에 따라) |

**계산 예시:**
- 페이지당 평균 500KB라고 가정
- 100GB = 100,000MB = 100,000,000KB
- 월 200,000회 페이지뷰 가능
- 동시 접속 100명 기준: 시간당 약 8,000회 페이지뷰
- **충분히 수백 명 동시 접속 가능**

### 서버리스 아키텍처의 장점

- **자동 확장**: 접속자가 많아져도 자동으로 서버 추가
- **사용한 만큼만 과금**: 트래픽이 적으면 비용 절감
- **서버 관리 불필요**: 서버 다운 걱정 없음

---

## 🔒 보안 및 최적화

### 환경 변수 (필요 시)

`.env.local` 파일 생성 (로컬 개발용):
```env
# 예시 (현재는 서버/DB 없으므로 필요 없음)
```

Vercel/Netlify에서 환경 변수 설정:
- 대시보드 → Settings → Environment Variables

### 이미지 최적화

- 이미지 파일 크기: 각 500KB 이하 권장
- Next.js Image 컴포넌트가 자동 최적화

---

## 📝 배포 전 체크리스트

- [ ] 모든 이미지 파일 준비 (`public/questions/`, `public/results/`, `public/home-bg.jpg`)
- [ ] `npm run build` 성공 확인
- [ ] Git 저장소에 코드 업로드
- [ ] 배포 플랫폼 선택 (Vercel 추천)
- [ ] 배포 후 테스트 (모바일/PC 모두)
- [ ] 커스텀 도메인 설정 (선택사항)

---

## 🎯 추천 배포 플랫폼

**가장 추천: Vercel**
- 이유: Next.js 최적화, 가장 쉬운 배포, 무료 플랜으로 충분
- 동시 접속: 수백~수천 명 가능
- 배포 시간: 약 5분

**대안: Netlify**
- 이유: 좋은 성능, 무료 플랜
- 동시 접속: 수백 명 가능

---

## 💡 트래픽이 많아질 경우

1. **Vercel Pro 플랜** ($20/월)
   - 무제한 대역폭
   - 더 빠른 성능
   - 동시 접속 수천~수만 명 가능

2. **CDN 사용**
   - 이미지를 CDN에 호스팅 (예: Cloudinary, Imgix)
   - 대역폭 절약

3. **캐싱 최적화**
   - Next.js 자동 캐싱 활용
   - 정적 페이지는 자동 최적화

---

## 🚨 주의사항

1. **localStorage는 브라우저에 저장**
   - 서버 없이 동작하므로 각 사용자의 브라우저에 저장
   - 데이터는 서버에 전송되지 않음 (프라이버시 보호)

2. **이미지 파일 크기**
   - 너무 크면 로딩이 느려질 수 있음
   - 각 이미지 500KB 이하 권장

3. **HTTPS 자동 적용**
   - Vercel/Netlify는 자동으로 HTTPS 제공
   - 보안 연결 자동 설정

---

## 📞 문제 해결

**배포 실패 시:**
1. `npm run build` 로컬에서 성공하는지 확인
2. 배포 로그 확인 (Vercel/Netlify 대시보드)
3. 환경 변수 확인

**이미지가 안 보일 때:**
1. `public/` 폴더에 파일이 있는지 확인
2. 파일명이 정확한지 확인 (대소문자 구분)
3. 브라우저 캐시 삭제 후 재시도
