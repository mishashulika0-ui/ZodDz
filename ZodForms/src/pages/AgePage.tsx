import { useState } from "react";
import { z } from "zod";

const ageSchema = z.object({
    age: z.coerce
        .number({ message: "Вік має бути числом" })
        .min(18, "Мінімум 18 років")
        .max(65, "Максимум 65 років")
});

const AgePage = () => {
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState<number>();

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const parsed = ageSchema.safeParse({ age });

        if (!parsed.success) {
            setError(parsed.error.issues[0].message);
            setResult(undefined);
            return;
        }

        setError("");
        setResult(parsed.data.age);
    };

    return (
        <div>
            <h2>Age Input (coerce)</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Вік"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">Check</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && <p style={{ color: "green" }}>Вік: {result} (typeof: {typeof result})</p>}
        </div>
    );
};

export default AgePage;