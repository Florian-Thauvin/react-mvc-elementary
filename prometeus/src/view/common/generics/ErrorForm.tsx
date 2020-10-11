import { EConstraintsType } from '../../../model/common/ModelConstraints';

interface inputProps {
    errors: Array<EConstraintsType>,
}

function ErrorForm(props: inputProps): string {

    const { errors } = props;

    return (
        errors.length !== 0 ? `Detected errors: ${errors}` : ''
    );
}

export default ErrorForm;
