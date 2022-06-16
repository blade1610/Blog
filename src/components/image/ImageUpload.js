import React, {Fragment} from "react";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    ...rest
  } = props;

  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="loading border-t-transparent animate-spin absolute z-10 w-16 h-16 border-8 border-orange-400 rounded-full"></div>
      )}
      {!image && image === "" && progress === 0 && (
        <div className="flex flex-col items-center text-center transition-all pointer-events-none">
          <img
            src={require("../../assets/images/img-upload.png")}
            alt="upload-img"
            className="max-w-[80px] mb-5 transition-all"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img
            src={image}
            className="object-cover w-full h-full rounded-[inherit]"
            alt=""
          />
          <button
            type="button"
            className=" text-md group-hover:opacity-100 group-hover:visible absolute z-10 flex items-center justify-center invisible w-20 h-20 text-red-500 transition-all bg-white bg-opacity-50 rounded-full opacity-0 cursor-pointer"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className="image-upload-progress absolute bottom-0 left-0 w-10 h-1 transition-all bg-orange-400"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
