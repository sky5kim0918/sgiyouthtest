// 점수 계산 로직
export type Type = 'A' | 'B' | 'C' | 'D';

export interface Scores {
  A: number;
  B: number;
  C: number;
  D: number;
}

export interface Answer {
  questionId: number;
  choice: 'left' | 'right';
}

/**
 * 선택한 답변들로부터 최종 유형을 계산
 * 동점이면 A→B→C→D 우선순위로 결정
 */
export function calculateResult(answers: Answer[], questions: Array<{ leftChoice: { scores: Scores }; rightChoice: { scores: Scores } }>): Type {
  const totalScores: Scores = { A: 0, B: 0, C: 0, D: 0 };

  answers.forEach((answer) => {
    const question = questions[answer.questionId - 1];
    if (!question) return;

    const scores = answer.choice === 'left' ? question.leftChoice.scores : question.rightChoice.scores;
    totalScores.A += scores.A;
    totalScores.B += scores.B;
    totalScores.C += scores.C;
    totalScores.D += scores.D;
  });

  // 동점이면 A→B→C→D 우선순위로 결정
  const types: Type[] = ['A', 'B', 'C', 'D'];
  let winner: Type = 'A';
  let maxScore = totalScores.A;

  types.forEach((type) => {
    if (totalScores[type] > maxScore) {
      maxScore = totalScores[type];
      winner = type;
    }
  });

  return winner;
}
