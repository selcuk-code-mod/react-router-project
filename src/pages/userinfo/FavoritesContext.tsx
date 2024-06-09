/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// FavoritesContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId: number;
}

interface FavoritesState {
  photos: Photo[];
}

interface FavoritesAction {
  type: "ADD_FAVORITE" | "REMOVE_FAVORITE";
  photo?: Photo;
  photoId?: number;
}

const FavoritesContext = createContext<
  | {
      state: FavoritesState;
      dispatch: React.Dispatch<FavoritesAction>;
    }
  | undefined
>(undefined);

const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (action.photo) {
        return { ...state, photos: [...state.photos, action.photo] };
      }
      return state;
    case "REMOVE_FAVORITE":
      if (action.photoId !== undefined) {
        return {
          ...state,
          photos: state.photos.filter((photo) => photo.id !== action.photoId),
        };
      }
      return state;
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { photos: [] });

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
