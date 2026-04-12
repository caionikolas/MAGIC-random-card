import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import bgImage from '../../assets/imgs/Background.jpg';
import {
    PageWrapper,
    PanelsRow,
    Divider,
    Panel,
    PanelLabel,
    PanelSub,
} from './style';

export function Dashboard() {
    const [hovered, setHovered] = useState<'legendary' | 'normal' | null>(null);

    return (
        <PageWrapper $bg={bgImage}>
            <Header />
            <PanelsRow>
                <Panel
                    as={Link}
                    to="/Legendary"
                    $expanded={hovered === 'legendary'}
                    $left={true}
                    onMouseEnter={() => setHovered('legendary')}
                    onMouseLeave={() => setHovered(null)}
                    onTouchStart={() => setHovered('legendary')}
                    onTouchEnd={() => setHovered(null)}
                >
                    <PanelLabel $active={hovered === 'legendary'}>Legendary</PanelLabel>
                    <PanelSub>Click to draw</PanelSub>
                </Panel>
                <Divider />
                <Panel
                    as={Link}
                    to="/Normal"
                    $expanded={hovered === 'normal'}
                    $left={false}
                    onMouseEnter={() => setHovered('normal')}
                    onMouseLeave={() => setHovered(null)}
                    onTouchStart={() => setHovered('normal')}
                    onTouchEnd={() => setHovered(null)}
                >
                    <PanelLabel $active={hovered === 'normal'}>Normal</PanelLabel>
                    <PanelSub>Click to draw</PanelSub>
                </Panel>
            </PanelsRow>
        </PageWrapper>
    );
}
