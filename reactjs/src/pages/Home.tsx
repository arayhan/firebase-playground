import { useState, useEffect } from "react";
import { NavBar } from "../components/layout/NavBar";
import { FormUploadImage } from "../components/molecules/Forms/FormUploadImage";
import { deleteFile, getFiles } from "../models/storage.model";

type Props = {};

const Home = (props: Props) => {
  const [thumbnails, setThumbnails] = useState<any[]>([]);

  const getStorageFiles = async () => {
    const response = await getFiles("/");
    if (response.payload) {
      setThumbnails(response.payload);
    }
  };

  const handleDelete = async (filePath: string) => {
    await deleteFile(filePath);
    getStorageFiles();
  };

  useEffect(() => {
    getStorageFiles();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container py-24 space-y-6">
        <FormUploadImage
          onUploaded={() => {
            console.log("UPLOADED");
            getStorageFiles();
          }}
        />
        <hr />
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {thumbnails.length > 0 &&
            thumbnails.map((thumbnail) => (
              <div className="relative group">
                <div className="absolute hidden group-hover:block right-2 top-2">
                  <button className="px-3 py-1 text-sm text-white bg-red-500 rounded-md" onClick={() => handleDelete(thumbnail)}>
                    Delete
                  </button>
                </div>
                <img src={thumbnail} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
