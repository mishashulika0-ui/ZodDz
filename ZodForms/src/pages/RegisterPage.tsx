import { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Мінімум 2 символи"),
    email: z.string().email("Невірний email"),
    password: z.string().min(6, "Мінімум 6 символів")
});

const RegisterPage = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = registerSchema.safeParse(form);

        if (!result.success) {
            const errs: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                errs[issue.path[0] as string] = issue.message;
            });
            setErrors(errs);
            return;
        }

        setErrors({});
        alert("Зареєстровано!");
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                <div>
                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;