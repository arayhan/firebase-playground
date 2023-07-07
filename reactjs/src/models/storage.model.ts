import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from "firebase/storage";
import { storageUploadDir, storageThumbnailDir } from "../utils/firebase.config";

type StorageResponse = {
  payload: any;
  error: any;
};

export const getFile = async (filePath: string) => {
  const storageRef = ref(storageThumbnailDir, filePath);
  return await getDownloadURL(storageRef);
};

export const getFiles = async (folder: string): Promise<StorageResponse> => {
  const storageRef = ref(storageThumbnailDir, folder);

  try {
    const response = await listAll(storageRef);
    const files = await Promise.all(response.items.map(async (item) => await getFile(item.fullPath)));
    if (response.items.length > 0) {
      return {
        payload: files,
        error: null,
      };
    }
    return {
      payload: response,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};

export const putFile = async (file: File, directory: string): Promise<StorageResponse> => {
  const storageRef = ref(storageUploadDir, `${directory}/${file.name}`);

  try {
    const response = await uploadBytes(storageRef, file);
    return {
      payload: response,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};

export const deleteFile = async (path: string): Promise<StorageResponse> => {
  const storageRef = ref(storageUploadDir, path);

  try {
    const response = await deleteObject(storageRef);
    return {
      payload: response,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};
