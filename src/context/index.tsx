import { createContext, useEffect, useState } from "react";
import { emitEvent, onEvent } from "../socket";

interface User {
    id?: string;
    name?: string;
}

interface AppValue {
    user: {
        data: User;
        setData: (user: User) => void;
    };
    room: {
        id?: string;
        setId: (room?: string) => void;
    };
    dialog: {
        isShowed: boolean;
        setIsShowed: (value: boolean) => void;
    };
}

const defaultValue: AppValue = {
    user: {
        data: {},
        setData: () => { },
    },
    room: {
        setId: () => { },
    },
    dialog: {
        isShowed: false,
        setIsShowed: () => { }
    }
};

export const AppContext = createContext<AppValue>(defaultValue);


export default function AppProvider({ children }: { children: JSX.Element; }) {
    const [user, setUser] = useState<User>({});
    const [room, setRoom] = useState<string>();
    const [isDialogShowed, setIsDialogShowed] = useState(false);

    useEffect(() => {
        emitEvent("JOIN_APP");
        onEvent("USER_ID", (userId) => setUser(prev => ({ ...prev, id: userId })));
    }, []);

    return (
        <AppContext.Provider value={{
            user: { data: user, setData: setUser },
            room: { id: room, setId: setRoom },
            dialog: { isShowed: isDialogShowed, setIsShowed: setIsDialogShowed }
        }} >
            {children}
        </AppContext.Provider>
    );
}


