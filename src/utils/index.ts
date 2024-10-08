export const getTime = () => {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minnutes = today.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minnutes;
};