document.addEventListener("DOMContentLoaded", () => {
  const trainBtn = document.getElementById("trainBtn");
  const trainProgress = document.getElementById("trainProgress");
  const trainProgressText = document.getElementById("trainProgressText");
  const trainMsg = document.getElementById("trainMsg");
  const trainBadge = document.getElementById("trainBadge");
  const modelStatus = document.getElementById("modelStatus");
  const studentCount = document.getElementById("studentCount");
  const todayCount = document.getElementById("todayCount");

  async function getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  }

  async function pollStatus() {
    try {
      const data = await getJSON("/train_status");
      const progress = Number(data.progress || 0);
      trainProgress.style.width = `${progress}%`;
      trainProgressText.textContent = `${progress}%`;
      trainMsg.textContent = data.message || "";
      if (data.running) {
        trainBadge.textContent = "Training";
        modelStatus.textContent = `${progress}%`;
      } else if (progress >= 100) {
        trainBadge.textContent = "Trained";
        modelStatus.textContent = "Trained";
      } else {
        trainBadge.textContent = "Ready";
      }
      return data;
    } catch (err) {
      trainMsg.textContent = "Unable to read training status.";
      return null;
    }
  }

  async function loadStats() {
    try {
      const [students, attendance] = await Promise.all([
        getJSON("/students"),
        getJSON("/attendance_stats")
      ]);
      studentCount.textContent = students.students.length;
      const counts = attendance.counts || [];
      todayCount.textContent = counts.length ? counts[counts.length - 1] : 0;

      const ctx = document.getElementById("attendanceChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: attendance.dates,
          datasets: [{
            label: "Attendance",
            data: counts,
            borderColor: "#6d5dfc",
            backgroundColor: "rgba(109,93,252,.10)",
            fill: true,
            tension: .35,
            pointRadius: 2,
            pointHoverRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#8a91a1", maxTicksLimit: 10, font: { size: 9 } } },
            y: { beginAtZero: true, grid: { color: "#eef0f4" }, ticks: { color: "#8a91a1", font: { size: 9 }, precision: 0 } }
          }
        }
      });
    } catch (err) {
      console.error(err);
      studentCount.textContent = "—";
      todayCount.textContent = "—";
    }
  }

  trainBtn.addEventListener("click", async () => {
    trainBtn.disabled = true;
    trainBadge.textContent = "Starting";
    trainMsg.textContent = "Starting training...";
    try {
      const res = await fetch("/train_model");
      if (!res.ok && res.status !== 202) throw new Error("Training could not be started.");

      const timer = setInterval(async () => {
        const data = await pollStatus();
        if (data && !data.running && Number(data.progress) >= 100) {
          clearInterval(timer);
          trainBtn.disabled = false;
          trainBadge.textContent = "Trained";
          modelStatus.textContent = "Trained";
        }
      }, 1200);
    } catch (err) {
      trainMsg.textContent = err.message;
      trainBadge.textContent = "Error";
      trainBtn.disabled = false;
    }
  });

  pollStatus();
  loadStats();
});
