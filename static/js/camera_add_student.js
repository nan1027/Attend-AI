const saveInfoBtn = document.getElementById("saveInfoBtn");
const startCaptureBtn = document.getElementById("startCaptureBtn");
const addStudentBtn = document.getElementById("addStudentBtn");
const video = document.getElementById("video");
const captureStatus = document.getElementById("captureStatus");
const capturePercent = document.getElementById("capturePercent");
const progressBar = document.getElementById("progressBar");

let student_id = null;
let captured = 0;
const maxImages = 50;
let images = [];
let stream = null;

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  try {
    saveInfoBtn.disabled = true;
    const res = await fetch("/add_student", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Failed to save student information.");
    const j = await res.json();
    student_id = j.student_id;
    captureStatus.textContent = "Details saved. Start the camera when ready.";
    startCaptureBtn.disabled = false;
  } catch (err) {
    alert(err.message);
    saveInfoBtn.disabled = false;
  }
});

startCaptureBtn.addEventListener("click", async () => {
  startCaptureBtn.disabled = true;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
    video.srcObject = stream;
    await video.play();
    captureImagesLoop();
  } catch (err) {
    alert("Camera access error: " + err.message);
    startCaptureBtn.disabled = false;
  }
});

async function captureImagesLoop() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext("2d");

  while (captured < maxImages) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.9));
    images.push(blob);
    captured++;
    const pct = Math.round((captured / maxImages) * 100);
    captureStatus.textContent = `Captured ${captured} / ${maxImages}`;
    capturePercent.textContent = `${pct}%`;
    progressBar.style.width = `${pct}%`;
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const form = new FormData();
  form.append("student_id", student_id);
  images.forEach((blob, i) => form.append("images[]", blob, `img_${i}.jpg`));

  try {
    const resp = await fetch("/upload_face", { method: "POST", body: form });
    if (!resp.ok) throw new Error("Upload failed.");
    captureStatus.textContent = "Face samples uploaded successfully.";
    addStudentBtn.disabled = false;
  } catch (err) {
    alert(err.message);
  }

  if (stream) stream.getTracks().forEach(t => t.stop());
}

addStudentBtn.addEventListener("click", () => {
  window.location.href = "/";
});
