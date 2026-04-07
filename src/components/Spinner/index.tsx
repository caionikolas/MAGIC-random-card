import { SpinnerWrapper, Ring, SpinnerLabel } from './style';

export function Spinner() {
    return (
        <SpinnerWrapper>
            <Ring />
            <SpinnerLabel>Invoking...</SpinnerLabel>
        </SpinnerWrapper>
    );
}
