import { useEffect, useState } from "react";
import "./Dialog.css";
import { Button } from "../Buttons/Button";
interface DialogProps {
  open: boolean;
  message: string;
  primaryAction?: () => void;
  secondaryAction: () => void;
  primaryLabel?: string;
  secondaryLabel: string;
}

export function Dialog({ open, message, primaryAction, secondaryAction, primaryLabel, secondaryLabel }: DialogProps) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
    }
  }, [open]);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      secondaryAction?.();
    }, 300);
  };

  const handlePrimary = () => {
    primaryAction?.();
    handleClose();
  };

  if (!visible) return null;

  return (
    <div className={`dialog-backdrop ${closing ? "closing" : ""}`}>
      <div className={`dialog-box ${closing ? "closing" : ""}`}>
        <p>{message}</p>
        <div className={primaryAction ? "dialog-actions" : "dialog-actions-single"}>
          {/* Secondary button (always present) */}
          <Button variant="secondary" onClick={handleClose}>
            {secondaryLabel}
          </Button>

          {/* Primary button (optional) */}
          {primaryAction && (
            <Button variant="primary" onClick={handlePrimary}>
              {primaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
