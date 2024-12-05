export const getTime = () => {
  const today = new Date();
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
};

export const randomId = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
};

export const isSafariBrowser = () => {
  return navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
};

export const roomTypeToName = (type: string) => {
  return type[0].toUpperCase() + type.slice(1) + " Room";
};
