import { nanoid } from "nanoid";
import { MdStar, MdStarOutline } from "react-icons/md";

export default function useScore() {
    const getStars = (score) => {
        return [
            ...[...Array(score)].map((_) => <MdStar key={nanoid()} />),
            ...[...Array(5 - score)].map((_) => <MdStarOutline key={nanoid()} />),
        ];
    };

    const getWrittenScore = (score) => {
        if (score <= 3) return "Malo";
        if (score <= 6) return "Aceptable";
        if (score <= 9) return "Muy bueno";
        if (score === 10) return "Excelente";
    };

    return [getStars, getWrittenScore]
}