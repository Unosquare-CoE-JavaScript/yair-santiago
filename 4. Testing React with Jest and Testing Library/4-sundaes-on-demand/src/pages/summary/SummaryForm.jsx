import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Popover,
  Row,
} from "reactstrap";

export default function SummaryForm() {
  const [tcAgreed, setTcAgreed] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCheck = ({ target: { checked } }) => setTcAgreed(checked);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Col md={12}>
          <FormGroup>
            <Label htmlFor="tc-agreed-cb">
              <Input
                type="checkbox"
                id="tc-agreed-cb"
                checked={tcAgreed}
                aria-checked={tcAgreed}
                onChange={handleCheck}
              />
              I agree to the{" "}
              <a
                href="#"
                id="popover-tc"
                onMouseEnter={setPopoverOpen.bind(null, true)}
                onMouseLeave={setPopoverOpen.bind(null, false)}
              >
                terms and conditions
              </a>
            </Label>
            <Popover
              target="popover-tc"
              toggle={togglePopover}
              isOpen={popoverOpen}
            >
              No ice cream will actually be delivered
            </Popover>
          </FormGroup>
        </Col>
        <Col md={5}>
          <Button color="primary" type="submit" disabled={!tcAgreed}>
            Confirm order
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
