// 워터마크 추가 및 이미지 다운로드
export async function addWatermarkAndDownload(
  imageUrl: string,
  name: string,
  filename: string = 'result.png'
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context를 가져올 수 없습니다.'));
        return;
      }

      // 이미지 그리기
      ctx.drawImage(img, 0, 0);

      // 워터마크 스타일 설정
      const padding = 20;
      const fontSize = Math.max(24, img.width / 30);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';

      // 텍스트 크기 측정
      const textMetrics = ctx.measureText(name);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;
      const boxPadding = 15;

      // 반투명 박스 그리기 (오른쪽 아래)
      const boxX = canvas.width - padding - textWidth - boxPadding * 2;
      const boxY = canvas.height - padding - textHeight - boxPadding * 2;
      const boxWidth = textWidth + boxPadding * 2;
      const boxHeight = textHeight + boxPadding * 2;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

      // 흰색 텍스트 그리기
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(
        name,
        canvas.width - padding - boxPadding,
        canvas.height - padding - boxPadding
      );

      // PNG로 다운로드
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('이미지 변환에 실패했습니다.'));
          return;
        }

        // 카카오톡 인앱 브라우저 감지
        const isKakaoTalk = /KAKAOTALK/i.test(navigator.userAgent);
        const isInAppBrowser = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) || 
                               /Android.*wv/i.test(navigator.userAgent) ||
                               isKakaoTalk;

        if (isInAppBrowser) {
          // 인앱 브라우저에서는 새 창으로 이미지 열기
          const url = URL.createObjectURL(blob);
          const newWindow = window.open(url, '_blank');
          
          if (!newWindow) {
            // 팝업이 차단된 경우 base64로 변환하여 표시
            const dataUrl = canvas.toDataURL('image/png');
            const img = document.createElement('img');
            img.src = dataUrl;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.right = '0';
            container.style.bottom = '0';
            container.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            container.style.zIndex = '9999';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.padding = '20px';
            container.style.overflow = 'auto';
            
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '닫기';
            closeBtn.style.marginTop = '20px';
            closeBtn.style.padding = '10px 20px';
            closeBtn.style.backgroundColor = '#fff';
            closeBtn.style.color = '#000';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '5px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.onclick = () => {
              document.body.removeChild(container);
              URL.revokeObjectURL(url);
            };
            
            container.appendChild(img);
            container.appendChild(closeBtn);
            document.body.appendChild(container);
            
            // 안내 메시지
            setTimeout(() => {
              alert('이미지를 길게 눌러 저장하세요.');
            }, 500);
          } else {
            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 1000);
          }
          
          resolve();
        } else {
          // 일반 브라우저에서는 기존 방식 사용
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          resolve();
        }
      }, 'image/png');
    };

    img.onerror = () => {
      reject(new Error('이미지를 불러올 수 없습니다.'));
    };

    img.src = imageUrl;
  });
}
