import React from "react";
import { useModal } from "../../context/modal";

function OpenModalButton({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    id,
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
    };

    return (
        <button onClick={onClick} id={id}>
            {buttonText}
        </button>
    );
}

export default OpenModalButton;
