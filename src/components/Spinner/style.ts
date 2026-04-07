import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const Ring = styled.span`
    display: block;
    width: 3rem;
    height: 3rem;
    border: 4px solid rgba(174, 172, 172, 0.2);
    border-top-color: #F5901E;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

export const SpinnerLabel = styled.p`
    font-family: 'Planewalker', sans-serif;
    font-size: 0.9rem;
    color: #AEACAC;
    letter-spacing: 0.08em;
`;
