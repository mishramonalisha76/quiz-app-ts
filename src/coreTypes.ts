export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string,
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

export type Question_state = Question & { answers: string[] };
