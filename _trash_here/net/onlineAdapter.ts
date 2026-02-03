export interface OnlineAdapter {
  isOnline(): boolean;
  subscribe?(onChange: (online: boolean) => void): () => void;
}
