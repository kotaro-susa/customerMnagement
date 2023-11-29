import React, { useEffect, useState } from "react";

const EditableCell = ({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      autoFocus
    />
  ) : (
    <span onDoubleClick={handleDoubleClick}>{value}</span>
  );
};

export default EditableCell;
