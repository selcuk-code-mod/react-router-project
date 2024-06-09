/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";

interface Photo {
  userId: number;
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoritesState {
  photos: Photo[];
}

const initialState: FavoritesState = {
  photos: [],
};

type Action =
  | { type: "ADD_FAVORITE"; photo: Photo }
  | { type: "REMOVE_FAVORITE"; photoId: number };

function favoritesReducer(
  state: FavoritesState,
  action: Action
): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      return { ...state, photos: [...state.photos, action.photo] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.id !== action.photoId),
      };
    default:
      return state;
  }
}

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);
  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
