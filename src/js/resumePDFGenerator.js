import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generateResumePDF(resumeData) {
    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let currentY = margin;
    const contentWidth = pageWidth - 2 * margin;

    const lineHeight = 6;

    const addText = (text, fontSize = 10, style = '') => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        const lines = doc.splitTextToSize(text, contentWidth);

        // Simple page break if needed
        if (currentY + lines.length * lineHeight > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
        }

        doc.text(lines, margin, currentY);
        currentY += lines.length * lineHeight + 2;
    };

    const addSectionHeader = (title) => {
        const headerSize = 14;
        doc.setFontSize(headerSize);
        doc.setFont('helvetica', 'bold');

        if (currentY + headerSize + lineHeight > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
        }

        doc.text(title, margin, currentY);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
        currentY += lineHeight + 2;
    };

    // Header: Name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const fullName = `${resumeData.firstName || 'Ahmad'} ${resumeData.lastName || 'Jamil'}`;
    doc.text(fullName, margin, currentY);
    currentY += 10;

    // Contact info
    doc.setFontSize(10);
    doc.setFont('helvetica', '');
    addText(`Phone: ${resumeData.phonePrefix} ${resumeData.mobileNumber} | Email: ${resumeData.email} | Location: ${resumeData.city}, ${resumeData.country}`);

    // About Me
    addSectionHeader('Profile');
    addText(resumeData.aboutMe, 10);

    // Work Experience
    addSectionHeader('Work Experience');
    resumeData.experiences.forEach(exp => {
        // Check if next block fits in page
        const estimatedHeight = lineHeight * (3 + Math.ceil(exp.summary.length / 90));
        if (currentY + estimatedHeight > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.jobTitle}, ${exp.companyName}`, margin, currentY);
        currentY += lineHeight;

        doc.setFontSize(10);
        doc.setFont('helvetica', '');
        doc.text(`${exp.startDate} - ${exp.endDate}`, margin, currentY);
        currentY += lineHeight;

        addText(exp.summary, 10);
        currentY += 2;
    });

    // Education
    addSectionHeader('Education');
    resumeData.education.forEach(edu => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.university, margin, currentY);
        currentY += lineHeight;

        doc.setFontSize(10);
        doc.setFont('helvetica', '');
        addText(`${edu.degree} | ${edu.date}`);
        currentY += 2;
    });

    // Skills
    addSectionHeader('Skills');
    resumeData.skills.forEach(category => {
        const catName = Object.keys(category)[0].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        doc.setFont('helvetica', 'bold');
        addText(catName + ':');

        doc.setFont('helvetica', '');
        addText(category[Object.keys(category)[0]].join(', '));
        currentY += 2;
    });

    // Languages
    addSectionHeader('Languages');
    resumeData.languages.forEach(lang => {
        addText(`${lang.name}: ${lang.level}`);
    });

    doc.save(`${fullName.replace(' ', '_')}_CV.pdf`);
}

export default function createResumePDF(resumeData) {
    generateResumePDF(resumeData);
}