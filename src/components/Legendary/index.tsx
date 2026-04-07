import { CardPage } from '../CardPage';
import bgImage from '../../assets/imgs/MAGICBACKGROUND.jpg';

const LEGENDARY_TYPES = ['Legendary Creature', 'Legendary Planeswalker', 'Legendary Artifact'];

function isLegendary(card: any): boolean {
    const type = card.type_line?.split(' — ')[0] ?? '';
    return LEGENDARY_TYPES.includes(type);
}

export function Legendary() {
    return <CardPage filterCard={isLegendary} backgroundImage={bgImage} />;
}
