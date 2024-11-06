export const Card = ({ name, imageUrl, onClick }: { name: string; imageUrl: string; onClick?: () => void; }) => {
    return (
        <div className="cursor-pointer w-[250px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg" onClick={onClick}>
            <div
                style={{ backgroundImage: `url(${imageUrl})` }}
                className={`w-full h-full transition-all duration-300 hover:scale-110 active:scale-110 text-white active:text-[var(--bg-color)] grid place-items-center`}>
                <span className="text-inherit">{name}</span>
            </div>
        </div>
    );
};