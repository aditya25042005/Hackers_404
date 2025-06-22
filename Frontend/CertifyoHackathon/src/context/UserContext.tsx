import { createContext, useContext, useEffect, useState } from "react"
import { type ReactNode } from "react";
import axios from "axios";


interface User {
    email: string
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("https://hackers-404-5.onrender.com/user/give_email", {
                    withCredentials: true,
                });
                if (res.data.email) {
                    setUser({ email: res.data.email });
                   // localStorage.setItem("userEmail", res.data.email); // cache in localStorage
                }
            } catch {
                console.log("User not logged in with cookies. Trying localStorage...");
                const savedEmail = localStorage.getItem("userEmail");
                if (savedEmail) {
                    setUser({ email: savedEmail });
                }
            }
        };
        fetchUser();
    }, []);

return (
    < UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
);
};

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}