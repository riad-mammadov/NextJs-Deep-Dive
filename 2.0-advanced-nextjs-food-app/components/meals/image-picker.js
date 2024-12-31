"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

function ImagePicker({ label, name }) {
  const [pickedImage, SetPickedImage] = useState();
  const imageRef = useRef();

  function handleClick() {
    imageRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      SetPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      SetPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image selected yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image selected by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageRef}
          onChange={handleImageChange}
          required
        />
        <button onClick={handleClick} className={classes.button} type="button">
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
