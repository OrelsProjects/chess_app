"use client";
import React from "react";
import { useFormik } from "formik";
import { ChessEvent, CreateChessEvent } from "../../models/chessEvent";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface AddEventFormProps {
  initialValues?: ChessEvent;
  onSubmit: (event: CreateChessEvent) => any;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
  initialValues: externalInitialValues,
  onSubmit,
}) => {
  const router = useRouter();
  const [eventImage, setEventImage] = React.useState<File | null>(null);
  const formik = useFormik({
    initialValues: externalInitialValues ?? {
      id: "",
      name: "orel",
      description: "desc",
      date: "",
      price: 0,
      image: "",
      location: "hi",
      rated: false,
      ratedFide: false,
    },
    onSubmit: (values: ChessEvent) => {
      if (!eventImage) {
        return;
      }
      const event: CreateChessEvent = {
        ...values,
        imageFile: eventImage,
      };
      onSubmit(event);
    },
  });

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
          <Input
            id="image"
            type="file"
            name="image"
            style={{ display: "none" }}
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                const path = URL.createObjectURL(event.currentTarget.files[0]);
                formik.setFieldValue("image", path);
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

        <div>
          <Checkbox
            id="rated"
            className="mr-1"
            {...formik.getFieldProps("rated")}
          />
          <Label htmlFor="rated">מדורג</Label>

          {formik.touched.rated && formik.errors.rated && (
            <div>{formik.errors.rated}</div>
          )}
        </div>

        <div>
          <Checkbox
            id="ratedFide"
            className="mr-1"
            {...formik.getFieldProps("ratedFide")}
          />
          <Label htmlFor="ratedFide">מדורג פיד״ה</Label>
          {formik.touched.ratedFide && formik.errors.ratedFide && (
            <div>{formik.errors.ratedFide}</div>
          )}
        </div>

        <Button type="submit">צור אירוע</Button>
      </form>
    </div>
  );
};

export default AddEventForm;
