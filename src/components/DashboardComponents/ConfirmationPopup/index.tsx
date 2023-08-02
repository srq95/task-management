import style from "./ConfirmationPopup.module.css";

const ConfirmationPopup = ({ onConfirm, onCancel, visibility }: any) => {
  return (
    <>
      <div
        className={`${style.confirmationPopupBg} ${
          visibility ? style.showPopup : ""
        }`}
      ></div>
      <div
        className={`${style.confirmationPopup} ${
          visibility ? style.showPopup : ""
        }`}
      >
        <h3>Delete Confirmation</h3>
        <p>Are you sure you want to delete this item?</p>
        <div className={style.confirmationPopupBtn}>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPopup;
