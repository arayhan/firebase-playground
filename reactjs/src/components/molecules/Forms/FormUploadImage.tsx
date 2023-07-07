import { useState } from "react";
import { BiUpload } from "react-icons/bi";
import { Button } from "../../atoms/Button";
import { putFile } from "../../../models/storage.model";

type Props = {
  onUploaded: () => void;
};

export const FormUploadImage = ({ onUploaded, ...props }: React.ComponentProps<"input"> & Props) => {
  const [file, setFile] = useState<FileList | null>(null);

  const handleUpload = async () => {
    if (file) {
      try {
        await putFile(file[0], "/");
        setFile(null);
        window.location.reload();
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <div className="max-w-screen-sm p-6 mx-auto bg-white rounded-md shadow-md">
      <div className="space-y-4">
        <div className="text-2xl font-semibold">Image Processing Demo</div>
        <hr />
        <div>
          {file && (
            <div className="space-y-3">
              <div className="grid place-items-center">
                <img id="upload-image-output" alt="" className="rounded-md w-60" src={URL.createObjectURL(file[0])} />
              </div>
              <div className="grid place-items-center">
                <label className="cursor-pointer">
                  <input className="hidden" name="receipt" type="file" onChange={(e) => setFile(e.target.files)} {...props} />
                  <div className="inline-block px-5 py-2 font-semibold btn button-primary bg-slate-200">Change Picture</div>
                </label>
              </div>
            </div>
          )}
          {!file && (
            <label
              htmlFor="upload"
              className="flex flex-col items-center w-full p-6 space-y-5 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
            >
              <div className="flex flex-col items-center space-y-3">
                <BiUpload className="inline-block text-gray-500" size={28} />
                <div className="text-sm text-gray-500">Upload Image</div>
              </div>
              <input
                className="hidden"
                type="file"
                name="upload"
                id="upload"
                alt="image"
                onChange={(e) => setFile(e.target.files)}
                accept="image/*"
                {...props}
              />
            </label>
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>
    </div>
  );
};
