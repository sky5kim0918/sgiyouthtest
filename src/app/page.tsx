'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { saveName, getName, clearAnswers, clearWinner } from '@/lib/store';

export default function Home() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 기존 이름이 있으면 불러오기
    const savedName = getName();
    if (savedName) {
      setName(savedName);
    }
    setIsLoading(false);
  }, []);

  const handleStart = () => {
    if (!name.trim()) {
      alert('본명을 입력해주세요.');
      return;
    }

    try {
      // 이름 저장
      const trimmedName = name.trim();
      saveName(trimmedName);
      
      // 기존 답변만 초기화 (이름은 유지)
      clearAnswers();
      clearWinner();
      
      // 디버깅
      console.log('테스트 시작:', trimmedName);
      console.log('저장된 이름 확인:', getName());
      
      // 라우팅
      window.location.href = '/test';
    } catch (error) {
      console.error('테스트 시작 오류:', error);
      alert('테스트를 시작할 수 없습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/home-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          unoptimized
          onError={(e) => {
            console.error('배경 이미지 로드 실패:', '/home-bg.jpg');
            // 이미지가 없어도 계속 진행 가능하도록
          }}
        />
        {/* 배경 어둡게 처리 */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl">
          <h1 className="text-center text-3xl font-bold text-gray-800">
            {/* 타이틀 들어가는 곳 */}
          </h1>
          <div className="space-y-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              본명을 입력해주세요
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleStart();
                }
              }}
              placeholder="예시 : 김하늘"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <button
            onClick={handleStart}
            className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            테스트 시작
          </button>
        </div>
      </div>
    </div>
  );
}
