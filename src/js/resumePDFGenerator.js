import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generateResumePDF(resumeData) {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Set margins
    const margin = 10;
    let currentY = margin;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (2 * margin);

    // Helper function to add text with auto page break
    const addText = (text, fontSize, style = '', maxWidth = contentWidth) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        
        const lines = doc.splitTextToSize(text, maxWidth);
        
        // Check if we need a new page
        if (currentY + (lines.length * fontSize * 0.352778) > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
        }
        
        doc.text(lines, margin, currentY);
        currentY += lines.length * fontSize * 0.352778 + 2; // Line height calculation
        return currentY;
    };

    // Helper function to add section header
    const addSectionHeader = (text) => {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        
        // Check for new page
        if (currentY + 10 > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
        }
        
        doc.text(text, margin, currentY);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
        currentY += 8;
        doc.setTextColor(0, 0, 0);
    };

    // Header (Name)
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const fullName = "Ahmad Jamil"; // You can modify this or extract from the JSON
    doc.text(fullName, margin, currentY);
    currentY += 10;

    // Contact Info
    doc.setFontSize(10);
    doc.setFont('helvetica', '');
    const contactInfo = `Phone: ${resumeData.phonePrefix} ${resumeData.mobileNumber} | Email: ${resumeData.email} | Location: ${resumeData.city}, ${resumeData.country}`;
    doc.text(contactInfo, margin, currentY);
    currentY += 8;

    // Profile / About Me
    addSectionHeader('Profile');
    addText(resumeData.aboutMe, 10);
    currentY += 8

    // Work Experience
    addSectionHeader('Work Experience');
    resumeData.experiences.forEach(exp => {
        // Job Title and Company
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.jobTitle}, ${exp.companyName}`, margin, currentY);
        currentY += 6;

        // Date
        doc.setFontSize(10);
        doc.setFont('helvetica', '');
        doc.text(`${exp.startDate} - ${exp.endDate}`, margin, currentY);
        currentY += 6;

        // Summary
        addText(exp.summary, 10);
        currentY += 6;
    });

    // Education
    addSectionHeader('Education');
    resumeData.education.forEach(edu => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(edu.university, margin, currentY);
        currentY += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', '');
        doc.text(`${edu.degree} | ${edu.date}`, margin, currentY);
        currentY += 8;
    });

    // Skills
    addSectionHeader('Skills');
    const skillCategories = [
        { name: 'Programming Languages', skills: resumeData.skills[0].programming_languages },
        { name: 'Frameworks', skills: resumeData.skills[1].frameworks },
        { name: 'Technologies', skills: resumeData.skills[2].technologies },
        { name: 'Technical Skills', skills: resumeData.skills[3].technical_skills }
    ];

    skillCategories.forEach(category => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(category.name + ':', margin, currentY);
        currentY += 6;

        doc.setFont('helvetica', '');
        doc.text(category.skills.join(', '), margin, currentY);
        currentY += 8;
    });

    // Languages
    addSectionHeader('Languages');
    resumeData.languages.forEach(lang => {
        doc.setFontSize(10);
        doc.text(`${lang.name}: ${lang.level}`, margin, currentY);
        currentY += 6;
    });

    // Save the PDF
    doc.save('resume.pdf');
}

// Usage example
export default function createResumePDF(resumeData) {
    generateResumePDF(resumeData);
}