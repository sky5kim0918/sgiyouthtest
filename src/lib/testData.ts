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
      scores: { A: 5, B: 5, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 1',
      scores: { A: 5, B: 5, C: 0, D: 5 },
    },
  },
  {
    id: 2,
    backgroundImage: '/questions/q2.jpg',
    leftChoice: {
      text: '좌측 선택지 2',
      scores: { A: 5, B: 5, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 2',
      scores: { A: 0, B: 5, C: 5, D: 5 },
    },
  },
  {
    id: 3,
    backgroundImage: '/questions/q3.jpg',
    leftChoice: {
      text: '좌측 선택지 3',
      scores: { A: 0, B: 0, C: 10, D: 10 },
    },
    rightChoice: {
      text: '우측 선택지 3',
      scores: { A: 10, B: 5, C: 5, D: 0 },
    },
  },
  {
    id: 4,
    backgroundImage: '/questions/q4.jpg',
    leftChoice: {
      text: '좌측 선택지 4',
      scores: { A: 5, B: 5, C: 5, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 4',
      scores: { A: 0, B: 5, C: 0, D: 5 },
    },
  },
  {
    id: 5,
    backgroundImage: '/questions/q5.jpg',
    leftChoice: {
      text: '좌측 선택지 5',
      scores: { A: 0, B: 0, C: 5, D: 10 },
    },
    rightChoice: {
      text: '우측 선택지 5',
      scores: { A: 5, B: 5, C: 5, D: 0 },
    },
  },
  {
    id: 6,
    backgroundImage: '/questions/q6.jpg',
    leftChoice: {
      text: '좌측 선택지 6',
      scores: { A: 5, B: 5, C: 10, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 6',
      scores: { A: 5, B: 5, C: 10, D: 0 },
    },
  },
  {
    id: 7,
    backgroundImage: '/questions/q7.jpg',
    leftChoice: {
      text: '좌측 선택지 7',
      scores: { A: 0, B: 0, C: 5, D: 10 },
    },
    rightChoice: {
      text: '우측 선택지 7',
      scores: { A: 5, B: 0, C: 10, D: 0 },
    },
  },
  {
    id: 8,
    backgroundImage: '/questions/q8.jpg',
    leftChoice: {
      text: '좌측 선택지 8',
      scores: { A: 5, B: 5, C: 5, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 8',
      scores: { A: 0, B: 5, C: 5, D: 5 },
    },
  },
  {
    id: 9,
    backgroundImage: '/questions/q9.jpg',
    leftChoice: {
      text: '좌측 선택지 9',
      scores: { A: 5, B: 5, C: 5, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 9',
      scores: { A: 0, B: 5, C: 5, D: 5 },
    },
  },
  {
    id: 10,
    backgroundImage: '/questions/q10.jpg',
    leftChoice: {
      text: '좌측 선택지 10',
      scores: { A: 10, B: 5, C: 0, D: 0 },
    },
    rightChoice: {
      text: '우측 선택지 10',
      scores: { A: 10, B: 5, C: 0, D: 0 },
    },
  },
];

export const TOTAL_QUESTIONS = questions.length;
