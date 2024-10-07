import { createContext, useState } from "react";

interface AppValue {
    dialog: {
        isShowed: boolean;
        setIsShowed: (value: boolean) => void;
    };
}

const defaultValue: AppValue = {
    dialog: {
        isShowed: false,
        setIsShowed: () => { }
    }
};

export const AppContext = createContext<AppValue>(defaultValue);


export default function AppProvider({ children }: { children: JSX.Element; }) {
    const [isDialogShowed, setIsDialogShowed] = useState(false);
    return (
        <AppContext.Provider value={{
            dialog: {
                isShowed: isDialogShowed,
                setIsShowed: setIsDialogShowed
            }
        }} >
            {children}
        </AppContext.Provider>
    );
}


