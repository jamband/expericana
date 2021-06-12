import { useQuery, UseQueryResult } from "react-query";
import { http } from "~/utils/http";

export const useTracksGenres = (): UseQueryResult<string[], Error> => {
  return useQuery("tracksGenres", async () => {
    const response = await http({ url: "/tracks/genres" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};

export const useLabelsCountries = (): UseQueryResult<string[], Error> => {
  return useQuery("labelsCountries", async () => {
    const response = await http({ url: "/labels/countries" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};

export const useLabelsTags = (): UseQueryResult<string[], Error> => {
  return useQuery("labelsTags", async () => {
    const response = await http({ url: "/labels/tags" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};

export const useStoresCountries = (): UseQueryResult<string[], Error> => {
  return useQuery("storesCountries", async () => {
    const response = await http({ url: "/stores/countries" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};

export const useStoresTags = (): UseQueryResult<string[], Error> => {
  return useQuery("storesTags", async () => {
    const response = await http({ url: "/stores/tags" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};

export const useBookmarksCountries = (): UseQueryResult<string[], Error> => {
  return useQuery("bookmarksCountries", async () => {
    const response = await http({ url: "/bookmarks/countries" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};

export const useBookmarksTags = (): UseQueryResult<string[], Error> => {
  return useQuery("bookmarksTags", async () => {
    const response = await http({ url: "/bookmarks/tags" });
    if (response.ok) {
      return response.json();
    }
    throw Error("Request failure");
  });
};
