export interface DraggedItem {
  index: number;
}

export interface DropCollectedProps {
  handlerId: string | symbol | null;
}

export interface DragCollectedProps {
  isDragging: boolean;
}
