import axios from "axios";
import Compressor from "compressorjs";

export const compressAndUploadImage = (
  img,
  uploadFunc,
  setPreview,
  name,
  setFieldValue,
  setProgress,
  isCompressing
) => {
  console.log("fired!!!");
  const uploadFile = (file) => {
    console.log("uploading file...", file);
    if (!file) throw new Error("No file passed to upload function");
    uploadFunc(file, setProgress)
      .then((res) => {
        console.log("finished uploading file", res);
        setPreview(res);
        setFieldValue(name, res);
      })
      .catch((err) => console.log("couldn't upload image", err));
  };

  try {
    isCompressing(true);
    new Compressor(img, {
      quality: 0.6,
      success: (result) => {
        isCompressing(false);
        uploadFile(result);
      },
    });
  } catch (error) {
    console.log("Error while trying to compress image", error);
    isCompressing(true);
    uploadFile(img);
  }
};

export const scrollToTop = (element) => {
  try {
    element?.current?.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.log("couldn't scroll to the top", error);
  }
};

export const uploadImage = async (file, setProgress) => {
  try {
    const form = new FormData();
    form.append("file", file);
    const data = await axios({
      method: "post",
      url: "https://api.heala.io/rest/media/upload/",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      },
      data: form,
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    return data.data.data.mediaUrl; //data.data.mediaUrl
  } catch (error) {
    console.error(error);
  }
};
