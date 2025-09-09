import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // SignUp
    const signUpNewUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                console.error("Error signing up:", error);
                return { success: false, error: error.message };
            }
            return { success: true, data: data };
        } catch (err) {
            console.error("Unexpected error signing up:", err);
            return { success: false, error: err.message };
        }
    }

    // SignOut
    const signOutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error signing out:", error);
                return { success: false, error: error.message };
            }
            console.log("User signed out successfully");
            return { success: true };
        } catch (err) {
            console.error("Unexpected error signing out:", err);
            return { success: false, error: err.message };
        }
    }

    // SignIn
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error("Error signing in:", error);
                return { success: false, error: error.message };
            }
            console.log("SignIn data");
            return { success: true, data: data };
        } catch (err) {
            console.error("Unexpected error signing in:", err);
            return { success: false, error: err.message };
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOutUser, signInUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}