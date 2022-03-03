import SummaryForm from "../SummaryForm";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Components in SummaryForm", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByLabelText(/terms and conditions/);
    const confirmBtn = screen.getByRole("button", { name: /confirm/i });

    expect(checkbox).not.toBeChecked();
    expect(confirmBtn).toBeDisabled();
  });

  test("Checkbox disables button when unchecked, then enables it back when checked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByLabelText(/terms and conditions/);
    const confirmBtn = screen.getByRole("button", { name: /confirm/i });

    userEvent.click(checkbox);
    expect(confirmBtn).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmBtn).toBeDisabled();
  });
});
