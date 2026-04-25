import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.jpg";
import signature from "../assets/signar.jpg";
import { auth } from "../firebase";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="text-center mt-20">
        <h1>No result available</h1>
        <button
          onClick={() => navigate("/predict")}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Go to Predict
        </button>
      </div>
    );
  }

  // 🎓 CERTIFICATE
  const downloadCertificate = async () => {
    const pdf = new jsPDF("landscape");

    const user = auth.currentUser;

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // 🔥 fallback
      });

    const [logoImg, signImg] = await Promise.all([
      loadImage(logo),
      loadImage(signature),
    ]);

    const pageWidth = pdf.internal.pageSize.getWidth();

    // Border
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(2);
    pdf.rect(10, 10, 277, 190);

    // Logo
    if (logoImg) {
      pdf.addImage(logoImg, "JPEG", 120, 15, 40, 20);
    }

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(30);
    pdf.text("Certificate of Achievement", pageWidth / 2, 50, {
      align: "center",
    });

    // Subtitle
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.text("This is proudly presented to", pageWidth / 2, 70, {
      align: "center",
    });

    // Name
    pdf.setFont("times", "bold");
    pdf.setFontSize(26);
    pdf.text(user?.displayName || "Student", pageWidth / 2, 95, {
      align: "center",
    });

    pdf.line(80, 100, 217, 100);

    // Result
    pdf.setFontSize(16);
    pdf.text(
      `Grade ${data.grade} | Score ${data.score}%`,
      pageWidth / 2,
      120,
      { align: "center" }
    );

    // Date
    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 170);

    // Signature
    if (signImg) {
      pdf.addImage(signImg, "JPEG", 210, 140, 45, 25);
    }

    pdf.line(200, 170, 270, 170);
    pdf.text("Authorized Signature", 205, 180);

    pdf.text("AI Predictor System", 20, 180);

    pdf.save("Certificate.pdf");
  };

  // 📄 RESULT PDF
  const downloadPDF = async () => {
    const element = document.getElementById("result-card");

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("result.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-10 px-4">
      <div
        id="result-card"
        className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          📊 Detailed Result
        </h1>

        <div className="text-center mb-6">
          <p>Score</p>
          <h2 className="text-4xl font-bold text-blue-500">
            {data.score}%
          </h2>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl">Grade: {data.grade}</h3>
        </div>

        {/* 🔥 FIX: suggestion fallback */}
        <div className="bg-gray-100 p-4 rounded text-center">
          💡{" "}
          {data.suggestion ||
            (data.score > 80
              ? "Excellent performance 🚀"
              : data.score > 60
              ? "Good, but can improve 👍"
              : "Need more focus 📚")}
        </div>
      </div>

      <div className="text-center mt-6 flex justify-center gap-4">
        <button
          onClick={downloadPDF}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Download PDF 📄
        </button>

        <button
          onClick={downloadCertificate}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
        >
          Download Certificate 🎓
        </button>
      </div>
    </div>
  );
};

export default Result;import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.jpg";
import signature from "../assets/signar.jpg";
import { auth } from "../firebase";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="text-center mt-20">
        <h1>No result available</h1>
        <button
          onClick={() => navigate("/predict")}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Go to Predict
        </button>
      </div>
    );
  }

  // 🎓 CERTIFICATE
  const downloadCertificate = async () => {
    const pdf = new jsPDF("landscape");

    const user = auth.currentUser;

    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

    const [logoImg, signImg] = await Promise.all([
      loadImage(logo),
      loadImage(signature),
    ]);

    const pageWidth = pdf.internal.pageSize.getWidth();

    // Border
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(2);
    pdf.rect(10, 10, 277, 190);

    // Logo
    if (logoImg) {
      pdf.addImage(logoImg, "JPEG", 120, 15, 40, 20);
    }

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(30);
    pdf.text("Certificate of Achievement", pageWidth / 2, 50, {
      align: "center",
    });

    // Subtitle
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.text("This is proudly presented to", pageWidth / 2, 70, {
      align: "center",
    });

    // Name
    pdf.setFont("times", "bold");
    pdf.setFontSize(26);
    pdf.text(user?.displayName || "Student", pageWidth / 2, 95, {
      align: "center",
    });

    pdf.line(80, 100, 217, 100);

    // Result
    pdf.setFontSize(16);
    pdf.text(
      `Grade ${data.grade} | Score ${data.score}%`,
      pageWidth / 2,
      120,
      { align: "center" }
    );

    // Date
    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 170);

    // Signature
    if (signImg) {
      pdf.addImage(signImg, "JPEG", 210, 140, 45, 25);
    }

    pdf.line(200, 170, 270, 170);
    pdf.text("Authorized Signature", 205, 180);

    pdf.text("AI Predictor System", 20, 180);

    pdf.save("Certificate.pdf");
  };

  // 📄 RESULT PDF
  const downloadPDF = async () => {
    const element = document.getElementById("result-card");

    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("result.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-10 px-4">
      <div
        id="result-card"
        className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          📊 Detailed Result
        </h1>

        <div className="text-center mb-6">
          <p>Score</p>
          <h2 className="text-4xl font-bold text-blue-500">
            {data.score}%
          </h2>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl">Grade: {data.grade}</h3>
        </div>

        {/* 🔥 Safe suggestion */}
        <div className="bg-gray-100 p-4 rounded text-center">
          💡{" "}
          {data.suggestion ||
            (data.score > 80
              ? "Excellent performance 🚀"
              : data.score > 60
              ? "Good, but can improve 👍"
              : "Need more focus 📚")}
        </div>
      </div>

      <div className="text-center mt-6 flex justify-center gap-4">
        <button
          onClick={downloadPDF}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Download PDF 📄
        </button>

        <button
          onClick={downloadCertificate}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
        >
          Download Certificate 🎓
        </button>
      </div>
    </div>
  );
};

export default Result;