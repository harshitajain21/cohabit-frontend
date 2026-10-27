import { useState, useEffect } from "react";

// ── Design tokens ──────────────────────────────────────────────────────────────
const T = {
  navy:    "#253044",
  navyMid: "#FFFFFF",
  slate:   "#596477",
  slateL:  "#596477",
  cream:   "#253044",
  creamD:  "#B8B6C5",
  coral:   "#6434DF",
  coralD:  "#5125C7",
  white:   "#FFFFFF",
  green:   "#176B4B",
  yellow:  "#8A5A00",
  red:     "#B42335",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Instrument Sans', sans-serif;
    background: #fffdf5;
    color: ${T.cream};
    min-height: 100vh;
  }

  :root {
    --outline: #252b3a;
    --mint: #9bf1cd;
    --pink: #ff78c5;
    --amber: #ffd05b;
    --violet: #6434df;
  }

  .shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 24px 64px;
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }
  .shell::before, .shell::after {
    content: ''; position: fixed; z-index: -1; pointer-events: none;
    border: 3px solid var(--outline);
  }
  .shell::before {
    width: 84px; height: 84px; border-radius: 50%; background: var(--pink);
    top: 150px; left: max(24px, calc((100vw - 1040px) / 2));
  }
  .shell::after {
    width: 64px; height: 64px; background: var(--amber); transform: rotate(14deg);
    right: max(24px, calc((100vw - 1040px) / 2)); bottom: 120px;
  }

  .topbar {
    width: 100%;
    max-width: 960px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 44px;
  }

  .logo {
    font-family: 'Host Grotesk', sans-serif;
    font-size: 27px;
    font-weight: 800;
    color: ${T.coral};
    letter-spacing: -1.2px;
  }

  .card {
    width: 100%;
    max-width: 600px;
    background: ${T.navyMid};
    border-radius: 28px;
    padding: 36px;
    border: 3px solid var(--outline);
    box-shadow: 9px 9px 0 #b99af8;
  }

  .h1, .h2 { font-family: 'Host Grotesk', sans-serif; color: ${T.cream}; letter-spacing: -0.04em; }
  .h1 { font-size: clamp(32px, 6vw, 46px); font-weight: 800; line-height: 1.08; }
  .h2 { font-size: 23px; font-weight: 700; line-height: 1.2; }
  .sub { font-size: 16px; color: #596477; margin-top: 8px; line-height: 1.65; }
  .label { font-size: 14px; font-weight: 700; color: #596477; letter-spacing: 0.02em; margin-bottom: 8px; display: block; }
  .error-msg { font-size: 13px; color: ${T.red}; margin-top: 4px; }

  .input {
    width: 100%;
    background: #fff;
    border: 2px solid #a7a5b3;
    border-radius: 13px;
    padding: 13px 16px;
    font-size: 15px;
    color: ${T.cream};
    font-family: 'Instrument Sans', sans-serif;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }
  .input:focus { outline: 3px solid #b99af8; outline-offset: 2px; border-color: ${T.coral}; }
  .input::placeholder { color: #737889; }
  select.input { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7FA3' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
  select.input option { background: #fff; }

  /* Field group */
  .field { margin-bottom: 18px; }
  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    border-radius: 15px;
    border: 2px solid var(--outline);
    cursor: pointer;
    transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
    padding: 14px 24px;
    box-shadow: 4px 4px 0 var(--outline);
  }
  .btn:hover:not(:disabled) { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--outline); }
  .btn:active:not(:disabled) { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--outline); }
  .btn:focus-visible, .back-btn:focus-visible, .link-btn:focus-visible, .chip:focus-visible, .toggle:focus-visible { outline: 3px solid #6434df; outline-offset: 4px; }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-primary { background: ${T.coral}; color: ${T.white}; width: 100%; }
  .btn-primary:hover:not(:disabled) { background: ${T.coralD}; }
  .btn-ghost { background: transparent; color: ${T.slateL}; padding: 10px 0; font-size: 14px; }
  .btn-ghost:hover { color: ${T.cream}; }
  .btn-outline { background: #fff; color: ${T.cream}; }
  .btn-outline:hover { border-color: ${T.coral}; color: ${T.coral}; }

  /* Progress ring */
  .ring-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 28px;
  }
  .ring-label { font-size: 12px; color: ${T.slateL}; margin-top: 8px; font-weight: 500; letter-spacing: 0.04em; }

  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    padding: 9px 16px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    border: 2px solid #8d899b;
    background: #fff;
    color: #394256;
    cursor: pointer;
    transition: background 180ms ease, transform 180ms ease;
    user-select: none;
  }
  .chip:hover { border-color: ${T.coral}; color: ${T.cream}; }
  .chip.selected { border-color: ${T.coral}; background: #f1ebff; color: ${T.coral}; box-shadow: 3px 3px 0 #b99af8; }

  /* Toggle */
  .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #dedce4; }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label { font-size: 14px; color: ${T.cream}; }
  .toggle-sub { font-size: 12px; color: ${T.slateL}; margin-top: 2px; }
  .toggle {
    position: relative; width: 44px; height: 24px; cursor: pointer;
    background: #777d8b; border-radius: 12px; border: 2px solid var(--outline); flex-shrink: 0;
    transition: background 0.15s;
  }
  .toggle.on { background: ${T.coral}; }
  .toggle::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%; background: white;
    transition: transform 0.15s;
  }
  .toggle.on::after { transform: translateX(20px); }

  .match-card {
    width: 100%;
    color: inherit;
    font: inherit;
    text-align: left;
    background: #fff;
    border: 2px solid var(--outline);
    border-radius: 17px;
    padding: 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: transform 180ms ease, box-shadow 180ms ease;
    box-shadow: 3px 3px 0 #d8d1e8;
  }
  .match-card:hover { transform: translateY(-2px); box-shadow: 5px 5px 0 #b99af8; }
  .match-card:focus-visible { outline: 3px solid ${T.coral}; outline-offset: 4px; }
  .avatar {
    width: 48px; height: 48px; border-radius: 50%;
    background: ${T.slate};
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: ${T.cream}; flex-shrink: 0;
  }
  .match-name { font-size: 15px; font-weight: 600; color: ${T.cream}; }
  .match-meta { font-size: 13px; color: ${T.slateL}; margin-top: 2px; }
  .score-pill {
    margin-left: auto;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .score-high { background: #dff8ed; color: ${T.green}; }
  .score-mid  { background: #fff3cd; color: ${T.yellow}; }
  .score-low  { background: #ffe5e8; color: ${T.red}; }

  /* Match detail */
  .trait-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid #dedce4;
    font-size: 14px;
  }
  .trait-row:last-child { border-bottom: none; }
  .trait-name { color: ${T.slateL}; }
  .trait-match { color: ${T.green}; font-weight: 500; }
  .trait-conflict { color: ${T.red}; font-weight: 500; }
  .trait-partial { color: ${T.yellow}; font-weight: 500; }

  /* Tag chips */
  .tag { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 500; margin: 3px; }
  .tag-green { background: #dff8ed; color: ${T.green}; }
  .tag-red   { background: #ffe5e8; color: ${T.red}; }

  /* Loading */
  .spinner {
    width: 36px; height: 36px; border-radius: 50%;
    border: 3px solid #dedce4;
    border-top-color: ${T.coral};
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .divider { height: 1px; background: #dedce4; margin: 20px 0; }
  .mt8 { margin-top: 8px; }
  .mt16 { margin-top: 16px; }
  .mt24 { margin-top: 24px; }
  .center { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .step-hint { font-size: 12px; color: ${T.slate}; font-weight: 500; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
  .back-btn { background: none; border: none; color: #505a70; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 0; font-family: inherit; }
  .back-btn:hover { color: ${T.cream}; }
  .link-btn { background: none; border: none; color: ${T.coral}; font-size: 14px; cursor: pointer; font-family: inherit; font-weight: 500; padding: 0; }
  .link-btn:hover { text-decoration: underline; }

  @media (max-width: 760px) {
    .shell { padding: 20px 18px 44px; }
    .shell::before { width: 54px; height: 54px; top: 112px; left: -20px; }
    .shell::after { width: 42px; height: 42px; right: -16px; bottom: 70px; }
    .topbar { margin-bottom: 30px; }
    .card { padding: 28px 24px; border-radius: 24px; box-shadow: 6px 6px 0 #b99af8; }
    .row-2 { grid-template-columns: 1fr; gap: 0; }
  }
  @media (max-width: 420px) {
    .shell { padding-inline: 14px; }
    .card { padding: 24px 18px; }
    .btn { padding: 12px 16px; }
    .chip { padding: 9px 12px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }
`;

// ── Constants from backend enums ───────────────────────────────────────────────
const BRANCHES = ["Computer Science","Mathematics & Computing","Electronics","Electrical","Mechanical","Civil","Chemical","Mining","Metallurgical","Pharmaceutical","Biochemical/Biomedical","Architecture","Ceramic","Material Science","Other"];

const QUESTIONNAIRE_STEPS = [
  { key: "sleepSchedule",       label: "Sleep schedule",      sub: "When do you usually sleep?",
    options: [["EARLY_SLEEPER","🌅 Early sleeper"],["MODERATE_SLEEPER","😴 Moderate sleeper"],["NIGHT_OWL","🦉 Night owl"]] },
  { key: "sleepLightPreference", label: "Light while sleeping", sub: "How sensitive are you to light at night?",
    options: [["NEEDS_DARKNESS","🌑 Needs darkness"],["DIM_LIGHT_OK","🕯 Dim light okay"],["DOESNT_MATTER","💡 Doesn't matter"]] },
  { key: "phoneVolume",          label: "Phone volume",         sub: "How do you typically use your phone?",
    options: [["ALWAYS_USE_HEADPHONES","🎧 Always headphones"],["SOMETIMES_USE_SPEAKER","📱 Sometimes speaker"],["OFTEN_USE_SPEAKER","🔊 Often speaker"]] },
  { key: "cleanliness",          label: "Cleanliness",          sub: "How would you describe your tidiness?",
    options: [["MESSY","🌀 Messy"],["SLIGHTLY_MESSY","🤷 Slightly messy"],["CLEAN","✨ Clean"],["VERY_CLEAN","🧹 Very clean"]] },
  { key: "studyLocation",        label: "Where you study",      sub: "Your preferred study spot?",
    options: [["ROOM","🏠 In the room"],["READING_ROOM","📖 Reading room"],["LIBRARY","🏛 Library"]] },
  { key: "needSilence",          label: "Silence needed",       sub: "Do you need quiet to focus?",
    options: [["true","🔇 Yes, I need silence"],["false","🎵 No, some noise is fine"]] },
  { key: "guestPreference",      label: "Guests",               sub: "How do you feel about guests in the room?",
    options: [["DONT_LIKE_GUESTS","🚫 Prefer no guests"],["OCCASIONAL_GUESTS_ARE_FINE","👥 Occasional is fine"],["ENJOY_HAVING_GUESTS","🎉 Love having people over"]] },
  { key: "personality",          label: "Personality",          sub: "How do you usually recharge?",
    options: [["INTROVERT","🌿 Introvert"],["AMBIVERT","⚖️ Ambivert"],["EXTROVERT","🌟 Extrovert"]] },
  { key: "sharingPreference",    label: "Sharing things",       sub: "Okay with sharing items?",
    options: [["DONT_SHARE","🔒 Prefer not to share"],["ASK_FIRST","🤝 Ask first, happy to"],["HAPPY_TO_SHARE","💫 Happy to share"]] },
  { key: "languageImportance",   label: "Shared language",      sub: "Does speaking the same language matter?",
    options: [["NOT_IMPORTANT","🌍 Not important"],["SOMEWHAT_IMPORTANT","💬 Somewhat important"],["VERY_IMPORTANT","🗣 Very important"]] },
  { key: "substanceUse",         label: "Substance use",        sub: "Your comfort level with alcohol/smoking?",
    options: [["NEVER","🚭 Never"],["RARELY","🍃 Rarely"],["SOMETIMES","🍺 Sometimes"],["REGULARLY","🔄 Regularly"]] },
];

const CRITERIA_LABELS = {
  SLEEP_SCHEDULE: "Sleep schedule", SLEEP_LIGHT_PREFERENCE: "Light preference",
  PHONE_VOLUME: "Phone volume", CLEANLINESS: "Cleanliness", STUDY_LOCATION: "Study location",
  NEED_SILENCE: "Need silence", GUEST_PREFERENCE: "Guests", PERSONALITY: "Personality",
  SHARING_PREFERENCE: "Sharing", LANGUAGE_IMPORTANCE: "Language", SUBSTANCE_USE: "Substance use",
};
const ALL_CRITERIA = Object.keys(CRITERIA_LABELS);

// ── API ────────────────────────────────────────────────────────────────────────
const API =
  import.meta.env.VITE_API_URL || "http://localhost:8080";
async function apiCall(method, path, body, auth = true) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) throw new Error(data?.message || data || `Error ${res.status}`);

  return data;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function ProgressRing({ step, total }) {
  const r = 32, cx = 40, cy = 40;
  const circumference = 2 * Math.PI * r;
  const progress = step / total;
  const dash = circumference * progress;
  return (
    <div className="ring-wrap">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#dedce4" strokeWidth="5"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.coral} strokeWidth="5"
          strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "40px 40px", transition: "stroke-dasharray 0.35s ease" }}/>
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
          fill={T.cream} fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans,sans-serif">
          {step}/{total}
        </text>
      </svg>
      <span className="ring-label">Questions answered</span>
    </div>
  );
}

function ScorePill({ score }) {
  const cls = score >= 80 ? "score-high" : score >= 60 ? "score-mid" : "score-low";
  return <div className={`score-pill ${cls}`}>{score}%</div>;
}

function Spinner() {
  return <div style={{ display:"flex", justifyContent:"center", padding:"32px" }}><div className="spinner"/></div>;
}

function initials(name) {
  return name?.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase() || "?";
}

// ── Screens ────────────────────────────────────────────────────────────────────

function RegisterScreen({ onSuccess, onLogin }) {
  const [form, setForm] = useState({ name:"", iitEmail:"", password:"", branch:"", year:"", gender:"", phoneNumber:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function set(k, v) { setForm(f => ({...f,[k]:v})); setErrors(e => ({...e,[k]:""})); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.iitEmail.match(/^[^\s@]+@itbhu\.ac\.in$/)) e.iitEmail = "Must be a valid @itbhu.ac.in address";
    if (form.password.length < 8 || !form.password.match(/[A-Za-z]/) || !form.password.match(/\d/))
      e.password = "Min 8 chars, at least one letter and one number";
    if (!form.branch) e.branch = "Required";
    if (!form.year || form.year < 1 || form.year > 5) e.year = "Year 1–5";
    if (!form.gender) e.gender = "Required";
    if (!form.phoneNumber.match(/^[6-9]\d{9}$/)) e.phoneNumber = "Valid 10-digit Indian number";
    return e;
  }

  async function submit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setServerError("");
    try {
      await apiCall("POST", "/auth/register", {...form, year: parseInt(form.year)}, false);
      onSuccess(form.iitEmail);
    } catch(err) { setServerError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card">
      <div className="step-hint">Create account</div>
      <div className="h1">Find your match at IIT BHU</div>
      <div className="sub mt8">Answer 11 questions, get ranked roommate matches. Instant, free.</div>
      <div className="divider"/>

      <div className="field">
        <span className="label">Full name</span>
        <input className="input" placeholder="Harshita Sharma" value={form.name} onChange={e=>set("name",e.target.value)}/>
        {errors.name && <div className="error-msg">{errors.name}</div>}
      </div>

      <div className="field">
        <span className="label">IIT BHU email</span>
        <input className="input" placeholder="yourname@itbhu.ac.in" value={form.iitEmail} onChange={e=>set("iitEmail",e.target.value)}/>
        {errors.iitEmail && <div className="error-msg">{errors.iitEmail}</div>}
      </div>

      <div className="field">
        <span className="label">Password</span>
        <input className="input" type="password" placeholder="Min 8 chars, letter + number" value={form.password} onChange={e=>set("password",e.target.value)}/>
        {errors.password && <div className="error-msg">{errors.password}</div>}
      </div>

      <div className="row-2">
        <div className="field">
          <span className="label">Branch</span>
          <select className="input" value={form.branch} onChange={e=>set("branch",e.target.value)}>
            <option value="">Select</option>
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.branch && <div className="error-msg">{errors.branch}</div>}
        </div>
        <div className="field">
          <span className="label">Year</span>
          <select className="input" value={form.year} onChange={e=>set("year",e.target.value)}>
            <option value="">Year</option>
            {[1,2,3,4,5].map(y=><option key={y} value={y}>Year {y}</option>)}
          </select>
          {errors.year && <div className="error-msg">{errors.year}</div>}
        </div>
      </div>

      <div className="row-2">
        <div className="field">
          <span className="label">Gender</span>
          <select className="input" value={form.gender} onChange={e=>set("gender",e.target.value)}>
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <div className="error-msg">{errors.gender}</div>}
        </div>
        <div className="field">
          <span className="label">Phone number</span>
          <input className="input" placeholder="9876543210" value={form.phoneNumber} onChange={e=>set("phoneNumber",e.target.value)}/>
          {errors.phoneNumber && <div className="error-msg">{errors.phoneNumber}</div>}
        </div>
      </div>

      {serverError && <div className="error-msg mt8" style={{marginBottom:12}}>{serverError}</div>}

      <button className="btn btn-primary" onClick={submit} disabled={loading}>
        {loading ? "Creating account…" : "Create account →"}
      </button>

      <div className="center mt16">
        <button className="link-btn" onClick={onLogin}>Already have an account? Sign in</button>
      </div>
    </div>
  );
}

function LoginScreen({ onSuccess, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!email || !password) { setError("Fill in both fields"); return; }
    setLoading(true); setError("");
    try {
      const data = await apiCall("POST", "/auth/login", { iitEmail: email, password }, false);
      localStorage.setItem("token", data.token);
      onSuccess(data);
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card">
      <div className="step-hint">Sign in</div>
      <div className="h1">Welcome back</div>
      <div className="divider"/>
      <div className="field">
        <span className="label">IIT BHU email</span>
        <input className="input" placeholder="yourname@itbhu.ac.in" value={email} onChange={e=>{setEmail(e.target.value);setError("");}}/>
      </div>
      <div className="field">
        <span className="label">Password</span>
        <input className="input" type="password" value={password} onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&submit()}/>
      </div>
      {error && <div className="error-msg" style={{marginBottom:12}}>{error}</div>}
      <button className="btn btn-primary" onClick={submit} disabled={loading}>
        {loading ? "Signing in…" : "Sign in →"}
      </button>
      <div className="center mt16">
        <button className="link-btn" onClick={onRegister}>No account? Register here</button>
      </div>
    </div>
  );
}

function QuestionnaireScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const q = QUESTIONNAIRE_STEPS[step];
  const isLast = step === QUESTIONNAIRE_STEPS.length - 1;
  const answered = answers[q.key] !== undefined;

  function pick(value) {
    setAnswers(a => ({...a, [q.key]: value}));
    setError("");
  }

  async function next() {
    if (!answered) { setError("Pick one to continue"); return; }
    if (!isLast) { setStep(s => s+1); return; }
    setLoading(true); setError("");
    try {
      const payload = {...answers};
      if (payload.needSilence === "true") payload.needSilence = true;
      if (payload.needSilence === "false") payload.needSilence = false;
      await apiCall("POST", "/questionnaire", payload);
      onComplete();
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card">
      <ProgressRing step={step + 1} total={QUESTIONNAIRE_STEPS.length}/>
      <div className="step-hint">{q.label}</div>
      <div className="h2">{q.sub}</div>
      <div className="divider"/>
      <div className="chips" style={{marginBottom:24}}>
        {q.options.map(([val, display]) => (
          <button type="button" key={val} className={`chip ${answers[q.key] === val ? "selected":""}`} aria-pressed={answers[q.key] === val} onClick={()=>pick(val)}>
            {display}
          </button>
        ))}
      </div>
      {error && <div className="error-msg" style={{marginBottom:12}}>{error}</div>}
      <button className="btn btn-primary" onClick={next} disabled={loading || !answered}>
        {loading ? "Saving…" : isLast ? "See my matches →" : "Next →"}
      </button>
      {step > 0 && (
        <div className="center mt16">
          <button className="back-btn" onClick={()=>setStep(s=>s-1)}>← Back</button>
        </div>
      )}
    </div>
  );
}

function PreferencesScreen({ onComplete, onSkip }) {
  const [topPriorities, setTopPriorities] = useState(new Set());
  const [dealBreakers, setDealBreakers] = useState(new Set());
  const [matchingEnabled, setMatchingEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleSet(set, setFn, key) {
    setFn(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
    setError("");
  }

  async function submit() {
    if (topPriorities.size === 0) { setError("Pick at least one top priority"); return; }
    if (dealBreakers.size === 0) { setError("Pick at least one deal breaker"); return; }
    setLoading(true); setError("");
    try {
      await apiCall("POST", "/preferences", {
        topPriorities: [...topPriorities],
        dealBreakers: [...dealBreakers],
        matchingEnabled,
      });
      onComplete();
    } catch(err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="card">
      <div className="step-hint">Final step</div>
      <div className="h2">Your priorities</div>
      <div className="sub mt8">This shapes how your matches are weighted and filtered.</div>
      <div className="divider"/>

      <span className="label">Top priorities — what matters most to you</span>
      <div className="chips" style={{marginBottom:24}}>
        {ALL_CRITERIA.map(c => (
          <button type="button" key={c} className={`chip ${topPriorities.has(c)?"selected":""}`} aria-pressed={topPriorities.has(c)} onClick={()=>toggleSet(topPriorities,setTopPriorities,c)}>
            {CRITERIA_LABELS[c]}
          </button>
        ))}
      </div>

      <span className="label">Deal breakers — hard no-match conditions</span>
      <div className="chips" style={{marginBottom:24}}>
        {ALL_CRITERIA.map(c => (
          <button type="button" key={c} className={`chip ${dealBreakers.has(c)?"selected":""}`} aria-pressed={dealBreakers.has(c)} onClick={()=>toggleSet(dealBreakers,setDealBreakers,c)}>
            {CRITERIA_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="toggle-row">
        <div>
          <div className="toggle-label">Appear in others' matches</div>
          <div className="toggle-sub">Turn off to browse privately</div>
        </div>
        <button className={`toggle ${matchingEnabled?"on":""}`} onClick={()=>setMatchingEnabled(v=>!v)}/>
      </div>

      {error && <div className="error-msg mt8" style={{marginBottom:12}}>{error}</div>}
      <div className="mt16">
        <button className="btn btn-primary" onClick={submit} disabled={loading}>
          {loading ? "Saving…" : "See my matches →"}
        </button>
      </div>
      <div className="center mt16">
        <button className="btn-ghost btn" onClick={onSkip}>Skip for now</button>
      </div>
    </div>
  );
}

function DashboardScreen({ onViewMatches }) {
  const [email, setEmail] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  async function checkCompatibility() {
    if (!email.trim()) {
      setError("Enter your friend's IIT email.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);
    setShowInvite(false);

    try {
      const data = await apiCall("POST", "/friends/check-compatibility", {
        recipientIitEmail: email,
      });
      setReport(data);
    } catch (err) {
        if (err.message.includes("User account was not found")) {
          setShowInvite(true);
          setError("");
        } else {
          setError(err.message);
        }
      }
  }

  return (
    <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:16}}>
      <section className="card">
        <div className="h2">🤝 Check Compatibility with a Friend</div>
        <div className="sub mt8">Enter your friend's IIT BHU email and instantly see your compatibility.</div>
        <div className="divider"/>

        <div className="field">
          <span className="label">Friend IIT Email</span>
          <input
            className="input"
            placeholder="friend@itbhu.ac.in"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <div className="error-msg" style={{marginBottom:12}}>{error}</div>}
        {showInvite && (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12
            }}
          >
            <div className="h2" style={{fontSize:18}}>
              Your friend isn't on Cohabit yet.
            </div>

            <div className="sub mt8">
              Invite them to join so you can compare compatibility.
            </div>

            <button
              className="btn btn-primary"
              style={{marginTop:16}}
              onClick={()=>{
                navigator.clipboard.writeText(
        `Hey! I found this roommate matching platform for IIT BHU.

        Join using:
        https://cohabit-frontend.vercel.app/`
                );

                alert("Invitation copied!");
              }}
            >
              📋 Copy Invitation
            </button>
          </div>
        )}

        <button className="btn btn-primary" onClick={checkCompatibility} disabled={loading}>
          {loading ? "Checking..." : "Check Compatibility"}
        </button>

        {report && (
          <>
            <div className="divider"/>
            <div className="center">
              <div style={{fontSize:44, fontWeight:700, color:T.coral}}>{report.overallScore}%</div>
              <div className="sub">Compatibility Score</div>
            </div>

            {report.matchingTraits?.length > 0 && (
              <div className="field mt24">
                <span className="label">Strong matches</span>
                <div>{report.matchingTraits.map(t => <span key={t} className="tag tag-green">✓ {t}</span>)}</div>
              </div>
            )}

            {report.potentialConflicts?.length > 0 && (
              <div className="field mt16">
                <span className="label">Conflicts</span>
                <div>{report.potentialConflicts.map(t => <span key={t} className="tag tag-red">⚠ {t}</span>)}</div>
              </div>
            )}

            {report.reasoning?.length > 0 && (
              <>
                <div className="divider"/>
                <span className="label">Why this score</span>
                {report.reasoning.slice(0, 5).map((reason, index) => (
                  <div key={index} className="trait-row"><span className="trait-name">{reason}</span></div>
                ))}
              </>
            )}
          </>
        )}
      </section>

      <section className="card">
        <div className="h2">🔍 Browse Roommate Matches</div>
        <div className="sub mt8">Browse your recommended roommates.</div>
        <div className="mt24">
          <button className="btn btn-primary" onClick={onViewMatches}>View Matches</button>
        </div>
      </section>
    </div>
  );
}

//-----------------------


function MatchesScreen({ onBack, onMatchClick }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiCall("GET", "/matches")
      .then(data => setMatches(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card"><Spinner/></div>;

return (
    <div className="card">
      <button
        className="btn btn-outline"
        style={{marginBottom:16}}
        onClick={onBack}
      >
        ← Dashboard
      </button>

      <div className="h2">Your top matches</div>
      <div className="sub mt8">{matches.length} compatible roommates from your year</div>
      <div className="divider"/>
      {error && <div className="error-msg" style={{marginBottom:16}}>{error}</div>}
      {matches.length === 0 && !error && (
        <div className="center" style={{padding:"32px 0", gap:12}}>
          <div style={{fontSize:40}}>🔍</div>
          <div className="sub" style={{textAlign:"center"}}>No matches yet — more people join every day.</div>
        </div>
      )}
      {matches.map((m, i) => (
        <button type="button" key={m.userId || i} className="match-card" onClick={()=>onMatchClick(m)} aria-label={`View compatibility details for match ${i + 1}`}>
          <div className="avatar" style={{background: [T.slate, "#2D4A6B", "#4A3D6B", "#3D6B4A"][i%4]}}>
            🔒
          </div>
          <div>
            <div className="match-name" style={{filter:"blur(5px)", userSelect:"none"}}>
              {initials(m.name)}{"•".repeat(Math.max(3, (m.name||"").length - 2))}
            </div>
            <div className="match-meta">{m.branch} · Year {m.year}</div>
          </div>
          <ScorePill score={m.compatibilityReport?.overallScore ?? 0}/>
        </button>
      ))}
    </div>
  );
}

function MatchDetailScreen({ match, onBack }) {
  const report = match.compatibilityReport;

// States: "INITIAL" | "PROMPT" | "WAITING"
  const [contactState, setContactState] = useState("INITIAL");
  const [loading, setLoading] = useState(false);

  async function handleInterest() {
    setLoading(true);
    try {
      // This API call sends the intent to your backend so you know who clicked it.
      // You will need to create this route on your server to save the request in your database.
      await apiCall("POST", "/matches/interest", { targetUserId: match.userId });
      setContactState("WAITING");
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <button className="back-btn" onClick={onBack} style={{marginBottom:20}}>← Back to matches</button>

      <div style={{display:"flex", alignItems:"center", gap:16, marginBottom:24}}>
        <div className="avatar" style={{width:56,height:56,fontSize:22,background:T.slate}}>🔒</div>
        <div>
          <div className="h2" style={{filter:"blur(6px)", userSelect:"none"}}>{match.name}</div>
          <div className="sub">{match.branch} · Year {match.year}</div>
        </div>
        <ScorePill score={report?.overallScore ?? 0}/>
      </div>

      {report?.matchingTraits?.length > 0 && (
        <div className="field">
          <span className="label">Strong matches</span>
          <div>{report.matchingTraits.map(t => <span key={t} className="tag tag-green">✓ {t}</span>)}</div>
        </div>
      )}

      {report?.potentialConflicts?.length > 0 && (
        <div className="field">
          <span className="label">Conflicts</span>
          <div>{report.potentialConflicts.map(t => <span key={t} className="tag tag-red">⚠ {t}</span>)}</div>
        </div>
      )}

      {report?.reasoning?.length > 0 && (
        <>
          <div className="divider"/>
          <span className="label">Why this score</span>
          {report.reasoning.slice(0,5).map((r,i) => (
            <div key={i} className="trait-row">
              <span className="trait-name">{r}</span>
            </div>
          ))}
        </>
      )}

      <div className="divider"/>
{/* --- New Contact Unlock Flow --- */}

      {contactState === "INITIAL" && (
        <button
          className="btn btn-primary"
          onClick={() => setContactState("PROMPT")}
        >
          🔒 Unlock contact
        </button>
      )}

      {contactState === "PROMPT" && (
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "center"
        }}>
          <div className="sub" style={{ marginBottom: "20px", fontSize: "14px", color: T.cream }}>
            If both sides are interested, you will have to pay <strong>₹25</strong> to unlock contact details.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              className="btn btn-primary"
              onClick={handleInterest}
              disabled={loading}
            >
              {loading ? "Sending..." : "Interested"}
            </button>
            <button
              className="btn btn-outline"
              onClick={onBack}
            >
              See other options
            </button>
          </div>
        </div>
      )}

      {contactState === "WAITING" && (
        <div style={{
          background: "rgba(76,175,125,0.1)",
          border: "1px solid rgba(76,175,125,0.2)",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>⏳</div>
          <div className="h2" style={{ fontSize: "16px", color: T.green }}>Request Sent</div>
          <div className="sub mt8">
            Waiting for the other person to accept your request...
          </div>
        </div>
      )}

    </div>
  );
}

// ── App shell ──────────────────────────────────────────────────────────────────
const SCREENS = {
  REGISTER: "REGISTER",
  VERIFY: "VERIFY",
  LOGIN: "LOGIN",
  QUESTIONNAIRE: "QUESTIONNAIRE",
  PREFERENCES: "PREFERENCES",
  MATCHES: "MATCHES",
  MATCH_DETAIL: "MATCH_DETAIL",
  DASHBOARD: "DASHBOARD"
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.REGISTER);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Add a loading state for the initial auth check
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
      const checkSession = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsInitializing(false);
          return;
        }

        try {
          // Verify the token and check if they have completed the questionnaire
          await apiCall("GET", "/questionnaire/me");
          setScreen(SCREENS.DASHBOARD);
        } catch (err) {
          if (err.message.includes("Questionnaire not found")) {
            setScreen(SCREENS.QUESTIONNAIRE);
          } else {
            // Token is likely invalid or expired; clear it and prompt login
            localStorage.removeItem("token");
            setScreen(SCREENS.LOGIN);
          }
        } finally {
          setIsInitializing(false);
        }
      };

      checkSession();
    }, []);

    // Show a spinner while checking the local token
    if (isInitializing) {
      return (
        <div className="shell" style={{ justifyContent: "center" }}>
          <style>{css}</style>
          <Spinner />
        </div>
      );
    }

  return (
    <>
      <style>{css}</style>
      <div className="shell">
        <div className="topbar">
          <div className="logo">cohabit</div>
          {[SCREENS.DASHBOARD, SCREENS.MATCHES, SCREENS.MATCH_DETAIL].includes(screen) && (
            <button className="back-btn" onClick={()=>{
                localStorage.removeItem("token");
                setScreen(SCREENS.LOGIN); }}>
              Sign out
            </button>
          )}
        </div>

        {screen === SCREENS.REGISTER && (
        <RegisterScreen
            onSuccess={() => {
                setScreen(SCREENS.LOGIN);
            }}
            onLogin={() => setScreen(SCREENS.LOGIN)}
        />
        )}
        {screen === SCREENS.LOGIN && (
          <LoginScreen
            onSuccess={async () => {
              try {
                await apiCall("GET", "/questionnaire/me");
                setScreen(SCREENS.DASHBOARD);
              } catch (err) {
                if (err.message.includes("Questionnaire not found")) {
                  setScreen(SCREENS.QUESTIONNAIRE);
                } else {
                  alert(err.message);
                }
              }
            }}
            onRegister={() => setScreen(SCREENS.REGISTER)}
          />
        )}
        {screen === SCREENS.QUESTIONNAIRE && (
          <QuestionnaireScreen
            onComplete={() => setScreen(SCREENS.PREFERENCES)}
          />
        )}
        {screen === SCREENS.PREFERENCES && (
        <PreferencesScreen
            onComplete={() => setScreen(SCREENS.DASHBOARD)}
            onSkip={() => setScreen(SCREENS.DASHBOARD)}
        />
        )}
        {screen === SCREENS.DASHBOARD && (
          <DashboardScreen onViewMatches={() => setScreen(SCREENS.MATCHES)} />
        )}
        {screen === SCREENS.MATCHES && (
          <MatchesScreen
            onBack = {() => setScreen(SCREENS.DASHBOARD)}
            onMatchClick={m => { setSelectedMatch(m); setScreen(SCREENS.MATCH_DETAIL); }}
          />
        )}
        {screen === SCREENS.MATCH_DETAIL && selectedMatch && (
          <MatchDetailScreen
            match={selectedMatch}
            onBack={() => setScreen(SCREENS.MATCHES)}
          />
        )}
      </div>
    </>
  );
}
