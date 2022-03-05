import React from "react";
import { Alert } from "reactstrap";

export default function AlertBanner({ alertMessage, variant }) {
  return (
    <Alert
      color={variant ?? "danger"}
      role="alert"
      aria-label="Unexpected error"
    >
      {alertMessage ?? "An unexpected error ocurred. Please try again later."}
    </Alert>
  );
}
