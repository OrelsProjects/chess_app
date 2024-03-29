/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import {
  ChessEvent,
  CreateChessEvent,
  UpdateChessEvent,
} from "../../models/chessEvent";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DropdownEventType from "../ui/custom/dropdownEventType";

interface UpdateEventFormProps extends EventFormProps {
  onSubmitUpdate?: (event: UpdateChessEvent) => any;
  event?: ChessEvent;
}

interface EventFormProps {
  initialValues?: ChessEvent;
  onSubmit?: (event: CreateChessEvent) => any;
}

const EventForm: React.FC<EventFormProps & UpdateEventFormProps> = ({
  initialValues: externalInitialValues,
  onSubmit,
  onSubmitUpdate,
  event,
}) => {
  const router = useRouter();
  const [eventImage, setEventImage] = React.useState<File | null>(null);
  const formik = useFormik({
    initialValues: externalInitialValues ?? {
      id: event?.id ?? "",
      name: event?.name ?? "",
      description: event?.description ?? "",
      date: event?.date ?? "",
      time: event?.time ?? "",
      price: event?.price,
      type: event?.type ?? "rapid",
      image: event?.image ?? "",
      location: event?.location ?? "",
      rated: event?.rated ?? false,
      ratedFide: event?.ratedFide ?? false,
      isPaymentRequired: event?.isPaymentRequired ?? false,
    },

    onSubmit: (values: ChessEvent) => {
      if (!isEdit && !eventImage) {
        return;
      }
      if (isEdit) {
        const updateEvent = {
          ...values,
          imageFile: eventImage,
        };
        onSubmitUpdate?.(updateEvent);
      } else {
        const createEvent: CreateChessEvent = {
          ...values,
          imageFile: eventImage,
        };
        onSubmit?.(createEvent);
      }
    },
  });

  console.log(formik.values);

  const isEdit = useMemo(() => !!event, [event]);

  useEffect(() => {
    if (isEdit && event) {
      formik.setValues({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        price: event.price,
        image: event.image,
        location: event.location,
        rated: event.rated,
        ratedFide: event.ratedFide,
        type: event.type,
        isPaymentRequired: event.isPaymentRequired,
      });
    }
  }, [event]);

  return (
    <div>
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => router.back()}
          className="rounded-full h-8 w-8 p-0 shadow-md"
        >
          <FaArrowLeft height={24} width={24} />
        </Button>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>אירוע חדש</div>
        <div>
          <Label htmlFor="name">שם</Label>
          <Input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            required
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>

        <div>
          <Label htmlFor="description">תיאור</Label>
          <Input
            id="description"
            type="text"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div>{formik.errors.description}</div>
          )}
        </div>

        <div>
          <Label htmlFor="date">תאריך</Label>
          <Input
            id="date"
            type="date"
            {...formik.getFieldProps("date")}
            required
          />
          {formik.touched.date && formik.errors.date && (
            <div>{formik.errors.date}</div>
          )}
        </div>
        <div>
          <Label htmlFor="time">שעה</Label>
          <Input
            id="time"
            type="time"
            {...formik.getFieldProps("time")}
            required
          />
          {formik.touched.time && formik.errors.time && (
            <div>{formik.errors.time}</div>
          )}
        </div>

        <div>
          <Label htmlFor="price">מחיר</Label>
          <Input id="price" type="number" {...formik.getFieldProps("price")} />
          {formik.touched.price && formik.errors.price && (
            <div>{formik.errors.price}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            className="custom-upload-button" // Apply your custom styles here
            onClick={() => document.getElementById("image")?.click()}
          >
            <Label htmlFor="image">הוסף תמונה</Label>
          </Button>
          {formik.values.image && (
            <Image
              src={formik.values.image ?? ""}
              alt="event"
              height="100"
              width="100"
              className="rounded-md shadow-lg"
            />
          )}
          <DropdownEventType
            onChange={(value) => formik.setFieldValue("type", value)}
            value={formik.values.type}
          />
          <Input
            id="image"
            type="file"
            accept="image/*"
            name="image"
            style={{ display: "none" }}
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                const path = URL.createObjectURL(event.currentTarget.files[0]);
                if (!isEdit) {
                  formik.setFieldValue("image", path);
                }
                setEventImage(event.currentTarget.files[0]);
              }
            }}
          />
          {formik.touched.image && formik.errors.image && (
            <div>{formik.errors.image}</div>
          )}
        </div>

        <div>
          <Label htmlFor="location">מיקום</Label>
          <Input
            id="location"
            type="text"
            {...formik.getFieldProps("location")}
            required
          />
          {formik.touched.location && formik.errors.location && (
            <div>{formik.errors.location}</div>
          )}
        </div>

        <div className="flex flex-row justify-start items-center gap-1">
          <Checkbox
            id="isPaymentRequired"
            className="mr-1"
            checked={formik.values.isPaymentRequired}
            onCheckedChange={(checked) => {
              formik.setFieldValue("isPaymentRequired", checked);
            }}
            {...formik.getFieldProps("isPaymentRequired")}
          />
          <Label htmlFor="isPaymentRequired">חייב בתשלום?</Label>

          {formik.touched.rated && formik.errors.rated && (
            <div>{formik.errors.rated}</div>
          )}
        </div>

        <div className="flex flex-row justify-start items-center gap-1">
          <Checkbox
            id="rated"
            className="mr-1"
            checked={formik.values.rated}
            onCheckedChange={(checked) => {
              formik.setFieldValue("rated", checked);
            }}
            {...formik.getFieldProps("rated")}
          />
          <Label htmlFor="rated">מדורג</Label>

          {formik.touched.rated && formik.errors.rated && (
            <div>{formik.errors.rated}</div>
          )}
        </div>

        <div className="flex flex-row justify-start items-center gap-1">
          <Checkbox
            id="ratedFide"
            className="mr-1"
            checked={formik.values.ratedFide}
            onCheckedChange={(checked) => {
              formik.setFieldValue("ratedFide", checked);
            }}
            {...formik.getFieldProps("ratedFide")}
          />
          <Label htmlFor="ratedFide">מדורג פיד״ה</Label>
          {formik.touched.ratedFide && formik.errors.ratedFide && (
            <div>{formik.errors.ratedFide}</div>
          )}
        </div>

        <Button type="submit">{event ? "עדכן" : "צור"} אירוע</Button>
      </form>
    </div>
  );
};

export default EventForm;
