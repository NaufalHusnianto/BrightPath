import Footer from "@/Components/Footer";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export default function Quizzes({ auth, appUrl }) {
    const [code, setCode] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [isQuizLoaded, setIsQuizLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleJoin = async () => {
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("/quiz/enroll", { code });

            if (response.data.success === true) {
                setQuiz(response.data.quiz);
                setIsQuizLoaded(true);
            } else {
                setError(response.data.message);
            }

            setCode("");
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswer = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const submitQuiz = async () => {
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("/quiz/submit", {
                quiz_id: quiz.id,
                student_id: auth.user.id,
                answers,
            });
            console.log("Response:", response);

            if (response.data) {
                setAnswers({});
                setQuiz({});
                setIsQuizLoaded(false);
                router.visit("/quiz/history");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Error submitting quiz.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Authenticated appUrl={appUrl}>
            <Head title="Quizzes" />

            <div className="flex items-center flex-col min-h-screen mt-16">
                {!isQuizLoaded && (
                    <>
                        <h1 className="text-5xl font-bold mb-4">
                            Join a <span className="text-amber-500">Quiz</span>
                        </h1>

                        <div className="flex items-center gap-2">
                            <TextInput
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Masukkan kode quiz"
                                required
                            />
                            <Button
                                className="font-bold"
                                onClick={handleJoin}
                                color="warning"
                            >
                                {isLoading ? "Memulai..." : "Mulai Quiz"}
                            </Button>
                        </div>

                        <Button
                            as={Link}
                            href={route("quiz.history")}
                            className="mt-6"
                            color="default"
                            variant="ghost"
                        >
                            Riwayat BrightQuiz
                        </Button>
                    </>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {isQuizLoaded && (
                    <div className="w-full max-w-3xl px-4">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold">{quiz.title}</h2>
                            <p>Teacher: {quiz.teacher.name}</p>
                        </div>
                        <div className="space-y-6 flex flex-col items-center">
                            {quiz.quiz_items &&
                                quiz.quiz_items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border border-foreground-200 p-4 rounded-lg shadow w-full"
                                    >
                                        <h3
                                            className="text-lg font-semibold"
                                            dangerouslySetInnerHTML={{
                                                __html: item.question,
                                            }}
                                        ></h3>
                                        <ul className="mt-2 space-y-2">
                                            {Object.entries(item.choices).map(
                                                ([key, value]) => (
                                                    <div key={key}>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name={`question-${item.id}`}
                                                                value={key}
                                                                onChange={(e) =>
                                                                    handleAnswer(
                                                                        item.id,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="mr-2"
                                                            />
                                                            <strong>
                                                                {key}.
                                                            </strong>{" "}
                                                            {value}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            <Button
                                variant="solid"
                                className="bg-amber-500 font-bold mb-8"
                                onClick={submitQuiz}
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </Authenticated>
    );
}
