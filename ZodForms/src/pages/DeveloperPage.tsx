import { useState } from "react";
import { z } from "zod";

const developerSchema = z.object({
    name: z.string().min(2, "Мінімум 2 символи"),
    age: z.coerce.number().min(18, "Мінімум 18").max(65, "Максимум 65"),
    language: z.enum(["JavaScript", "TypeScript", "C#", "Python"], {
        message: "Оберіть мову зі списку"
    })
});

const DeveloperPage = () => {
    const [form, setForm] = useState({ name: "", age: "", language: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = developerSchema.safeParse(form);

        if (!result.success) {
            const errs: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                errs[issue.path[0] as string] = issue.message;
            });
            setErrors(errs);
            return;
        }

        setErrors({});
        alert("Профіль збережено: " + result.data.name);
    };

    return (
        <div>
            <h2>Developer Profile</h2>
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
                        placeholder="Age"
                        value={form.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                    />
                    {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
                </div>

                <div>
                    <select
                        value={form.language}
                        onChange={(e) => handleChange("language", e.target.value)}
                    >
                        <option value="">Оберіть мову</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="C#">C#</option>
                        <option value="Python">Python</option>
                    </select>
                    {errors.language && <p style={{ color: "red" }}>{errors.language}</p>}
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default DeveloperPage;