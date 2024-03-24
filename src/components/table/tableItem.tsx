import React from "react";
import { ChessEvent } from "../../models/chessEvent";
import Image from "next/image";
import { MdOutlineModeEdit, MdAccessTime, MdLocationPin } from "react-icons/md";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import BottomSheet from "../ui/custom/bottomSheet";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { dateToDayOfTheWeek } from "../../utils/dateUtils";

interface TableItemProps {
  event: ChessEvent;
  onEdit?: (event: ChessEvent) => void;
  onRegister?: (event: ChessEvent) => void;
  isRegistered?: boolean;
  isAdmin?: boolean;
  show?: boolean;
}

const TableItem: React.FC<TableItemProps> = ({
  event,
  onEdit,
  onRegister,
  isRegistered,
  isAdmin,
  show,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      const path = "/" + pathname.split("/")[1];
      router.push(path);
    } else {
      router.push(`${pathname}/${event.id}`);
    }
  };

  const iconsBaseClass = "w-6 h-6 sm:w-10 sm:h-10 cursor-pointer";
  const AdminButtons: React.FC = () => {
    return (
      <div className="flex gap-1 items-center">
        <MdOutlineModeEdit
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(event);
          }}
          className={iconsBaseClass}
        />
      </div>
    );
  };

  const UserButtons: React.FC = () => {
    return isRegistered ? (
      <IoIosCheckmarkCircle
        onClick={(e) => {
          e.stopPropagation();
          onRegister?.(event);
        }}
        className={`text-green-500 ${iconsBaseClass} !w-7 !h-7`}
      />
    ) : (
      <IoIosCheckmarkCircleOutline
        className={`${iconsBaseClass} !w-7 !h-7`}
        onClick={(e) => {
          e.stopPropagation();
          onRegister?.(event);
        }}
      />
    );
  };

  const ChessEventContent = () => {
    return (
      <div className="flex flex-col mt-8 gap-2">
        <div className="w-full flex flex-row gap-4 items-center">
          <MdAccessTime className="w-5 h-5 mr-0.5" />
          <div>
            {dateToDayOfTheWeek(event.date)}, {event.date} • {event.time}
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 items-center">
          <MdLocationPin className="w-6 h-6" />
          <div>{event.location}</div>
        </div>
        <div className="text-muted-foreground mt-4">{event.description}</div>
        <div className="absolute top-4 left-4">
          <Image
            src={event.image ?? ""}
            alt={event.name}
            fill
            className="rounded-lg !relative !w-16 !h-16 "
          />
        </div>
      </div>
    );
  };

  const SheetBottomContent = () => (
    <div className="px-4 bg-muted text-foreground absolute w-full h-12 right-0 bottom-0 flex flex-row items-center gap-2 ">
      <div className="text-foreground">מגיע?</div>
      <Button
        onClick={() => {
          onRegister?.(event);
        }}
        variant={isRegistered ? "default" : "outline"}
        className="rounded-full"
      >
        כן
      </Button>
      <Button
        onClick={() => {
          onRegister?.(event);
        }}
        variant={isRegistered ? "outline" : "default"}
        className="rounded-full"
      >
        לא
      </Button>
    </div>
  );

  return (
    <BottomSheet
      title={event.name}
      content={<ChessEventContent />}
      bottomContent={<SheetBottomContent />}
      open={show}
      key={`chess-event-in-table-${event.id}`}
      onOpenChange={handleOpenChange}
    >
      <div className="grid grid-cols-table gap-1 items-center w-full h-fit relative">
        <Image
          src={event.image ?? ""}
          alt={event.name}
          fill
          className="rounded-lg !relative !w-16 !h-16 "
        />
        <div>
          <div>{event.name}</div>
          <div>{event.date}</div>
        </div>
        <div className="flex flex-row gap-1">
          {isAdmin && <AdminButtons />}
          <UserButtons />
        </div>
      </div>
    </BottomSheet>
  );
};

export default TableItem;
