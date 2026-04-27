import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Convert all text to ASCII-safe characters
function toASCII(text) {
  if (!text) return "";
  return text
    .replace(/[\u2010-\u2015]/g, "-")   // hyphens/dashes
    .replace(/[\u2018\u2019]/g, "'")    // curly apostrophes
    .replace(/[\u201C\u201D]/g, '"')    // curly quotes
    .replace(/\u2026/g, "...")          // ellipsis
    .replace(/[^ -~]/g, "");            // remove all non-ASCII printable chars
}


export default async function createResumePDFODFLib(resumeData) {
  const pdfDoc = await PDFDocument.create();

  // Embed fonts
  const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const margin = 40;
  let y = height - margin;
  const lineHeight = 14;

  // Split text into lines
  const splitTextIntoLines = (text, font, fontSize, maxWidth) => {
    text = toASCII(text); // FIX APPLIED HERE

    const rawLines = text.split(/\r?\n/);
    const lines = [];

    rawLines.forEach(rawLine => {
      const words = rawLine.split(" ");
      let currentLine = "";
      words.forEach(word => {
        const testLine = currentLine ? currentLine + " " + word : word;
        const w = font.widthOfTextAtSize(testLine, fontSize);
        if (w < maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
    });

    return lines;
  };

  // Add text helper
  const addText = (text, fontSize = 12, options = {}) => {
    text = toASCII(text); // FIX APPLIED HERE

    const font = options.font || fontNormal;
    const color = options.color || rgb(0, 0, 0);

    const lines = splitTextIntoLines(text, font, fontSize, width - margin * 2);

    lines.forEach(line => {
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }

      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
        color,
      });

      y -= lineHeight;
    });

    y -= lineHeight / 2;
  };

  // Add section header
  const addSectionHeader = (text) => {
    text = toASCII(text); // FIX APPLIED HERE
    y -= 12;
    addText(text, 14, { font: fontBold, color: rgb(0, 0, 0) });
    y -= 6;
  };

  // ----- PDF Content -----

  // Name
  addText(toASCII("Ahmad Jamil"), 20, { font: fontBold });

  // Contact info
  addText(
    toASCII(
      `Phone: ${resumeData.phonePrefix} ${resumeData.mobileNumber} | Email: ${resumeData.email} | Location: ${resumeData.city}, ${resumeData.country}`
    ),
    10,
    { color: rgb(0.2, 0.2, 0.2) }
  );

  // Profile
  addSectionHeader("Profile");
  addText(toASCII(resumeData.aboutMe), 11);

  // Work Experience
  addSectionHeader("Work Experience");
  resumeData.experiences.forEach(exp => {
    addText(toASCII(`${exp.jobTitle}, ${exp.companyName}`), 12, { font: fontBold });
    addText(toASCII(`${exp.startDate} - ${exp.endDate}`), 10, { color: rgb(0.3, 0.3, 0.3) });
    addText(toASCII(exp.summary), 11);
    y -= 6;
  });

  // Education
  addSectionHeader("Education");
  resumeData.education.forEach(edu => {
    addText(toASCII(edu.university), 12, { font: fontBold });
    addText(toASCII(`${edu.degree} | ${edu.date}`), 11);
    y -= 6;
  });

  // Skills
  addSectionHeader("Skills");
  resumeData.skills.forEach(category => {
    const title = toASCII(category.category.replace(/_/g, " "));
    const items = Array.isArray(category.skills)
      ? toASCII(category.skills.join(", "))
      : "";
    addText(`${title}: ${items}`, 11);
  });

  // Languages
  addSectionHeader("Languages");
  resumeData.languages.forEach(lang => {
    addText(toASCII(`${lang.name}: ${lang.level}`), 11);
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Ahmad_Jamil_Resume.pdf";
  link.click();
}
