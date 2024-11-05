import React, { createContext, useContext, useState } from 'react';

interface Message {
    sender: string;
    text: string;
}

interface HistoryContextType {
    history: { id: string; messages: Message[] }[];
    addHistoryEntry: (id: string, messages: Message[]) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<{ id: string; messages: Message[] }[]>([]);

    const addHistoryEntry = (id: string, messages: Message[]) => {
        setHistory((prev) => [...prev, { id, messages }]);
    };

    return (
        <HistoryContext.Provider value={{ history, addHistoryEntry }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
