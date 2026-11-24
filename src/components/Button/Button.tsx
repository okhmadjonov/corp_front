import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "md" | "sm";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: Props) {
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
  return <button type="button" className={cls} {...rest} />;
}
