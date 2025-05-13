const ResumePreview = ({ formData, template }) => {
    const TemplateComponent = template.component;

    return (
        <div className="resume-preview">

            <div className="preview-container">
                <TemplateComponent data={formData} />
            </div>
        </div>
    );
};

export default ResumePreview;