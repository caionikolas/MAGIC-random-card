import styled from 'styled-components';

export const PageWrapper = styled.div<{ $bg?: string }>`
    min-height: 100vh;
    background: ${({ $bg }) =>
        $bg ? `url(${$bg}) center/cover no-repeat` : '#1A1A1A'};
    display: flex;
    flex-direction: column;
`;

export const BackButton = styled.button`
    background: transparent;
    border: none;
    color: #AEACAC;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.5rem 0;
    width: fit-content;
    transition: color 0.2s ease;

    &:hover {
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
