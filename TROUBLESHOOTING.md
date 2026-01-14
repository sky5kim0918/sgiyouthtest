# Vercel 배포 오류 해결 가이드

## 🔍 일반적인 오류 원인

### 1. 이미지 파일 누락

**증상:**
- 페이지는 로드되지만 이미지가 안 보임
- 404 오류 (이미지 파일)

**해결:**
- `public/home-bg.jpg` 파일 확인
- `public/questions/q1.jpg` ~ `q12.jpg` 파일 확인
- `public/results/A.png` ~ `E.png` 파일 확인
- GitHub에 이미지 파일이 푸시되었는지 확인

### 2. Viewport 설정 오류 (수정 완료 ✅)

**증상:**
- 빌드 경고 메시지
- Next.js 16 호환성 문제

**해결:**
- `layout.tsx`에서 viewport를 별도 export로 분리 (수정 완료)

### 3. 빌드 실패

**증상:**
- Vercel 배포 실패
- 빌드 로그에 오류 메시지

**해결:**
1. Vercel 대시보드 → 프로젝트 → Deployments → 실패한 배포 클릭
2. "Build Logs" 확인
3. 오류 메시지 확인

### 4. 런타임 오류

**증상:**
- 페이지 접속 시 오류 화면
- "Application Error" 메시지

**해결:**
1. 브라우저 개발자 도구 (F12) → Console 탭 확인
2. 오류 메시지 확인
3. Vercel 대시보드 → Functions → Logs 확인

---

## 🛠️ 수정 사항

### Viewport 설정 수정 (완료)

`src/app/layout.tsx` 파일을 수정했습니다:

```typescript
// 변경 전
export const metadata: Metadata = {
  viewport: { ... }
};

// 변경 후
export const metadata: Metadata = {
  // viewport 제거
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
```

---

## 📋 체크리스트

배포 후 오류가 발생하면:

- [ ] Vercel 빌드 로그 확인
- [ ] 브라우저 콘솔 오류 확인
- [ ] 이미지 파일이 GitHub에 있는지 확인
- [ ] `npm run build` 로컬에서 성공하는지 확인
- [ ] 코드가 최신 버전인지 확인 (GitHub 푸시 확인)

---

## 🔄 재배포 방법

수정 후 재배포:

```bash
# 변경사항 커밋
git add .
git commit -m "Fix viewport and other issues"

# GitHub에 푸시
git push origin main
```

Vercel이 자동으로 재배포합니다.

---

## 💬 오류 메시지 공유

정확한 해결을 위해 다음 정보를 알려주세요:

1. **오류 메시지**: 브라우저에 표시된 정확한 메시지
2. **어느 페이지에서**: 첫 페이지, 테스트 페이지, 결과 페이지?
3. **Vercel 빌드 로그**: Vercel 대시보드의 빌드 로그 내용
4. **브라우저 콘솔**: F12 → Console 탭의 오류 메시지
