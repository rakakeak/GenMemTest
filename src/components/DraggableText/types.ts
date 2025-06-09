export interface DraggableTextProps {
  id: string;
  text: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  scale: number;
  rotation: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdateTransform: (id: string, scale: number, rotation: number) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  opacity: number;
}
