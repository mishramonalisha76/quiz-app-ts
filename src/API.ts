import { suffleArray } from "./utils";
import { Difficulty, Question } from "./coreTypes";

export const fetchQuizQuestions = async (amount: Number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: suffleArray([...question.incorrect_answers, question.correct_answer]),
    }));
}