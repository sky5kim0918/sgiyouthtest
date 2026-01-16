'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getName, getWinner, getAnswers } from '@/lib/store';
import { addWatermarkAndDownload } from '@/lib/watermark';
import { calculateResult } from '@/lib/calc';
import { questions } from '@/lib/testData';

export default function ResultPage() {
  const [name, setName] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [imageVariant, setImageVariant] = useState<number>(1); // 1 또는 2
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 이름 확인
    const savedName = getName();
    if (!savedName) {
      router.push('/');
      return;
    }

    // 결과 확인
    let resultWinner = getWinner();
    if (!resultWinner) {
      // 저장된 결과가 없으면 다시 계산
      const answers = getAnswers();
      if (answers.length === 0) {
        router.push('/');
        return;
      }
      resultWinner = calculateResult(answers, questions);
    }

    setName(savedName);
    setWinner(resultWinner);
    
    // 랜덤으로 1 또는 2 선택
    const randomVariant = Math.random() < 0.5 ? 1 : 2;
    setImageVariant(randomVariant);
    
    setIsLoading(false);
  }, [router]);

  const handleDownload = async () => {
    if (!winner || !name) return;

    try {
      const imageUrl = `/results/${winner}${imageVariant}.png`;
      await addWatermarkAndDownload(imageUrl, name, `result_${name}_${winner}${imageVariant}.png`);
    } catch (error) {
      console.error('다운로드 실패:', error);
      alert('이미지 다운로드에 실패했습니다.');
    }
  };

  if (isLoading || !winner || !name) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          창가청년유형 테스트 결과
        </h1>
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={`/results/${winner}${imageVariant}.png`}
            alt={`Result ${winner}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* 상단 이름 표시 */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent px-6 py-8">
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-1">{name}</div>
              <div className="text-lg font-semibold">님의 창가청년 유형은?</div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleDownload}
            className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            결과 이미지 저장
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full rounded-lg border-2 border-indigo-600 px-6 py-4 text-lg font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            다시 테스트하기
          </button>
        </div>
      </div>
    </div>
  );
}
