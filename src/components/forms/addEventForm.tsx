"use client";
import React from "react";
import { useFormik } from "formik";
import { ChessEvent } from "../../models/event";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface AddEventFormProps {
  initialValues?: ChessEvent;
  onSubmit: (event: ChessEvent, image: File) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
  initialValues: externalInitialValues,
  onSubmit,
}) => {
  const [eventImage, setEventImage] = React.useState<File | null>(null);
  const formik = useFormik({
    initialValues: externalInitialValues ?? {
      id: "",
      name: "",
      description: "",
      date: "",
      price: 0,
      image: "",
      location: "",
      rated: false,
      ratedFide: false,
    },
    onSubmit: (values: ChessEvent) => {
      if (!eventImage) {
        return;
      }
      onSubmit(values, eventImage);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div>אירוע חדש</div>
      <div>
        <Label htmlFor="name">שם</Label>
        <Input id="name" type="text" {...formik.getFieldProps("name")} required />
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
        <Input id="date" type="date" {...formik.getFieldProps("date")} required/>
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

      <div>
        <Label htmlFor="image">תמונה</Label>
        <button
          type="button"
          className="custom-upload-button" // Apply your custom styles here
          onClick={() => document.getElementById("image")?.click()}
        >
          {formik.values.image ? formik.values.image : ""}
        </button>
        <Input
          id="image"
          type="file"
          name="image"
          style={{ display: "none" }}
          onChange={(event) => {
            if (event.currentTarget.files && event.currentTarget.files[0]) {
              formik.setFieldValue("image", event.currentTarget.files[0].name);
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
  );
};

export default AddEventForm;
