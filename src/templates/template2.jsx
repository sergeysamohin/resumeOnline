export const template2 = {
    id: 2,
    name: 'Современный',
    component: ({ data }) => (
        <div className="resume-template-2">
            <div className="header">
                <h1>{data.name}</h1>
                <div className="contact-info">
                    <p>{data.email} | {data.phone} | {data.address}</p>
                </div>
            </div>

            <div className="columns">
                <div className="left-column">
                    <h2>Образование</h2>
                    {data.education.map((item, index) => (
                        <p key={index}>• {item}</p>
                    ))}

                    <h2>Навыки</h2>
                    {data.skills.map((item, index) => (
                        <p key={index}>• {item}</p>
                    ))}
                </div>

                <div className="right-column">
                    <h2>Опыт работы</h2>
                    {data.experience.map((item, index) => (
                        <p key={index}>• {item}</p>
                    ))}
                </div>
            </div>
        </div>
    ),
    thumbnail: () => (
        <div className="thumbnail-template-2">
            <div className="thumbnail-header"></div>
            <div className="thumbnail-columns">
                <div className="thumbnail-left"></div>
                <div className="thumbnail-right"></div>
            </div>
        </div>
    )
};