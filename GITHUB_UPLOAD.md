# GitHub 업로드 가이드

## 🎯 현재 상태

✅ 코드 커밋 완료  
⏳ GitHub 푸시 필요

---

## 방법 1: GitHub Desktop 사용 (가장 쉬움 ⭐)

### 1. GitHub Desktop 설치

1. [GitHub Desktop 다운로드](https://desktop.github.com/)
2. 설치 후 실행
3. GitHub 계정으로 로그인

### 2. 저장소 클론

1. **File** → **Clone Repository** 클릭
2. **URL** 탭 선택
3. 다음 URL 입력:
   ```
   https://github.com/sky5kim0918/sgiyouthtest.git
   ```
4. **Local Path** 선택 (원하는 폴더)
5. **Clone** 클릭

### 3. 코드 푸시

1. GitHub Desktop에서 프로젝트 열기
2. 왼쪽 패널에서 변경사항 확인
3. 하단에 커밋 메시지 입력 (예: "Initial commit")
4. **"Commit to main"** 클릭
5. 상단 메뉴에서 **"Push origin"** 클릭
6. 완료! ✅

---

## 방법 2: 터미널 사용 (Personal Access Token)

### 1. GitHub Personal Access Token 생성

1. [GitHub.com](https://github.com) 로그인
2. 우측 상단 프로필 클릭 → **Settings**
3. 왼쪽 메뉴에서 **Developer settings** 클릭
4. **Personal access tokens** → **Tokens (classic)** 클릭
5. **Generate new token** → **Generate new token (classic)** 클릭
6. 설정:
   - **Note**: `sgiyouthtest-deploy` (아무거나)
   - **Expiration**: 원하는 기간 선택 (예: 90 days)
   - **Scopes**: `repo` 체크박스 선택
7. 하단 **Generate token** 클릭
8. **토큰 복사** (한 번만 보여줌! 저장해두세요)

### 2. 터미널에서 푸시

터미널을 열고 다음 명령어 실행:

```bash
# 프로젝트 폴더로 이동
cd /Users/luenah/sgiyouthtest

# 원격 저장소 URL을 토큰 포함으로 변경
# 아래 YOUR_TOKEN 부분을 복사한 토큰으로 교체
git remote set-url origin https://YOUR_TOKEN@github.com/sky5kim0918/sgiyouthtest.git

# 푸시
git push -u origin main
```

**예시:**
```bash
git remote set-url origin https://ghp_xxxxxxxxxxxx@github.com/sky5kim0918/sgiyouthtest.git
git push -u origin main
```

---

## 방법 3: 터미널 사용 (SSH 키)

### 1. SSH 키 확인

```bash
ls -al ~/.ssh
```

`id_rsa.pub` 또는 `id_ed25519.pub` 파일이 있으면 이미 키가 있습니다.

### 2. SSH 키가 없다면 생성

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

엔터를 여러 번 눌러 기본 설정 사용

### 3. 공개 키 복사

```bash
cat ~/.ssh/id_ed25519.pub
```

또는

```bash
cat ~/.ssh/id_rsa.pub
```

전체 내용 복사 (ssh-ed25519 또는 ssh-rsa로 시작하는 긴 텍스트)

### 4. GitHub에 SSH 키 추가

1. [GitHub.com](https://github.com) 로그인
2. 우측 상단 프로필 → **Settings**
3. 왼쪽 메뉴 **SSH and GPG keys** 클릭
4. **New SSH key** 클릭
5. 설정:
   - **Title**: `MacBook` (아무거나)
   - **Key**: 복사한 공개 키 붙여넣기
6. **Add SSH key** 클릭

### 5. 터미널에서 푸시

```bash
# 프로젝트 폴더로 이동
cd /Users/luenah/sgiyouthtest

# 원격 저장소 URL을 SSH로 변경
git remote set-url origin git@github.com:sky5kim0918/sgiyouthtest.git

# 푸시
git push -u origin main
```

---

## 방법 4: GitHub 웹에서 직접 업로드

### 1. GitHub 저장소 열기

[저장소 링크](https://github.com/sky5kim0918/sgiyouthtest) 접속

### 2. 파일 업로드

1. **"uploading an existing file"** 클릭
2. 로컬 파일들을 드래그 앤 드롭
3. 하단에 커밋 메시지 입력
4. **Commit changes** 클릭

**주의**: 이 방법은 파일이 많으면 불편합니다.

---

## ✅ 업로드 확인

업로드 후 다음 링크에서 확인:

https://github.com/sky5kim0918/sgiyouthtest

다음 파일들이 보여야 합니다:
- `src/` 폴더
- `public/` 폴더
- `package.json`
- `README.md`
- 기타 설정 파일들

---

## 🐛 문제 해결

### "Permission denied" 오류

- Personal Access Token을 사용하거나 SSH 키를 설정하세요
- 방법 1 (GitHub Desktop)이 가장 쉽습니다

### "Repository not found" 오류

- 저장소 이름이 정확한지 확인: `sky5kim0918/sgiyouthtest`
- 저장소가 Private인지 확인 (Private이면 권한 필요)

### "Authentication failed" 오류

- Personal Access Token이 만료되었는지 확인
- 새 토큰을 생성하세요

---

## 💡 추천 방법

**가장 쉬운 방법: GitHub Desktop 사용**

1. 설치만 하면 자동으로 인증 처리
2. GUI로 쉽게 사용 가능
3. 커밋 히스토리도 시각적으로 확인 가능

---

## 📝 다음 단계

GitHub 업로드 완료 후:

1. ✅ Vercel 배포 진행
2. [vercel.com](https://vercel.com) 접속
3. GitHub 계정으로 로그인
4. 프로젝트 배포

자세한 내용은 `VERCEL_DEPLOY.md` 참고
