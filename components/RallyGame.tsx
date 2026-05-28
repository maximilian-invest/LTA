"use client";

import { MousePointer2, Play } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type TouchEvent } from "react";
import { MAXW } from "./ui/MaxWidth";
import { Reveal } from "./ui/Reveal";
import { TennisBall } from "./ui/TennisBall";

type Phase = "idle" | "playing" | "over";

type State = {
  ball: { nx: number; ny: number; vx: number; vy: number };
  speed: number;
  paddle: { nx: number; target: number; half: number };
  rally: number;
  last: number;
  shake: number;
};

const W = 660;
const H = 480;
const CX = W / 2;
const TOP_Y = 30;
const BOT_Y = H - 14;
const NEAR_HALF = W / 2 - 30;
const FAR_HALF = NEAR_HALF * 0.44;
const DEPTH = 2.2;
const NY_PADDLE = 0.965;
const PAL = { lime: "#D4FF3A", limeDark: "#A9CC2C", line: "#F1EEE3" };

function depthT(ny: number) {
  return (ny * DEPTH) / (1 + (DEPTH - 1) * ny);
}
function proj(nx: number, ny: number) {
  const t = depthT(ny);
  const y = TOP_Y + (BOT_Y - TOP_Y) * t;
  const half = FAR_HALF + (NEAR_HALF - FAR_HALF) * t;
  return { x: CX + (nx - 0.5) * 2 * half, y, scale: 0.5 + 0.5 * t };
}
function freshState(): State {
  return {
    ball: { nx: 0.5, ny: 0.04, vx: (Math.random() * 2 - 1) * 0.4, vy: 0.9 },
    speed: 0.95,
    paddle: { nx: 0.5, target: 0.5, half: 0.11 },
    rally: 0,
    last: 0,
    shake: 0,
  };
}

function cline(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  alpha = 1,
) {
  const a = proj(x1, y1);
  const b = proj(x2, y2);
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function draw(ctx: CanvasRenderingContext2D, s: State) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#0B0F0A";
  ctx.fillRect(0, 0, W, H);

  // clay court trapezoid
  const tl = proj(0, 0);
  const tr = proj(1, 0);
  const br = proj(1, 1);
  const bl = proj(0, 1);
  const grad = ctx.createLinearGradient(0, TOP_Y, 0, BOT_Y);
  grad.addColorStop(0, "#9E4423");
  grad.addColorStop(1, "#C45E32");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(tl.x, tl.y);
  ctx.lineTo(tr.x, tr.y);
  ctx.lineTo(br.x, br.y);
  ctx.lineTo(bl.x, bl.y);
  ctx.closePath();
  ctx.fill();

  // white lines
  ctx.strokeStyle = PAL.line;
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  cline(ctx, 0, 0, 1, 0, 0.95);
  cline(ctx, 0, 1, 1, 1, 0.95);
  cline(ctx, 0, 0, 0, 1, 0.95);
  cline(ctx, 1, 0, 1, 1, 0.95);
  cline(ctx, 0.13, 0, 0.13, 1, 0.8);
  cline(ctx, 0.87, 0, 0.87, 1, 0.8);
  cline(ctx, 0.13, 0.3, 0.87, 0.3, 0.8);
  cline(ctx, 0.13, 0.7, 0.87, 0.7, 0.8);
  cline(ctx, 0.5, 0.3, 0.5, 0.7, 0.8);
  cline(ctx, 0.5, 0, 0.5, 0.05, 0.8);
  cline(ctx, 0.5, 0.95, 0.5, 1, 0.8);

  // net across middle
  const nl = proj(-0.06, 0.5);
  const nr = proj(1.06, 0.5);
  ctx.save();
  ctx.strokeStyle = "rgba(240,238,227,0.5)";
  ctx.lineWidth = 1;
  const bandH = 26 * proj(0.5, 0.5).scale;
  ctx.setLineDash([4, 5]);
  ctx.beginPath();
  ctx.moveTo(nl.x, nl.y);
  ctx.lineTo(nr.x, nr.y);
  ctx.moveTo(nl.x, nl.y - bandH);
  ctx.lineTo(nr.x, nr.y - bandH);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 0.4;
  for (let i = 0; i <= 16; i++) {
    const xx = nl.x + (nr.x - nl.x) * (i / 16);
    ctx.beginPath();
    ctx.moveTo(xx, nl.y);
    ctx.lineTo(xx, nl.y - bandH);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = PAL.line;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(nl.x, nl.y - bandH);
  ctx.lineTo(nr.x, nr.y - bandH);
  ctx.stroke();
  ctx.fillStyle = "#2A2F22";
  ctx.fillRect(nl.x - 3, nl.y - bandH, 5, bandH + 4);
  ctx.fillRect(nr.x - 2, nr.y - bandH, 5, bandH + 4);
  ctx.restore();

  // paddle
  const p = s.paddle;
  const pc = proj(p.nx, NY_PADDLE);
  const pw = proj(p.nx + p.half, NY_PADDLE).x - proj(p.nx - p.half, NY_PADDLE).x;
  ctx.save();
  ctx.translate(pc.x, pc.y);
  ctx.fillStyle = PAL.lime;
  ctx.beginPath();
  ctx.ellipse(0, 0, pw / 2, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = PAL.limeDark;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = "rgba(11,15,10,0.35)";
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo((i * pw) / 7, -10);
    ctx.lineTo((i * pw) / 7, 10);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(-pw / 2 + 4, 0);
  ctx.lineTo(pw / 2 - 4, 0);
  ctx.stroke();
  ctx.restore();

  // ball
  const b = s.ball;
  const bp = proj(b.nx, b.ny);
  const ballR = 8 + 8 * bp.scale;
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(bp.x, bp.y + ballR * 0.55, ballR * 0.9, ballR * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(bp.x, bp.y, ballR, 0, Math.PI * 2);
  ctx.fillStyle = PAL.lime;
  ctx.fill();
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = PAL.limeDark;
  ctx.stroke();
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = "rgba(11,15,10,0.8)";
  ctx.beginPath();
  ctx.arc(bp.x - ballR * 0.4, bp.y, ballR * 1.25, -0.7, 0.7);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bp.x + ballR * 0.4, bp.y, ballR * 1.25, Math.PI - 0.7, Math.PI + 0.7);
  ctx.stroke();
}

export function RallyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State>(freshState());
  const rafRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhase] = useState<Phase>("idle");
  const [rally, setRally] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    try {
      setBest(parseInt(localStorage.getItem("lta-rally-best") ?? "0", 10) || 0);
    } catch {}
  }, []);

  const endGame = (s: State) => {
    phaseRef.current = "over";
    setPhase("over");
    setBest((prev) => {
      const nb = Math.max(prev, s.rally);
      try {
        localStorage.setItem("lta-rally-best", String(nb));
      } catch {}
      return nb;
    });
    cancelAnimationFrame(rafRef.current);
  };

  const step = (now: number) => {
    const s = stateRef.current;
    if (!s || phaseRef.current !== "playing") return;
    if (!s.last) s.last = now;
    let dt = (now - s.last) / 1000;
    s.last = now;
    if (dt > 0.05) dt = 0.05;

    const b = s.ball;
    s.paddle.nx += (s.paddle.target - s.paddle.nx) * Math.min(1, dt * 16);
    s.paddle.nx = Math.max(s.paddle.half, Math.min(1 - s.paddle.half, s.paddle.nx));

    const dist = Math.hypot(b.vx, b.vy) * dt;
    const sub = Math.max(1, Math.ceil(dist / 0.02));
    const ballNxR = 0.025;
    for (let i = 0; i < sub; i++) {
      const f = dt / sub;
      b.nx += b.vx * f;
      b.ny += b.vy * f;
      if (b.nx < 0) {
        b.nx = 0;
        b.vx = Math.abs(b.vx);
      }
      if (b.nx > 1) {
        b.nx = 1;
        b.vx = -Math.abs(b.vx);
      }
      if (b.ny < 0) {
        b.ny = 0;
        b.vy = Math.abs(b.vy);
      }
      if (b.vy > 0 && b.ny >= NY_PADDLE) {
        if (Math.abs(b.nx - s.paddle.nx) <= s.paddle.half + ballNxR) {
          b.ny = NY_PADDLE;
          s.rally += 1;
          setRally(s.rally);
          s.speed = Math.min(2.4, s.speed * 1.05 + 0.02);
          if (s.rally % 6 === 0) {
            s.paddle.half = Math.max(0.06, s.paddle.half - 0.012);
          }
          const off = (b.nx - s.paddle.nx) / s.paddle.half;
          const vx = off * s.speed * 0.6;
          const vy = -Math.sqrt(
            Math.max(s.speed * s.speed - vx * vx, (s.speed * 0.5) ** 2),
          );
          b.vx = vx;
          b.vy = vy;
          s.shake = 6;
          break;
        } else {
          endGame(s);
          return;
        }
      }
    }
    if (s.shake > 0) s.shake -= 0.5;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    if (s.shake > 0) {
      ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);
    }
    draw(ctx, s);
    ctx.restore();
    rafRef.current = requestAnimationFrame(step);
  };

  const start = () => {
    stateRef.current = freshState();
    setRally(0);
    phaseRef.current = "playing";
    setPhase("playing");
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    stateRef.current = freshState();
    draw(ctx, stateRef.current);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pointerMove = (e: PointerEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    if (!s) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx =
      "touches" in e
        ? (e.touches[0]?.clientX ?? 0)
        : (e as PointerEvent<HTMLCanvasElement>).clientX;
    const localX = ((cx - rect.left) / rect.width) * W;
    s.paddle.target = (localX - CX) / (2 * NEAR_HALF) + 0.5;
  };

  return (
    <section
      style={{
        background: "var(--color-canvas-dark)",
        padding: "var(--space-section) 0",
        borderTop: "1px solid var(--color-hairline-on-dark)",
      }}
    >
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="game-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.92fr 1.08fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div>
              <div
                className="t-eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 2,
                    background: "var(--color-primary)",
                  }}
                />
                Rally-Challenge
              </div>
              <h2 style={{ color: "var(--color-on-dark)" }}>
                Wie lange
                <br />
                hältst du den{" "}
                <span style={{ color: "var(--color-primary)" }}>Ball im Spiel?</span>
              </h2>
              <p
                className="t-body-lg"
                style={{
                  marginTop: 18,
                  color: "var(--color-muted-strong)",
                  maxWidth: 460,
                }}
              >
                Beweg deinen Schläger, halte die Ballwechsel am Leben — mit jedem
                Treffer wird&apos;s schneller. Genau dieses Gefühl trainieren wir
                auf dem Platz. Schaffst du einen längeren Rally als beim letzten
                Mal?
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 28,
                  marginTop: 28,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    className="t-caption"
                    style={{
                      color: "var(--color-muted-strong)",
                      marginBottom: 4,
                    }}
                  >
                    Aktueller Rally
                  </div>
                  <div
                    className="t-number-display"
                    style={{ fontSize: 52, color: "var(--color-primary)" }}
                  >
                    {String(rally).padStart(2, "0")}
                  </div>
                </div>
                <div
                  style={{
                    width: 1,
                    background: "var(--color-hairline-on-dark)",
                  }}
                />
                <div>
                  <div
                    className="t-caption"
                    style={{
                      color: "var(--color-muted-strong)",
                      marginBottom: 4,
                    }}
                  >
                    Dein Rekord
                  </div>
                  <div
                    className="t-number-display"
                    style={{ fontSize: 52, color: "var(--color-on-dark)" }}
                  >
                    {String(best).padStart(2, "0")}
                  </div>
                </div>
              </div>
              <p
                className="t-body-sm"
                style={{
                  marginTop: 18,
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <MousePointer2 size={14} /> Maus bewegen · am Handy: Finger ziehen
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid var(--color-hairline-on-dark)",
                background: "#0B0F0A",
                aspectRatio: "660 / 480",
                touchAction: "none",
              }}
            >
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                onPointerMove={pointerMove}
                onTouchMove={pointerMove}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  cursor: phase === "playing" ? "none" : "default",
                }}
              />

              {phase !== "playing" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    background: "rgba(11,15,10,0.72)",
                    backdropFilter: "blur(3px)",
                    textAlign: "center",
                    padding: 24,
                  }}
                >
                  {phase === "over" && (
                    <>
                      <div
                        className="t-caption"
                        style={{ color: "var(--color-muted-strong)" }}
                      >
                        Ball verloren!
                      </div>
                      <div
                        className="t-number-display"
                        style={{
                          fontSize: 72,
                          color: "var(--color-primary)",
                          lineHeight: 1,
                        }}
                      >
                        {rally}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 18,
                          color: "var(--color-on-dark)",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {rally >= best && rally > 0
                          ? "Neuer Rekord!"
                          : "Ballwechsel"}
                      </div>
                    </>
                  )}
                  {phase === "idle" && (
                    <>
                      <TennisBall size={58} anim="spin" />
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: 30,
                          color: "var(--color-on-dark)",
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                          lineHeight: 1,
                        }}
                      >
                        Rally-Challenge
                      </div>
                      <p
                        className="t-body-sm"
                        style={{
                          color: "var(--color-muted-strong)",
                          maxWidth: 300,
                        }}
                      >
                        Halte den Ball mit deinem Schläger im Spiel.
                      </p>
                    </>
                  )}
                  <button
                    onClick={start}
                    style={{
                      marginTop: 6,
                      background: "var(--color-primary)",
                      color: "var(--color-on-primary)",
                      border: "none",
                      height: 52,
                      padding: "0 30px",
                      borderRadius: "var(--radius-pill)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 15,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 9,
                    }}
                  >
                    {phase === "over" ? "Nochmal" : "Spielen"} <Play size={17} />
                  </button>
                </div>
              )}

              {phase === "playing" && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(11,15,10,0.6)",
                    border: "1px solid var(--color-hairline-on-dark)",
                    borderRadius: "var(--radius-pill)",
                    padding: "6px 14px",
                  }}
                >
                  <span
                    className="t-caption"
                    style={{ color: "var(--color-muted-strong)" }}
                  >
                    Rally
                  </span>
                  <span
                    className="t-number-md"
                    style={{ color: "var(--color-primary)", fontSize: 18 }}
                  >
                    {rally}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.game-grid) {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
