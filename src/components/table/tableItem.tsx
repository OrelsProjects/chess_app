import React from "react";
import { ChessEvent } from "../../models/chessEvent";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectAuth } from "../../lib/features/auth/authSlice";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface TableItemProps {
  event: ChessEvent;
  onDelete?: (event: ChessEvent) => void;
  onEdit?: (event: ChessEvent) => void;
}

const TableItem: React.FC<TableItemProps> = ({ event, onDelete, onEdit }) => {
  const { isAdmin } = useSelector(selectAuth);

  const AdminButtons: React.FC = () => {
    return (
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => {
            onEdit?.(event);
          }}
        >
          ערוך
        </Button>
        <Button
          onClick={() => {
            onDelete?.(event);
          }}
        >
          מחק
        </Button>
      </div>
    );
  };

  const UserButtons: React.FC = () => {
    return <Button>הירשם</Button>;
  };
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={event.image ?? ""}
        alt={event.name}
        fill
        className="rounded-lg !relative !w-14 !h-20"
      />
      <div>
        <div>{event.name}</div>
        <div>{event.date}</div>
      </div>
      {isAdmin ? <AdminButtons /> : <UserButtons />}
    </div>
  );
};

export default TableItem;
