import { useState, useRef } from 'react';

const ResumeForm = ({
    templates,
    selectedTemplate,
    onTemplateChange,
    formData,
    onFormChange
}) => {
    const fileInputRef = useRef(null);
    const phoneRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // Проверяем, поддерживает ли текущий шаблон фото
    const supportsPhoto = selectedTemplate?.hasPhoto || false;

    // Обработчик загрузки фото
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                onFormChange({
                    ...formData,
                    photo: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Обработчик изменения шаблона
    const handleTemplateChange = (templateId) => {
        const newTemplate = templates.find(t => t.id === templateId);
        onTemplateChange(newTemplate);

        // Сбрасываем фото если новый шаблон не поддерживает его
        if (!newTemplate.hasPhoto) {
            setPhotoPreview(null);
            onFormChange({
                ...formData,
                photo: null
            });
        }
    };

    // Обработчик для телефона с маской
    const handlePhoneChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        let formattedValue = '+375 (';

        if (input.length > 3) {
            formattedValue += input.slice(3, 5) + ') ';
            if (input.length > 5) {
                formattedValue += input.slice(5, 8) + '-';
                if (input.length > 8) {
                    formattedValue += input.slice(8, 10) + '-';
                    if (input.length > 10) {
                        formattedValue += input.slice(10, 12);
                    }
                }
            }
        }

        onFormChange({
            ...formData,
            phone: formattedValue
        });
    };

    // Обработчик для остальных полей
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormChange({
            ...formData,
            [name]: value
        });
    };

    // Обработчик для динамических полей
    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        onFormChange({
            ...formData,
            [field]: newArray
        });
    };

    const addItem = (field) => {
        onFormChange({
            ...formData,
            [field]: [...formData[field], '']
        });
    };

    const removeItem = (field, index) => {
        onFormChange({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };

    return (
        <div className="resume-form">
            <h2>Личная информация</h2>

            {/* Поле для фото (только для шаблонов с фото) */}
            {supportsPhoto && (
                <div className="form-group photo-upload-group">
                    <label>Фотография</label>
                    <div className="photo-upload-container">
                        {photoPreview ? (
                            <div className="photo-preview-wrapper">
                                <img src={photoPreview} alt="Preview" className="photo-preview" />
                                <button
                                    type="button"
                                    className="remove-photo-btn"
                                    onClick={() => {
                                        setPhotoPreview(null);
                                        onFormChange({ ...formData, photo: null });
                                    }}
                                >
                                    Удалить фото
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="upload-photo-btn"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Выберите фото
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <div className="photo-hint">Рекомендуемый размер: 300x300 px</div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="form-group">
                <label>ФИО*</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иванов Иван Иванович"
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                />
            </div>

            <div className="form-group">
                <label>Телефон*</label>
                <input
                    ref={phoneRef}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+375 (XX) XXX-XX-XX"
                    required
                />
            </div>

            <div className="form-group">
                <label>Адрес</label>
                <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Город, улица, дом"
                />
            </div>

            <h2>Образование*</h2>
            {formData.education.map((item, index) => (
                <div className="form-group array-group" key={`edu-${index}`}>
                    <input
                        value={item}
                        onChange={(e) => handleArrayChange('education', index, e.target.value)}
                        placeholder={`Учебное заведение #${index + 1}`}
                        required
                    />
                    {formData.education.length > 1 && (
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeItem('education', index)}
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={() => addItem('education')}
                className="add-btn"
            >
                + Добавить образование
            </button>

            <h2>Опыт работы*</h2>
            {formData.experience.map((item, index) => (
                <div className="form-group array-group" key={`exp-${index}`}>
                    <input
                        value={item}
                        onChange={(e) => handleArrayChange('experience', index, e.target.value)}
                        placeholder={`Место работы #${index + 1}`}
                        minLength="3"
                        required
                    />
                    {formData.experience.length > 1 && (
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeItem('experience', index)}
                            aria-label="Удалить"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => addItem('experience')} className="add-btn">
                + Добавить место работы
            </button>

            <h2>Навыки* (минимум 3)</h2>
            {formData.skills.map((item, index) => (
                <div className="form-group array-group" key={`skill-${index}`}>
                    <input
                        value={item}
                        onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                        placeholder={`Навык #${index + 1}`}
                        pattern="[a-zA-Zа-яА-Я0-9\s\-,/]+"
                        title="Только буквы, цифры и знаки ,/-"
                        minLength="2"
                        required
                    />
                    {formData.skills.length > 3 && (
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeItem('skills', index)}
                            aria-label="Удалить"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => addItem('skills')} className="add-btn">
                + Добавить навык
            </button>

        </div >
    );
};

export default ResumeForm;