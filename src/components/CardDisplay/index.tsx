import { CardsWrapper, CardImage, EmptyPrompt } from './style';

interface CardDisplayProps {
    card1: string | undefined;
    card2: string | undefined;
}

export function CardDisplay({ card1, card2 }: CardDisplayProps) {
    if (!card1 && !card2) {
        return <EmptyPrompt>Press DRAW to invoke your cards</EmptyPrompt>;
    }

    return (
        <CardsWrapper>
            {card1 && <CardImage src={card1} alt="Card 1" />}
            {card2 && <CardImage src={card2} alt="Card 2" />}
        </CardsWrapper>
    );
}
