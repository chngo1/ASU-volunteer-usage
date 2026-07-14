import { useState, useEffect, useRef } from "react";

const MAROON = "#8C1D40";
const GOLD = "#FFC627";
const WARM_BG = "#FFF9EE";
const LIGHT_MAROON = "#F2E6EB";
const DARK_TEXT = "#1E1014";
const MID_TEXT = "#5C4650";
const LIGHT_TEXT = "#8A7580";
const SUCCESS_GREEN = "#2D8C3C";

const unitData = [
  { name: "University Real Estate Development", used: 6, available: 56, headcount: 7 },
  { name: "ASU Health", used: 28, available: 304, headcount: 38 },
  { name: "University Planner", used: 9, available: 112, headcount: 14 },
  { name: "Business and Finance", used: 6, available: 80, headcount: 10 },
  { name: "Media Relations and Strategic Communications", used: 20.5, available: 328, headcount: 41 },
  { name: "Alumni Association", used: 10, available: 160, headcount: 20 },
  { name: "Educational Outreach and Student Services", used: 324.55, available: 5224, headcount: 653 },
  { name: "Facilities Development and Management", used: 259, available: 4336, headcount: 542 },
  { name: "Graduate College", used: 19, available: 320, headcount: 40 },
  { name: "Office of the University Provost", used: 341.75, available: 6200, headcount: 775 },
  { name: "University Business Services", used: 156.5, available: 2912, headcount: 364 },
  { name: "Enterprise Brand Strategy and Management", used: 21, available: 432, headcount: 54 },
  { name: "Enterprise Technology", used: 243, available: 5504, headcount: 688 },
  { name: "Learning Enterprise", used: 48, available: 1080, headcount: 135 },
  { name: "EdPlus", used: 281, available: 6288, headcount: 786 },
  { name: "Knowledge Enterprise", used: 289, available: 6792, headcount: 849 },
  { name: "Financial Services", used: 49, available: 1536, headcount: 192 },
  { name: "Office of University Affairs", used: 23, available: 696, headcount: 87 },
  { name: "College of Health Solutions", used: 117, available: 3344, headcount: 418 },
  { name: "John Shufeldt School of Medicine and Medical Engineering", used: 8, available: 256, headcount: 32 },
  { name: "College of Public Service and Community Solutions", used: 119, available: 3968, headcount: 496 },
  { name: "Sandra Day O'Connor College of Law", used: 53, available: 1752, headcount: 219 },
  { name: "Office of Planning and Budget", used: 4, available: 136, headcount: 17 },
  { name: "Rob Walton College of Global Futures", used: 67, available: 2504, headcount: 313 },

  { name: "Thunderbird School of Global Management", used: 30, available: 1248, headcount: 156 },
  { name: "Mary Lou Fulton Teachers College", used: 87, available: 3688, headcount: 461 },
  { name: "Herberger Institute for Design and the Arts", used: 114, available: 4888, headcount: 611 },
  { name: "Ira A. Fulton Schools of Engineering", used: 225, available: 10192, headcount: 1274 },
  { name: "Office of General Counsel", used: 7, available: 312, headcount: 39 },
  { name: "Barrett, The Honors College", used: 17.5, available: 984, headcount: 123 },
  { name: "College of Integrative Science and Arts", used: 46.5, available: 2840, headcount: 355 },
  { name: "The College of Liberal Arts and Sciences", used: 292, available: 17216, headcount: 2152 },
  { name: "ASU Library", used: 58, available: 1480, headcount: 185 },
  { name: "ASU Police", used: 32, available: 1224, headcount: 153 },
  { name: "ASU Media Enterprise and Arizona PBS", used: 16, available: 752, headcount: 94 },
  { name: "W. P. Carey School of Business", used: 79.5, available: 5976, headcount: 747 },
  { name: "Office of Human Resources", used: 9, available: 544, headcount: 68 },
  { name: "Edson College of Nursing and Health Innovation", used: 33, available: 2720, headcount: 340 },
  { name: "New College of Interdisciplinary Arts and Sciences", used: 43, available: 2584, headcount: 323 },
  { name: "Sun Devil Athletics", used: 32, available: 2568, headcount: 321 },
  { name: "Biodesign Institute", used: 34.5, available: 2544, headcount: 318 },
  { name: "Executive Administration", used: 13, available: 624, headcount: 78 },
  { name: "Walter Cronkite School of Journalism and Mass Communication", used: 8, available: 856, headcount: 107 },
  { name: "University College", used: 15, available: 832, headcount: 104 },
  { name: "Cultural Affairs", used: 5, available: 480, headcount: 60 },
  { name: "Business and Finance Support Services", used: 2, available: 384, headcount: 48 },
  { name: "Center for the Future of Arizona", used: 2, available: 232, headcount: 29 },
].map(d => ({ ...d, pct: d.available > 0 ? (d.used / d.available) * 100 : 0 }))
 .sort((a, b) => b.pct - a.pct);

const TOTAL_USED = 3703.3;
const TOTAL_AVAILABLE = 120072;
const TOTAL_PCT = (TOTAL_USED / TOTAL_AVAILABLE) * 100;
const GOAL_PCT = 10;
const TOTAL_HEADCOUNT = 15009;

function AnimatedNumber({ value, decimals = 1, duration = 1500, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);
  return <>{Number(display.toFixed(decimals)).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>;
}

function ProgressRing({ pct, goal, size = 200 }) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animPct, setAnimPct] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimPct(pct), 100);
    return () => clearTimeout(timer);
  }, [pct]);

  const progressOffset = circumference - (animPct / goal) * circumference;
  const goalMarkerAngle = -90 + (100 / goal) * 360;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size/2} cy={size/2} r={radius}
        fill="none" stroke={LIGHT_MAROON} strokeWidth={stroke}
      />
      <circle
        cx={size/2} cy={size/2} r={radius}
        fill="none" stroke={MAROON} strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={progressOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text x={size/2} y={size/2 - 16} textAnchor="middle" 
        style={{ fontSize: "42px", fontWeight: 700, fill: MAROON, fontFamily: "system-ui" }}>
        {animPct.toFixed(1)}%
      </text>
      <text x={size/2} y={size/2 + 10} textAnchor="middle"
        style={{ fontSize: "13px", fill: MID_TEXT, fontFamily: "system-ui" }}>
        of {goal}% goal
      </text>
      <text x={size/2} y={size/2 + 30} textAnchor="middle"
        style={{ fontSize: "11px", fill: LIGHT_TEXT, fontFamily: "system-ui" }}>
        by end of FY2027
      </text>
    </svg>
  );
}

function TrailblazerCard({ unit, rank }) {
  const hitGoal = unit.pct >= GOAL_PCT;
  return (
    <div style={{
      background: hitGoal ? `linear-gradient(135deg, ${MAROON}, #6B1530)` : "white",
      borderRadius: 12,
      padding: "16px 18px",
      border: hitGoal ? "none" : `1px solid #E8DDE2`,
      position: "relative",
      overflow: "hidden",
    }}>
      {hitGoal && (
        <div style={{
          position: "absolute", top: 8, right: 10,
          background: GOLD, color: MAROON,
          fontSize: 10, fontWeight: 700, padding: "2px 8px",
          borderRadius: 20, letterSpacing: "0.5px"
        }}>
          GOAL MET
        </div>
      )}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.5px",
        color: hitGoal ? "rgba(255,255,255,0.7)" : LIGHT_TEXT,
        marginBottom: 6, textTransform: "uppercase"
      }}>
        #{rank}
      </div>
      <div style={{
        fontSize: 15, fontWeight: 600,
        color: hitGoal ? "white" : DARK_TEXT,
        marginBottom: 10, lineHeight: 1.3
      }}>
        {unit.name}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <span style={{
            fontSize: 28, fontWeight: 700,
            color: hitGoal ? GOLD : MAROON
          }}>
            {unit.pct.toFixed(1)}%
          </span>
          <span style={{
            fontSize: 12, color: hitGoal ? "rgba(255,255,255,0.7)" : LIGHT_TEXT,
            marginLeft: 4
          }}>
            used
          </span>
        </div>
        <div style={{
          fontSize: 12,
          color: hitGoal ? "rgba(255,255,255,0.7)" : LIGHT_TEXT,
          textAlign: "right"
        }}>
          {unit.used.toLocaleString("en-US")} of {unit.available.toLocaleString("en-US")} hrs
        </div>
      </div>
      <div style={{
        marginTop: 8, height: 4, borderRadius: 2,
        background: hitGoal ? "rgba(255,255,255,0.2)" : LIGHT_MAROON
      }}>
        <div style={{
          height: "100%", borderRadius: 2,
          width: `${Math.min(unit.pct / GOAL_PCT * 100, 100)}%`,
          background: hitGoal ? GOLD : MAROON,
          transition: "width 1s ease"
        }} />
      </div>
    </div>
  );
}

function BarChart({ data, maxPct }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {data.map((d, i) => (
        <div
          key={d.name}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr 60px",
            alignItems: "center",
            gap: 10,
            padding: "4px 8px",
            borderRadius: 6,
            background: hoveredIdx === i ? LIGHT_MAROON : "transparent",
            transition: "background 0.15s",
            cursor: "default"
          }}
        >
          <div style={{
            fontSize: 12, color: DARK_TEXT, fontWeight: d.pct >= GOAL_PCT ? 600 : 400,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
          }}>
            {d.pct >= GOAL_PCT && <span style={{ color: SUCCESS_GREEN, marginRight: 4 }}>●</span>}
            {d.name}
          </div>
          <div style={{ height: 14, background: LIGHT_MAROON, borderRadius: 7, overflow: "hidden", position: "relative" }}>
            <div style={{
              position: "absolute",
              left: `${(GOAL_PCT / maxPct) * 100}%`,
              top: 0, bottom: 0, width: 2,
              background: `${GOLD}AA`,
              zIndex: 2
            }} />
            <div style={{
              height: "100%", borderRadius: 7,
              width: `${(d.pct / maxPct) * 100}%`,
              background: d.pct >= GOAL_PCT ? SUCCESS_GREEN : d.pct >= 5 ? MAROON : `${MAROON}99`,
              transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
              transitionDelay: `${i * 30}ms`
            }} />
          </div>
          <div style={{
            fontSize: 12, fontWeight: 600, textAlign: "right",
            color: d.pct >= GOAL_PCT ? SUCCESS_GREEN : MAROON
          }}>
            {d.pct.toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const topUnits = unitData.filter(d => d.used > 0).slice(0, 6);
  const allWithUsage = unitData.filter(d => d.used > 0);
  const maxPct = Math.max(...unitData.map(d => d.pct), GOAL_PCT + 2);
  const unitsAbove5 = unitData.filter(d => d.pct >= 5).length;
  const unitsWithAny = unitData.filter(d => d.used > 0).length;
  const totalUnits = unitData.length;

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: WARM_BG,
      minHeight: "100vh",
      color: DARK_TEXT,
      padding: 0
    }}>
      {/* Header */}
      <div style={{
        background: MAROON,
        padding: "28px 32px 24px",
        color: "white"
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
            color: GOLD, marginBottom: 6, textTransform: "uppercase"
          }}>
            Arizona State University
          </div>
          <h1 style={{
            fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.2
          }}>
            Paid Volunteer Time Off
          </h1>
          <div style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
            Current: 2026 Utilization Report
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
            Data through July 9, 2026 &nbsp;·&nbsp; 15,009 eligible employees &nbsp;·&nbsp;{" "}
            <a href="https://policy.asu.edu/#doc1560469" target="_blank" rel="noopener noreferrer"
              style={{ color: GOLD, textDecoration: "none" }}>
              SPP 709 Policy
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 32px 40px" }}>

        {/* Hero stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 32,
          alignItems: "center",
          background: "white",
          borderRadius: 16,
          padding: "28px 32px",
          border: `1px solid #E8DDE2`,
          marginBottom: 24
        }}>
          <ProgressRing pct={TOTAL_PCT} goal={GOAL_PCT} size={190} />
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: MAROON }}>
                  <AnimatedNumber value={TOTAL_USED} decimals={0} />
                </div>
                <div style={{ fontSize: 13, color: MID_TEXT, marginTop: 2 }}>
                  volunteer hours contributed
                </div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: MAROON }}>
                  <AnimatedNumber value={TOTAL_HEADCOUNT} decimals={0} />
                </div>
                <div style={{ fontSize: 13, color: MID_TEXT, marginTop: 2 }}>
                  eligible employees university-wide
                </div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: MAROON }}>
                  <AnimatedNumber value={(TOTAL_USED / 8)} decimals={0} />
                </div>
                <div style={{ fontSize: 13, color: MID_TEXT, marginTop: 2 }}>
                  equivalent volunteer days in our community
                </div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: MAROON }}>
                  47<span style={{ fontSize: 18, color: LIGHT_TEXT }}>/53</span>
                </div>
                <div style={{ fontSize: 13, color: MID_TEXT, marginTop: 2 }}>
                  units with hours reported
                </div>
              </div>
            </div>
            <div style={{
              marginTop: 20, padding: "12px 16px",
              background: `${GOLD}22`, borderRadius: 8,
              borderLeft: `3px solid ${GOLD}`,
              fontSize: 13, color: MID_TEXT, lineHeight: 1.5
            }}>
              Every eligible employee has <strong>8 hours of paid volunteer time</strong> each calendar year. 
              That means <strong>{(TOTAL_AVAILABLE - TOTAL_USED).toLocaleString("en-US")} hours</strong> are still available 
              to strengthen the communities where Sun Devils live and work.
            </div>
          </div>
        </div>

        {/* Trailblazers */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 14
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: DARK_TEXT }}>
              Sun Devils in the Community: Top Contributors
            </h2>
            <div style={{ fontSize: 12, color: LIGHT_TEXT }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: SUCCESS_GREEN, marginRight: 4, verticalAlign: "middle" }} />
              At or above 10% goal
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12
          }}>
            {topUnits.map((u, i) => (
              <TrailblazerCard key={u.name} unit={u} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* Full breakdown */}
        <div style={{
          background: "white",
          borderRadius: 16,
          padding: "24px 24px 20px",
          border: `1px solid #E8DDE2`,
          marginBottom: 24
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 16
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: DARK_TEXT }}>
              All Units with Volunteer Hours Used
            </h2>
            <div style={{ fontSize: 11, color: LIGHT_TEXT, display: "flex", alignItems: "center", gap: 12 }}>
              <span>
                <span style={{ display: "inline-block", width: 16, height: 3, background: `${GOLD}AA`, borderRadius: 2, verticalAlign: "middle", marginRight: 4 }} />
                10% goal
              </span>
            </div>
          </div>
          <BarChart data={allWithUsage} maxPct={maxPct} />
        </div>

        {/* Opportunity callout */}
        <div style={{
          background: `linear-gradient(135deg, ${MAROON}, #6B1530)`,
          borderRadius: 16,
          padding: "28px 32px",
          color: "white",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Your 8 hours are waiting.
          </div>
          <div style={{
            fontSize: 14, color: "rgba(255,255,255,0.8)",
            maxWidth: 520, margin: "0 auto", lineHeight: 1.6
          }}>
            Whether it's a few hours at a food bank or a full day with a community partner, 
            your paid volunteer time is a benefit designed to be used. 
            Talk to your supervisor or reach out to <span style={{ color: GOLD }}>community@asu.edu</span> to get started.
            After you volunteer, report your time in Workday so your contribution is counted.
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 20, fontSize: 11, color: LIGHT_TEXT, textAlign: "center"
        }}>
          Office of University Affairs · Social Embeddedness · Arizona State University
        </div>
      </div>
    </div>
  );
}
