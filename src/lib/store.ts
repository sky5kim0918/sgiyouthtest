// localStorage 관리
const STORAGE_KEY_NAME = 'test_user_name';
const STORAGE_KEY_ANSWERS = 'test_answers';
const STORAGE_KEY_WINNER = 'test_winner';

export function saveName(name: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_NAME, name);
  }
}

export function getName(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY_NAME);
  }
  return null;
}

export function clearName(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_NAME);
  }
}

export interface Answer {
  questionId: number;
  choice: 'left' | 'right';
}

export function saveAnswers(answers: Answer[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  }
}

export function getAnswers(): Answer[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
  }
  return [];
}

export function clearAnswers(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
  }
}

export function saveWinner(winner: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_WINNER, winner);
  }
}

export function getWinner(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY_WINNER);
  }
  return null;
}

export function clearWinner(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_WINNER);
  }
}

export function clearAll(): void {
  clearName();
  clearAnswers();
  clearWinner();
}
