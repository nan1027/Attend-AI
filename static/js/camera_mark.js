const startMarkBtn = document.getElementById("startMarkBtn");
const stopMarkBtn = document.getElementById("stopMarkBtn");
const markVideo = document.getElementById("markVideo");
const markStatus = document.getElementById("markStatus");
const recognizedList = document.getElementById("recognizedList");
const recognizedEmpty = document.getElementById("recognizedEmpty");
const liveBadge = document.getElementById("liveBadge");

let markStream = null;
let markInterval = null;
let recognizedIds = new Set();

startMarkBtn.addEventListener("click", async () => {
  startMarkBtn.disabled = true;
  stopMarkBtn.disabled = false;
  try {
    markStream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
    markVideo.srcObject = markStream;
    await markVideo.play();
    markStatus.textContent = "Scanning for a registered face...";
    liveBadge.textContent = "Live";
    markInterval = setInterval(captureAndRecognize, 1200);
  } catch (err) {
    alert("Camera error: " + err.message);
    startMarkBtn.disabled = false;
    stopMarkBtn.disabled = true;
  }
});

stopMarkBtn.addEventListener("click", stopRecognition);

function stopRecognition() {
  if (markInterval) clearInterval(markInterval);
  markInterval = null;
  if (markStream) markStream.getTracks().forEach(t => t.stop());
  markStream = null;
  startMarkBtn.disabled = false;
  stopMarkBtn.disabled = true;
  liveBadge.textContent = "Standby";
  markStatus.textContent = "Recognition stopped.";
}

async function captureAndRecognize() {
  if (!markStream) return;
  const canvas = document.createElement("canvas");
  canvas.width = markVideo.videoWidth || 640;
  canvas.height = markVideo.videoHeight || 480;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(markVideo, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.85));
  const fd = new FormData();
  fd.append("image", blob, "snap.jpg");

  try {
    const res = await fetch("/recognize_face", { method: "POST", body: fd });
    const data = await res.json();

    if (data.recognized) {
      const confidence = Math.round(data.confidence * 100);
      markStatus.textContent = `${data.name} recognized — ${confidence}% confidence`;
      if (!recognizedIds.has(data.student_id)) {
        recognizedIds.add(data.student_id);
        recognizedEmpty.style.display = "none";
        const li = document.createElement("li");
        li.innerHTML = `<strong>${data.name}</strong><span>Recognized at ${new Date().toLocaleTimeString()} · ${confidence}% confidence</span>`;
        recognizedList.prepend(li);
      }
    } else {
      markStatus.textContent = data.error ? `Not recognized: ${data.error}` : "No registered face detected.";
    }
  } catch (err) {
    console.error(err);
    markStatus.textContent = "Recognition request failed.";
  }
}
