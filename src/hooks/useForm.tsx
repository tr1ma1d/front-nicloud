import { useState } from "react";

export const useForm = (initialState: Record<string, string>) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const resetForm = () => setFormData(initialState);
    return { formData, handleChange, resetForm };
}