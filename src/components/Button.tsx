interface ButtonProps {
    children: React.ReactNode;
    style?: string;
    onClick?: () => void;
}

export function Button({ children, style, onClick }: ButtonProps) {
    return (
        <button className={`min-w-[100px] px-[10px] py-[5px] rounded-xl border border-white bg-[rgba(0,0,0,.2)] ${style ?? ''}`} onClick={onClick}>{children}</button>
    );
}
