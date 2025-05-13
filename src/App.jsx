import { useState, useRef } from 'react';
import { template1 } from './templates/template1';
import { template2 } from './templates/template2';
import { templateWithPhoto } from './templates/templateWithPhoto';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import DownloadButton from './components/DownloadButton';
import './App.css';

function App() {
  const templates = [
    template1, // Без фото
    template2, // Без фото
    templateWithPhoto // С фото
  ];


  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const showPhotoField = selectedTemplate.hasPhoto || false;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: [''],
    experience: [''],
    skills: ['', '', ''],
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const previewRef = useRef();

  const handleFormChange = (newData) => {
    setFormData(newData);

    const requiredFieldsFilled =
      newData.name.trim() &&
      newData.email.trim() &&
      newData.phone.trim() &&
      newData.address.trim() &&
      newData.education.filter(e => e.trim()).length > 0 &&
      newData.experience.filter(e => e.trim()).length > 0 &&
      newData.skills.filter(s => s.trim()).length >= 3;


    setIsFormValid(requiredFieldsFilled);
  };

  return (
    <div className="app">
      <h1>Генератор резюме</h1>

      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelect={setSelectedTemplate}
      />

      <div className="resume-builder">
        <ResumeForm
          templates={templates}
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          formData={formData}
          onFormChange={handleFormChange}
          showPhotoField={showPhotoField}
        />
        <div ref={previewRef}>
          <ResumePreview formData={formData}
            template={selectedTemplate} />
        </div>
      </div>

      {isFormValid ? (
        <DownloadButton previewRef={previewRef} />
      ) : (
        <div className="validation-message">
          Заполните все обязательные поля для генерации резюме
        </div>
      )}
    </div>
  );
}

export default App;