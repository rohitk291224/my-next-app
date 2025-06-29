import React from "react";

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input ref={ref} type="checkbox" {...props} />
);
Checkbox.displayName = "Checkbox"; 