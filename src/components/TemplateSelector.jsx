const TemplateSelector = ({ templates, selectedTemplate, onSelect }) => {
    return (
        <div className="template-selector">
            <h2>Выберите шаблон</h2>
            <div className="templates-grid">
                {templates.map((template, index) => (
                    <div
                        key={index}
                        className={`template-thumbnail ${selectedTemplate.id === template.id ? 'selected' : ''}`}
                        onClick={() => onSelect(template)}
                    >
                        <template.thumbnail />
                        <p>{template.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;