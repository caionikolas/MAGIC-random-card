import { CardPage } from '../CardPage';
import bgImage from '../../assets/imgs/NormalBACKGROUND.jpg';

const EXCLUDED_TYPES = [
    'Sorcery',
    'Instant',
    'Legendary Sorcery',
    'Snow Sorcery',
    'Land',
    'Snow Land',
    'Legendary Land',
    'Basic Snow Land',
];

function isNormal(card: any): boolean {
    const type = card.type_line?.split(' — ')[0] ?? '';
    return !EXCLUDED_TYPES.includes(type);
}

export function Normal() {
    return <CardPage filterCard={isNormal} backgroundImage={bgImage} />;
}
