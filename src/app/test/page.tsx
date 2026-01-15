'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { questions, TOTAL_QUESTIONS } from '@/lib/testData';
import { getName, getAnswers, saveAnswers, saveWinner } from '@/lib/store';
import { calculateResult, Answer } from '@/lib/calc';

export default function TestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // 이름 확인
    const name = getName();
    console.log('Test 페이지 로드, 이름:', name);
    
    if (!name) {
      console.log('이름이 없어서 홈으로 리다이렉트');
      router.push('/');
      return;
    }

    // 기존 답변 불러오기
    const savedAnswers = getAnswers();
    console.log('저장된 답변:', savedAnswers);
    setAnswers(savedAnswers);

    // 마지막 문항으로 이동
    if (savedAnswers.length > 0) {
      setCurrentStep(Math.min(savedAnswers.length, TOTAL_QUESTIONS - 1));
    }

    setIsLoading(false);
  }, [router]);

  const handleChoice = (choice: 'left' | 'right', event?: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now();
    
    // 터치 이벤트인 경우
    if (event && 'touches' in event) {
      event.preventDefault();
      event.stopPropagation();
      setLastTouchTime(now);
    } 
    // 클릭 이벤트인 경우 - 최근에 터치 이벤트가 발생했다면 무시 (300ms 이내)
    else if (event && now - lastTouchTime < 300) {
      event.preventDefault();
      event.stopPropagation();
      return; // 클릭 이벤트 무시
    }

    const newAnswer: Answer = {
      questionId: questions[currentStep].id,
      choice,
    };

    // 기존 답변 업데이트 또는 추가
    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex(
      (a) => a.questionId === questions[currentStep].id
    );

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setAnswers(updatedAnswers);
    saveAnswers(updatedAnswers);

    // 다음 문항으로 이동
    if (currentStep < TOTAL_QUESTIONS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 모든 문항 완료 - 결과 계산
      const winner = calculateResult(updatedAnswers, questions);
      saveWinner(winner);
      router.push('/result');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = currentStep + 1;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={currentQuestion.backgroundImage}
          alt={`Question ${currentQuestion.id}`}
          fill
          className="object-cover"
          priority
          unoptimized
          onError={(e) => {
            console.error('이미지 로드 실패:', currentQuestion.backgroundImage);
            // 이미지가 없어도 계속 진행 가능하도록
          }}
        />
      </div>

      {/* 상단 진행 표시 및 이전 버튼 */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-black/30 p-4 backdrop-blur-sm">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`rounded-lg px-4 py-2 font-semibold text-white transition-colors ${
            currentStep === 0
              ? 'cursor-not-allowed bg-gray-500/50'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          이전
        </button>
        <div className="rounded-lg bg-black/50 px-4 py-2 text-white">
          {progress} / {TOTAL_QUESTIONS}
        </div>
      </div>

      {/* 좌/우 선택 영역 */}
      <div className="absolute inset-0 z-10 flex">
        {/* 좌측 영역 */}
        <button
          onClick={(e) => handleChoice('left', e)}
          onTouchStart={(e) => handleChoice('left', e)}
          className="flex-1 bg-transparent touch-none select-none active:bg-black/10"
          aria-label="좌측 선택"
        >
          <div className="absolute bottom-0 left-0 right-1/2 p-6">
            {/* <div className="rounded-lg bg-black/60 p-4 text-center text-white backdrop-blur-sm">
              <div className="text-lg font-semibold">{currentQuestion.leftChoice.text}</div>
            </div> */}
          </div>
        </button>

        {/* 우측 영역 */}
        <button
          onClick={(e) => handleChoice('right', e)}
          onTouchStart={(e) => handleChoice('right', e)}
          className="flex-1 bg-transparent touch-none select-none active:bg-black/10"
          aria-label="우측 선택"
        >
          <div className="absolute bottom-0 left-1/2 right-0 p-6">
            <div className="rounded-lg bg-black/60 p-4 text-center text-white backdrop-blur-sm">
              <div className="text-lg font-semibold">{currentQuestion.rightChoice.text}</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
