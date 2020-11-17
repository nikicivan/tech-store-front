import React from "react";
import "./imageUpload.css";
import axios from "../../axios";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Resizer from "react-image-file-resizer";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#d9534f",
    color: "#d9534f",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ImageUpload = (
  { images, setImages, setLoadingImage },
) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const classes = useStyles();

  const fileUploadAndResize = (e) => {
    e.preventDefault();
    //   console.log(e.target.files);
    let files = e.target.files;

    let allUploadedFiles = images;
    if (files) {
      setLoadingImage(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(files[i], 700, 700, "JPEG", 100, 0, (uri) => {
          axios.post("/api/images/uploadimages", { image: uri }, {
            headers: {
              authtoken: userInfo?.email?.token?.token,
            },
          }).then((res) => {
            // console.log("Image upload response data", res);
            allUploadedFiles.push(res.data);
            toast.success("Image resized and uploaded");
            setLoadingImage(false);
            setImages(allUploadedFiles);
          }).catch((error) => {
            setLoadingImage(false);
            toast.error(error);
          });
        }, "base64");
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoadingImage(true);
    axios.post("api/images/removeimage", { public_id }, {
      headers: {
        authtoken: userInfo?.email?.token?.token,
      },
    }).then((res) => {
      setLoadingImage(false);
      let filteredImages = images.filter((item) => {
        return item?.public_id !== public_id;
      });
      setImages(filteredImages);
    }).catch((error) => {
      setLoadingImage(false);
      console.log(error);
    });
  };

  return (
    <div className="imageUpload">
      <div className="imageUpload__avatar">
        {images?.map((image) => (
          <IconButton
            key={image?.public_id}
            title="Remove"
            onClick={() => handleImageRemove(image?.public_id)}
          >
            <StyledBadge
              className={classes.root}
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt="image" src={image?.url} />
            </StyledBadge>
          </IconButton>
        ))}
      </div>
      <label>
        <input
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
