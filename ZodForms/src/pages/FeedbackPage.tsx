import { useState } from "react";
import { z } from "zod";

const feedbackSchema = z.object({
    rating: z.coerce.number().min(1, "Мінімум 1").max(5, "Максимум 5"),
    comment: z
        .string()
        .min(5, "Коментар має містити мінімум 5 символів")
        .optional()
        .or(z.literal(""))
});

const FeedbackPage = () => {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");

        const result = feedbackSchema.safeParse({ rating, comment });

        if (!result.success) {
            const errs: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                errs[issue.path[0] as string] = issue.message;
            });
            setErrors(errs);
            return;
        }

        setErrors({});
        setSuccess("Дякуємо за оцінку!");
    };

    return (
        <div>
            <h2>Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Rating (1-5)"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
                </div>

                <div>
                    <textarea
                        placeholder="Коментар (необов'язковий)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {errors.comment && <p style={{ color: "red" }}>{errors.comment}</p>}
                </div>

                <button type="submit">Send</button>
            </form>

            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};

export default FeedbackPage;