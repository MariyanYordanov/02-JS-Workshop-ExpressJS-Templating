export function getErrorMessage(err) {
    if (err.name === 'ValidationError') {
        return Object.values(err.errors).at(0).message;
    }
    return err.message;
}