import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function QuizHistory({ quizzes }) {
    console.log(quizzes);

    return (
        <Authenticated>
            <Head title="Quiz History" />

            <div className="container mx-auto p-12">
                <h1 className="text-2xl font-bold mb-4">Quiz History</h1>
                {quizzes.length > 0 ? (
                    <table className="w-full border-collapse border border-foreground-200">
                        <thead>
                            <tr className="bg-content2 text-content2-foreground">
                                <th className="border border-foreground-200 px-4 py-2">
                                    No
                                </th>
                                <th className="border border-foreground-200 px-4 py-2">
                                    Quiz Title
                                </th>
                                <th className="border border-foreground-200 px-4 py-2">
                                    Score
                                </th>
                                <th className="border border-foreground-200 px-4 py-2">
                                    Submitted At
                                </th>
                                <th className="border border-foreground-200 px-4 py-2">
                                    Owner Quiz
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz, index) => (
                                <tr key={quiz.id} className="hover:bg-content1">
                                    <td className="border border-foreground-200 px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border border-foreground-200 px-4 py-2">
                                        {quiz.quiz.title}
                                    </td>
                                    <td className="border border-foreground-200 px-4 py-2 text-center">
                                        {quiz.score}%
                                    </td>
                                    <td className="border border-foreground-200 px-4 py-2 text-center">
                                        {quiz.submitted_at}
                                    </td>
                                    <td className="border border-foreground-200 px-4 py-2 text-center">
                                        {quiz.quiz.teacher.name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No quiz history found.</p>
                )}
            </div>
        </Authenticated>
    );
}
