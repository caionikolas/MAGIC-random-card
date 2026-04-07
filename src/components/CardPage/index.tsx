import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Header } from '../Header';
import { CardDisplay } from '../CardDisplay';
import { DrawButton } from '../DrawButton';
import { Spinner } from '../Spinner';
import { PageWrapper, BackButton, TopBar, Content, ErrorMessage } from './style';

interface CardPageProps {
    filterCard: (card: any) => boolean;
    backgroundImage?: string;
}

export function CardPage({ filterCard, backgroundImage }: CardPageProps) {
    const [card1, setCard1] = useState<string | undefined>();
    const [card2, setCard2] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchCard = async (): Promise<string | undefined> => {
        for (let attempts = 0; attempts < 30; attempts++) {
            const response = await api.get('/cards/random', {
                params: { q: 'legal:historic' },
            });
            const card = response.data;
            if (filterCard(card)) {
                return (
                    card.image_uris?.normal ??
                    card.image_uris?.png ??
                    card.card_faces?.[0]?.image_uris?.normal ??
                    card.card_faces?.[0]?.image_uris?.png
                );
            }
        }
        return undefined;
    };

    const draw = async () => {
        setLoading(true);
        setError(null);
        try {
            const [img1, img2] = await Promise.all([fetchCard(), fetchCard()]);
            if (!img1 || !img2) {
                setError('Could not find matching cards. Try again.');
                return;
            }
            setCard1(img1);
            setCard2(img2);
        } catch {
            setError('Failed to fetch cards. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper $bg={backgroundImage}>
            <Header />
            <TopBar>
                <BackButton type="button" onClick={() => navigate('/')}>
                    ← Back
                </BackButton>
            </TopBar>
            <Content>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <ErrorMessage>{error}</ErrorMessage>
                ) : (
                    <CardDisplay card1={card1} card2={card2} />
                )}
                <DrawButton onClick={draw} loading={loading} />
            </Content>
        </PageWrapper>
    );
}
