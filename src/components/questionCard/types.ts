import {AnswerObject} from "../../coreTypes";

export type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNr: number,
    totalQuestions: number,
}

export type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
  };