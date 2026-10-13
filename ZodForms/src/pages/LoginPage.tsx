import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Невірний формат email"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів")
});

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [success, setSuccess] = useState("");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            const fieldErrors: { email?: string; password?: string } = {};
            result.error.issues.forEach(err => {
                const field = err.path[0] as "email" | "password";
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            setSuccess("");
            return;
        }

        setErrors({});
        setSuccess("Успішний вхід!");
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>

                <button type="submit">Login</button>
            </form>

            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};

export default LoginPage;