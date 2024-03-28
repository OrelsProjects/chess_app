"use client";
import React, { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import PlayerDetails from "../../models/playerDetails";
import toast from "react-hot-toast";
import DropdownGender from "../../components/ui/custom/dropdownGender";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

type Stage = "player_number" | "details" | "username_password";

const playerDetailsInitialValues: PlayerDetails & {
  username: string;
  password: string;
  verifiedPassword: string;
} = {
  playerNumber: "",
  ratingIsrael: 1199,
  firstName: "",
  lastName: "",
  gender: "male",
  ratingFide: undefined,
  ratingFideRapid: undefined,
  ratingFideBlitz: undefined,
  yearOfBirth: undefined,
  clubName: undefined,
  fidePlayerId: undefined,
  profileExpirationDate: undefined,
  fullName: undefined,
  title: undefined,
  username: "",
  password: "",
  verifiedPassword: "",
};

export default function Register() {
  const router = useRouter();
  const { user, register, updateUserPlayerDetails } = useAuth();
  const [player, setPlayer] = React.useState<PlayerDetails | null>(null);
  const [stage, setStage] = React.useState<Stage>("username_password");
  const [isPlayerNumber, setIsPlayerNumber] = React.useState<boolean>(false);
  const loadingPlayerFetch = useRef(false);

  const formik = useFormik({
    initialValues: { ...playerDetailsInitialValues },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (user) {
      setStage("player_number");
    }
  }, [user]);

  const createUserPlayerDetails = async () => {
    try {
      const playerDetails: PlayerDetails = {
        ratingIsrael: formik.values.ratingIsrael,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        playerNumber: formik.values.playerNumber,
        ratingFide: formik.values.ratingFide,
        ratingFideRapid: formik.values.ratingFideRapid,
        ratingFideBlitz: formik.values.ratingFideBlitz,
        yearOfBirth: formik.values.yearOfBirth,
        clubName: formik.values.clubName,
        fidePlayerId: formik.values.fidePlayerId,
        profileExpirationDate: formik.values.profileExpirationDate,
        fullName: formik.values.fullName,
        title: formik.values.title,
        gender: formik.values.gender,
      };
      await toast.promise(updateUserPlayerDetails(playerDetails), {
        loading: "שומר פרטים...",
        success: "פרטים נשמרו",
        error: "לא הצלחנו לשמור את הפרטים",
      });
      debugger;
      router.push("/home");
    } catch (e: any) {}
  };

  const handleOnRegisterUsernamePassword = async () => {
    // if (formik.values.password !== formik.values.verifiedPassword) {
    //   toast.error("הסיסמאות לא תואמות");
    //   formik.setErrors({
    //     password: "הסיסמאות לא תואמות",
    //     verifiedPassword: "הסיסמאות לא תואמות",
    //   });
    //   return;
    // }
    try {
      toast.promise(register(formik.values.username, formik.values.password), {
        loading: "רק רגע...",
        success: "נרשמת בהצלחה",
        error: (e: any) => {
          debugger;
          return "";
        },
      });
    } catch (e: any) {}
  };

  const nextStage = async (specificStage?: Stage) => {
    if (specificStage) {
      setStage(specificStage);
      return;
    }
    if (stage === "player_number") {
      setStage("details");
    }
    if (stage === "details") {
      if (user?.email) {
        await createUserPlayerDetails();
        return;
      }
      setStage("username_password");
    }
  };

  const prevStage = () => {
    if (stage === "details") {
      setStage("player_number");
    }
    if (stage === "username_password") {
      debugger;
      router.push("/login");
    }
    if (stage === "player_number") {
      debugger;
      router.push("/login");
    }
  };

  const handlePlayerNumberSubmit = async (playerNumber: string) => {
    try {
      if (!playerNumber) {
        formik.setErrors({ playerNumber: "שכחנו מספר שחקן" });
        return;
      }
      if (loadingPlayerFetch.current) return;
      loadingPlayerFetch.current = true;
      if (player && playerNumber === player.playerNumber) {
        nextStage();
        return;
      }
      const response = await toast.promise(
        axios.get<PlayerDetails>(`/api/player/${playerNumber}`),
        {
          loading: "מחפש שחמטאי...",
          success: "שחמטאי נמצא",
          error: (e: any) => {
            if (e.response.status === 404) {
              return "שחמטאי לא נמצא";
            }
            return "לא הצלחנו למצוא.. ננסה שוב?";
          },
        }
      );
      const playerFound = response.data;
      setPlayer(playerFound);
      setIsPlayerNumber(true);
      formik.setValues({ ...formik.values, ...playerFound });
      nextStage();
    } catch (e: any) {
    } finally {
      loadingPlayerFetch.current = false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-fit flex justify-start">
        <div className="p-1 w-7 h-7 shadow-md rounded-full bg-foreground flex justify-center items-center">
          <FaLongArrowAltRight
            onClick={prevStage}
            className="text-background w-6 h-6"
          />
        </div>
      </div>
      {stage === "player_number" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlayerNumberSubmit(formik.values.playerNumber);
          }}
          className="flex flex-col gap-0"
        >
          <div className="flex flex-row items-end gap-2">
            <div>
              <Label htmlFor="playerNumber">מספר שחמטאי</Label>
              <Input
                id="playerNumber"
                name="playerNumber"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.playerNumber}
                error={formik.errors.playerNumber}
              />
            </div>
            <Button type="submit" className="rounded-full w-10 h-10 p-0">
              <CiSearch className="w-7 h-7" />
            </Button>
          </div>
          <Button
            variant="link"
            onClick={() => {
              nextStage();
              setIsPlayerNumber(false);
            }}
            className="justify-start font-thin opacity-75 p-0 pb-4"
          >
            אין לי מספר שחמטאי
          </Button>
        </form>
      )}
      {stage === "details" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          <Label htmlFor="fullName">שם מלא</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fullName || ""}
            disabled={!!formik.values.playerNumber}
          />
          <Label htmlFor="gender">מין</Label>
          <DropdownGender
            onChange={(gender) => formik.setFieldValue("gender", gender)}
            value={formik.values.gender}
          />
          <Label htmlFor="firstName">שם פרטי</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName || ""}
            disabled={!!formik.values.firstName}
          />
          <Label htmlFor="lastName">שם משפחה</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName || ""}
            disabled={!!formik.values.lastName}
          />
          <>
            <Label htmlFor="ratingIsrael">דירוג ישראלי</Label>
            <Input
              id="ratingIsrael"
              name="ratingIsrael"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.ratingIsrael || ""}
              disabled={!!formik.values.ratingIsrael}
            />

            <Label htmlFor="ratingFide">דירוג FIDE</Label>
            <Input
              id="ratingFide"
              name="ratingFide"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.ratingFide || ""}
              disabled={!!formik.values.ratingFide}
            />

            <Label htmlFor="ratingFideRapid">דירוג FIDE מהיר</Label>
            <Input
              id="ratingFideRapid"
              name="ratingFideRapid"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.ratingFideRapid || ""}
              disabled={!!formik.values.ratingFideRapid}
            />

            <Label htmlFor="ratingFideBlitz">דירוג FIDE בזק</Label>
            <Input
              id="ratingFideBlitz"
              name="ratingFideBlitz"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.ratingFideBlitz || ""}
              disabled={!!formik.values.ratingFideBlitz}
            />

            <Label htmlFor="fidePlayerId">מספר שחקן FIDE</Label>
            <Input
              id="fidePlayerId"
              name="fidePlayerId"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.fidePlayerId || ""}
              disabled={!!formik.values.fidePlayerId}
            />

            <Label htmlFor="profileExpirationDate">תאריך תפוגה</Label>
            <Input
              id="profileExpirationDate"
              name="profileExpirationDate"
              type="date"
              onChange={formik.handleChange}
              value={`${formik.values.profileExpirationDate}`.split("T")[0]}
              disabled={!!formik.values.profileExpirationDate}
            />

            {formik.values.title && (
              <>
                <Label htmlFor="title">תואר</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.title || ""}
                  disabled
                />
              </>
            )}
          </>
          <div className="w-full flex flex-col gap-0">
            <Button onClick={() => nextStage()}>
              {isPlayerNumber ? "הפרטים נכונים" : "שמור פרטים"}
            </Button>
            <Button variant="link" onClick={prevStage} className="!p-0">
              אלו לא הפרטים שלי
            </Button>
          </div>
        </form>
      )}
      {stage === "username_password" && (
        <form
          className="w-full pt-4 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleOnRegisterUsernamePassword();
          }}
        >
          <Label htmlFor="username">אימייל</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="chess@gmail.com"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.errors.username}
            required
          />
          <Label htmlFor="password">סיסמה</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            required
          />
          <Label htmlFor="password">אימות סיסמה</Label>
          <Input
            id="verifiedPassword"
            name="verifiedPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.verifiedPassword}
            error={formik.errors.verifiedPassword}
            required
          />
          <Button type="submit">הרשם</Button>
        </form>
      )}
    </div>
  );
}
