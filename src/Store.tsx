import React, {ReactElement, useState, useReducer, Reducer, Dispatch} from "react"; 
import { ifError } from "assert";

/* Do not do this in production! Super inefficient! */ 

export interface IEpisode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: {
        medium: string, 
        original: string
    }; 
    summary: string;

};

interface IStoreState {
    state: {
        episodes: IEpisode[];
        favorites: IEpisode[]; 
    };
    dispatch: (action: IAction) => void;
}

interface IAction {
    type: string;
    payload: any; 
}

const initialState: IStoreState = {
    state: {
        episodes: [],
        favorites: []
    },
    dispatch: (action: IAction) => {}
};

export const Store = React.createContext<IStoreState>(initialState); 

const reducer: Reducer<IStoreState, IAction> = (state: IStoreState, action: IAction): IStoreState => {
    switch (action.type) {
        case "FETCH_DATA":
            return {state: {...state.state, episodes: action.payload}, dispatch: state.dispatch}; 
        case "TOGGLE_FAVORITE":
            const favs = [...state.state.favorites]; 
            const pos = favs.findIndex((fav: IEpisode) => fav.id === action.payload.id); 
            if (pos != -1) {
                favs.splice(pos, 1); 
            } else {
                favs.push(action.payload); 
            }
            return {state: {episodes: state.state.episodes, favorites: favs}, dispatch: state.dispatch}; 
        default:
            return state; 
    }
};

export const StoreProvider = (props: any): ReactElement => {
    const dispatchEvent = (action: IAction): void => {
        dispatch(action); 
    }

    const [state, dispatch] = useReducer<Reducer<IStoreState, IAction>>(reducer, {state: initialState.state, dispatch: dispatchEvent}); 

    return <Store.Provider value={state}>{props.children}</Store.Provider>
}
