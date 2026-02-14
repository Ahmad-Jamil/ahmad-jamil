import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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
    const rawLines = text.split(/\r?\n/);
    const lines = [];

    rawLines.forEach(rawLine => {
      const words = rawLine.split(' ');
      let currentLine = '';
      words.forEach(word => {
        const testLine = currentLine ? currentLine + ' ' + word : word;
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

    y -= lineHeight / 2; // spacing after paragraph
  };

  // Add section header with spacing before & after
  const addSectionHeader = (text) => {
    y -= 12; // space BEFORE section
    addText(text, 14, { font: fontBold, color: rgb(0, 0, 0) });
    y -= 6; // space AFTER section title
  };

  // ----- PDF Content -----

  // Name
  addText('Ahmad Jamil', 20, { font: fontBold });

  // Contact info
  addText(
    `Phone: ${resumeData.phonePrefix} ${resumeData.mobileNumber} | Email: ${resumeData.email} | Location: ${resumeData.city}, ${resumeData.country}`,
    10,
    { color: rgb(0.2, 0.2, 0.2) }
  );

  // Profile
  addSectionHeader('Profile');
  addText(resumeData.aboutMe, 11);

  // Work Experience
  addSectionHeader('Work Experience');
  resumeData.experiences.forEach(exp => {
    addText(`${exp.jobTitle}, ${exp.companyName}`, 12, { font: fontBold });
    addText(`${exp.startDate} - ${exp.endDate}`, 10, { color: rgb(0.3, 0.3, 0.3) });
    addText(exp.summary, 11);
    y -= 6; // small gap between jobs
  });

  // Education
  addSectionHeader('Education');
  resumeData.education.forEach(edu => {
    addText(edu.university, 12, { font: fontBold });
    addText(`${edu.degree} | ${edu.date}`, 11);
    y -= 6;
  });

  // Skills
  addSectionHeader('Skills');
  resumeData.skills.forEach(category => {
    const key = Object.keys(category)[0];
    addText(`${key.replace(/_/g, ' ')}: ${category[key].join(', ')}`, 11);
  });

  // Languages
  addSectionHeader('Languages');
  resumeData.languages.forEach(lang => {
    addText(`${lang.name}: ${lang.level}`, 11);
  });

  // ----- Save PDF -----
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Ahmad_Jamil_Resume.pdf';
  link.click();
}
