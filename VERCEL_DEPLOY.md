# Vercel 배포 가이드

## 📋 현재 상태

✅ 코드 커밋 완료  
⏳ GitHub 푸시 필요  
⏳ Vercel 배포 필요

---

## 1단계: GitHub에 코드 푸시

### 방법 A: GitHub Desktop 사용 (가장 쉬움)

1. [GitHub Desktop](https://desktop.github.com/) 다운로드 및 설치
2. GitHub Desktop 실행
3. File → Clone Repository → URL 탭
4. `https://github.com/sky5kim0918/sgiyouthtest.git` 입력
5. 로컬 경로 선택 후 Clone
6. 변경사항 확인 후 "Commit to main" 클릭
7. "Push origin" 클릭

### 방법 B: 터미널에서 수동 푸시

**인증 방법 선택:**

#### 옵션 1: Personal Access Token 사용 (추천)

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. Note: "Vercel Deploy" 입력
4. Expiration: 원하는 기간 선택
5. Scopes: `repo` 체크
6. "Generate token" 클릭 후 **토큰 복사** (한 번만 보여줌!)

7. 터미널에서:
```bash
cd /Users/luenah/sgiyouthtest

# 원격 저장소 URL을 토큰 포함으로 변경
git remote set-url origin https://토큰@github.com/sky5kim0918/sgiyouthtest.git

# 푸시
git push -u origin main
```

#### 옵션 2: SSH 키 사용

1. SSH 키 생성 (아직 없다면):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. 공개 키 복사:
```bash
cat ~/.ssh/id_ed25519.pub
```

3. GitHub → Settings → SSH and GPG keys → New SSH key
4. 복사한 공개 키 붙여넣기
5. 터미널에서:
```bash
cd /Users/luenah/sgiyouthtest
git remote set-url origin git@github.com:sky5kim0918/sgiyouthtest.git
git push -u origin main
```

---

## 2단계: Vercel 배포

### 1. Vercel 계정 생성

1. [vercel.com](https://vercel.com) 접속
2. "Sign Up" 클릭
3. **"Continue with GitHub"** 선택 (GitHub 계정으로 로그인)

### 2. 프로젝트 배포

1. Vercel 대시보드에서 **"Add New Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub 저장소 목록에서 **`sky5kim0918/sgiyouthtest`** 선택
4. **"Import"** 클릭

### 3. 프로젝트 설정

**자동 감지된 설정 (변경 불필요):**
- Framework Preset: **Next.js** ✅
- Root Directory: **`./`** ✅
- Build Command: **`npm run build`** ✅
- Output Directory: **`.next`** ✅

**환경 변수:**
- 현재는 필요 없음 (서버/DB 없음)

### 4. 배포 시작

1. **"Deploy"** 버튼 클릭
2. 약 2-3분 대기
3. 배포 완료! 🎉

### 5. 배포 URL 확인

배포 완료 후:
- **Production URL**: `https://sgiyouthtest.vercel.app` (또는 자동 생성된 URL)
- 이 URL을 복사해서 공유하면 됩니다!

---

## 3단계: 커스텀 도메인 설정 (선택사항)

### 도메인이 있다면:

1. Vercel 대시보드 → 프로젝트 선택 → **Settings** → **Domains**
2. 원하는 도메인 입력 (예: `test.yourdomain.com`)
3. DNS 설정 안내에 따라 도메인에 CNAME 레코드 추가
4. 몇 분 후 자동으로 HTTPS 적용됨

---

## 🔄 이후 업데이트 방법

코드를 수정한 후:

```bash
# 변경사항 커밋
git add .
git commit -m "변경 내용 설명"

# GitHub에 푸시
git push origin main
```

**Vercel이 자동으로 감지하여 재배포합니다!** (약 2-3분 소요)

---

## ✅ 배포 확인 체크리스트

배포 후 확인:

- [ ] 첫 페이지 (`/`) 접속 가능
- [ ] 이름 입력 후 테스트 시작 가능
- [ ] 테스트 페이지 (`/test`) 정상 작동
- [ ] 결과 페이지 (`/result`) 정상 작동
- [ ] 모바일에서도 정상 작동
- [ ] 이미지 파일들이 모두 표시됨

---

## 🐛 문제 해결

### 배포 실패 시

1. **빌드 로그 확인**
   - Vercel 대시보드 → 프로젝트 → Deployments → 실패한 배포 클릭
   - "Build Logs" 확인

2. **로컬에서 빌드 테스트**
   ```bash
   npm run build
   ```
   - 로컬에서 실패하면 Vercel에서도 실패함

3. **이미지 파일 확인**
   - `public/` 폴더에 모든 이미지가 있는지 확인
   - 파일명이 정확한지 확인 (대소문자 구분)

### 이미지가 안 보일 때

1. GitHub에 이미지 파일이 푸시되었는지 확인
2. 파일 경로가 정확한지 확인 (`/questions/q1.jpg` 등)
3. 브라우저 캐시 삭제 후 재시도

---

## 📊 배포 후 관리

### Vercel 대시보드에서 확인 가능:

- **Analytics**: 방문자 수, 페이지뷰 등
- **Deployments**: 배포 이력
- **Settings**: 환경 변수, 도메인 등
- **Logs**: 실시간 로그 확인

---

## 🎯 빠른 배포 요약

1. ✅ 코드 커밋 완료
2. ⏳ GitHub 푸시 (위 방법 중 선택)
3. ⏳ Vercel → Add New Project → GitHub 저장소 선택 → Deploy
4. ✅ 완료! URL 공유

**예상 소요 시간: 약 10분**
