export default function ScorePill({score}){return <div className={`score-pill ${score>=80?"score-high":score>=60?"score-mid":"score-low"}`}>{score}%</div>}
