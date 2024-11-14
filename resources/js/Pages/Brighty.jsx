import ChatHistory from "@/Components/Chatbot/ChatHistory";
import Loading from "@/Components/Chatbot/Loading";
import Footer from "@/Components/Footer";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Head } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Brighty(geminiAIKey) {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const genAI = new GoogleGenerativeAI(geminiAIKey.geminiAIKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        setIsLoading(true);
        try {
            const result = await model.generateContent(userInput);
            const response = await result.response;
            console.log(response);
            setChatHistory([
                ...chatHistory,
                { type: "user", message: userInput },
                { type: "bot", message: response.text() },
            ]);
        } catch {
            console.error("Error sending message");
        } finally {
            setUserInput("");
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setChatHistory([]);
    };

    return (
        <Authenticated>
            <Head title="Brighty" />

            <div className="flex min-h-screen flex-col items-center py-20">
                <h1 className="text-4xl font-bold">
                    Ask <span className="text-amber-500">Brighty</span>
                </h1>
                <p className="text-foreground-400">powered by geminiAI</p>

                {!chatHistory.length == 0 && (
                    <div className="w-3/4 rounded-lg bg-content1 p-4 mt-4">
                        <ChatHistory chatHistory={chatHistory} />
                    </div>
                )}
                <Loading isLoading={isLoading} />

                <div className="flex items-center w-3/4 mt-4 gap-3">
                    <input
                        type="text"
                        placeholder="ask brighty ..."
                        className="w-full rounded-xl bg-content2 px-4 py-4 text-foreground border-none"
                        value={userInput}
                        onChange={handleUserInput}
                    />
                    <Button
                        variant="shadow"
                        className="bg-amber-500 font-bold"
                        onClick={sendMessage}
                        disabled={isLoading}
                    >
                        Send
                    </Button>
                </div>

                {!chatHistory.length == 0 && (
                    <Button
                        color="danger"
                        className="mt-4"
                        onClick={clearChat}
                        disabled={isLoading}
                    >
                        Clear Chat
                    </Button>
                )}
            </div>

            <Footer />
        </Authenticated>
    );
}
