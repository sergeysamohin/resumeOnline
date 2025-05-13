export const template1 = {
    id: 1,
    name: 'Классический',
    component: ({ data }) => (
        <div className="resume-template-1">
            <h1>{data.name}</h1>
            <div className="contact-info">
                <p>Email: {data.email}</p>
                <p>Телефон: {data.phone}</p>
                <p>Адрес: {data.address}</p>
            </div>

            <h2>Образование</h2>
            <ul>
                {data.education.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h2>Опыт работы</h2>
            <ul>
                {data.experience.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h2>Навыки</h2>
            <ul>
                {data.skills.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    ),
    thumbnail: () => (
        <div className="thumbnail-template-1">
            <div className="thumbnail-header"></div>
            <div className="thumbnail-content">
                <div className="thumbnail-line"></div>
                <div className="thumbnail-line"></div>
                <div className="thumbnail-line"></div>
            </div>
        </div>
    )
};