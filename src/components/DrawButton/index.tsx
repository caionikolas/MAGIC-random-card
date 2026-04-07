import { Button } from './style';
import buttonImg from '../../assets/imgs/button.png';

interface DrawButtonProps {
    onClick: () => void;
    loading: boolean;
}

export function DrawButton({ onClick, loading }: DrawButtonProps) {
    return (
        <Button type="button" onClick={onClick} disabled={loading}>
            <img src={buttonImg} alt="Draw" />
        </Button>
    );
}
