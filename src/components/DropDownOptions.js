import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropDownOptions.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Custom caret component for the Dropdown.Toggle
export const Caret = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-angle-down"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// DropDownOptions component for generic dropdown options like edit and delete
export const DropDownOptions = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className={`ml-auto`} drop="left">
      <Dropdown.Toggle as={Caret} />

      <Dropdown.Menu
        className={`${styles.DropDownOptions} text-center`}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fa-solid fa-pen-to-square" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fa-solid fa-trash-can" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// ProfileEditDropdown component for profile-related dropdown options
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={Caret} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fa-solid fa-pen-to-square" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="fa-solid fa-at" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fa-solid fa-lock" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
