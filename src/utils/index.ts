export const getTime = () => {
  const today = new Date();
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
};

export const checkRoomId = (roomId: string, maxLength: number): 'valid' | 'ok_but_start_with_0' | 'length_exceed' | 'invalid' => {
  const validRoomId = Number(roomId);
  if (isNaN(validRoomId)) return 'invalid';
  if (validRoomId.toString().length > maxLength) return 'length_exceed';
  if (roomId.startsWith('0')) return 'ok_but_start_with_0';
  return 'valid';
};