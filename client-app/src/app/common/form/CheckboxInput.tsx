import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Checkbox } from "semantic-ui-react";

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {}

const CheckboxInput: React.FC<IProps> = ({ input, width, label }) => {
  return (
    <Form.Field width={width}>
      <Checkbox
        label={label}
        checked={input.checked}
        onChange={(e, data) => input.onChange(data.checked)}
      />
    </Form.Field>

    // <Form.Field width={width} >
    //     <label   className='customcheck' style={{ fontSize: "14px", fontWeight:"normal"}}>
    //     <input {...input}  />
    //     {label} <span className="checkmark"></span>
    //     </label>
    // </Form.Field>
  );
};

export default CheckboxInput;
