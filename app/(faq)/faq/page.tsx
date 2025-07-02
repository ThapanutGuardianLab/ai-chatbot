"use client";

import { SendButton, StopButton } from "@/components/multimodal-input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { Bot, Database, LucideRocket, UserRound } from "lucide-react";
import { toast } from "@/components/toast";
import { useRef, useEffect } from "react";
import { ThinkingMessage } from "@/components/message";
import { motion } from "framer-motion";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
export default function Page() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
  } = useChat({
    api: "faq/api/chat",
    maxSteps: 4,
    onError: (error) => {
      stop();
      toast({
        type: "error",
        description: error.message,
      });
    },
  });

  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
  } = useScrollToBottom();

  const ActionButton = () => {
    return (
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        {status === "submitted" ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
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
      <div
        className="space-y-4 overflow-y-scroll max-h-[calc(100%-110px)] no-scrollbar"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div
              className={`flex items-start gap-2 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role !== "user" && <ActionIcon action={m.role} />}
              {m.content.length > 0 && m.content}
              {m.role === "user" && <ActionIcon action={m.role} />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col w-full max-w-2xl pt-8 mx-auto h-screen relative"
    >
      <MessageContent />

      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}
      <motion.div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />

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
                  toast({
                    type: "error",
                    description:
                      "Please wait for the model to finish its response!",
                  });
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
