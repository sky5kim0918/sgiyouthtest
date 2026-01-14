// 모바일 환경 감지
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  // User Agent 체크
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // 화면 크기 체크 (768px 이하를 모바일로 간주)
  const isSmallScreen = window.innerWidth <= 768;
  
  // 터치 지원 여부 체크
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return mobileRegex.test(userAgent.toLowerCase()) || (isSmallScreen && hasTouch);
}

export function showMobileOnlyWarning(): void {
  if (typeof window === 'undefined') return;
  
  if (!isMobile()) {
    alert('이 테스트는 모바일 기기에서만 이용 가능합니다.\n\n스마트폰이나 태블릿에서 접속해주세요.');
  }
}
