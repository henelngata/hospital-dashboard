/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "doctor" | "nurse" | "admin";
  avatar?: string;
  department?: string;
  specialization?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "doctor" | "nurse" | "admin";
};

// Create a default context value
const defaultContextValue: AuthContextType = {
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "u1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@hospital.com",
    role: "doctor",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Cardiology",
    specialization: "Cardiologist",
  },
  {
    id: "u2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@hospital.com",
    role: "doctor",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Neurology",
    specialization: "Neurologist",
  },
  {
    id: "u3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@hospital.com",
    role: "nurse",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "ICU",
  },
  {
    id: "u4",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@hospital.com",
    role: "nurse",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Emergency",
  },
  {
    id: "u5",
    firstName: "Jessica",
    lastName: "Wilson",
    email: "jessica.wilson@hospital.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would validate credentials with an API
    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      try {
        localStorage.setItem("user", JSON.stringify(foundUser));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
      return true;
    }

    return false;
  };

  const register = async (userData: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send registration data to your API
    const newUser: User = {
      id: `u${mockUsers.length + 1}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      avatar: "/placeholder.svg?height=40&width=40",
    };

    // Check if email already exists
    if (mockUsers.some((u) => u.email === userData.email)) {
      return false;
    }

    // In a real app, you would get the new user from the API response
    setUser(newUser);
    try {
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }

    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
