import starstruckNormal from "../assets/awards-badges/tkchart/starstruck-normal.png";
import starstruckBronze from "../assets/awards-badges/pytube-downloader/starstruck-bronze.png";
import starstruckSilver from "../assets/awards-badges/pytube-downloader/starstruck-silver.png";
import sfRisingStarBlack from "../assets/awards-badges/pytube-downloader/source-forge-rising-start/black.svg";
import sfRisingStarWhite from "../assets/awards-badges/pytube-downloader/source-forge-rising-start/white.svg";
import sfFavouriteBlack from "../assets/awards-badges/pytube-downloader/source-forge-favourite/black.svg";
import sfFavouriteWhite from "../assets/awards-badges/pytube-downloader/source-forge-favourite/white.svg";
import sfCommunityChoiceBlack from "../assets/awards-badges/pytube-downloader/source-froge-community-choice/black.svg";
import sfCommunityChoiceWhite from "../assets/awards-badges/pytube-downloader/source-froge-community-choice/white.svg";

export function getBadgeImage(id, theme) {
  const isLight = theme === "light";
  switch (id) {
    case "starstruck":
      return starstruckNormal;
    case "starstruck-bronze":
      return starstruckBronze;
    case "starstruck-silver":
      return starstruckSilver;
    case "sf-rising-star":
      return isLight ? sfRisingStarWhite : sfRisingStarBlack;
    case "sf-favourite":
      return isLight ? sfFavouriteWhite : sfFavouriteBlack;
    case "sf-community-choice":
      return isLight ? sfCommunityChoiceWhite : sfCommunityChoiceBlack;
    default:
      return null;
  }
}
