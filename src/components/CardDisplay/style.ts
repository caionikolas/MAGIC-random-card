import styled from 'styled-components';

export const CardsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3rem;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 1.5rem;
    }
`;

export const CardImage = styled.img`
    width: 20rem;
    border-radius: 12px;
    border: 1px solid rgba(245, 144, 30, 0.2);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: scale(1.03);
        border-color: rgba(245, 144, 30, 0.7);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(245, 144, 30, 0.35);
    }

    @media (max-width: 480px) {
        width: 100%;
        max-width: 320px;
    }
`;

export const EmptyPrompt = styled.p`
    font-family: 'Planewalker', sans-serif;
    font-size: 1.2rem;
    color: #AEACAC;
    text-align: center;
    letter-spacing: 0.05em;
`;
