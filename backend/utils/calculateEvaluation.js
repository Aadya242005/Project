export function calculateEvaluation(user) {
  let score = 0;

  // 🎓 CPI — 40%
  if (user.cpi) score += (user.cpi / 10) * 40;

  // 💻 Hackathons — 20%
  if (user.hackathons && user.hackathons.length > 0) {
    let hackathonPoints = 0;
    user.hackathons.forEach((h) => {
      if (h.position === 1) hackathonPoints += 20;
      else if (h.position <= 3) hackathonPoints += 15;
      else hackathonPoints += 10;
    });
    score += Math.min((hackathonPoints / (user.hackathons.length * 20)) * 20, 20);
  }

  // 📄 Resume ATS — 20%
  if (user.resumeATS) score += (user.resumeATS / 100) * 20;

  // 🏅 Certificates — 10%
  if (user.certificates && user.certificates.length > 0) {
    let certPoints = 0;
    user.certificates.forEach((c) => {
      certPoints += c.verified ? 5 : 2;
    });
    score += Math.min((certPoints / (user.certificates.length * 5)) * 10, 10);
  }

  return Math.min(score, 100);
}
