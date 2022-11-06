import React, { createContext, SetStateAction } from 'react';
import firebase from "firebase";

interface session {
    user: firebase.User | null;
}

interface ctx {
    session: any;
    setSession: any;
}

const val: ctx = {
    session: null,
    setSession: null
};

const Context = createContext(val);

export default Context;