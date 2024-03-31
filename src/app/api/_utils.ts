import axios from "axios";
import { load } from "cheerio";
import PlayerNumberNotFoundError from "../../models/errors/PlayerNotFoundError";
import PlayerDetails from "../../models/playerDetails";

const extractFirstAndLastName = (fullName: string) => {
  const trimmedFullName = fullName.trim();
  const nameParts = trimmedFullName.split(" ");

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
  };
};

const extractDataFromHtml = (html: string) => {
  const $ = load(html);
  const clubName = $("div.full-block b").next("a").text();
  const fidePlayerId = $("div.full-block li:nth-child(2) a").text();
  const ratingIsrael = $(
    '.full-profile .full-block ul li:contains("מד כושר ישראלי")'
  )
    .find("span")
    .text()
    .trim()
    .match(/\d+/);
  const ratingFide = $('li:contains("מד כושר FIDE סטנדרטי")')
    .find("span")
    .text()
    .trim()
    .match(/\d+/);
  const ratingFideRapid = $('li:contains("מד כושר FIDE מהיר")')
    .find("span")
    .text()
    .trim()
    .match(/\d+/);
  const ratingFideBlitz = $('li:contains("מד כושר FIDE בזק")')
    .find("span")
    .text()
    .trim()
    .match(/\d+/);
  const title = $('li:contains("דרגה בינלאומית")').find("span").text().trim();
  const yearOfBirth = $('li:contains("שנת לידה")').text().trim().match(/\d+/);
  const profileExpirationDate = $('li:contains("תוקף כרטיס שחמטאי")')
    .text()
    .trim()
    .replace(/[^\d/]/g, "");
  const fullName = $(".player-name h2").text().trim();
  return {
    clubName,
    fidePlayerId,
    ratingIsrael,
    ratingFide,
    ratingFideRapid,
    ratingFideBlitz,
    yearOfBirth,
    profileExpirationDate,
    fullName,
    title,
  };
};

export const fetchPlayer = async (
  playerNumber: number
): Promise<PlayerDetails> => {
  const chessRatingUrl = process.env.CHESS_RATING_URL;
  const playerDetails: PlayerDetails = {
    playerNumber: playerNumber.toString(),
    ratingIsrael: 1199,
    firstName: "",
    lastName: "",
    gender: "male",
  };

  const chessRatingResult = await axios.get(`${chessRatingUrl}${playerNumber}`);
  const html = chessRatingResult.data;
  const data = extractDataFromHtml(html);

  if (!data.ratingIsrael) {
    throw new PlayerNumberNotFoundError();
  }
  if (data.ratingFide && data.ratingFide.length > 0) {
    playerDetails.ratingFide = parseInt(data.ratingFide[0]) || 0;
  }
  if (data.ratingIsrael && data.ratingIsrael.length > 0) {
    playerDetails.ratingIsrael = parseInt(data.ratingIsrael[0]) || 1199;
  }
  if (data.ratingFideRapid && data.ratingFideRapid.length > 0) {
    playerDetails.ratingFideRapid = data.ratingFideRapid[0];
  }
  if (data.ratingFideBlitz && data.ratingFideBlitz.length > 0) {
    playerDetails.ratingFideBlitz = data.ratingFideBlitz[0];
  }
  if (data.yearOfBirth && data.yearOfBirth.length > 0) {
    playerDetails.yearOfBirth = data.yearOfBirth[0];
  }
  if (data.clubName) {
    playerDetails.clubName = data.clubName;
  }
  if (data.fidePlayerId) {
    playerDetails.fidePlayerId = data.fidePlayerId;
  }
  if (data.profileExpirationDate) {
    const [day, month, year] = data.profileExpirationDate.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    playerDetails.profileExpirationDate = date;
  }
  if (data.fullName) {
    playerDetails.fullName = data.fullName;
    const { firstName, lastName } = extractFirstAndLastName(data.fullName);
    playerDetails.firstName = firstName;
    playerDetails.lastName = lastName;
  }
  if (data.title) {
    playerDetails.title = data.title;
  }

  return playerDetails;
};
