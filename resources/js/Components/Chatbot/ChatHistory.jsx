import React from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
    return (
        <>
            {chatHistory.map((message, index) => (
                <div
                    key={index}
                    className={`flex items-start py-2 px-4 rounded-lg cursor-default ${
                        message.type === "user"
                            ? "bg-content2 text-amber-500 mt-8"
                            : "bg-content2 text-content2-foreground mt-4"
                    }`}
                    style={{ userSelect: "none" }}
                >
                    {message.type === "user" && (
                        <span className="mr-2 font-bold"></span>
                    )}

                    <div>
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatHistory;
