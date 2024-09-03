import React, { useState } from "react";
import Modal from "react-modal"; // Make sure to install react-modal first

const ImageModal = ({ src }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <img
        src={src}
        alt="Image"
        onMouseEnter={openModal}
        onMouseLeave={closeModal}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <img src={src} alt="Modal Image" />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
};

export default ImageModal;
