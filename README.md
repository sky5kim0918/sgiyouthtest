# 좌/우 선택 유형 테스트

Next.js(App Router) + TypeScript로 제작된 좌/우 선택 유형 테스트 웹앱입니다.

## 프로젝트 생성 및 실행 명령어

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 접속

- **PC 접속**: [http://localhost:3000](http://localhost:3000)
- **모바일 접속**: 같은 와이파이에 연결된 모바일 기기에서 접속 가능

## 모바일에서 접속하는 방법 (Mac 기준)

### 1. Mac의 로컬 IP 주소 확인

터미널에서 다음 명령어를 실행하세요:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

또는 더 간단하게:

```bash
ipconfig getifaddr en0
```

출력된 IP 주소를 확인하세요 (예: `192.168.0.10`).

### 2. Next.js 개발 서버를 외부 접속 허용 모드로 실행

기본적으로 Next.js는 localhost만 허용합니다. 외부 접속을 허용하려면:

```bash
npm run dev -- -H 0.0.0.0
```

또는 `package.json`의 dev 스크립트를 수정:

```json
"dev": "next dev -H 0.0.0.0"
```

### 3. 모바일 기기에서 접속

모바일 기기가 같은 와이파이에 연결되어 있다면, 브라우저에서 다음 주소로 접속:

```
http://<Mac의_IP_주소>:3000
```

예: `http://192.168.0.10:3000`

## 이미지 파일 준비

프로젝트를 실행하기 전에 다음 이미지 파일들을 준비해야 합니다:

### 문항 배경 이미지
- 경로: `public/questions/`
- 파일명: `q1.jpg`, `q2.jpg`, ..., `q12.jpg`
- 권장 사이즈: 1080x1920 (9:16 비율)

### 결과 이미지
- 경로: `public/results/`
- 파일명: `A.png`, `B.png`, `C.png`, `D.png`, `E.png`

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 첫 페이지 (이름 입력)
│   ├── test/
│   │   └── page.tsx      # 테스트 페이지 (12문항)
│   ├── result/
│   │   └── page.tsx      # 결과 페이지
│   └── layout.tsx
└── lib/
    ├── testData.ts       # 문항 데이터 (여기서만 수정)
    ├── calc.ts           # 점수 계산 로직
    ├── store.ts          # localStorage 관리
    └── watermark.ts      # 워터마크 추가 기능

public/
├── questions/            # 문항 배경 이미지
└── results/              # 결과 이미지
```

## 문항 데이터 수정

모든 문항 데이터는 `src/lib/testData.ts` 파일에서만 수정할 수 있습니다.

- 문항 추가/삭제
- 선택지 텍스트 변경
- 점수 조정
- 배경 이미지 경로 변경

## 기능

- ✅ 이름 입력 및 localStorage 저장
- ✅ 12문항 좌/우 선택 테스트
- ✅ 진행 표시 (예: 3/12)
- ✅ 이전 버튼으로 문항 이동
- ✅ 5유형(A,B,C,D,E) 자동 계산
- ✅ 동점 시 우선순위 적용 (A→B→C→D→E)
- ✅ 결과 이미지 표시
- ✅ 워터마크 추가 및 PNG 다운로드

## 기술 스택

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Canvas API (워터마크 처리)
