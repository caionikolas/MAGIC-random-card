import styled from 'styled-components';

export const Button = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    margin-top: 2.5rem;
    padding: 0;

    img {
        width: 70px;
        display: block;
    }

    &:hover:not(:disabled) img {
        filter: brightness(0.8);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
