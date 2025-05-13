import * as yup from 'yup';

export const resumeSchema = yup.object().shape({
    name: yup.string()
        .required('Обязательное поле')
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 50 символов'),
    email: yup.string()
        .required('Обязательное поле')
        .email('Некорректный email'),
    phone: yup.string()
        .required('Обязательное поле')
        .matches(/^\+?[0-9\s\-\(\)]+$/, 'Некорректный номер телефона'),
    address: yup.string()
        .required('Обязательное поле')
        .min(5, 'Минимум 5 символов'),
    education: yup.array()
        .of(yup.string().required('Обязательное поле').min(5, 'Минимум 5 символов'))
        .min(1, 'Добавьте хотя бы одно образование'),
    experience: yup.array()
        .of(yup.string().required('Обязательное поле').min(5, 'Минимум 5 символов'))
        .min(1, 'Добавьте хотя бы один опыт работы'),
    skills: yup.array()
        .of(yup.string().required('Обязательное поле').min(2, 'Минимум 2 символа'))
        .min(3, 'Добавьте хотя бы 3 навыка'),
});