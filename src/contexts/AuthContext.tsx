"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { setAccessToken } from "@/lib/axios";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    initialUser?: User | null;
}

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [isLoading, setIsLoading] = useState(true);

    // Sync user state when initialUser changes (server-side data)
    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
        }
    }, [initialUser]);

    const pathname = usePathname();

    useEffect(() => {
        // Auto-refresh access token on mount and on navigation if user is missing
        const initializeAuth = async () => {
            // If we already have a user, we might not need to refresh, but checking token validity is good practice
            // However, to avoid excessive calls, we can check if we have an access token in memory
            // For now, let's just refresh to be safe and ensure we have the latest user state

            try {
                const res = await axios.post("/api/auth/refresh");

                if (res.data.success && res.data.accessToken) {
                    setAccessToken(res.data.accessToken);

                    // Update user state from refresh response
                    if (res.data.user) {
                        setUser(res.data.user);
                    }
                }
            } catch (error) {
                // Refresh failed - user is not authenticated or session expired
                // Only clear if we are currently expecting to be logged in (e.g. we had a user before)
                // or if we are on a protected route. For now, just clear to be safe.
                console.log("Auth refresh failed - user not logged in");
                setUser(null);
                setAccessToken(null);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [pathname]); // Re-run on path change

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setAccessToken(null);
            setUser(null);
            window.location.href = "/"; // Redirect to home after logout
        } catch (error) {
            console.error("Logout failed", error);
            // Even if logout fails, clear local state
            setAccessToken(null);
            setUser(null);
            window.location.href = "/";
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
