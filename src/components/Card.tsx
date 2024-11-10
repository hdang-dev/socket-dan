export const Card = ({ children, imageUrl, style, onClick }: { children: React.ReactNode; imageUrl: string; style?: string; onClick?: () => void }) => {
  return (
    <div className={`cursor-pointer snap-center min-w-[300px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg ${style}`} onClick={onClick}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={`w-full h-full bg-center bg-cover transition-all duration-300 hover:scale-110 active:scale-110 text-white active:text-[var(--bg-color)] grid place-items-center p-[20px]`}>
        {children}
      </div>
    </div>
  );
};
