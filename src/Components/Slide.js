import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";

const SlideItem = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const Slide = ({ imageFile }) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (Object.keys(imageFile).length !== 0) {
      setTimeout(() => {
        setImageName(imageFile.name);
        setImageUrl(imageFile.url);
      }, 1);
      console.log(`image object length: ${Object.keys(imageFile).length}`);
      console.log("slide rendered");
    }

    return () => {};
  }, [imageUrl]);

  return !imageName ? (
    <h5>Loading...</h5>
  ) : (
    <SlideItem
      className="slide ba bg-washed-blue"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <IconContext.Provider
        value={{
          size: "1.5rem",
          className: "upload-icon",
        }}
      >
        <BiUpload />
      </IconContext.Provider>
      <input type="file" name="slideFile" className="slide_input" />
    </SlideItem>
  );
};

export default Slide;
