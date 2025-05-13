import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const DownloadButton = ({ previewRef }) => {
    const downloadResume = async (format) => {
        const previewElement = previewRef.current;

        try {
            const canvas = await html2canvas(previewElement, {
                scale: 2,
                logging: false,
                useCORS: true,
            });

            if (format === 'png') {
                const link = document.createElement('a');
                link.download = 'resume.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            } else if (format === 'pdf') {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                const imgProps = pdf.getImageProperties(imgData);
                const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('resume.pdf');
            }
        } catch (error) {
            console.error('Error generating resume:', error);
        }
    };

    return (
        <div className="download-buttons">
            <button onClick={() => downloadResume('png')} className="download-button">
                Скачать PNG
            </button>
            <button onClick={() => downloadResume('pdf')} className="download-button">
                Скачать PDF
            </button>
        </div>
    );
};

export default DownloadButton;