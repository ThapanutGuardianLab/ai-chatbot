"use client";

import { SendButton, StopButton } from "@/components/multimodal-input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { Bot, Database, Loader, LucideRocket, UserRound } from "lucide-react";

import { toast } from "sonner";
export default function Page() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
  } = useChat({
    api: "faq/api/chat",
    maxSteps: 2,
  });

  const Loader = () => {
    return (
      <span className="flex space-x-1 items-center justify-center">
        <span className="w-2 h-2 bg-white rounded-full animate-dot-bounce [animation-delay:0s]"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-dot-bounce [animation-delay:0.1s]"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-dot-bounce [animation-delay:0.2s]"></span>
      </span>
    );
  };

  const ActionButton = () => {
    return (
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        {status === "submitted" ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          // eslint-disable-next-line react/jsx-no-undef
          <SendButton
            input={input}
            submitForm={handleSubmit}
            uploadQueue={[]}
          />
        )}
      </div>
    );
  };

  const ActionIcon = ({
    action,
  }: {
    action: "user" | "assistant" | "system" | "data";
  }) => {
    return (
      <Card className="!border-0">
        {action === "user" && <UserRound size={24} />}
        {action === "assistant" && <Bot size={24} />}
        {action === "system" && <LucideRocket size={24} />}
        {action === "data" && <Database size={24} />}
      </Card>
    );
  };
  const MessageContent = () => {
    return (
      <div className="space-y-4 overflow-y-scroll max-h-[calc(100%-110px)]">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div
              className={`flex items-center gap-2 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role !== "user" && <ActionIcon action={m.role} />}
              <div className={`rounded-2xl p-2 max-w-fit bg-slate-600`}>
                <p>
                  {m.content.length > 0 ? (
                    m.content
                  ) : (
                    <span className="flex items-center gap-2">
                      <Loader />
                      <span className="italic font-light">
                        {"calling tool: " + m?.toolInvocations?.[0].toolName}
                      </span>
                    </span>
                  )}
                </p>
              </div>
              {m.role === "user" && <ActionIcon action={m.role} />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-2xl pt-8 mx-auto h-screen relative">
      <MessageContent />
      <div className="fixed bottom-0 w-full max-w-2xl">
        <div className="relative">
          <Textarea
            data-testid="multimodal-input"
            placeholder="Send a message..."
            value={input}
            onChange={handleInputChange}
            className="min-h-[24px] max-h-[98px] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 mb-2 dark:border-zinc-700"
            rows={2}
            autoFocus
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();

                if (status !== "ready") {
                  toast.error(
                    "Please wait for the model to finish its response!"
                  );
                } else {
                  handleSubmit();
                }
              }
            }}
          />
          <ActionButton />
        </div>
      </div>
    </div>
  );
}
