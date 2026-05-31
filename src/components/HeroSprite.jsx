export default function HeroSprite() {
  return (
    <div className="sprite-stage" aria-label="Questgiver character">
      <div className="clouds" aria-hidden="true"><i></i><i></i><i></i></div>
      <img
        className="questgiver-img"
        src="/assets/questgiver.png"
        alt=""
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.parentElement?.classList.add("sprite-fallback-active");
        }}
      />
      <div className="sprite-fallback" aria-hidden="true">
        <div className="hat"></div>
        <div className="face">
          <span></span><span></span>
        </div>
        <div className="robe"></div>
        <div className="staff"></div>
      </div>
    </div>
  );
}
