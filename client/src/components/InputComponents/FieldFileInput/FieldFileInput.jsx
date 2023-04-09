import React from 'react';
import { Field } from 'formik';
import { useField } from 'formik';

const FieldFileInput = props => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = props.classes;
  const [{ value, ...restField }, meta, helpers] = useField(props.name);

  const onChange = e => {
    const file = e.target.files[0];
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      helpers.setValue(file);
    }
  }

  return (
    <div className={fileUploadContainer}>
      <label htmlFor='fileInput' className={labelClass}>
        Choose file
      </label>
      <span id='fileNameContainer' className={fileNameClass}>
        {value?.name}
      </span>
      <input
        {...restField}
        className={fileInput}
        id='fileInput'
        type='file'
        onChange={onChange}
      />
    </div>
  );
};

export default FieldFileInput;
