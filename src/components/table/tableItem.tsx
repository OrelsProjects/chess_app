/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
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
import useChessEvents from "../../hooks/useChessEvents";
import GameTypeIcon from "../ui/gameTypeIcon";
import AlertDialogPayment from "../ui/custom/alertDialogPayment";
import ReadMoreText from "../ui/read-more";
import {
  ChessEventParticipant,
  ChessEventParticipantData,
} from "../../models/chessEventParticipant";
import toast from "react-hot-toast";

const iconsBaseClass = "w-6 h-6 sm:w-10 sm:h-10 cursor-pointer";

interface TableItemProps {
  event: ChessEvent;
  onEdit: (event: ChessEvent) => void;
  onRegister: (event: ChessEvent) => void;
  isAdmin?: boolean;
  show?: boolean;
}

const SheetBottomContent = ({
  event,
  isRegistered,
  onRegister,
}: {
  event: ChessEvent;
  isRegistered: boolean;
  onRegister: (event: ChessEvent) => void;
}) => {
  const handleOnRegister = () => {
    if (!isRegistered && !event.isPaymentRequired) {
      onRegister(event);
    }
  };

  const YesButton = () => (
    <Button
      onClick={handleOnRegister}
      variant={isRegistered ? "default" : "outline"}
      className="rounded-full"
    >
      כן
    </Button>
  );

  return (
    <div className="px-4 bg-muted text-foreground fixed w-full h-12 right-0 bottom-0 flex flex-row items-center gap-2 ">
      <div className="text-foreground">מגיע?</div>
      {event.isPaymentRequired && !isRegistered ? (
        <AlertDialogPayment onAlreadyPaid={onRegister} event={event}>
          <Button
            variant={isRegistered ? "default" : "outline"}
            className="rounded-full"
          >
            כן
          </Button>
        </AlertDialogPayment>
      ) : (
        <YesButton />
      )}
      <Button
        onClick={() => {
          if (isRegistered) {
            onRegister(event);
          }
        }}
        variant={isRegistered ? "outline" : "default"}
        className="rounded-full"
      >
        לא
      </Button>
    </div>
  );
};

const TableItem: React.FC<TableItemProps> = ({
  event,
  onEdit,
  onRegister,
  isAdmin,
  show,
}) => {
  const { isRegisteredToEvent, getEventParticipants } = useChessEvents();
  const [participants, setParticipants] = useState<ChessEventParticipantData[]>(
    []
  );
  const pathname = usePathname();
  const router = useRouter();

  const handleFetchParticipants = async () => {
    await toast.promise(getEventParticipants(event.id), {
      loading: "טוען משתתפים...",
      success: (data: ChessEventParticipantData[]) => {
        setParticipants(data);
        return "המשתתפים נטענו בהצלחה!";
      },
      error: "שגיאה בטעינת המשתתפים",
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      const path = "/" + pathname.split("/")[1];
      router.push(path);
    } else {
      router.push(`${pathname}/${event.id}`);
    }
  };

  const isRegistered = useMemo(() => isRegisteredToEvent(event), [event]);

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
        className={`text-green-500 w-7 h-7 ${iconsBaseClass} `}
      />
    ) : event.isPaymentRequired ? (
      <AlertDialogPayment onAlreadyPaid={onRegister} event={event}>
        <IoIosCheckmarkCircleOutline className={`w-7 h-7 ${iconsBaseClass}`} />
      </AlertDialogPayment>
    ) : (
      <IoIosCheckmarkCircleOutline
        className={`w-7 h-7 ${iconsBaseClass}`}
        onClick={(e) => {
          e.stopPropagation();
          onRegister(event);
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
        <ReadMoreText
          className="text-muted-foreground text-base mt-4"
          text={event.description}
          maxLines={2}
        />
        <div
          className="cursor-pointer flex flex-col gap-4"
          onClick={handleFetchParticipants}
        >
          <p>משתתפים</p>
          <div className="flex flex-col gap-1">
            {participants.map((participant) => (
              <div
                key={`event-participant-${
                  participant.displayName ?? participant.playerNumber
                }`}
              >
                {participant.firstName + " " + participant.lastName}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BottomSheet
      title={
        <div className="flex flex-row gap-2 justify-start items-center">
          <Image
            src={event.image ?? ""}
            alt={event.name}
            fill
            className="rounded-lg !relative !w-16 !h-16 md:!h-32 md:!w-32"
          />
          <div className="flex flex-col gap-1">
            <div className="text-2xl md:text-4xl">{event.name}</div>
            <GameTypeIcon gameType={event.type} />
          </div>
        </div>
      }
      content={<ChessEventContent />}
      bottomContent={
        <SheetBottomContent
          event={event}
          isRegistered={isRegistered}
          onRegister={onRegister}
        />
      }
      open={show}
      key={`chess-event-in-table-${event.id}`}
      onOpenChange={handleOpenChange}
    >
      <div className="grid grid-cols-table gap-1 items-center w-full h-fit relative">
        <Image
          src={event.image ?? ""}
          alt={event.name}
          fill
          className="rounded-lg !relative !w-16 !h-16 md:!h-32 md:!w-32"
        />
        <div>
          <div className="text-base md:text-2xl">{event.name}</div>
          <div className="text-base md:text-2xl">{event.date}</div>
          <GameTypeIcon gameType={event.type} />
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
