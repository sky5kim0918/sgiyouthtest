// 문항 데이터 - 여기서만 수정 가능
export interface Question {
  id: number;
  backgroundImage: string; // public/questions/q1.jpg 형식
  leftChoice: {
    text: string;
    scores: { A: number; B: number; C: number; D: number };
  };
  rightChoice: {
    text: string;
    scores: { A: number; B: number; C: number; D: number };
  };
}

export const questions: Question[] = [
  {
    id: 1,
    backgroundImage: '/questions/q1.jpg',
    leftChoice: {
      text: '좌측 선택지 1',
      scores: { A: 2, B: 0, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 1',
      scores: { A: 0, B: 2, C: 0, D: 0 },
    },
  },
  {
    id: 2,
    backgroundImage: '/questions/q2.jpg',
    leftChoice: {
      text: '좌측 선택지 2',
      scores: { A: 0, B: 2, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 2',
      scores: { A: 0, B: 0, C: 2, D: 0 },
    },
  },
  {
    id: 3,
    backgroundImage: '/questions/q3.jpg',
    leftChoice: {
      text: '좌측 선택지 3',
      scores: { A: 0, B: 0, C: 2, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 3',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
  },
  {
    id: 4,
    backgroundImage: '/questions/q4.jpg',
    leftChoice: {
      text: '좌측 선택지 4',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
    rightChoice: {
      text: '우측 선택지 4',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
  },
  {
    id: 5,
    backgroundImage: '/questions/q5.jpg',
    leftChoice: {
      text: '좌측 선택지 5',
      scores: { A: 2, B: 0, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 5',
      scores: { A: 0, B: 2, C: 0, D: 0 },
    },
  },
  {
    id: 6,
    backgroundImage: '/questions/q6.jpg',
    leftChoice: {
      text: '좌측 선택지 6',
      scores: { A: 0, B: 2, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 6',
      scores: { A: 0, B: 0, C: 2, D: 0 },
    },
  },
  {
    id: 7,
    backgroundImage: '/questions/q7.jpg',
    leftChoice: {
      text: '좌측 선택지 7',
      scores: { A: 0, B: 0, C: 2, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 7',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
  },
  {
    id: 8,
    backgroundImage: '/questions/q8.jpg',
    leftChoice: {
      text: '좌측 선택지 8',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
    rightChoice: {
      text: '우측 선택지 8',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
  },
  {
    id: 9,
    backgroundImage: '/questions/q9.jpg',
    leftChoice: {
      text: '좌측 선택지 9',
      scores: { A: 2, B: 0, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 9',
      scores: { A: 0, B: 2, C: 0, D: 0 },
    },
  },
  {
    id: 10,
    backgroundImage: '/questions/q10.jpg',
    leftChoice: {
      text: '좌측 선택지 10',
      scores: { A: 0, B: 2, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 10',
      scores: { A: 0, B: 0, C: 2, D: 0 },
    },
  },
  {
    id: 11,
    backgroundImage: '/questions/q11.jpg',
    leftChoice: {
      text: '좌측 선택지 11',
      scores: { A: 0, B: 0, C: 2, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 11',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
  },
  {
    id: 12,
    backgroundImage: '/questions/q12.jpg',
    leftChoice: {
      text: '좌측 선택지 12',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
    rightChoice: {
      text: '우측 선택지 12',
      scores: { A: 0, B: 0, C: 0, D: 2 },
    },
  },
];

export const TOTAL_QUESTIONS = questions.length;
