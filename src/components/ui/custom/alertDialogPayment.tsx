import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChessEvent } from "../../../models/chessEvent";
import { Button } from "../button";

interface AlertDialogPaymentProps {
  event: ChessEvent;
  onPay?: (event: ChessEvent) => void;
  onAlreadyPaid: (event: ChessEvent) => void;
  children?: React.ReactNode;
}

export default function AlertDialogPayment({
  event,
  onPay,
  onAlreadyPaid,
  children,
}: AlertDialogPaymentProps) {
  return (
    <AlertDialog
    >
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        onFocusOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>צריך לשלם למשחק הזה..</AlertDialogTitle>
          <AlertDialogDescription>
            מארגן המשחק מבקש שתשלם לפניי שתוכל להירשם.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AlertDialogCancel className="border-none p-0 mt-4 h-fit bg-background underline">
            פעם אחרת
          </AlertDialogCancel>
          <div className="flex flex-col gap-1 justify-center items-center">
            <Button
              onClick={() => {
                window.open("https://greeninvoice.shop/2kk2k5", "_blank");
                onPay?.(event);
              }}
            >
              אשלם עכשיו
            </Button>
            <AlertDialogCancel
              onClick={() => {
                onAlreadyPaid(event);
              }}
              className="m-0"
            >
              שילמתי כבר
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
