import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import StarRating from "react-star-ratings";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import RateReviewRoundedIcon from "@material-ui/icons/RateReviewRounded";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const RatingModal = ({ product, onStarClick, star }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let history = useHistory();
  let { slug } = useParams();

  const handleSignin = () => {
    history.push({
      pathname: "/login",
      state: { from: `product/${slug}` },
    });
  };

  return (
    <div>
      <IconButton
        style={{ color: "purple", outlineWidth: "0" }}
        title="Oceni proizvod"
        onClick={handleOpen}
      >
        <GradeRoundedIcon fontSize="large" />
      </IconButton>
      {userInfo
        ? <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h4 id="transition-modal-title" style={{ marginBottom: "1rem" }}>
                Oceni proizvod
              </h4>
              <StarRating
                name={product?._id}
                numberOfStart={5}
                rating={star}
                isSelectable={true}
                starRatedColor="purple"
                changeRating={onStarClick}
              />
            </div>
          </Fade>
        </Modal>
        : (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h4 id="transition-modal-title">
                  Morate biti prijavljeni da biste ocenili proizvod
                </h4>
                <p
                  id="transition-modal-description"
                  onClick={handleSignin}
                  style={{
                    marginTop: "1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "purple",
                  }}
                >
                  Prijavite se
                </p>
              </div>
            </Fade>
          </Modal>
        )}
    </div>
  );
};

export default RatingModal;
