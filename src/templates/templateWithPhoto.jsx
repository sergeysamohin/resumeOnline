// src/templates/templateWithPhoto.jsx
export const templateWithPhoto = {
    id: 'withPhoto',
    name: 'Профессиональный (с фото)',
    hasPhoto: true, // Флаг что шаблон поддерживает фото
    component: ({ data }) => (
        <div className="resume-template-with-photo">
            <div className="resume-header">
                {data.photo && (
                    <div className="photo-wrapper">
                        <img
                            src={data.photo}
                            alt="Фото кандидата"
                            className="profile-photo"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <div className="personal-info">
                    <h1 className="name">{data.name}</h1>

                    <div className="contacts">
                        {data.email && <div className="contact-item">
                            <span className="contact-icon">✉️</span>
                            <span className="contact-value">{data.email}</span>
                        </div>}

                        {data.phone && <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span className="contact-value">{data.phone}</span>
                        </div>}

                        {data.address && <div className="contact-item">
                            <span className="contact-icon">🏠</span>
                            <span className="contact-value">{data.address}</span>
                        </div>}
                    </div>
                </div>
            </div>

            <div className="resume-sections">
                {data.education.length > 0 && (
                    <section className="education-section">
                        <h2 className="section-title">
                            <span className="title-icon">🎓</span> Образование
                        </h2>
                        <ul className="education-list">
                            {data.education.filter(item => item.trim()).map((item, index) => (
                                <li key={index} className="education-item">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section className="experience-section">
                        <h2 className="section-title">
                            <span className="title-icon">💼</span> Опыт работы
                        </h2>
                        <ul className="experience-list">
                            {data.experience.filter(item => item.trim()).map((item, index) => (
                                <li key={index} className="experience-item">{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {data.skills.filter(s => s.trim()).length > 0 && (
                    <section className="skills-section">
                        <h2 className="section-title">
                            <span className="title-icon">🛠️</span> Навыки
                        </h2>
                        <div className="skills-container">
                            {data.skills.filter(item => item.trim()).map((item, index) => (
                                <span key={index} className="skill-tag">{item}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    ),
    thumbnail: () => (
        <div className="thumbnail-template">
            <div className="thumbnail-photo-indicator"></div>
            <div className="thumbnail-content">
                <div className="thumbnail-line"></div>
                <div className="thumbnail-line"></div>
            </div>
        </div>
    )
};