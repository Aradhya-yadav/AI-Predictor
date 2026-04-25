import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.jpg";

const ResultCard = ({ result }) => {
  if (!result) return null;

  // 📄 PDF DOWNLOAD
  const downloadPDF = async () => {
    const element = document.getElementById("result-pdf");

    const btn = document.getElementById("pdf-btn");
    const certBtn = document.getElementById("cert-btn");

    if (btn) btn.style.display = "none";
    if (certBtn) certBtn.style.display = "none";

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save("result.pdf");

    if (btn) btn.style.display = "block";
    if (certBtn) certBtn.style.display = "block";
  };

  // 🎓 CERTIFICATE
  const downloadCertificate = () => {
    const pdf = new jsPDF("landscape");
    const user = JSON.parse(localStorage.getItem("user"));

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      // border
      pdf.setDrawColor(212, 175, 55);
      pdf.setLineWidth(2);
      pdf.rect(10, 10, 277, 190);

      // logo
      pdf.addImage(img, "JPG", 120, 15, 40, 20);

      // title
      pdf.setFontSize(30);
      pdf.text("Certificate of Achievement", 60, 50);

      // subtitle
      pdf.setFontSize(16);
      pdf.text("This is proudly presented to", 95, 70);

      // name
      pdf.setFontSize(26);
      pdf.text(user?.name || "Student", 110, 95);

      pdf.line(90, 100, 200, 100);

      // result
      pdf.setFontSize(16);
      pdf.text(
        `Grade ${result.grade} | Score ${result.score}%`,
        80,
        120
      );

      // date
      pdf.setFontSize(12);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 170);

      // sign
      pdf.line(200, 160, 260, 160);
      pdf.text("Authorized Signature", 200, 170);

      pdf.save("Certificate.pdf");
    };
  };

  return (
    <div className="flex justify-center mt-8">
      
      <div
        id="result-pdf"
        className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 w-full max-w-md text-center"
      >
        <h2 className="text-xl font-bold mb-4">
          Prediction Result
        </h2>

        <h3 className="text-3xl font-bold text-blue-500">
          {result.score}%
        </h3>

        <p className="mt-2 text-lg">
          Grade: {result.grade}
        </p>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          💡 {result.suggestion}
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex justify-center gap-3 mt-6">
          
          <button
            id="pdf-btn"
            onClick={downloadPDF}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            PDF 📄
          </button>

          <button
            id="cert-btn"
            onClick={downloadCertificate}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Certificate 🎓
          </button>

        </div>

      </div>
    </div>
  );
};

export default ResultCard;