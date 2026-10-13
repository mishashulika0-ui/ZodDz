import { useState } from "react";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Невірний email"),
    password: z.string().min(6, "Мінімум 6 символів")
});

const ClearErrorPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });

        // 🔥 Очищення помилки конкретного поля
        setErrors((prev) => {
            const copy = { ...prev };
            delete copy[field];
            return copy;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = schema.safeParse(form);
        if (!result.success) {
            const errs: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                errs[issue.path[0] as string] = issue.message;
            });
            setErrors(errs);
            return;
        }

        alert("OK");
    };

    return (
        <div>
            <h2>Clear error on typing</h2>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ClearErrorPage;