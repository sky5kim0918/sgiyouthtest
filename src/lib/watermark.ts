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

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        resolve();
      }, 'image/png');
    };

    img.onerror = () => {
      reject(new Error('이미지를 불러올 수 없습니다.'));
    };

    img.src = imageUrl;
  });
}
