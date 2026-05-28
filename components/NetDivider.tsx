export function NetDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "var(--color-canvas-dark)",
        padding: "8px 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
        borderBottom: "1px solid var(--color-hairline-on-dark)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1280 64"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 64 }}
      >
        <defs>
          <pattern
            id="netmesh"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path d="M0 0H22M0 0V22" stroke="#26301B" strokeWidth="1.4" fill="none" />
          </pattern>
        </defs>
        <rect x="10" y="6" width="7" height="52" rx="2" fill="#3D4633" />
        <rect x="1263" y="6" width="7" height="52" rx="2" fill="#3D4633" />
        <line x1="13" y1="10" x2="1267" y2="10" stroke="#9BA294" strokeWidth="2" />
        <rect x="13" y="12" width="1254" height="40" fill="url(#netmesh)" />
        <rect x="13" y="10" width="1254" height="7" fill="#EDEADF" opacity="0.85" />
        <circle cx="640" cy="13" r="9" fill="#D4FF3A" stroke="#A9CC2C" strokeWidth="1" />
        <path
          d="M633 8 C 638 11, 638 15, 633 18"
          fill="none"
          stroke="#0B0F0A"
          strokeWidth="1.3"
        />
        <path
          d="M647 8 C 642 11, 642 15, 647 18"
          fill="none"
          stroke="#0B0F0A"
          strokeWidth="1.3"
        />
      </svg>
    </div>
  );
}
