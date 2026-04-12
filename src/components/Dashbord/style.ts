import styled from 'styled-components';

export const PageWrapper = styled.div<{ $bg?: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ $bg }) =>
        $bg ? `url(${$bg}) center/cover no-repeat` : '#1A1A1A'};
    overflow: hidden;
`;

export const PanelsRow = styled.div`
    flex: 1;
    display: flex;
    margin-top: 56px; /* header height */
`;

export const Divider = styled.div`
    width: 3px;
    background: #832100;
    flex-shrink: 0;
`;

interface PanelProps {
    $expanded: boolean;
    $left: boolean;
}

export const Panel = styled.a<PanelProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: ${({ $expanded }) => ($expanded ? '1.2' : '1')};
    background: ${({ $expanded }) =>
        $expanded ? 'rgba(36, 36, 36, 0.6)' : 'rgba(26, 26, 26, 0.45)'};
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    ${({ $expanded, $left }) => $expanded && $left && 'border-left-color: #F5901E;'}
    ${({ $expanded, $left }) => $expanded && !$left && 'border-right-color: #F5901E;'}
    transition: flex 0.4s ease, background 0.4s ease, border-left-color 0.3s ease, border-right-color 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    gap: 0.75rem;
    padding: 2rem;

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;

interface PanelLabelProps {
    $active: boolean;
}

export const PanelLabel = styled.span<PanelLabelProps>`
    font-family: 'Planewalker', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    color: ${({ $active }) => ($active ? '#F5901E' : '#AEACAC')};
    letter-spacing: 0.05em;
    transition: color 0.3s ease;
    user-select: none;
    text-align: center;

    @media (max-width: 480px) {
        font-size: 1.6rem;
    }
`;

export const PanelSub = styled.span`
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.9rem;
    color: #AEACAC;
    letter-spacing: 0.04em;
    user-select: none;

    @media (max-width: 480px) {
        font-size: 0.75rem;
    }
`;
