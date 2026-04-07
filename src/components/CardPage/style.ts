import styled from 'styled-components';

export const PageWrapper = styled.div<{ $bg?: string }>`
    min-height: 100vh;
    background: ${({ $bg }) =>
        $bg ? `url(${$bg}) center/cover no-repeat` : '#1A1A1A'};
    display: flex;
    flex-direction: column;
`;

export const BackButton = styled.button`
    background: rgba(26, 26, 26, 0.75);
    border: 1px solid rgba(174, 172, 172, 0.3);
    border-radius: 6px;
    color: #FFFFFF;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0.4rem 1rem;
    width: fit-content;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    backdrop-filter: blur(4px);

    &:hover {
        background: rgba(245, 144, 30, 0.15);
        border-color: #F5901E;
        color: #F5901E;
    }
`;

export const ErrorMessage = styled.p`
    font-family: 'Planewalker', sans-serif;
    font-size: 1rem;
    color: #832100;
    text-align: center;
    letter-spacing: 0.04em;
`;

export const TopBar = styled.div`
    padding: 0.75rem 2rem;
    margin-top: 56px; /* header height */
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;
