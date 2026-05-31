export default function PixelFrame({ children, className = "" }) {
  return <div className={`pixel-frame ${className}`}>{children}</div>;
}
