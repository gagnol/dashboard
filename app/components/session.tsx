"use client"
import { SessionProvider } from 'next-auth/react';
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';

const Session = ({ children, session }: any) => (
    <>
    <Toaster />
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </PersistGate>
    </Provider>
    </>
);

export default Session;
