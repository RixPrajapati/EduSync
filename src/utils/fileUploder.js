import { v2 as cloudinary } from "cloudinary";

async function uploadFile(files) {
  if (!files) return [];

  const fileArray = Array.isArray(files) ? files : [files];

  const uploadedFiles = [];

  for (const file of fileArray) {
    if (!file) continue;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "edusync",
            allowed_formats: ["jpg", "png", "webp", "jpeg", "pdf"],
            resource_type: "auto",
            type: "upload",
            access_mode:"public"
          },
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          },
        )
        .end(file.buffer);
    });

    uploadedFiles.push(result);
  }

  return uploadedFiles;
}
export const deleteFile = async (fileUrl) => {
  if (!fileUrl) return;
  const publicId = fileUrl.split("/").slice(-2).join("/").split(".")[0];
  return await cloudinary.uploader.destroy(publicId);
};

export const updateFile = async (oldFileUrl, newFiles) => {
  await deleteFile(oldFileUrl);
  const uploaded = await uploadFile(newFiles);
  return uploaded;
};
export default uploadFile;
