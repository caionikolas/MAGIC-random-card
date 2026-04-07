import styled from 'styled-components';

export const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: rgba(26, 26, 26, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    padding: 0 2rem;
    z-index: 100;
    border-bottom: 1px solid rgba(174, 172, 172, 0.15);
`;

export const Logo = styled.span`
    font-family: 'Planewalker', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #F5901E;
    letter-spacing: 0.05em;
    user-select: none;
`;
