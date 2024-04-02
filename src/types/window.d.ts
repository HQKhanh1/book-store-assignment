export {};

declare global {
  interface Window {
    aiChatbotConfig:
      | {
          token: string;
          baseUrl: string;
        }
      | {
          baseUrl: string;
          bots: { token: string; name: string }[];
        };
    removeEmbedChatbot: () => void;
    embedChatbot: () => void;
    isChatbotInstalled: () => boolean;
  }
}
