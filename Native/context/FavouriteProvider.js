import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMessage } from "./MessageProvider";

const FavouriteContext = createContext(null);

export default function FavouriteProvider({ children }) {
  const { showMessage } = useMessage();
  const [favouriteList, setFavouriteList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadFavourites() {
      try {
        const storedFavourites = await AsyncStorage.getItem("favourites");

        if (storedFavourites !== null) {
          setFavouriteList(JSON.parse(storedFavourites));
        }
      } catch (error) {
        console.error("Could not load favourites: ", error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadFavourites();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveFavourites() {
      try {
        await AsyncStorage.setItem("favourites", JSON.stringify(favouriteList));
      } catch (error) {
        console.error("Could not save favourites: ", error);
      }
    }

    saveFavourites();
  }, [favouriteList, isLoaded]);

  function addOrRemoveFavourite(media, mediaType) {
    const favouriteType = mediaType ?? media.media_type;

    if (!media?.id || !["movie", "tv"].includes(favouriteType)) {
      console.warn("Favourite needs an ID and media type.");
      return;
    }

    const favourite = {
      ...media,
      mediaType: favouriteType,
    };

    const alreadyFavourite = favouriteList.some(
      (item) =>
        item.id === favourite.id && item.mediaType === favourite.mediaType,
    );

    if (alreadyFavourite) {
      setFavouriteList((prev) =>
        prev.filter(
          (item) =>
            item.id !== favourite.id || item.mediaType !== favourite.mediaType,
        ),
      );

      showMessage(
        "error",
        `Removed ${favourite.title ?? favourite.name} to favourites!`,
      );

      return;
    }

    setFavouriteList((prev) => [...prev, favourite]);

    showMessage(
      "success",
      `Added ${favourite.title ?? favourite.name} to favourites!`,
    );
  }

  function isFavourite(id, mediaType) {
    return favouriteList.some(
      (item) => item.id === id && item.mediaType === mediaType,
    );
  }

  return (
    <FavouriteContext.Provider
      value={{
        favouriteList,
        addOrRemoveFavourite,
        isFavourite,
        isLoaded,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourite() {
  return useContext(FavouriteContext);
}
